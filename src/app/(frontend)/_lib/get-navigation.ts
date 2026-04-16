import { cacheLife, cacheTag } from 'next/cache'
import config from '@payload-config'
import { getPayload } from 'payload'

import type { Navigation } from '@/payload-types'

export type { Navigation }

export async function getNavigation(): Promise<Navigation> {
  'use cache'
  cacheLife('minutes')
  cacheTag('navigation')

  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'navigation' })
}
