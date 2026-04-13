import config from '@payload-config'
import { getPayload } from 'payload'

import type { Footer } from '@/payload-types'

export type { Footer }

export async function getFooter(): Promise<Footer> {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'footer', depth: 2 })
}
