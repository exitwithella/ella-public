---
title: Legacy redirects never fired because prebuild was skipped, Workers ignore _redirects, and the generator read statusCode
date: 2026-10-21
category: integration-issues
module: redirects
problem_type: integration_issue
component: tooling
symptoms:
  - "package.json prebuild never ran: .npmrc is only legacy-peer-deps=true, and pnpm skips pre scripts without enable-pre-post-scripts"
  - "public/_redirects held a header comment and no rules, and Workers static assets do not apply _redirects to HTML the OpenNext worker serves"
  - "The generator read statusCode while the Redirects collection stores type, and it ignored active and sourceDomain"
  - "Middleware only handled /md Accept negotiation, so CMS redirect rows never became 301 or 302 responses"
root_cause: wrong_api
resolution_type: code_fix
severity: high
tags: [redirects, middleware, cloudflare-workers, opennext, pnpm, payload, d1, legacy-urls]
---

# Legacy redirects never fired because prebuild was skipped, Workers ignore _redirects, and the generator read statusCode

## Problem

Legacy 301s from exitwithella.io, and renamed withella.io blog slugs, never shipped. The CMS already had a Redirects collection and posts with `legacySlug`, but nothing on the request path turned those rows into HTTP redirects. The OpenNext worker serves the HTML, so a static `_redirects` file never applied, and the script that was supposed to materialize rules never ran in the builds that actually deploy.

