import { unstable_cache } from 'next/cache'
import config from '@payload-config'
import { getPayload } from 'payload'

import type { Navigation } from '@/payload-types'

export type { Navigation }

export const getNavigation = unstable_cache(
  async (): Promise<Navigation> => {
    const payload = await getPayload({ config })
    return payload.findGlobal({ slug: 'navigation' })
  },
  ['navigation'],
  { revalidate: 86400, tags: ['navigation'] },
)
