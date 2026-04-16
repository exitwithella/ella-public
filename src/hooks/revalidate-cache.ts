import { updateTag } from 'next/cache'
import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

/**
 * Collection afterChange hook that invalidates cache tags when content is updated.
 */
export function createRevalidateHook(
  ...tags: string[]
): CollectionAfterChangeHook {
  return async ({ doc }) => {
    for (const tag of tags) {
      updateTag(tag)
    }
    return doc
  }
}

/**
 * Global afterChange hook that invalidates cache tags when a global is updated.
 */
export function createGlobalRevalidateHook(
  ...tags: string[]
): GlobalAfterChangeHook {
  return async ({ doc }) => {
    for (const tag of tags) {
      updateTag(tag)
    }
    return doc
  }
}
