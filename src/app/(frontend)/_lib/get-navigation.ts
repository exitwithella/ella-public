import type { Navigation } from '@/payload-types'

import { CACHE_TAGS } from './cache-tags'
import { cachedGlobal } from './cached-global'

export type { Navigation }

export const getNavigation = cachedGlobal<Navigation>('navigation', {
  tags: [CACHE_TAGS.navigation],
})
