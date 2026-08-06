# Staging environment

A **durable, manually-deployed** Cloudflare Workers environment (`ella-public-staging`)
for validating schema/migration changes against a real prod-content snapshot
**before** they reach production.

## Why it exists

Cloudflare Workers has **no native per-branch preview bindings** (unlike Pages).
Branch **Preview URLs** are versions of the _production_ Worker and share its
bindings — including the prod D1. So a branch carrying a schema change (e.g. a
new table) 500s on its preview because it queries a table that doesn't exist in
prod D1 yet.

Staging is a separate Worker with its **own D1** (a prod snapshot), so you can
apply and exercise a migration end-to-end without touching production.

## It is intentionally NOT wired into CI

We deliberately do **not** set a Workers Builds "non-production branch deploy
command". That keeps existing **per-branch preview URLs unchanged**. Staging is
deployed **by hand** when you need it. (The tradeoff: previews still hit prod D1
and still break on schema changes — that's what staging is for.)

## Resources (created once)

| Resource       | Name                                 | Notes                                                                                                                            |
| -------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Worker         | `ella-public-staging`                | `env.staging` in `wrangler.jsonc`                                                                                                |
| D1             | `ella-public-staging-payload`        | staging content DB (prod snapshot)                                                                                               |
| R2 (media)     | `ella-public-payload` (prod, reused) | renders real images; staging-admin uploads would write to prod — switch to a dedicated bucket if staging becomes content-editing |
| R2 (ISR cache) | `ella-public-staging-isr-cache`      | isolated from prod                                                                                                               |

Bindings live in the `env.staging` block of `wrangler.jsonc`. Wrangler env
bindings are **not inherited**, so that block re-declares the full top-level set.

## First-time setup

```bash
wrangler d1 create ella-public-staging-payload          # → put the id in wrangler.jsonc env.staging
wrangler r2 bucket create ella-public-staging-isr-cache
wrangler secret put PAYLOAD_SECRET --env staging        # + any other secrets the app needs
```

## Refresh staging with real prod content

```bash
pnpm run snapshot:staging      # clones prod D1 → staging D1 (schema + data)
```

See `scripts/snapshot-prod-to-staging.sh` for why the clone splits schema/data,
strips `sqlite_stat1` stats, and loads data with FKs off (a `d1 export` dump is
not cleanly re-importable otherwise). To refresh an _existing_ staging DB,
recreate it first (the dump's `CREATE TABLE` statements fail against existing
tables).

## Deploy a branch to staging

From the branch you want to test (rebased so it has the `env.staging` config):

```bash
pnpm run deploy:staging        # = CLOUDFLARE_ENV=staging pnpm run deploy
```

This runs `payload migrate` against the **staging** D1 (binding resolved via
`CLOUDFLARE_ENV` — see `src/payload.config.ts` `getPlatformProxy`), then builds
and deploys the `ella-public-staging` Worker. `scripts/deploy-database-if-main.sh`
does not block it (it only skips migrations for non-main _Workers CI_ builds; a
manual deploy has no `WORKERS_CI_BRANCH`).

Then open the `ella-public-staging` Worker URL and verify.

## Verify

```bash
# migration applied?
wrangler d1 execute ella-public-staging-payload --remote \
  --command "SELECT name FROM sqlite_master WHERE type='table' AND name='<new_table>';"
```

Production and existing per-branch preview URLs are unaffected (no CI/dashboard
changes were made).
