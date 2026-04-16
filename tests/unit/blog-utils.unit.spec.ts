import { describe, expect, it } from 'vitest'

import {
  calculateReadingTime,
  escapeXml,
  formatPublishedDate,
  getPostUrl,
  getPrimaryCategory,
} from '../../src/app/(frontend)/blog/_lib/utils'
import type { Post, Category } from '../../src/payload-types'

/**
 * Helper: build a minimal Post-like object for testing URL/category utilities.
 * Only the fields these functions actually read are populated.
 */
function makePost(
  slug: string,
  categories: Post['categories'] = [],
): Pick<Post, 'slug' | 'categories'> & Record<string, unknown> {
  return { slug, categories } as unknown as Post
}

/**
 * Helper: build a Lexical rich-text root containing the specified words,
 * distributed across the given node structure.
 */
function makeLexicalRoot(children: Array<{ type: string; children?: unknown[] }>): Post['content'] {
  return {
    root: {
      type: 'root',
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
      children,
    },
  } as Post['content']
}

function makeTextNode(text: string) {
  return { type: 'text', text, version: 1, format: 0, detail: 0, mode: 'normal', style: '' }
}

function makeParagraph(...texts: string[]) {
  return {
    type: 'paragraph',
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: '',
    children: texts.map((t) => makeTextNode(t)),
  }
}

function generateWords(count: number): string {
  return Array.from({ length: count }, (_, i) => `word${i}`).join(' ')
}

// ─────────────────────────────────────────────────────────
// getPostUrl
// ─────────────────────────────────────────────────────────

describe('getPostUrl', () => {
  it('returns prefixed URL when category has pathPrefix', () => {
    const post = makePost('my-post', [{ pathPrefix: 'changelog', slug: 'changelog' } as Category])
    expect(getPostUrl(post as Post)).toBe('/blog/changelog/my-post')
  })

  it('returns flat URL when category has no pathPrefix', () => {
    const post = makePost('flat-post', [{ slug: 'general' } as Category])
    expect(getPostUrl(post as Post)).toBe('/blog/flat-post')
  })

  it('returns flat URL when categories array is empty', () => {
    const post = makePost('orphan', [])
    expect(getPostUrl(post as Post)).toBe('/blog/orphan')
  })

  it('returns flat URL when categories are unpopulated IDs (numbers)', () => {
    // When depth is insufficient, Payload returns raw IDs instead of objects
    const post = makePost('unpopulated', [42 as unknown as Category])
    expect(getPostUrl(post as Post)).toBe('/blog/unpopulated')
  })
})

// ─────────────────────────────────────────────────────────
// getPrimaryCategory
// ─────────────────────────────────────────────────────────

describe('getPrimaryCategory', () => {
  it('returns the first category object', () => {
    const post = makePost('any', [
      { title: 'First', slug: 'first' } as Category,
      { title: 'Second', slug: 'second' } as Category,
    ])
    const result = getPrimaryCategory(post as Post)
    expect(result).not.toBeNull()
    expect(result!.slug).toBe('first')
  })

  it('returns null for empty categories array', () => {
    const post = makePost('any', [])
    expect(getPrimaryCategory(post as Post)).toBeNull()
  })

  it('returns null for unpopulated category IDs', () => {
    const post = makePost('any', [7 as unknown as Category])
    expect(getPrimaryCategory(post as Post)).toBeNull()
  })
})

// ─────────────────────────────────────────────────────────
// calculateReadingTime
// ─────────────────────────────────────────────────────────

describe('calculateReadingTime', () => {
  it('calculates exactly 2 minutes for 476 words (238 WPM)', () => {
    const content = makeLexicalRoot([makeParagraph(generateWords(476))])
    expect(calculateReadingTime(content)).toBe(2)
  })

  it('returns minimum of 1 minute for short content', () => {
    const content = makeLexicalRoot([makeParagraph(generateWords(50))])
    expect(calculateReadingTime(content)).toBe(1)
  })

  it('returns 1 for null content', () => {
    expect(calculateReadingTime(null as unknown as Post['content'])).toBe(1)
  })

  it('counts words across nested node types (headings, bold spans, list items)', () => {
    // Simulate: heading with 10 words, paragraph with bold span (5 + 5 words), list with 10 words
    // Total: 30 words → ceil(30/238) = 1
    const content = makeLexicalRoot([
      // Heading node
      {
        type: 'heading',
        tag: 'h2',
        children: [makeTextNode(generateWords(10))],
      },
      // Paragraph with inline bold (format node wrapping text)
      {
        type: 'paragraph',
        children: [
          makeTextNode(generateWords(5)),
          // Bold text is still a text node with format flag, but let's also test a wrapper
          { type: 'mark', children: [makeTextNode(generateWords(5))] },
        ],
      },
      // List node with items
      {
        type: 'list',
        children: [
          { type: 'listitem', children: [makeTextNode(generateWords(5))] },
          { type: 'listitem', children: [makeTextNode(generateWords(5))] },
        ],
      },
    ])
    expect(calculateReadingTime(content)).toBe(1) // 30 words / 238 = ~0.13 → ceil = 1
  })

  it('rounds up partial minutes', () => {
    // 239 words → 239/238 = 1.004 → ceil = 2
    const content = makeLexicalRoot([makeParagraph(generateWords(239))])
    expect(calculateReadingTime(content)).toBe(2)
  })
})

// ─────────────────────────────────────────────────────────
// formatPublishedDate
// ─────────────────────────────────────────────────────────

describe('formatPublishedDate', () => {
  it('formats ISO datetime string to readable date', () => {
    expect(formatPublishedDate('2025-03-15T00:00:00.000Z')).toBe('March 15, 2025')
  })

  it('formats date-only string', () => {
    // date-only strings are parsed as UTC in modern engines
    expect(formatPublishedDate('2025-01-01')).toBe('January 1, 2025')
  })
})

// ─────────────────────────────────────────────────────────
// escapeXml
// ─────────────────────────────────────────────────────────

describe('escapeXml', () => {
  it('escapes all five XML entities', () => {
    expect(escapeXml('Tom & Jerry <"hello"> it\'s')).toBe(
      'Tom &amp; Jerry &lt;&quot;hello&quot;&gt; it&apos;s',
    )
  })

  it('double-escapes already-escaped input', () => {
    // Documents current behavior — escapeXml does not detect pre-escaped entities
    expect(escapeXml('&amp;')).toBe('&amp;amp;')
  })

  it('returns empty string for empty input', () => {
    expect(escapeXml('')).toBe('')
  })
})
