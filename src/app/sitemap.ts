import config from '@payload-config'
import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import type { Post } from '@/payload-types'

import { siteConfig } from './(frontend)/_lib/content'

const BASE_URL = siteConfig.url

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/pricing`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.8 },
  ]

  // Published pages
  const pages = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 200,
    where: { status: { equals: 'published' } },
  })

  const pageEntries: MetadataRoute.Sitemap = pages.docs
    .filter((page) => page.slug !== 'home')
    .map((page) => ({
      url: `${BASE_URL}/${page.slug}`,
      lastModified: page.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  // Published solutions
  const solutions = await payload.find({
    collection: 'solutions',
    depth: 0,
    limit: 200,
    where: { status: { equals: 'published' } },
  })

  const solutionEntries: MetadataRoute.Sitemap = solutions.docs.map((solution) => ({
    url: `${BASE_URL}/solutions/${solution.slug}`,
    lastModified: solution.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Published posts (need depth 2 for category pathPrefix)
  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 500,
    sort: '-publishedDate',
    where: { status: { equals: 'published' } },
  })

  const postEntries: MetadataRoute.Sitemap = (posts.docs as Post[]).map((post) => {
    const cats = post.categories
    const primaryCat = Array.isArray(cats) && cats.length > 0 ? cats[0] : null
    const prefix =
      primaryCat && typeof primaryCat === 'object' && primaryCat.pathPrefix
        ? `${primaryCat.pathPrefix}/`
        : ''

    return {
      url: `${BASE_URL}/blog/${prefix}${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }
  })

  return [...staticRoutes, ...pageEntries, ...solutionEntries, ...postEntries]
}
