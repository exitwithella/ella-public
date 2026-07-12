---
title: A Payload revalidate hook that calls revalidateTag rolls back the write when fired outside a request scope
date: 2026-07-12
category: runtime
module: cms-cache
problem_type: runtime_error
component: cms
symptoms:
  - "payload.create/update throws \"Invariant: static generation store missing in revalidateTag\" from a seed script, vitest test, or MCP write"
  - 'the content write is rolled back — the document is not persisted — even though the data was valid'
applies_when:
  - 'a Payload afterChange/afterDelete hook calls Next.js revalidateTag'
  - 'content is written outside a Next request/render scope (seed.ts, integration tests, some MCP writes)'
resolution_type: code_fix
severity: medium
tags: [payload, nextjs, revalidate-tag, cache, hooks, cloudflare, d1, compound-engineering]
---

# A Payload revalidate hook that calls revalidateTag rolls back the write when fired outside a request scope

## Problem

Payload collection/global hooks fire `revalidateTag` to invalidate Next's
`unstable_cache` on content change (`src/hooks/revalidate-cache.ts`). `revalidateTag`
requires Next's static-generation async store, which only exists inside a
request or render. When a write happens **outside** one — `pnpm seed`, a vitest
integration test, or an MCP write that doesn't carry the store — `revalidateTag`
throws, and because it throws inside `afterChange`/`afterDelete`, Payload rolls
the whole operation back. The valid document is never persisted.

## Symptoms

- Creating a page in an integration test fails with:
  `Error: Invariant: static generation store missing in revalidateTag pages`,
  thrown from `revalidate-cache.ts` inside `createOperation`.
- `pnpm seed` (or any script using the Local API) aborts a write for the same
  reason once a revalidate hook is attached to the collection.

## What Didn't Work

- **Disabling the hook per-operation.** Payload has no built-in "skip hooks"
  flag on `create`, so dodging it means threading a `context` flag through every
  call site — more surface area than the fix.
- **Passing trigger words off the command line / other band-aids** don't apply;
  the throw is structural, not environmental.

## Solution

Make revalidation best-effort: wrap `revalidateTag` in try/catch so a missing
request scope is swallowed instead of bubbling into the write.

```ts
// src/hooks/revalidate-cache.ts
function safeRevalidate(tags: CacheTag[]): void {
  for (const tag of tags) {
    try {
      // @ts-expect-error — Next 16 single-arg form works while cacheComponents is off
      revalidateTag(tag)
    } catch {
      // Outside a request scope (script/test/MCP) — nothing to revalidate.
    }
  }
}
```

All three factories (`createRevalidateHook`, `createDeleteRevalidateHook`,
`createGlobalRevalidateHook`) call `safeRevalidate`. Inside a real request the
tag still fires; outside one the write proceeds and the 24h TTL plus the
authenticated `/api/revalidate-all` endpoint remain as backstops.

## Why This Works

Cache invalidation is a side effect of a content write, not a precondition for
it. A write that succeeded should not be undone because the cache couldn't be
poked. Swallowing the out-of-scope error decouples the two: the durable state
(the document) always lands; the derived state (the cache) is refreshed when it
can be, and falls back to TTL/manual revalidation when it can't.

## Prevention

- Any Payload hook that calls a Next request-scoped API (`revalidateTag`,
  `revalidatePath`, `cookies()`, `headers()`) must guard it — the same hook runs
  in request, script, test, and MCP contexts.
- When adding an integration test that writes content, this guard is what lets
  `payload.create`/`delete` succeed under vitest. `tests/int/draft-access.int.spec.ts`
  relies on it (its `afterAll` deletes pages, firing `afterDelete`).

## Related Issues

- MKT-175 (hardened the hook), MKT-219 (added the afterDelete + embedded-collection hooks that made the fix load-bearing).
