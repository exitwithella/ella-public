import { unstable_cache } from 'next/cache'
import config from '@payload-config'
import { getPayload } from 'payload'

import type { SiteSetting } from '@/payload-types'

export type { SiteSetting }

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSetting> => {
    const payload = await getPayload({ config })
    return payload.findGlobal({ slug: 'site-settings' })
  },
  ['site-settings'],
  { revalidate: 86400, tags: ['site-settings'] },
)
