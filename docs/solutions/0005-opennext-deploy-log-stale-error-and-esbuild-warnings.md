---
title: OpenNext deploy-log D1 `stale` error and esbuild warnings are toolchain-version noise
date: 2026-07-13
category: tooling
module: deploy
problem_type: build_error
component: tooling
symptoms:
  - 'Cloudflare Workers Builds deploy log prints: duplicate column name: stale: SQLITE_ERROR [code: 7500] on NEXT_TAG_CACHE_D1'
  - 'esbuild WARNING: Using direct eval with a bundler [direct-eval] in .open-next/server-functions/default/handler.mjs'
  - 'esbuild WARNING: The "typeof" operator will never evaluate to "null" [impossible-typeof] in a bundled handler chunk'
root_cause: config_error
resolution_type: dependency_update
severity: low
related_components: [database, documentation]
tags: [opennext, cloudflare, d1, tag-cache, esbuild, wrangler, deploy, dependency-update]
---

# OpenNext deploy-log D1 `stale` error and esbuild warnings are toolchain-version noise

## Context

The Cloudflare Workers Builds deploy log surfaced three scary-looking messages,
all emitted by the OpenNext toolchain (never by our source):

1. `✘ [ERROR] ... duplicate column name: stale: SQLITE_ERROR [code: 7500]` while
   `wrangler d1 execute` ran against `NEXT_TAG_CACHE_D1`.
2. `▲ [WARNING] Using direct eval with a bundler ... [direct-eval]` in the
   generated `handler.mjs`.
3. `▲ [WARNING] The "typeof" operator will never evaluate to "null"
[impossible-typeof]` in a generated handler chunk.

All three shared **one** root cause: the toolchain was a hair out of date —
`@opennextjs/cloudflare` pinned at `^1.19.1` (resolved 1.19.1) and `wrangler` at
`~4.83.0`.

The `stale` line looks like a fatal error but is **expected and non-fatal**. Our
`open-next.config.ts` uses the `d1-next-tag-cache` override. On every deploy,
OpenNext's `populateCache` step runs
`ALTER TABLE revalidations ADD COLUMN stale INTEGER; ... ADD COLUMN expire ...`
to add the SWR columns introduced in OpenNext v1.19. On any DB that was already
populated by a prior deploy the columns exist, so SQLite raises `duplicate
column name`. The migration is idempotent-by-intent — it is meant to fail
harmlessly — but **1.19.1 still logged the wrangler stderr as `✘ [ERROR]`**.
(Note `NEXT_TAG_CACHE_D1` and the Payload `D1` binding point at the _same_
physical DB, `ella-public-payload` / `5de67555-…`; OpenNext applies this schema
itself — no repo-side `.sql` or `migrations_dir` is involved.)

## Resolution

Bumped the toolchain and regenerated the lockfile — no code or schema change:

- `@opennextjs/cloudflare` `^1.19.1` → `^1.20.1`
- `wrangler` `~4.83.0` → `~4.110.0`

The fix for the `stale` error landed in **`@opennextjs/cloudflare` 1.19.6**
(_"do not log expected D1 errors"_). Confirmed present in the installed 1.20.1:
`dist/cli/commands/populate-cache.js` now runs the `ADD COLUMN` with
`logging: "none"` and the comment _"Do not log errors since the ALTER TABLE
command will fail if the columns already exist."_ → the `✘ [ERROR]` line is gone.

This is a **dependency bump, not a schema change** → no Payload
`migrate:create` needed. Do not let the `duplicate column name` wording trick you
into hand-writing a tag-cache migration; there is nothing in this repo to migrate.

## The two esbuild warnings (accepted as benign)

These live in bundled library code inside the OpenNext output, not in our
source, and there is **no clean project-side switch** to silence them
(`open-next.config.ts` exposes no `esbuildOptions`/`logLevel`; the bundling is
done by the transitive `@opennextjs/aws` esbuild pass). Decision: **document and
accept**, don't hack around them.

- **`direct-eval`** — came from `@opennextjs/aws@3.10.1`'s dynamic-import shim
  (`await eval(\`import('${importPath}')\`)`). The upgrade pulled
`@opennextjs/aws@4.0.2`, which **no longer emits it** — this warning is gone.
- **`impossible-typeof`** — a `case "null":` arm in a `typeof` switch inside a
  bundled dependency (post-upgrade it surfaces in the Payload admin page chunk).
  Harmless dead branch; still present. Leave it alone.

## Why This Matters

A red `✘ [ERROR]` in a deploy log reads as a broken deploy, but the tag-cache
`stale` error was always cosmetic — the deploy succeeded. The lesson: when
OpenNext/wrangler emit log noise, **check the installed version against the
OpenNext changelog before investigating the symptom** — the fix is often a
patch-level bump that simply stops logging an expected condition.

## Verification notes

- `pnpm type-check` / `pnpm lint` (0 errors) / `pnpm build` all pass on 1.20.1.
- A full `opennextjs-cloudflare build` completes locally, but only with
  `CI=1` — local builds collect page data with **parallel** workers
  (`next.config.ts` sets `experimental.cpus: 1` only when `CI` is set), and the
  parallel workerd instances contend on the local miniflare D1, throwing
  `SQLITE_BUSY_RECOVERY`. `CI=1` serializes them, matching the CI path. This is
  an environment quirk, unrelated to the dependency bump.
- The `stale` error only reproduces on a `--remote` deploy (the `populateCache`
  step), so the final confirmation is the next Workers Builds deploy log no
  longer printing `✘ [ERROR] duplicate column name: stale`.
