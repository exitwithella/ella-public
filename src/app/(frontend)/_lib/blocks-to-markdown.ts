import type { SerializedEditorState } from 'lexical'

import type { Page, Post } from '@/payload-types'

import { lexicalToMarkdown } from './lexical-to-markdown'

type LayoutBlock = NonNullable<Page['layout']>[number]

function link(label: string | null | undefined, href: string | null | undefined): string {
  if (!label || !href) return ''
  return `[${label}](${href})`
}

function section(label: string | null | undefined): string {
  return label ? `*${label}*\n\n` : ''
}

function serializeBlock(block: LayoutBlock): string {
  switch (block.blockType) {
    case 'content-section': {
      const parts: string[] = []
      if (block.sectionLabel) parts.push(section(block.sectionLabel))
      if (block.heading) parts.push(`## ${block.heading}\n\n`)
      if (block.body) parts.push(lexicalToMarkdown(block.body) + '\n\n')
      const cta = link(block.link?.label, block.link?.href)
      if (cta) parts.push(cta + '\n\n')
      return parts.join('')
    }

    case 'card-grid': {
      const parts: string[] = []
      if (block.sectionLabel) parts.push(section(block.sectionLabel))
      if (block.heading) parts.push(`## ${block.heading}\n\n`)
      if (block.subheading) parts.push(`${block.subheading}\n\n`)
      if (block.cards) {
        for (const card of block.cards) {
          parts.push(`### ${card.heading}\n\n`)
          if (card.body) parts.push(`${card.body}\n\n`)
          if (card.capabilities?.length) {
            for (const cap of card.capabilities) {
              parts.push(`- ${cap.text}\n`)
            }
            parts.push('\n')
          }
          const cta = link(card.link?.label, card.link?.href)
          if (cta) parts.push(cta + '\n\n')
        }
      }
      return parts.join('')
    }

    case 'testimonial-block': {
      const parts: string[] = []
      if (block.heading) parts.push(`## ${block.heading}\n\n`)
      if (block.testimonials) {
        for (const t of block.testimonials) {
          if (typeof t === 'object' && t !== null) {
            const testimonial = t as {
              quote?: string
              name?: string
              title?: string
              company?: string
            }
            if (testimonial.quote) {
              parts.push(`> ${testimonial.quote}\n`)
              const attribution = [testimonial.name, testimonial.title, testimonial.company]
                .filter(Boolean)
                .join(', ')
              if (attribution) parts.push(`> — ${attribution}\n`)
              parts.push('\n')
            }
          }
        }
      }
      return parts.join('')
    }

    case 'cta-section': {
      const parts: string[] = []
      if (block.headline) parts.push(`## ${block.headline}\n\n`)
      if (block.body) parts.push(`${block.body}\n\n`)
      const primary = link(block.primaryCta?.label, block.primaryCta?.href)
      const secondary = link(block.secondaryCta?.label, block.secondaryCta?.href)
      if (primary) parts.push(primary + '\n\n')
      if (secondary) parts.push(secondary + '\n\n')
      if (block.closingLine) parts.push(`*${block.closingLine}*\n\n`)
      return parts.join('')
    }

    case 'credibility-strip': {
      const parts: string[] = []
      if (block.statement) parts.push(`${block.statement}\n\n`)
      if (block.stats) {
        for (const stat of block.stats) {
          parts.push(`- **${stat.value}** ${stat.label}\n`)
        }
        parts.push('\n')
      }
      return parts.join('')
    }

    case 'feature-deep-dive': {
      const parts: string[] = []
      if (block.sectionLabel) parts.push(section(block.sectionLabel))
      if (block.sections) {
        for (const s of block.sections) {
          if (s.heading) parts.push(`### ${s.heading}\n\n`)
          if (s.body) parts.push(lexicalToMarkdown(s.body) + '\n\n')
          const cta = link(s.link?.label, s.link?.href)
          if (cta) parts.push(cta + '\n\n')
        }
      }
      return parts.join('')
    }

    case 'comparison-table': {
      const parts: string[] = []
      if (block.sectionLabel) parts.push(section(block.sectionLabel))
      if (block.heading) parts.push(`## ${block.heading}\n\n`)
      if (block.subheading) parts.push(`${block.subheading}\n\n`)
      if (block.columns?.length && block.rows?.length) {
        const headers = block.columns.map((c) => c.heading ?? '')
        parts.push(`| | ${headers.join(' | ')} |\n`)
        parts.push(`|---|${headers.map(() => '---').join('|')}|\n`)
        for (const row of block.rows) {
          const values =
            row.values?.map((v) => {
              if (v.indicator === 'check') return '\u2713'
              if (v.indicator === 'cross') return '\u2717'
              if (v.indicator === 'partial') return '~'
              return v.text ?? ''
            }) ?? []
          parts.push(`| ${row.label} | ${values.join(' | ')} |\n`)
        }
        parts.push('\n')
      }
      return parts.join('')
    }

    case 'trust-security': {
      const parts: string[] = []
      if (block.heading) parts.push(`## ${block.heading}\n\n`)
      if (block.intro) parts.push(lexicalToMarkdown(block.intro) + '\n\n')
      if (block.sections) {
        for (const s of block.sections) {
          if (s.title) parts.push(`### ${s.title}\n\n`)
          if (s.body) parts.push(`${s.body}\n\n`)
        }
      }
      const cta = link(block.link?.label, block.link?.href)
      if (cta) parts.push(cta + '\n\n')
      return parts.join('')
    }

    case 'numbered-steps': {
      const parts: string[] = []
      if (block.sectionLabel) parts.push(section(block.sectionLabel))
      if (block.heading) parts.push(`## ${block.heading}\n\n`)
      if (block.subheading) parts.push(`${block.subheading}\n\n`)
      if (block.steps) {
        block.steps.forEach((step, i) => {
          parts.push(`${i + 1}. **${step.heading}** — ${step.body ?? ''}\n`)
        })
        parts.push('\n')
      }
      return parts.join('')
    }

    case 'solutions-selector': {
      const parts: string[] = []
      if (block.sectionLabel) parts.push(section(block.sectionLabel))
      if (block.heading) parts.push(`## ${block.heading}\n\n`)
      if (block.subheading) parts.push(`${block.subheading}\n\n`)
      if (block.solutions) {
        for (const sol of block.solutions) {
          if (typeof sol === 'object' && sol !== null) {
            const s = sol as { title?: string; excerpt?: string; slug?: string }
            if (s.title) parts.push(`- **${s.title}**${s.excerpt ? ` — ${s.excerpt}` : ''}\n`)
          }
        }
        parts.push('\n')
      }
      return parts.join('')
    }

    case 'faq-accordion': {
      const parts: string[] = []
      if (block.heading) parts.push(`## ${block.heading}\n\n`)
      if (block.items) {
        for (const item of block.items) {
          if (typeof item === 'object' && item !== null) {
            const faq = item as { question?: string; answer?: unknown }
            if (faq.question) parts.push(`### ${faq.question}\n\n`)
            if (faq.answer)
              parts.push(lexicalToMarkdown(faq.answer as SerializedEditorState) + '\n\n')
          }
        }
      }
      return parts.join('')
    }

    case 'pricing-journey': {
      const parts: string[] = []
      if (block.sectionLabel) parts.push(section(block.sectionLabel))
      if (block.heading) parts.push(`## ${block.heading}\n\n`)
      if (block.subheading) parts.push(`${block.subheading}\n\n`)
      if (block.tiers) {
        for (const tier of block.tiers) {
          if (typeof tier !== 'object' || tier === null) continue
          if (tier.name) parts.push(`### ${tier.name}\n\n`)
          if (tier.tagline) parts.push(`${tier.tagline}\n\n`)
          const price =
            tier.price?.customLabel ??
            (typeof tier.price?.amount === 'number'
              ? `$${(tier.price.amount / 100).toFixed(0)}${tier.price.period ? `/${tier.price.period}` : ''}`
              : null)
          if (price) parts.push(`**${price}**\n\n`)
          if (tier.features?.length) {
            for (const f of tier.features) {
              parts.push(`- ${f.feature}\n`)
            }
            parts.push('\n')
          }
        }
      }
      return parts.join('')
    }

    case 'newsletter-capture': {
      const parts: string[] = []
      if (block.heading) parts.push(`## ${block.heading}\n\n`)
      if (block.subheading) parts.push(`${block.subheading}\n\n`)
      return parts.join('')
    }

    case 'form-embed':
      return ''

    case 'before-after-panel': {
      const parts: string[] = []
      if (block.sectionLabel) parts.push(section(block.sectionLabel))
      if (block.heading) parts.push(`## ${block.heading}\n\n`)
      if (block.subheading) parts.push(`${block.subheading}\n\n`)
      if (block.before) {
        parts.push(`### ${block.before.label ?? 'Before'}\n\n`)
        if (block.before.points) {
          for (const p of block.before.points) {
            parts.push(`- ${p.text}\n`)
          }
          parts.push('\n')
        }
      }
      if (block.after) {
        parts.push(`### ${block.after.label ?? 'After'}\n\n`)
        if (block.after.points) {
          for (const p of block.after.points) {
            parts.push(`- ${p.text}\n`)
          }
          parts.push('\n')
        }
      }
      return parts.join('')
    }

    case 'bridge-section': {
      const parts: string[] = []
      if (block.label) parts.push(section(block.label))
      if (block.heading) parts.push(`## ${block.heading}\n\n`)
      if (block.body) parts.push(lexicalToMarkdown(block.body) + '\n\n')
      if (block.quotes) {
        for (const q of block.quotes) {
          if (q.text) {
            parts.push(`> ${q.text}\n`)
            if (q.attribution) parts.push(`> — ${q.attribution}\n`)
            parts.push('\n')
          }
        }
      }
      if (block.closer) parts.push(`*${block.closer}*\n\n`)
      const cta = link(block.link?.label, block.link?.href)
      if (cta) parts.push(cta + '\n\n')
      return parts.join('')
    }

    case 'product-features': {
      const parts: string[] = []
      if (block.sectionLabel) parts.push(section(block.sectionLabel))
      if (block.heading) parts.push(`## ${block.heading}\n\n`)
      if (block.subheading) parts.push(`${block.subheading}\n\n`)
      if (block.items) {
        for (const item of block.items) {
          if (item.title) parts.push(`### ${item.title}\n\n`)
          if (item.description) parts.push(`${item.description}\n\n`)
          if (item.badges?.length) {
            parts.push(item.badges.map((b) => `\`${b.text}\``).join(' ') + '\n\n')
          }
        }
      }
      return parts.join('')
    }

    case 'squeeze-section': {
      const parts: string[] = []
      if (block.label) parts.push(section(block.label))
      if (block.heading) parts.push(`## ${block.heading}\n\n`)
      if (block.body) parts.push(lexicalToMarkdown(block.body) + '\n\n')
      if (block.pressureItems?.length) {
        parts.push('**Pressures:**\n')
        for (const p of block.pressureItems) {
          parts.push(`- ${p.text}\n`)
        }
        parts.push('\n')
      }
      if (block.erosionItems?.length) {
        parts.push('**Erosion factors:**\n')
        for (const e of block.erosionItems) {
          parts.push(`- ${e.text}\n`)
        }
        parts.push('\n')
      }
      if (block.quotes) {
        for (const q of block.quotes) {
          if (q.text) {
            parts.push(`> ${q.text}\n`)
            if (q.attribution) parts.push(`> — ${q.attribution}\n`)
            parts.push('\n')
          }
        }
      }
      return parts.join('')
    }

    case 'dilemma-section': {
      const parts: string[] = []
      if (block.label) parts.push(section(block.label))
      if (block.heading) {
        const heading = block.headingAccent
          ? `${block.heading} ${block.headingAccent}`
          : block.heading
        parts.push(`## ${heading}\n\n`)
      }
      if (block.body) parts.push(`${block.body}\n\n`)
      if (block.transitionLine1) parts.push(`*${block.transitionLine1}*\n\n`)
      if (block.transitionLine2) parts.push(`*${block.transitionLine2}*\n\n`)
      return parts.join('')
    }

    case 'advisor-personas': {
      const parts: string[] = []
      if (block.sectionLabel) parts.push(section(block.sectionLabel))
      if (block.heading) parts.push(`## ${block.heading}\n\n`)
      if (block.subheading) parts.push(`${block.subheading}\n\n`)
      if (block.personas) {
        for (const persona of block.personas) {
          parts.push(`### ${persona.title}\n\n`)
          if (persona.description) parts.push(`${persona.description}\n\n`)
          if (persona.withElla) parts.push(`**With ELLA:** ${persona.withElla}\n\n`)
        }
      }
      return parts.join('')
    }

    case 'values-grid': {
      const parts: string[] = []
      if (block.heading) parts.push(`## ${block.heading}\n\n`)
      if (block.description) parts.push(`${block.description}\n\n`)
      if (block.items) {
        for (const item of block.items) {
          parts.push(`### ${item.title}\n\n`)
          parts.push(`${item.description}\n\n`)
        }
      }
      return parts.join('')
    }

    case 'feature-showcase': {
      const parts: string[] = []
      if (block.sectionLabel) parts.push(section(block.sectionLabel))
      if (block.heading) parts.push(`## ${block.heading}\n\n`)
      if (block.body) parts.push(lexicalToMarkdown(block.body) + '\n\n')
      const cta = link(block.link?.label, block.link?.href)
      if (cta) parts.push(cta + '\n\n')
      if (block.accordionItems) {
        for (const item of block.accordionItems) {
          if (item.question) parts.push(`### ${item.question}\n\n`)
          if (item.answer) parts.push(lexicalToMarkdown(item.answer) + '\n\n')
        }
      }
      if (block.galleryItems) {
        for (const item of block.galleryItems) {
          if (item.caption)
            parts.push(`- ${item.caption}${item.subcaption ? ` — ${item.subcaption}` : ''}\n`)
        }
        if (block.galleryItems.some((i) => i.caption)) parts.push('\n')
      }
      return parts.join('')
    }

    case 'prompt-anatomy': {
      const parts: string[] = []
      if (block.sectionLabel) parts.push(section(block.sectionLabel))
      if (block.heading) parts.push(`## ${block.heading}\n\n`)
      if (block.description) parts.push(`${block.description}\n\n`)
      if (block.promptText) parts.push(`> *"${block.promptText}"*\n\n`)
      if (block.items) {
        for (const item of block.items) {
          parts.push(`### ${item.heading}\n\n`)
          if (item.body) parts.push(`${item.body}\n\n`)
        }
      }
      return parts.join('')
    }

    default:
      return ''
  }
}

