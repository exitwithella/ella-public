/**
 * One-time migration: Framer CMS Blog → Payload CMS Posts
 *
 * Reads from scripts/framer-posts-export.json (exported from exitwithella.io Framer CMS)
 * Converts HTML content to Lexical rich-text format.
 * Creates categories and posts in Payload via the local API.
 *
 * Run: pnpm migrate:framer-posts
 * Safe to re-run — skips posts that already exist by slug.
 */
import 'dotenv/config'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as url from 'node:url'

import { JSDOM } from 'jsdom'
import { getPayload } from 'payload'

import config from '../src/payload.config'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

// ─────────────────────────────────────────────────────────────────────────────
// Lexical node builders
// ─────────────────────────────────────────────────────────────────────────────

const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2
const FORMAT_UNDERLINE = 8

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LexNode = Record<string, any>

function textNode(text: string, format = 0): LexNode {
  return { type: 'text', version: 1, text, format, detail: 0, mode: 'normal', style: '' }
}

function paragraphNode(children: LexNode[]): LexNode {
  return {
    type: 'paragraph',
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    textStyle: '',
    children: children.length ? children : [textNode('')],
  }
}

function headingNode(tag: string, children: LexNode[]): LexNode {
  return {
    type: 'heading',
    tag,
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    children: children.length ? children : [textNode('')],
  }
}

function listNode(listType: 'bullet' | 'number', children: LexNode[]): LexNode {
  return {
    type: 'list',
    listType,
    start: 1,
    tag: listType === 'bullet' ? 'ul' : 'ol',
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    children,
  }
}

function listItemNode(value: number, children: LexNode[]): LexNode {
  return {
    type: 'listitem',
    value,
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    children,
  }
}

