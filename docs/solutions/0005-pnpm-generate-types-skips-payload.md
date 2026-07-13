---
title: pnpm run generate:types can silently skip Payload type regeneration
date: 2026-07-13
category: tooling
module: payload
problem_type: developer_experience
component: tooling
symptoms:
  - "After editing a Payload collection/global schema, src/payload-types.ts shows no git diff and tsc still type-checks against the old shape"
  - "pnpm run generate:types exits 0 but the payload step prints no 'Types written to …' line"
applies_when:
  - 'regenerating Payload types after changing a collection or global field schema'
  - 'the new types must land for tsc / consumer code to see the new shape'
resolution_type: workaround
severity: low
tags: [payload, generate-types, codegen, tooling, cloudflare, wrangler, cms, local-dev]
---

# pnpm run generate:types can silently skip Payload type regeneration

## Context

`generate:types` is a chained script (`package.json`):

```
generate:types            → pnpm run generate:types:cloudflare && pnpm run generate:types:payload
generate:types:cloudflare → wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts
generate:types:payload    → cross-env NODE_OPTIONS=--no-deprecation payload generate:types
```

While changing a Payload global schema (MKT-213: the `pricing-page` comparison
rows from fixed `practitioner`/`enterprise` groups to a per-tier `values`
array), the schema edit was saved but `src/payload-types.ts` never updated —
`git diff` showed it unchanged and `tsc` still passed against the **old** shape,
which reads as "my schema change had no effect."

The chained `pnpm run generate:types` runs the `wrangler types` step
successfully (it prints its banner and writes `cloudflare-env.d.ts`), then
starts the payload step (`> cross-env … payload generate:types`) which emits
**no output and does not rewrite `payload-types.ts`**, yet the whole script
exits 0. It is not a `&&` short-circuit — the cloudflare step succeeds; the
payload step is the silent no-op.

## Guidance

Regenerate Payload types by invoking the payload binary directly and confirm it
actually wrote:

```bash
NODE_OPTIONS=--no-deprecation npx payload generate:types
```

A working run logs two INFO lines and, crucially, `Types written to
/…/src/payload-types.ts`. If you don't see that line, the file was not
regenerated. Always confirm with a `git diff src/payload-types.ts` (or a grep
for a field you just added/removed) before assuming the new shape is in place —
a green `tsc` proves nothing here, because it's checking against stale types.

## Why This Matters

The failure is invisible: no error, exit 0, and `tsc` stays green because it's
validating against the old generated types. You can build an entire schema +
consumer change believing it compiles, when in fact nothing downstream has seen
the new shape. Running the payload generator directly and eyeballing the "Types
written" log (plus a git diff) turns a silent no-op into a checked step.

Related gotcha from the same MKT-213 change — restructuring **existing** nested
CMS content in a Payload D1 migration: `payload migrate:create` emits only the
schema DDL (create the new child table, drop the old columns). It does **not**
migrate data. The data-copy step must be hand-written in `up()` — insert into
the new table **before** dropping the old columns, mapping rows by a stable key
(e.g. tier *name*, since prod row ids need not match seed) — with a reversing
`down()`. Precedent to copy from:
`src/migrations/20260712_180023_mkt_223_dilemma_typed_arrays.ts`.

## When to Apply

Any time you change a Payload collection or global field schema and need the
generated types to reflect it — especially when `payload-types.ts` shows no diff
and `tsc` unexpectedly still passes. Also when writing a migration that reshapes
existing CMS content rather than just adding empty columns.

## Related

- `[[0003-seeding-media-needs-local-r2-blobs]]` — the other half of why Payload
  CMS work can't be fully verified in a fresh worktree.
- CLAUDE.md → Database & Migration Rules: local dev uses `pushDevSchema`; prod
  needs a generated migration (`npx payload migrate:create`).
