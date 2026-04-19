import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import type { Page, Post, Solution } from '@/payload-types'

import { pageToMarkdown, postToMarkdown } from '../../_lib/blocks-to-markdown'

export const dynamic = 'force-dynamic'

// ─── Data fetchers ──────────────────────────────────────────────

const getPage = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'pages',
      depth: 2,
      limit: 1,
      where: { slug: { equals: slug } },
    })
    return (result.docs[0] ?? null) as Page | null
  },
  ['md-page-by-slug'],
  { revalidate: 86400, tags: ['pages'] },
)

const getPostBySlug = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'posts',
      depth: 2,
      limit: 1,
      where: { slug: { equals: slug }, status: { equals: 'published' } },
    })
    return (result.docs[0] ?? null) as Post | null
  },
  ['md-post-by-slug'],
  { revalidate: 86400, tags: ['posts'] },
)

const getSolution = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'solutions',
      depth: 2,
      limit: 1,
      where: { slug: { equals: slug }, status: { equals: 'published' } },
    })
    return (result.docs[0] ?? null) as Solution | null
  },
  ['md-solution-by-slug'],
  { revalidate: 86400, tags: ['solutions'] },
)

// ─── Route handler ──────────────────────────────────────────────

interface RouteContext {
  params: Promise<{ slug?: string[] }>
}

export async function GET(_request: Request, ctx: RouteContext) {
  const { slug: segments } = await ctx.params

  let markdown: string | null = null

  if (!segments || segments.length === 0 || (segments.length === 1 && segments[0] === 'home')) {
    // Homepage: /md, /md/, or /md/home (via root proxy rewrite)
    const page = await getPage('home')
    if (page) markdown = pageToMarkdown(page)
  } else if (segments[0] === 'blog' && segments.length >= 2) {
    // Blog post: /md/blog/[category/]slug
    const postSlug = segments[segments.length - 1]
    const post = await getPostBySlug(postSlug)
    if (post) markdown = postToMarkdown(post)
  } else if (segments[0] === 'solutions' && segments.length === 2) {
    // Solution: /md/solutions/slug
    const solution = await getSolution(segments[1])
    if (solution) {
      const parts: string[] = []
      parts.push(`# ${solution.title}\n\n`)
      if (solution.tagline) parts.push(`*${solution.tagline}*\n\n`)
      if (solution.hero) {
        if (solution.hero.subheadline) parts.push(`${solution.hero.subheadline}\n\n`)
      }
      // Solution has same layout blocks structure
      if (solution.layout) {
        const fakePage = {
          title: solution.title,
          hero: solution.hero,
          layout: solution.layout,
        } as Page
        const full = pageToMarkdown(fakePage)
        // Skip the duplicate title line
        const lines = full.split('\n')
        if (lines[0]?.startsWith('# ')) lines.shift()
        parts.push(lines.join('\n').trim())
      }
      markdown = parts.join('').trim()
    }
  } else if (segments[0] === 'pricing') {
    // Pricing page
    const page = await getPage('pricing')
    if (page) markdown = pageToMarkdown(page)
  } else if (segments.length === 1) {
    // Generic page: /md/slug
    const page = await getPage(segments[0])
    if (page) markdown = pageToMarkdown(page)
  }

  if (!markdown) {
    return new Response(null, { status: 404 })
  }

  const tokenEstimate = Math.ceil(markdown.length / 4)

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
      'x-markdown-tokens': String(tokenEstimate),
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
