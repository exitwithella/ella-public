import { cacheLife, cacheTag } from 'next/cache'
import config from '@payload-config'
import { getPayload } from 'payload'

export async function getHomepage() {
  'use cache'
  cacheLife('minutes')
  cacheTag('pages', 'homepage')

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    depth: 2,
    limit: 1,
    where: {
      slug: { equals: 'home' },
    },
  })

  return result.docs[0] ?? null
}
