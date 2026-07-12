import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

import type { CacheTag } from '@/app/(frontend)/_lib/cache-tags'

/**
 * Fire cache-tag invalidations best-effort.
 *
 * `revalidateTag` requires Next's static-generation store, which only exists
 * inside a request/render scope. When a document is written outside one — seed
 * scripts, tests, or MCP writes that don't carry the store — it throws. That
 * must not roll back the content write itself, so failures are swallowed here;
 * the 24h TTL and manual revalidate-all remain as backstops.
 */
function safeRevalidate(tags: CacheTag[]): void {
  for (const tag of tags) {
    try {
      // @ts-expect-error — Next 16 types require a profile arg, but the
      // single-arg form still works while cacheComponents is disabled.
      revalidateTag(tag)
    } catch {
      // Outside a request scope (script/test/MCP) — nothing to revalidate.
    }
  }
}

/**
 * Collection afterChange hook that invalidates cache tags when content changes.
 */
export function createRevalidateHook(...tags: CacheTag[]): CollectionAfterChangeHook {
  return async ({ doc }) => {
    safeRevalidate(tags)
    return doc
  }
}

/**
 * Collection afterDelete hook — same tags as afterChange, so a deleted document
 * stops being served from cache immediately instead of lingering until the TTL.
 */
export function createDeleteRevalidateHook(...tags: CacheTag[]): CollectionAfterDeleteHook {
  return async ({ doc }) => {
    safeRevalidate(tags)
    return doc
  }
}

/**
 * Global afterChange hook that invalidates cache tags when a global is updated.
 */
export function createGlobalRevalidateHook(...tags: CacheTag[]): GlobalAfterChangeHook {
  return async ({ doc }) => {
    safeRevalidate(tags)
    return doc
  }
}
