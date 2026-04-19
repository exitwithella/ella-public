import { describe, expect, it } from 'vitest'

import { heroToMarkdown, pageToMarkdown } from '../../src/app/(frontend)/_lib/blocks-to-markdown'
import type { Page } from '../../src/payload-types'

function makeRichText(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', text, format: 0, version: 1 }],
          version: 1,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

describe('heroToMarkdown', () => {
  it('converts hero with headline and subheadline', () => {
    const hero = {
      headline: 'Welcome to ELLA',
      subheadline: 'The platform for advisors',
    } as Page['hero']

    const result = heroToMarkdown(hero)
    expect(result).toContain('# Welcome to ELLA')
    expect(result).toContain('The platform for advisors')
  })

  it('joins headline and headlineLine2', () => {
    const hero = {
      headline: 'Line One',
      headlineLine2: 'Line Two',
    } as Page['hero']

    const result = heroToMarkdown(hero)
    expect(result).toContain('# Line One Line Two')
  })

  it('includes CTA links', () => {
    const hero = {
      headline: 'Title',
      primaryCta: { label: 'Get Started', href: '/signup' },
      secondaryCta: { label: 'Learn More', href: '/about' },
    } as Page['hero']

    const result = heroToMarkdown(hero)
    expect(result).toContain('[Get Started](/signup)')
    expect(result).toContain('[Learn More](/about)')
  })
})

describe('pageToMarkdown', () => {
  it('includes page title', () => {
    const page = {
      title: 'Test Page',
      hero: { headline: 'Test Page' },
      layout: [],
    } as unknown as Page

    const result = pageToMarkdown(page)
    expect(result).toContain('# Test Page')
  })

  it('serializes content-section block', () => {
    const page = {
      title: 'Page',
      hero: { headline: 'Page' },
      layout: [
        {
          blockType: 'content-section' as const,
          sectionLabel: 'About',
          heading: 'Our Story',
          body: makeRichText('We build great things.'),
          link: { label: 'Read more', href: '/about' },
        },
      ],
    } as unknown as Page

    const result = pageToMarkdown(page)
    expect(result).toContain('*About*')
    expect(result).toContain('## Our Story')
    expect(result).toContain('We build great things.')
    expect(result).toContain('[Read more](/about)')
  })

  it('serializes card-grid block', () => {
    const page = {
      title: 'Page',
      hero: { headline: 'Page' },
      layout: [
        {
          blockType: 'card-grid' as const,
          heading: 'Features',
          cards: [
            { heading: 'Card 1', body: 'Description 1' },
            {
              heading: 'Card 2',
              body: 'Description 2',
              capabilities: [{ text: 'Fast' }, { text: 'Secure' }],
            },
          ],
        },
      ],
    } as unknown as Page

    const result = pageToMarkdown(page)
    expect(result).toContain('## Features')
    expect(result).toContain('### Card 1')
    expect(result).toContain('Description 1')
    expect(result).toContain('### Card 2')
    expect(result).toContain('- Fast')
    expect(result).toContain('- Secure')
  })

  it('serializes cta-section block', () => {
    const page = {
      title: 'Page',
      hero: { headline: 'Page' },
      layout: [
        {
          blockType: 'cta-section' as const,
          headline: 'Ready to start?',
          body: 'Join today.',
          primaryCta: { label: 'Sign Up', href: '/signup' },
          closingLine: 'No credit card required',
        },
      ],
    } as unknown as Page

    const result = pageToMarkdown(page)
    expect(result).toContain('## Ready to start?')
    expect(result).toContain('Join today.')
    expect(result).toContain('[Sign Up](/signup)')
    expect(result).toContain('*No credit card required*')
  })

  it('serializes comparison-table block', () => {
    const page = {
      title: 'Page',
      hero: { headline: 'Page' },
      layout: [
        {
          blockType: 'comparison-table' as const,
          heading: 'Compare',
          columns: [{ heading: 'Basic' }, { heading: 'Pro' }],
          rows: [
            {
              label: 'Support',
              values: [
                { text: 'Email', indicator: 'text' },
                { indicator: 'check' },
              ],
            },
          ],
        },
      ],
    } as unknown as Page

    const result = pageToMarkdown(page)
    expect(result).toContain('## Compare')
    expect(result).toContain('| Basic | Pro |')
    expect(result).toContain('| Support | Email | \u2713 |')
  })

  it('serializes numbered-steps block', () => {
    const page = {
      title: 'Page',
      hero: { headline: 'Page' },
      layout: [
        {
          blockType: 'numbered-steps' as const,
          heading: 'How It Works',
          steps: [
            { heading: 'Sign up', body: 'Create your account' },
            { heading: 'Configure', body: 'Set your preferences' },
          ],
        },
      ],
    } as unknown as Page

    const result = pageToMarkdown(page)
    expect(result).toContain('## How It Works')
    expect(result).toContain('1. **Sign up** — Create your account')
    expect(result).toContain('2. **Configure** — Set your preferences')
  })

  it('skips formEmbed blocks', () => {
    const page = {
      title: 'Page',
      hero: { headline: 'Page' },
      layout: [
        {
          blockType: 'formEmbed' as const,
          embedType: 'typeform',
          formId: 'abc123',
        },
      ],
    } as unknown as Page

    const result = pageToMarkdown(page)
    expect(result).not.toContain('typeform')
    expect(result).not.toContain('abc123')
  })
})
