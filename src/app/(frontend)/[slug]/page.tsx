import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import type { Media } from '@/payload-types'

import { BlockRenderer } from '../_components/block-renderer'
import { MinimalHero } from '../_components/minimal-hero'
import { PageBackground } from '../_components/page-background'
import { SplitHero } from '../_components/split-hero'
import { buildPageMetadata } from '../_lib/build-metadata'
import { getPageBySlug } from '../_lib/get-page'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  if (slug === 'home') return {}
  const page = await getPageBySlug(slug)

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
  const page = await getPageBySlug(slug)

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
