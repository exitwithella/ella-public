---
title: Seeding upload collections into a fresh local D1 needs the R2 blobs first
date: 2026-07-12
category: tooling
module: content-sync
problem_type: developer_experience
component: tooling
symptoms:
  - "pnpm seed dies at the media step with 'MissingFile: No files were uploaded' on a fresh worktree"
applies_when:
  - "running pnpm seed (or verifying seed.ts changes) in a fresh Conductor worktree or clean checkout"
  - "the local miniflare R2 bucket has no blobs yet"
resolution_type: environment_setup
severity: low
tags: [seed, media, r2, d1, content-sync, local-dev, cloudflare, payload]
---

# Seeding upload collections into a fresh local D1 needs the R2 blobs first

## Context

`pnpm seed` (and `content:pull`, which calls it) restores every CMS collection
from `src/seed-data/*.json` into local D1. `media` is the first collection it
seeds, and it is an **upload** collection: `seedCollection(payload, 'media',
'filename')` calls `payload.create()` for each record, which routes through
Payload's `generateFileData` and requires the actual file to be present in the
bound R2 bucket. A fresh Conductor worktree (or any clean checkout) has an empty
local miniflare R2 — `.wrangler/state/v3/r2/ella-public-payload/blobs` contains
zero files — so the very first create throws and the whole seed aborts before
any other collection runs.

## Guidance

Populate local R2 before seeding a collection that has uploads. The pipeline
already does this in the right order — use it rather than calling `pnpm seed`
bare on a cold environment:

- `pnpm content:pull` runs `dump:remote` → `seed` → `scripts/pull-r2.sh`, and
  `pull-r2.sh` streams each blob named in `media.json` from remote R2 into local
  R2 via `wrangler r2 object get --remote` / `put --local`.
- Both `content:pull` and the standalone `pull-r2.sh` require Cloudflare auth
  first (`wrangler login` or an exported `CLOUDFLARE_API_TOKEN`).

If Cloudflare auth is unavailable (e.g. a non-interactive/background agent), the
full seed round-trip simply cannot be exercised in that environment. Validate
seed/dump code changes another way — `pnpm type-check`, `pnpm check-migrations`,
and `bash scripts/migrate-r2.sh --dry-run` (which reads `media.json`, not R2) —
and say plainly that the end-to-end run was blocked on the missing blobs rather
than reporting it as passing.

Also: do **not** reach for `pnpm dump` to "reset" a cold local DB. Dump reads
local D1 at depth 0; against an empty DB it writes empty `src/seed-data/*.json`,
clobbering the committed working content.

## Why This Matters

The failure looks like a defect in the seed script, but it is purely
environmental — it happens on `main` too, and before any of the remapping /
upsert logic runs. Recognizing it as "missing local R2 blobs" instead of "seed
is broken" saves a debugging detour, and keeps you from misreporting an
environment gap as a code failure when verifying seed/dump work.

## When to Apply

Any time `pnpm seed` fails at the `media` step with `MissingFile`, or you are
about to verify `src/seed.ts` / `src/dump.ts` changes in a freshly-created
worktree with no prior local content state.

## Related

- `scripts/pull-r2.sh` (remote → local) and `scripts/migrate-r2.sh` (local →
  remote) — both derive keys from `src/seed-data/media.json`.
- Content-sync tooling fixes: MKT-181 and its sub-issues.
- Never delete the local D1 SQLite file to "fix" this — see the Database &
  Migration Rules in CLAUDE.md.
