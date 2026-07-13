import type { ScriptInjection } from '@/payload-types'

import { CACHE_TAGS } from './cache-tags'
import { cachedGlobal } from './cached-global'

export type { ScriptInjection }

export const getScriptInjection = cachedGlobal<ScriptInjection>('script-injection', {
  tags: [CACHE_TAGS.scriptInjection],
})
