import type { Footer } from '@/payload-types'

import { CACHE_TAGS } from './cache-tags'
import { cachedGlobal } from './cached-global'

export type { Footer }

export const getFooter = cachedGlobal<Footer>('footer', {
  depth: 2,
  tags: [CACHE_TAGS.footer],
})
