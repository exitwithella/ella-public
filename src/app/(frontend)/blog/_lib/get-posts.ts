import { cacheLife, cacheTag } from 'next/cache'
import config from '@payload-config'
import { getPayload } from 'payload'

import type { Post } from '@/payload-types'

interface GetPublishedPostsOptions {
  categorySlug?: string
  tier?: Post['tier']
  page?: number
  limit?: number
}

export async function getPublishedPosts(options: GetPublishedPostsOptions = {}): Promise<Post[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag('posts')

  const payload = await getPayload({ config })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {
    status: { equals: 'published' },
  }

  if (options.categorySlug) {
    where['categories.slug'] = { equals: options.categorySlug }
  }

  if (options.tier) {
    where.tier = { equals: options.tier }
  }

  const result = await payload.find({
    collection: 'posts',
    depth: 2,
    sort: '-publishedDate',
    limit: options.limit ?? 200,
    page: options.page ?? 1,
    where,
  })

  return result.docs as Post[]
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  'use cache'
  cacheLife('minutes')
  cacheTag('posts')

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 1,
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
  })

  return (result.docs[0] ?? null) as Post | null
}

export async function getPostByPath(segments: string[]): Promise<Post | null> {
  if (segments.length === 1) {
    return getPostBySlug(segments[0])
  }

  if (segments.length === 2) {
    // Prefixed post: /blog/[prefix]/[slug]
    return getPostBySlug(segments[1])
  }

  return null
}

export async function getAllPostSlugs(): Promise<string[][]> {
  'use cache'
  cacheLife('minutes')
  cacheTag('posts')

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 500,
    where: { status: { equals: 'published' } },
  })

  const paths: string[][] = []

  for (const post of result.docs as Post[]) {
    const cats = post.categories
    const primaryCat = Array.isArray(cats) && cats.length > 0 ? cats[0] : null

    if (primaryCat && typeof primaryCat === 'object' && primaryCat.pathPrefix) {
      paths.push([primaryCat.pathPrefix, post.slug])
    } else {
      paths.push([post.slug])
    }
  }

  return paths
}
