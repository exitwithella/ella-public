import type { Category, Post } from '@/payload-types'

export function getPostUrl(post: Post): string {
  const cats = post.categories
  if (Array.isArray(cats) && cats.length > 0) {
    const primaryCat = cats[0]
    if (typeof primaryCat === 'object' && primaryCat.pathPrefix) {
      return `/blog/${primaryCat.pathPrefix}/${post.slug}`
    }
  }
  return `/blog/${post.slug}`
}

export function getPrimaryCategory(post: Post): Category | null {
  const cats = post.categories
  if (Array.isArray(cats) && cats.length > 0) {
    const first = cats[0]
    if (typeof first === 'object') return first as Category
  }
  return null
}

export function calculateReadingTime(content: Post['content']): number {
  if (!content) return 1

  let wordCount = 0

  function countWords(node: Record<string, unknown>): void {
    if (node.type === 'text' && typeof node.text === 'string') {
      wordCount += node.text.trim().split(/\s+/).filter(Boolean).length
    }
    if (Array.isArray(node.children)) {
      for (const child of node.children as Record<string, unknown>[]) {
        countWords(child)
      }
    }
  }

  countWords(content.root as Record<string, unknown>)
  return Math.max(1, Math.ceil(wordCount / 238))
}

export function formatPublishedDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
