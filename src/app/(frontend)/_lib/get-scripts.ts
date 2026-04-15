import config from '@payload-config'
import { getPayload } from 'payload'

import type { ScriptInjection } from '@/payload-types'

export type { ScriptInjection }

export async function getScriptInjection(): Promise<ScriptInjection> {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'script-injection' })
}