function linkNode(href: string, children: LexNode[]): LexNode {
  const isExternal = href.startsWith('http')
  return {
    type: 'link',
    version: 2,
    direction: 'ltr',
    format: '',
    indent: 0,
    fields: {
      doc: null,
      linkType: 'custom',
      newTab: isExternal,
      nofollow: false,
      rel: null,
      url: href,
    },
    children,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// HTML → Lexical conversion
// ─────────────────────────────────────────────────────────────────────────────

function convertInline(node: Node, baseFormat = 0): LexNode[] {
  // Text node
  if (node.nodeType === 3) {
    const text = node.textContent ?? ''
    if (!text) return []
    return [textNode(text, baseFormat)]
  }

  if (node.nodeType !== 1) return []
  const el = node as Element
  const tag = el.tagName.toLowerCase()

  // Accumulate format flags
  let fmt = baseFormat
  if (tag === 'strong' || tag === 'b') fmt |= FORMAT_BOLD
  if (tag === 'em' || tag === 'i') fmt |= FORMAT_ITALIC
  if (tag === 'u') fmt |= FORMAT_UNDERLINE

  // Anchor — wrap children in a link node
  if (tag === 'a') {
    const href = el.getAttribute('href') ?? ''
    const children = Array.from(el.childNodes).flatMap((n) => convertInline(n, fmt))
    if (!children.length || !href) return children
    return [linkNode(href, children)]
  }

  // Recurse into all other inline elements (span, code, etc.)
  return Array.from(el.childNodes).flatMap((n) => convertInline(n, fmt))
}

function convertBlock(el: Element): LexNode[] {
  const tag = el.tagName.toLowerCase()

  // Paragraph
  if (tag === 'p') {
    const text = el.textContent?.trim()
    if (!text) return []
    const children = Array.from(el.childNodes).flatMap((n) => convertInline(n))
    return [paragraphNode(children)]
  }

  // Headings
  if (tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5') {
    const text = el.textContent?.trim()
    if (!text) return []
    const children = Array.from(el.childNodes).flatMap((n) => convertInline(n))
    return [headingNode(tag, children)]
  }

  // Lists
  if (tag === 'ul' || tag === 'ol') {
    const liEls = Array.from(el.children).filter((li) => li.tagName.toLowerCase() === 'li')

    // Detect Framer's heading-as-list pattern:
    // <ol><li data-preset-tag="h2"><h2>...</h2></li></ol>
    // These are styled headings, not actual list items — convert to block nodes.
    const isStyledHeadingList =
      liEls.length > 0 && liEls.every((li) => li.hasAttribute('data-preset-tag'))
    if (isStyledHeadingList) {
      const result: LexNode[] = []
      for (const li of liEls) {
        const innerEl = li.firstElementChild as Element | null
        if (innerEl) {
          result.push(...convertBlock(innerEl))
        } else {
          const inlineChildren = Array.from(li.childNodes).flatMap((n) => convertInline(n))
          if (inlineChildren.length) {
            const presetTag = li.getAttribute('data-preset-tag') ?? 'p'
            if (['h1', 'h2', 'h3', 'h4'].includes(presetTag)) {
              result.push(headingNode(presetTag, inlineChildren))
            } else {
              result.push(paragraphNode(inlineChildren))
            }
          }
        }
      }
      return result
    }

    // Normal list
    const listType = tag === 'ul' ? 'bullet' : 'number'
    let itemIndex = 0

    const items: LexNode[] = liEls
      .map((li) => {
        itemIndex++
        // Collect inline children — block tags inside li are flattened to inline
        const inlineChildren: LexNode[] = []
        for (const child of Array.from(li.childNodes)) {
          if (child.nodeType === 1) {
            const childEl = child as Element
            const childTag = childEl.tagName.toLowerCase()
            if (['h1', 'h2', 'h3', 'h4', 'p'].includes(childTag)) {
              inlineChildren.push(
                ...Array.from(childEl.childNodes).flatMap((n) => convertInline(n)),
              )
            } else {
              inlineChildren.push(...convertInline(child))
            }
          } else {
            inlineChildren.push(...convertInline(child))
          }
        }
        if (!inlineChildren.length) return null
        return listItemNode(itemIndex, inlineChildren)
      })
      .filter(Boolean) as LexNode[]

    if (!items.length) return []
    return [listNode(listType, items)]
  }

  // Blockquote — treat as paragraph (Payload's default editor doesn't have a quote block)
  if (tag === 'blockquote') {
    const text = el.textContent?.trim()
    if (!text) return []
    const children = Array.from(el.childNodes).flatMap((n) => convertInline(n))
    return [paragraphNode(children)]
  }

  // Generic containers — recurse
  if (['div', 'section', 'article', 'figure', 'header', 'footer'].includes(tag)) {
    return Array.from(el.children).flatMap((child) => convertBlock(child))
  }

  return []
}

function htmlToLexical(html: string) {
  const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
  const body = dom.window.document.body

  const children: LexNode[] = []
  for (const el of Array.from(body.children) as Element[]) {
    children.push(...convertBlock(el))
  }

  if (!children.length) {
    children.push(paragraphNode([textNode('')]))
  }

  return {
    root: {
      type: 'root',
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
      children,
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Editorial tier assignment
// ─────────────────────────────────────────────────────────────────────────────

const TIER_MAP: Record<string, 'hero' | 'featured' | 'standard'> = {
  'with-ella': 'hero',
  'why-we-re-building-ella': 'featured',
  'how-ai-is-used-in-advisory-work': 'featured',
  'a-better-way-to-exit-plan': 'featured',
}

// ─────────────────────────────────────────────────────────────────────────────
// Framer category slug → Payload category slug
// ─────────────────────────────────────────────────────────────────────────────

const FRAMER_CAT_TO_PAYLOAD_SLUG: Record<string, string> = {
  'about-ella': 'about-ella',
  'planning-an-exit': 'exit-planning',
  changelog: 'changelog',
  updates: 'updates',
  cms: 'updates', // fold CMS into Updates
  basics: 'exit-planning', // fold Basics into Exit Planning
  'pro-tips': 'exit-planning', // fold Pro Tips into Exit Planning
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

interface FramerPost {
  slug: string
  title: string
  date: string
  categories: string[]
  metaDescription: string
  image: string | null
  content: string
}

async function main() {
  const payload = await getPayload({ config })

  // ── Categories ─────────────────────────────────────────────────────────────
  const newCats = [
    { title: 'About ELLA', slug: 'about-ella', sortOrder: 6 },
    { title: 'Changelog', slug: 'changelog', pathPrefix: 'changelog', sortOrder: 7 },
    { title: 'Updates', slug: 'updates', sortOrder: 8 },
  ]

  const categoryIdMap: Record<string, number> = {}

  for (const cat of newCats) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const created = await payload.create({ collection: 'categories', data: cat as any })
      categoryIdMap[cat.slug] = created.id
      console.log(`✓ Category: ${cat.title}`)
    } else {
      categoryIdMap[cat.slug] = existing.docs[0].id
      console.log(`  Category exists: ${cat.title}`)
    }
  }

  // Also index existing categories
  const existing = await payload.find({ collection: 'categories', limit: 100 })
  for (const cat of existing.docs) {
    if (!categoryIdMap[cat.slug]) {
      categoryIdMap[cat.slug] = cat.id
    }
  }

  // ── Posts ──────────────────────────────────────────────────────────────────
  const dataPath = path.join(__dirname, 'framer-posts-export.json')
  const framerPosts: FramerPost[] = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

  for (const post of framerPosts) {
    const check = await payload.find({
      collection: 'posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
    })

    if (check.docs.length > 0) {
      console.log(`  Post exists — skipping: ${post.title}`)
      continue
    }

    // Resolve category IDs
    const categoryIds = post.categories
      .map((frameCatSlug) => {
        const payloadSlug = FRAMER_CAT_TO_PAYLOAD_SLUG[frameCatSlug]
        return payloadSlug ? categoryIdMap[payloadSlug] : null
      })
      .filter((id): id is number => id != null)

    // Convert content
    const content = post.content ? htmlToLexical(post.content) : null

    // Build post data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {
      title: post.title,
      slug: post.slug,
      status: 'published',
      publishedDate: post.date || new Date().toISOString().slice(0, 10),
      tier: TIER_MAP[post.slug] ?? 'standard',
      excerpt: post.metaDescription?.slice(0, 280) || undefined,
      categories: categoryIds.length ? categoryIds : undefined,
      content,
      showNewsletterCTA: true,
      meta: post.metaDescription
        ? {
            title: `${post.title} — ELLA`,
            description: post.metaDescription,
          }
        : undefined,
    }

    try {
      await payload.create({ collection: 'posts', data })
      console.log(`✓ Post: ${post.title} [${data.tier}]`)
    } catch (err) {
      console.error(`✗ Failed: ${post.title}`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errData = (err as any)?.data
      if (errData) console.error('  Error details:', JSON.stringify(errData, null, 2))
      else console.error('  Error:', err instanceof Error ? err.message : err)
    }
  }

  console.log('\nMigration complete.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
