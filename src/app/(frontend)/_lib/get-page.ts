import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import type { Page } from '@/payload-types'

import { CACHE_TAGS } from './cache-tags'

/**
 * Fetch a published page by slug. Single source of query shape for the generic
 * `[slug]` route, the homepage, and the `/md` route. Drafts are excluded here
 * because the frontend uses the Local API (`overrideAccess: true`), which
 * bypasses collection access control (see `access/publishedOrAuthed`).
 */
export const getPageBySlug = unstable_cache(
  async (slug: string): Promise<Page | null> => {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'pages',
      depth: 2,
      limit: 1,
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
    })

    return (result.docs[0] ?? null) as Page | null
  },
  ['page-by-slug'],
  { revalidate: 86400, tags: [CACHE_TAGS.pages] },
)
