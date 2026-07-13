import type { SiteSetting } from '@/payload-types'

import { CACHE_TAGS } from './cache-tags'
import { cachedGlobal } from './cached-global'

export type { SiteSetting }

export const getSiteSettings = cachedGlobal<SiteSetting>('site-settings', {
  tags: [CACHE_TAGS.siteSettings],
})
