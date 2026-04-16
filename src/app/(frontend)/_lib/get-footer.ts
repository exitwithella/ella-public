import { unstable_cache } from 'next/cache'
import config from '@payload-config'
import { getPayload } from 'payload'

import type { Footer } from '@/payload-types'

export type { Footer }

export const getFooter = unstable_cache(
  async (): Promise<Footer> => {
    const payload = await getPayload({ config })
    return payload.findGlobal({ slug: 'footer', depth: 2 })
  },
  ['footer'],
  { revalidate: 86400, tags: ['footer'] },
)
