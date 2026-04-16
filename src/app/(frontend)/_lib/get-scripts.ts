import { unstable_cache } from 'next/cache'
import config from '@payload-config'
import { getPayload } from 'payload'

import type { ScriptInjection } from '@/payload-types'

export type { ScriptInjection }

export const getScriptInjection = unstable_cache(
  async (): Promise<ScriptInjection> => {
    const payload = await getPayload({ config })
    return payload.findGlobal({ slug: 'script-injection' })
  },
  ['script-injection'],
  { revalidate: 86400, tags: ['script-injection'] },
)
