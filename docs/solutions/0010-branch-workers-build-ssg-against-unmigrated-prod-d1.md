---
title: Branch Workers Builds fail SSG against production D1 when a migration is still pending
date: 2026-10-21
category: build-errors
module: deploy
problem_type: build_error
component: tooling
symptoms:
  - "D1_ERROR: no such table: team_members_rels: SQLITE_ERROR during Workers Builds cf:build / generate-redirects"
  - "Before the fallback, pnpm run cf:build on a non-main branch statically generated against production D1, which did not yet have team_members_rels from a Payload 4 authorship migration"
  - "scripts/deploy-database-if-main.sh skips applying migrations unless the branch is main, so the schema a remote SSG queries can be behind the branch"
  - "Before the fallback, cf:build set REMOTE_BINDINGS=true unconditionally, so generate-redirects and Next SSG queried production D1"
root_cause: config_error
resolution_type: code_fix
severity: high
related_components: [database, development_workflow]
tags: [cloudflare, workers-builds, d1, payload, migrations, remote-bindings, ssg]
---

# Branch Workers Builds fail SSG against production D1 when a migration is still pending

## Problem

Workers Builds runs `cf:build` for every branch (`package.json`, `scripts/cf-build.sh`). That build static-generates the site by querying Payload. On a branch, `scripts/deploy-database-if-main.sh` skips `deploy:database` when `WORKERS_CI_BRANCH` is set and is not `main`, so the branch does not mutate the production schema while production still runs the previous code. The Payload 4 upgrade ([#29](https://github.com/exitwithella/ella-public/pull/29), opened and unmerged as of this writing) adds migration `20261021_040825_payload_v4` (`src/migrations/index.ts`). `main` does not contain that migration. On the Workers Builds runs for this branch, production `migrateStatus` reported it as not ran, so production D1 was still missing the new authorship tables. Pointing the branch SSG at production D1 made the build query tables that were not there, and Workers Builds failed.

## Symptoms

- The failing Workers Builds log reported `D1_ERROR: no such table: team_members_rels: SQLITE_ERROR` while Payload read production D1. `scripts/cf-build.sh` records the missing table as `team_members_rels`.
- `scripts/generate-redirects.ts` is on the build path (`package.json` `prebuild`). It finds `posts` at `depth: 1` (`scripts/generate-redirects.ts`) and `redirects` with depth omitted, so the config default of `2` applies (`src/payload.config.ts`). Either find joins authorship `*_rels` tables. The posts query populates `author`, a relationship to `team-members` (`src/collections/Posts.ts`), and that read hits `team_members_rels`.
- The same missing-table failure hits any other SSG fetch of a collection that gained an authorship rels table in this migration. `team_members_rels` is created in `src/migrations/20261021_040825_payload_v4.ts`. `redirects_rels` is created in the same file. `posts_rels` already existed; the migration adds `users_id`.

## What Didn't Work

- **Apply the v4 migration to production from the branch.** `deploy:database` runs `payload migrate` with `REMOTE_BINDINGS=true` (`package.json`). Doing that from a non-main Workers build would change the live schema while production still runs Payload 3. `scripts/deploy-database-if-main.sh` exists to refuse that: a set `WORKERS_CI_BRANCH` other than `main` exits 0 before `deploy:database`.
- **Turn authorship off.** Payload 4 defaults `versions: true` on collections (`node_modules/payload/dist/collections/config/defaults.js`). `sanitizeAuthorship` treats an omitted `authorship` config as `createdBy` and `updatedBy` both on (`node_modules/payload/dist/fields/baseFields/authorship/index.js`). #29 leaves both at those defaults. Collections in this repo do not set `authorship`.
- **Build every branch against local D1.** Content branches whose migrations are already recorded on production would then static-generate against an empty local database and ship pages without production content. The fallback has to be conditional on pending migrations.
- **Wrap every fetcher in try/catch.** That would hide real query errors (bad where-clauses, auth failures, adapter bugs) behind the same empty result as a missing table.

## Solution

On a non-main branch, `scripts/cf-build.sh` asks production whether this branch's migrations have run, and drops `REMOTE_BINDINGS` only when they have not. The check is `scripts/pending-remote-migrations.ts`, invoked with `NEXT_PHASE=phase-production-build` and `REMOTE_BINDINGS=true` (`scripts/cf-build.sh`).

```bash
# scripts/cf-build.sh
if [ -n "$branch" ] && [ "$branch" != "main" ]; then
  set +e
  NEXT_PHASE=phase-production-build \
    REMOTE_BINDINGS=true \
    NODE_OPTIONS=--no-deprecation \
    pnpm exec tsx scripts/pending-remote-migrations.ts
  status=$?
  set -e

  if [ "$status" -eq 2 ]; then
    echo "Prod D1 is behind this branch. Building against local D1 so Workers Builds can finish."
    use_remote=false
  elif [ "$status" -ne 0 ]; then
    echo "Could not read prod migration status (exit $status)."
    exit "$status"
  fi
fi
```

`scripts/pending-remote-migrations.ts` loads Payload, calls `payload.db.migrateStatus()`, and filters with `pendingMigrationNames` (`scripts/pending-migrations.ts`):

- Exit 0: every committed migration is recorded. `cf-build.sh` keeps `REMOTE_BINDINGS=true` and runs `opennextjs-cloudflare build` with that flag.
- Exit 2: at least one migration is pending. The script prints the names to stderr. The build continues without `REMOTE_BINDINGS`, so SSG uses local D1.
- Any other status, including exit 1 when `migrateStatus` returns nothing, fails the build.

`main`, and a manual `pnpm run deploy` with `WORKERS_CI_BRANCH` unset, still migrates then builds against remote bindings.

Per the Workers Builds log after this change, the run printed pending migration `20261021_040825_payload_v4`, logged `Prod D1 is behind this branch. Building against local D1 so Workers Builds can finish.`, and `generate-redirects` wrote 0 redirects. The OpenNext build finished. The dashboard step after `cf:build`, `wrangler versions upload`, succeeded and did not send that version to production traffic. That upload is not part of `scripts/cf-build.sh`.

Running `scripts/pending-remote-migrations.ts` locally without `REMOTE_BINDINGS` also exits 2 and lists every migration as not ran. Local `pushDevSchema` records a single `payload_migrations` row named `dev` with batch `-1` (`node_modules/.pnpm/@payloadcms+drizzle@4.0.0-beta.3_payload@4.0.0-beta.3_graphql@16.12.0_typescript@6.0.3_/node_modules/@payloadcms/drizzle/dist/utilities/pushDevSchema.js`). `migrateStatus` sets `ran` only when a row's name equals the migration file name (`node_modules/.pnpm/@payloadcms+drizzle@4.0.0-beta.3_payload@4.0.0-beta.3_graphql@16.12.0_typescript@6.0.3_/node_modules/@payloadcms/drizzle/dist/migrateStatus.js`). The `dev` row matches none of the names in `src/migrations/index.ts`, so `pendingMigrationNames` returns every file. A local exit 2 does not mean production is behind. Only the CI invocation with `REMOTE_BINDINGS=true` reads prod.

## Why This Works

`useRemoteBindings` is `process.env.REMOTE_BINDINGS === 'true'` (`src/payload.config.ts`). The sqlite adapter is constructed with `push: !useRemoteBindings`, so a remote build never drizzle-pushes production. Wrangler bindings in `wrangler.jsonc` are marked `"remote": true`; the explicit flag is what selects production versus the local miniflare D1.

Workers Builds sets `NODE_ENV=production` during the build. `payload.config.ts` treats production without `NEXT_PHASE=phase-production-build` as a Workers runtime and calls `getCloudflareContext`. There is no Workers runtime during the build, so that call cannot see D1. `NEXT_PHASE=phase-production-build` sets `isBuildPhase` and selects `getCloudflareContextFromWrangler`, which passes `remoteBindings: useRemoteBindings` into `getPlatformProxy`.

Payload 4 injects `createdBy` and `updatedBy` as relationships whose `relationTo` is the list of auth collection slugs (`node_modules/payload/dist/collections/config/sanitize.js`, `node_modules/payload/dist/fields/baseFields/authorship/index.js`). The D1 adapter stores those polymorphic relationships in `{table}_rels`. A find with no `select` sets `withTabledFields.rels` (`node_modules/.pnpm/@payloadcms+drizzle@4.0.0-beta.3_payload@4.0.0-beta.3_graphql@16.12.0_typescript@6.0.3_/node_modules/@payloadcms/drizzle/dist/find/buildFindManyArgs.js`) and, when that table is in the schema, loads `with._rels`. `findMany` builds that query with `depth: 0` (`node_modules/.pnpm/@payloadcms+drizzle@4.0.0-beta.3_payload@4.0.0-beta.3_graphql@16.12.0_typescript@6.0.3_/node_modules/@payloadcms/drizzle/dist/find/findMany.js`); the public `depth` argument only controls whether related documents are populated afterward. The public `depth` argument does not decide that join. A find that omits `select`, or that selects a polymorphic or hasMany relationship, joins `*_rels` when that table is in the adapter schema. A `select` that omits those fields does not. `generate-redirects` passes no `select`, so both of its finds take the join. `main` does not contain `20261021_040825_payload_v4`, and the branch's production `migrateStatus` reported that table missing, so the query raised `no such table`.

Building without `REMOTE_BINDINGS` moves those reads onto local D1, where `push: true` has already created the v4 tables, so the OpenNext compile can finish.

The fallback does not make the branch preview a safe place to exercise the migration. The uploaded preview is still a version of the production worker and binds to production D1 at runtime (`scripts/cf-build.sh`, `docs/staging-environment.md`). That doc records that those previews 500 at runtime until the migration runs on main. Static pages from the fallback build do not include production content. Staging remains the manual path: a separate worker with its own D1, deployed by hand. That doc already states the fallback.

## Prevention

- When a branch adds a migration, do not point SSG at production D1 until `migrateStatus` on that remote database reports the migration ran. `scripts/cf-build.sh` is the gate: exit 2 builds local, exit 0 keeps `REMOTE_BINDINGS=true`.
- Do not treat a local `migrateStatus` (no `REMOTE_BINDINGS`) as production truth. Local push records a `dev` batch `-1` row and leaves every migration file name unran, so `scripts/pending-remote-migrations.ts` exits 2 against local D1 even when production is current.
- Do not apply production migrations from a non-main Workers build. `scripts/deploy-database-if-main.sh` skips `deploy:database` whenever `WORKERS_CI_BRANCH` is set and is not `main`.
- `tests/unit/pending-migrations.unit.spec.ts` covers `pendingMigrationNames`. A mixed list returns only the pending name (`['20261021_040825_payload_v4']`). An all-ran list returns `[]`.

## Related Issues

- [OpenNext deploy-log D1 `stale` error and esbuild warnings](./0005-opennext-deploy-log-stale-error-and-esbuild-warnings.md) — toolchain log noise on `NEXT_TAG_CACHE_D1`. Different problem: that `SQLITE_ERROR` is an expected duplicate column, and the deploy still succeeds.
- [Cloning one D1 database into another](./0006-d1-clone-needs-schema-data-split-fk-off.md) — how the staging D1 is loaded from a production snapshot. Different problem: import batching and foreign keys, not branch SSG.
- [Staging environment](../staging-environment.md) — the manual worker used to apply and exercise a migration before it runs on main. Preview URLs stay bound to production D1.