The replacement pipeline is opened in [#33](https://github.com/exitwithella/ella-public/pull/33) (`fix(cms): serve legacy redirects from middleware`). That pull request is still a draft and unmerged as of this writing.

## Symptoms

Old URLs keep returning whatever Next would render for that path, or a 404, instead of a 301. Publishing a Redirects row, or setting `legacySlug` on a published post, changes nothing in production until a deploy build regenerates `src/generated/redirects.json` and that file is bundled into the worker. Local `pnpm dev` and CI `pnpm build` leave the committed file untouched, and that committed file starts as `[]`.

A request that should have redirected therefore looks like a normal navigation. `/md` content negotiation is separate: a `/md` path without `Accept: text/markdown` is a 404, and one that includes `text/markdown` continues (`src/middleware.ts`). That check was the only thing middleware did before the rule list was wired in.

## What Didn't Work

**`public/_redirects` (removed by this fix).** Workers static assets do not apply `_redirects` to responses served by Worker code. `wrangler.jsonc` sets `main` to the OpenNext worker output and `assets.directory` to the OpenNext assets directory, so HTML comes from the worker, not from a static file `_redirects` can rewrite. The generator header records that decision (`scripts/generate-redirects.ts`). This fix deletes `public/_redirects` so the empty file is not a second contract.

**A `prebuild` script.** pnpm does not run `pre`/`post` scripts unless `enable-pre-post-scripts` is set. `.npmrc` contains only `legacy-peer-deps=true`. `prebuild` is gone from `package.json`. `generate-redirects` is an explicit script called from `cf:build` and `deploy:app`.

**Reading `statusCode`.** The Redirects collection stores the status on `type`, a select of `301` or `302` defaulting to `301` (`src/collections/Redirects.ts`). The old generator looked for `statusCode`, which this schema does not write. `buildRedirectRules` reads `type`. Anything other than the string `'302'` becomes 301 (`src/lib/redirect-rules.ts`). The unit test passes a row that still has `statusCode: 302` and no `type`, and expects status 301.

**`redirects()` in `next.config.ts`.** Next evaluates `redirects()` inside `pnpm build`. CI runs that build with no Cloudflare auth and an empty local D1, so a config function that queried Payload would fail the build or bake an empty list. Production rows live in remote D1 and are only read when `REMOTE_BINDINGS=true` on the deploy build, after migrations. `pnpm build` and `pnpm dev` do not call `generate-redirects`.

## Solution

Generate a JSON rule list from D1 during the Cloudflare build, import that list in middleware, and match the request there. No D1 lookup happens on the request.

`cf:build` checks migrations, deploys the database on main, generates redirects against remote D1, then builds OpenNext (`package.json`):

```bash
pnpm run check-migrations && bash scripts/deploy-database-if-main.sh \
  && cross-env REMOTE_BINDINGS=true pnpm run generate-redirects \
  && cross-env REMOTE_BINDINGS=true opennextjs-cloudflare build --env=$CLOUDFLARE_ENV
```

`deploy:app` generates redirects with `REMOTE_BINDINGS=true` before its OpenNext build. `generate-redirects` is `tsx scripts/generate-redirects.ts`.

The generator paginates posts and redirects with `collectPages` at `limit: 100` and writes `src/generated/redirects.json`. Posts are limited to rows where `legacySlug` exists and `status` is `published`. Redirect rows are loaded without a status filter; inactive ones are dropped in the rule builder.

That `tsx` process does not set `NODE_ENV`. With `REMOTE_BINDINGS=true`, `push` is forced off so the remote D1 is not drizzle-pushed and the process does not hang on the interactive data-loss prompt (`src/payload.config.ts`):

```ts
const useRemoteBindings = process.env.REMOTE_BINDINGS === 'true'
db: sqliteD1Adapter({ binding: cloudflare.env.D1, push: !useRemoteBindings }),
```

Local dev keeps push on.

Redirect rows use `from`, `to`, `type`, `sourceDomain`, and `active` (`src/collections/Redirects.ts`). `sourceDomain` is `withella` or `exitwithella`, default `withella`. `active` defaults to true.

```ts
if (row.active === false) return null
return {
  from,
  to,
  status: type === '302' ? 302 : 301,
  sourceDomain: sourceDomain === 'exitwithella' ? 'exitwithella' : 'withella',
}
```

A published post whose `legacySlug` and `slug` differ adds a rule from `/blog/{legacySlug}` to `/blog/{slug}` with status 301 and `sourceDomain: 'any'`. Identical paths, drafts, and missing slugs emit nothing. Post rules are appended before collection rows, so a legacy blog path wins when both match the same host.

Middleware loads the generated JSON and keeps the `/md` Accept check ahead of redirect matching (`src/middleware.ts`):

```ts
const match = findRedirect(redirectRules, pathname, req.headers.get('host') ?? '')
if (match) {
  const location = redirectLocation(match, req.url)
  if (location) return NextResponse.redirect(location, match.status)
}
```

`findRedirect` returns null for `/api`, `/admin`, and `/_next` before it scans rules. The matcher also skips those prefixes and common static extensions. Host matching is case-insensitive: `exitwithella` matches when the host contains `exitwithella`; `withella` matches every other host, including `www.withella.io`; `any` matches both. The first rule whose path and host both match wins. `redirectLocation` resolves `to` against the request URL and returns null if that URL is invalid.

## Why This Works

The worker answers HTML requests (`wrangler.jsonc` `main`). A redirect has to be a `NextResponse.redirect` from middleware, using data already compiled into the bundle. Generating JSON at `cf:build` / `deploy:app` time, after the database step and with `REMOTE_BINDINGS=true`, reads the database that holds the rows and writes the file the OpenNext build then bundles. `pnpm build` and `pnpm dev` stay offline-friendly: they import the committed `[]` and do not need Cloudflare credentials.

Reading `type` matches the collection. Defaulting a missing `type` to 301 matches the field default without trusting a `statusCode` property the admin UI never saves. Dropping `active === false` keeps disabled rows out of the worker. `sourceDomain: 'any'` on legacy blog rules makes `/blog/{legacySlug}` redirect on both hosts when the slugs differ. Collection rows stay host-scoped, so the same path can point somewhere else on exitwithella.io than on withella.io.

`push: !useRemoteBindings` is what makes the generator safe to run as a `NODE_ENV`-unset `tsx` process against production D1. Without it, that process would try to drizzle-push remote schema and stop on the data-loss prompt.

## Prevention

`tests/unit/redirect-rules.unit.spec.ts` covers the rule builder and the matcher: active 301 and 302 rows kept, inactive rows dropped, missing `type` becomes 301, a leftover `statusCode` is ignored, a full source URL is reduced to a path, published legacy slugs emit `/blog/...` 301s only when the paths differ, unpublished posts and identical slugs do not, host selection includes `www`, lookup is first-match, and `/admin` and `/api` do not match. Middleware tests keep the `/md` Accept check and assert that the committed empty list does not set `Location`.

The next `cf:build` on main is what fills `src/generated/redirects.json` inside the worker bundle. The committed file is a placeholder so typecheck and `pnpm build` can import it. Do not commit production redirect rows into git as the source of truth. The deploy build overwrites that file in the build workspace from remote D1. Editing the JSON by hand does not update production.

When adding a redirect, create it in the Redirects collection (`from`, `to`, `type`, `sourceDomain`, `active`) or set `legacySlug` on a published post, then let the next main `cf:build` or `deploy:app` regenerate the file. Keep `generate-redirects` as an explicit step in those two scripts. Do not move it back to `prebuild`.

## Related Issues

- [MKT-177](https://linear.app/exitwithella/issue/MKT-177/legacy-301-redirect-pipeline-is-dead-end-to-end) — the legacy 301 pipeline was dead end to end.
- [PR #33](https://github.com/exitwithella/ella-public/pull/33) — the fix. Draft and unmerged as of this writing.
- [OpenNext deploy-log noise](./0005-opennext-deploy-log-stale-error-and-esbuild-warnings.md) — a different OpenNext/D1 gotcha (non-fatal `duplicate column name: stale` on the tag cache). It does not cover redirects.
