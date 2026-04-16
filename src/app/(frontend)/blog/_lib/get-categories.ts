import { cacheLife, cacheTag } from 'next/cache'
import config from '@payload-config'
import { getPayload } from 'payload'

import type { Category } from '@/payload-types'

export async function getAllCategories(): Promise<Category[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('categories')

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'categories',
    sort: 'sortOrder',
    limit: 100,
  })

  return result.docs as Category[]
}

export async function getCategoryByPrefix(prefix: string): Promise<Category | null> {
  'use cache'
  cacheLife('hours')
  cacheTag('categories')

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'categories',
    limit: 1,
    where: { pathPrefix: { equals: prefix } },
  })

  return (result.docs[0] ?? null) as Category | null
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  'use cache'
  cacheLife('hours')
  cacheTag('categories')

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'categories',
    limit: 1,
    where: { slug: { equals: slug } },
  })

  return (result.docs[0] ?? null) as Category | null
}