export function heroToMarkdown(hero: Page['hero']): string {
  const parts: string[] = []
  const headline = [hero.headline, hero.headlineLine2].filter(Boolean).join(' ')
  if (headline) parts.push(`# ${headline}\n\n`)
  if (hero.subheadline) parts.push(`${hero.subheadline}\n\n`)
  const primary = link(hero.primaryCta?.label, hero.primaryCta?.href)
  const secondary = link(hero.secondaryCta?.label, hero.secondaryCta?.href)
  if (primary) parts.push(primary + '\n\n')
  if (secondary) parts.push(secondary + '\n\n')
  return parts.join('')
}

export function pageToMarkdown(page: Page): string {
  const parts: string[] = []

  // Page title and meta
  parts.push(`# ${page.title}\n\n`)

  // Hero
  if (page.hero) {
    const heroMd = heroToMarkdown(page.hero)
    // If hero headline differs from title, include it
    if (page.hero.headline && page.hero.headline !== page.title) {
      parts.push(heroMd)
    } else if (page.hero.subheadline) {
      parts.push(`${page.hero.subheadline}\n\n`)
      const primary = link(page.hero.primaryCta?.label, page.hero.primaryCta?.href)
      if (primary) parts.push(primary + '\n\n')
    }
  }

  // Layout blocks
  if (page.layout) {
    for (const block of page.layout) {
      parts.push(serializeBlock(block))
    }
  }

  return parts.join('').trim()
}

export function postToMarkdown(post: Post): string {
  const parts: string[] = []

  parts.push(`# ${post.title}\n\n`)
  if (post.excerpt) parts.push(`*${post.excerpt}*\n\n`)

  if (post.publishedDate) {
    const date = new Date(post.publishedDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    parts.push(`Published: ${date}\n\n`)
  }

  if (post.author && typeof post.author === 'object') {
    const author = post.author as { name?: string }
    if (author.name) parts.push(`Author: ${author.name}\n\n`)
  }

  if (post.content) {
    parts.push(lexicalToMarkdown(post.content) + '\n\n')
  }

  return parts.join('').trim()
}
