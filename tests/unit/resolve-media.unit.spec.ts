import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { BlockMediaFrame } from '@/app/(frontend)/_components/blocks/block-media'
import { resolveMedia } from '@/app/(frontend)/_components/blocks/resolve-media'
import { TestimonialBlockComponent } from '@/app/(frontend)/_components/blocks/testimonial-block-component'
import type { Media, Testimonial } from '@/payload-types'

vi.mock('next/image', () => ({
  default: ({ src, alt, sizes }: { src: string; alt: string; sizes?: string }) =>
    createElement('img', { src, alt, 'data-sizes': sizes }),
}))

function media(overrides: Partial<Media> = {}): Media {
  return {
    id: 1,
    alt: 'Advisor at a desk',
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    url: '/api/media/file/desk.webp',
    ...overrides,
  }
}

describe('resolveMedia', () => {
  it('returns populated media that has a url', () => {
    const value = media()
    expect(resolveMedia(value)).toBe(value)
  })

  it('returns null for an unpopulated upload id', () => {
    expect(resolveMedia(42)).toBeNull()
  })

  it('returns null for null, undefined, and a record without a url', () => {
    expect(resolveMedia(null)).toBeNull()
    expect(resolveMedia(undefined)).toBeNull()
    expect(resolveMedia(media({ url: null }))).toBeNull()
    expect(resolveMedia(media({ url: '' }))).toBeNull()
  })
})

describe('block media rendering', () => {
  it('renders a populated upload and keeps the placeholder when the upload is only an id', () => {
    const populated = renderToStaticMarkup(
      createElement(BlockMediaFrame, {
        media: media({ alt: 'Coverage map' }),
        alt: '  ',
        sizes: '(min-width: 768px) 50vw, 100vw',
        fallback: 'Product visual',
      }),
    )
    expect(populated).toContain('src="/api/media/file/desk.webp"')
    expect(populated).toContain('alt="Coverage map"')
    expect(populated).toContain('data-sizes="(min-width: 768px) 50vw, 100vw"')
    expect(populated).not.toContain('Product visual')

    const missing = renderToStaticMarkup(
      createElement(BlockMediaFrame, {
        media: 7,
        sizes: '(min-width: 1200px) 72rem, 100vw',
        fallback: 'Visual',
      }),
    )
    expect(missing).toContain('Visual')
    expect(missing).not.toContain('<img')
  })

  it('prefers the block alt over the media alt', () => {
    const html = renderToStaticMarkup(
      createElement(BlockMediaFrame, {
        media: media(),
        alt: 'Section diagram',
        sizes: '(min-width: 768px) 50vw, 100vw',
        fallback: 'Product visual',
      }),
    )
    expect(html).toContain('alt="Section diagram"')
  })

  it('renders a grid photo only when the testimonial photo has a url', () => {
    const withPhoto = testimonial({
      photo: media({ alt: 'Kevin', url: '/api/media/file/kevin.webp' }),
    })
    const withoutPhoto = testimonial({ id: 2, photo: null })

    const html = renderToStaticMarkup(
      createElement(TestimonialBlockComponent, {
        block: {
          blockType: 'testimonial-block',
          layout: 'grid',
          bgStyle: 'sandstone',
          testimonials: [withPhoto, withoutPhoto],
        },
      }),
    )

    expect(html).toContain('src="/api/media/file/kevin.webp"')
    expect(html).toContain('sizes="40px"')
    expect(html.match(/<img /g)).toHaveLength(1)
    expect(html).not.toContain('rounded-full" aria-hidden')
  })

  it('does not add a photo circle to the single-quote layout', () => {
    const html = renderToStaticMarkup(
      createElement(TestimonialBlockComponent, {
        block: {
          blockType: 'testimonial-block',
          layout: 'single',
          bgStyle: 'sandstone',
          testimonials: [testimonial({ photo: media() })],
        },
      }),
    )
    expect(html).not.toContain('<img')
  })
})

function testimonial(overrides: Partial<Testimonial> = {}): Testimonial {
  return {
    id: 1,
    quote: 'A concrete result.',
    name: 'Kevin',
    title: 'Advisor',
    company: null,
    photo: null,
    approved: true,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}
