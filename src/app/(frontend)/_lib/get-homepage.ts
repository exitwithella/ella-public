import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

export const getHomepage = unstable_cache(
  async () => {
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
  },
  ['homepage'],
  { revalidate: 86400, tags: ['pages', 'homepage'] },
)
