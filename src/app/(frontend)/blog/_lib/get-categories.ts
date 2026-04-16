import { unstable_cache } from 'next/cache'
import config from '@payload-config'
import { getPayload } from 'payload'

import type { Category } from '@/payload-types'

export const getAllCategories = unstable_cache(
  async (): Promise<Category[]> => {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'categories',
      sort: 'sortOrder',
      limit: 100,
    })

    return result.docs as Category[]
  },
  ['categories-all'],
  { revalidate: 86400, tags: ['categories'] },
)

export const getCategoryByPrefix = unstable_cache(
  async (prefix: string): Promise<Category | null> => {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'categories',
      limit: 1,
      where: { pathPrefix: { equals: prefix } },
    })

    return (result.docs[0] ?? null) as Category | null
  },
  ['category-by-prefix'],
  { revalidate: 86400, tags: ['categories'] },
)

export const getCategoryBySlug = unstable_cache(
  async (slug: string): Promise<Category | null> => {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'categories',
      limit: 1,
      where: { slug: { equals: slug } },
    })

    return (result.docs[0] ?? null) as Category | null
  },
  ['category-by-slug'],
  { revalidate: 86400, tags: ['categories'] },
)
