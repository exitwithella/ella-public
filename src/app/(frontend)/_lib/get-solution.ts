import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import type { Solution } from '@/payload-types'

import { CACHE_TAGS } from './cache-tags'

/**
 * Fetch a published solution by slug. Consumed by the `/solutions/[slug]` route
 * and the `/md` route so query shape, depth, and status filtering match.
 */
export const getSolutionBySlug = unstable_cache(
  async (slug: string): Promise<Solution | null> => {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'solutions',
      depth: 2,
      limit: 1,
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
    })

    return (result.docs[0] ?? null) as Solution | null
  },
  ['solution-by-slug'],
  { revalidate: 86400, tags: [CACHE_TAGS.solutions] },
)
