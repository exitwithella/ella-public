---
title: Cloning one D1 database into another needs a schema/data split + FK-off, not a single dump
date: 2026-07-13
category: tooling
module: d1
problem_type: developer_experience
component: tooling
symptoms:
  - "wrangler d1 execute --remote --file of a `d1 export` dump fails with 'no such table: main.users: SQLITE_ERROR'"
  - "after loading schema first, the data load fails with 'FOREIGN KEY constraint failed: SQLITE_CONSTRAINT'"
applies_when:
  - 'cloning a Cloudflare D1 database into another D1 (e.g. prod → a new staging D1) via wrangler'
  - 'restoring/seeding a fresh D1 from a `wrangler d1 export` dump'
resolution_type: workaround
severity: low
tags: [d1, wrangler, cloudflare, sqlite, foreign-keys, staging, database-clone]
---

# Cloning one D1 database into another needs a schema/data split + FK-off, not a single dump

## Context

Standing up the durable staging environment meant cloning the production D1
(`ella-public-payload`) into a fresh staging D1 (`ella-public-staging-payload`)
with real content — deliberately not `pnpm seed` (its seed-data is stale). The
obvious approach — `wrangler d1 export … > dump.sql` then `wrangler d1 execute
--remote --file dump.sql` — does **not** work in one shot, for two independent
reasons, and the errors are misleading.

## Guidance

Clone in three moves — split schema from data, strip the stats lines, load
schema first, then load data with foreign keys off. This is encoded in
`scripts/snapshot-prod-to-staging.sh` (`pnpm run snapshot:staging`):

```bash
# 1. export schema and data SEPARATELY
wrangler d1 export "$PROD_DB" --remote --no-data   --output schema.sql
wrangler d1 export "$PROD_DB" --remote --no-schema --output data.sql

# 2. strip the ANALYZE + sqlite_stat1 stat rows the export prepends
strip() { grep -v -e '^INSERT INTO "sqlite_stat1"' -e '^ANALYZE ' "$@"; }
strip schema.sql > schema-clean.sql
{ printf 'PRAGMA foreign_keys=OFF;\n'; strip data.sql | grep -v '^PRAGMA defer_foreign_keys'; } > data-clean.sql

# 3. load schema first (all CREATE TABLEs), then data with FKs off
wrangler d1 execute "$STAGING_DB" --remote --file schema-clean.sql
wrangler d1 execute "$STAGING_DB" --remote --file data-clean.sql
```

Assumes the target D1 is empty. To refresh an existing one, recreate it first —
the dump mixes bare `CREATE TABLE` (no `IF NOT EXISTS`) statements that error
against existing tables.

## Why This Matters

Two failure modes, hit in order, each with a misleading message:

1. **Single-file import → `no such table: main.users`.** The export orders some
   child tables/rows before their parents (e.g. `users_sessions`, which has an FK
   to `users`, appears before `users` is created). The dump opens with
   `PRAGMA defer_foreign_keys=TRUE`, which _should_ defer the check — but D1's
   remote `--file` import commits in **batches**, so the pragma doesn't hold
   across the whole file. The deferred FK check fires while `users` doesn't
   exist yet → "no such table". (The export also prepends `ANALYZE` +
   `INSERT INTO "sqlite_stat1"` query-planner rows that error on import; strip
   them.)
2. **Schema-first, then data → `FOREIGN KEY constraint failed`.** With all
   tables created up front, the "no such table" is gone, but the same batching
   means a child row still gets inserted before its parent row, now as a plain
   FK violation. Loading the data with `PRAGMA foreign_keys=OFF` sidesteps
   ordering entirely (the referenced rows are all in the same file).

Recognizing this as "D1 batches `--file` imports so defer_foreign_keys can't
hold" — rather than a corrupt dump — is what turns a dead end into a 3-step
recipe. Verified end-to-end: the clone loaded (2 tiers, 27 comparison rows), a
pending Payload migration then applied cleanly, and the staging pricing page
rendered the real content.

## When to Apply

Any time you clone a D1 into another D1 with wrangler, or restore a D1 from a
`wrangler d1 export` dump and hit `no such table` / `FOREIGN KEY constraint
failed` on import. Reach for `pnpm run snapshot:staging` (or its recipe).

## Related

- `scripts/snapshot-prod-to-staging.sh` and `docs/staging-environment.md` — the
  staging environment this recipe supports.
- `[[0003-seeding-media-needs-local-r2-blobs]]` — the other half of populating a
  non-prod environment (media blobs live in R2, not D1, and need a separate copy).
- Never delete the local D1 SQLite file to "reset" state — see CLAUDE.md's
  Database & Migration Rules (this recipe targets _remote_ staging D1, not local).
