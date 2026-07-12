import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { notFound, redirect } from 'next/navigation'
import { getPayload } from 'payload'

import type { Media } from '@/payload-types'
import config from '@/payload.config'

import { BlockRenderer } from '../_components/block-renderer'
import { MinimalHero } from '../_components/minimal-hero'
import { PageBackground } from '../_components/page-background'
import { SplitHero } from '../_components/split-hero'
import { buildPageMetadata } from '../_lib/build-metadata'

interface PageProps {
  params: Promise<{ slug: string }>
}

const getPage = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload({ config })

    const pages = await payload.find({
      collection: 'pages',
      limit: 1,
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
    })

    return pages.docs[0] || null
  },
  ['page-by-slug'],
  { revalidate: 86400, tags: ['pages'] },
)

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  if (slug === 'home') return {}
  const page = await getPage(slug)

  if (!page) return {}

  const meta = page.meta ?? {}

  return buildPageMetadata({
    title: meta.title || page.title,
    description: meta.description,
    image: meta.image as Media | number | null | undefined,
    path: `/${slug}`,
  })
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  // The homepage lives at `/` — avoid serving a duplicate at `/home`.
  if (slug === 'home') redirect('/')
  const page = await getPage(slug)

  if (!page) {
    notFound()
  }

  const hasPageBackground =
    page.pageBackground &&
    typeof page.pageBackground.image === 'object' &&
    page.pageBackground.image?.url

  return (
    <div className={hasPageBackground ? 'relative' : undefined}>
      {hasPageBackground && <PageBackground data={page.pageBackground} />}
      {page.hero?.style === 'minimal' && <MinimalHero hero={page.hero} />}
      {(page.hero?.style === 'split' || page.hero?.style === 'split-full') && (
        <SplitHero hero={page.hero} variant={page.hero.style} />
      )}
      {page.layout?.map((block, index) => (
        <BlockRenderer key={block.id || index} block={block} />
      ))}
    </div>
  )
}
