import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@/payload.config'

import { BlockRenderer } from '../_components/block-renderer'
import { MinimalHero } from '../_components/minimal-hero'
import { PageBackground } from '../_components/page-background'
import { SplitHero } from '../_components/split-hero'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getPage(slug: string) {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      slug: { equals: slug },
    },
  })

  return pages.docs[0] || null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) return {}

  const meta = page.meta as { title?: string; description?: string; image?: unknown } | undefined

  return {
    title: meta?.title || page.title,
    description: meta?.description,
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
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
