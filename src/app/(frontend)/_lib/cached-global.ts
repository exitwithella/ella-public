import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import type { GlobalSlug } from 'payload'

import type { CacheTag } from './cache-tags'

const DAY_IN_SECONDS = 86400

interface CachedGlobalOptions {
  tags: CacheTag[]
  depth?: number
  revalidate?: number
}

/**
 * Build a cached fetcher for a Payload global. The seven global fetchers were
 * identical `unstable_cache(getPayload → findGlobal)` boilerplate; this defines
 * the shape once. Cache key is the global slug.
 */
export function cachedGlobal<T>(
  slug: GlobalSlug,
  { tags, depth, revalidate = DAY_IN_SECONDS }: CachedGlobalOptions,
) {
  return unstable_cache(
    async (): Promise<T> => {
      const payload = await getPayload({ config })
      return payload.findGlobal({ slug, depth }) as Promise<T>
    },
    [slug],
    { revalidate, tags },
  )
}
