---
title: "pull-r2.sh writes a flat-file R2 store the app's miniflare never reads, so media seed still fails"
date: 2026-08-05
category: tooling
module: content-sync
problem_type: developer_experience
component: tooling
symptoms:
  - "pnpm seed / content:pull still dies with 'MissingFile: No files were uploaded' at the media step even after pull-r2.sh reports all blobs pulled OK"
applies_when:
  - 'running content:pull or pnpm seed on a fresh worktree with the current wrangler + @opennextjs/cloudflare versions'
  - "pull-r2.sh reports N/N blobs succeeded but the media collection still won't seed"
resolution_type: workaround
severity: medium
tags:
  [seed, media, r2, d1, content-sync, local-dev, cloudflare, wrangler, miniflare, opennext, payload]
---

# pull-r2.sh writes a flat-file R2 store the app's miniflare never reads

## Context

On a fresh worktree, `pnpm content:pull` (which is `dump:remote && seed && pull-r2.sh`)
fails at its `seed` step with `MissingFile: No files were uploaded` — the media
collection is an upload collection, and Payload's `generateFileData` needs the
blob present in the R2 the seed process reads.

[[0003-seeding-media-needs-local-r2-blobs]] documents this symptom and says the
fix is to populate local R2 first (via `pull-r2.sh`). That guidance is no longer
sufficient with the current toolchain: `pull-r2.sh` runs to completion
(`Done. 72 succeeded, 0 failed`) yet the very next `pnpm seed` **still** throws
`MissingFile`. Pulling the blobs "successfully" does not make the seed find them.

## Guidance

**First, the cheap answer: if someone asks to "test locally against prod data,"
recommend `pnpm dev:remote` and stop.** That command runs the dev server
straight against prod D1/R2 — full content _and_ real images, no local seeding.
The agent generally can't _start_ it (it needs a typed production-write
confirmation, and the `CONFIRM_REMOTE=yes` bypass is hook-blocked), so the right
move is a one-line recommendation for the user to run it in their own terminal —
**not** an attempt to reproduce prod content in local D1. Seeding prod content
locally hits everything below (broken R2 blob tooling, media FK failures, no
images) and burns a lot of effort for a strictly worse result. Only fall back to
local seeding when the user explicitly wants a local DB and accepts missing
images.

The local R2 state has split into **two incompatible backends** that live side
by side under `.wrangler/state/v3/r2/`:

- `pull-r2.sh` populates R2 with `wrangler r2 object put --local`. The wrangler
  CLI (4.110.0) writes a **flat-file** store keyed by bucket name:
  `.wrangler/state/v3/r2/ella-public-payload/blobs/<hash>` — one raw file per
  object.
- The app and the seed script read R2 through `getCloudflareContext()` →
  `@opennextjs/cloudflare` → `getPlatformProxy()` → miniflare, which uses a
  **SQLite-backed** store in a binding-named directory:
  `.wrangler/state/v3/r2/miniflare-R2BucketObject/<hash>.sqlite` — blobs live
  _inside_ the sqlite file.

These are different storage formats in different directories. Copying files
between them does not work. So `pull-r2.sh` writes 72 blobs the app's miniflare
never looks at, and the seed's media `create()` still sees an empty bucket.

**Diagnostic** — if both directories exist and disagree, you're hitting this:

```bash
find .wrangler/state/v3/r2/ella-public-payload/blobs -type f | wc -l   # flat files pull-r2 wrote
find .wrangler/state/v3/r2/miniflare-R2BucketObject   -type f          # *.sqlite the app reads
```

Blobs in the first, only `.sqlite` in the second → the two stores are out of
sync and media seed will fail no matter how many times you re-run `pull-r2.sh`.

**Workaround (verify without media).** When you only need to render/verify
frontend behavior (not the actual uploaded images), seed just the documents you
need and null their media relationships so Payload falls back to static assets.
The hero, for example, falls back to `/images/ella-dashboard.avif` when
`hero.visual` doesn't resolve, so a homepage seeded with `hero.visual: null`
renders every text/layout/font/highlight field correctly:

```ts
const data = { ...homeDoc }
data.hero = { ...data.hero, visual: null, backgroundImage: null }
delete data.layout // skip blocks that reference unseeded relations
await payload.create({ collection: 'pages', data })
```

Two more gotchas that bite right after, both cache-related:

- `unstable_cache` on the data fetchers persists to `.next/cache`; after seeding
  or changing content you must `rm -rf .next` **and** restart `pnpm dev` — a
  restart alone serves the stale (often empty) cached result.
- `dev:remote` (render straight against prod D1/R2, sidestepping local R2
  entirely) is **not** an escape hatch for agents: a PreToolUse hook blocks
  `CONFIRM_REMOTE=yes`, and the confirmation can't be answered non-interactively.

**Real fix (unresolved).** Aligning the two backends — pinning wrangler to a
version whose CLI and `getPlatformProxy` share one persist format, or replacing
`pull-r2.sh`'s `wrangler r2 object put --local` with a writer that targets the
miniflare sqlite store — is the durable fix. Not attempted here; flagged for
`content-sync` tooling follow-up.

## Why This Matters

The failure looks identical to [[0003-seeding-media-needs-local-r2-blobs]]
("blobs missing, go pull them"), so the natural response is to run `pull-r2.sh`
and expect success. Because the blobs land in a store the app can't read, that
loop never converges and you can burn real time re-pulling. Recognizing it as a
**two-backend mismatch** (not "blobs missing") is what stops the detour — and
tells you the fix is aligning the persist format, not fetching the blobs again.

## When to Apply

- `content:pull` / `pnpm seed` dies at the media step with `MissingFile` on a
  fresh worktree, **and** `pull-r2.sh` already reported all blobs pulled OK.
- Both `.wrangler/state/v3/r2/ella-public-payload/` (flat files) and
  `.wrangler/state/v3/r2/miniflare-R2BucketObject/` (`.sqlite`) exist with
  mismatched contents.
- You need real production content locally to verify frontend work but only care
  about text/layout, not the uploaded image bytes.

## Examples

The two stores after a "successful" `pull-r2.sh`, showing the incompatibility:

```
.wrangler/state/v3/r2/ella-public-payload/blobs/          <- 72 flat blob files (wrangler CLI wrote)
  a3dedb60…0000019fd4afcb5c
  2ae68165…0000019fd4ae467a
  …
.wrangler/state/v3/r2/miniflare-R2BucketObject/           <- what the app/seed actually reads
  metadata.sqlite
  ff996cb4…fde545b9.sqlite                                 <- blobs live INSIDE sqlite, and this set is stale
```

`pull-r2.sh` reports `Done. 72 succeeded, 0 failed` — a true statement about the
flat-file store, and irrelevant to the sqlite store the seed reads.

## Related

- [[0003-seeding-media-needs-local-r2-blobs]] — same `MissingFile` symptom and
  the same `content:pull` pipeline; this doc supersedes its "just run pull-r2.sh"
  guidance for the current wrangler/opennext versions. Consider consolidating the
  two once the real backend-alignment fix lands.
- `scripts/pull-r2.sh` (remote → local) and `scripts/migrate-r2.sh` (local →
  remote) both derive keys from `src/seed-data/media.json` and both use
  `wrangler r2 object … --local`, so both target the flat-file store.
