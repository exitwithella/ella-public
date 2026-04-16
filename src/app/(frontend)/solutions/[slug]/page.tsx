import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import type { Media } from '@/payload-types'
import config from '@/payload.config'

import { BlockRenderer } from '../../_components/block-renderer'
import { buildPageMetadata } from '../../_lib/build-metadata'
import { SolutionHero } from './_components/solution-hero'

interface PageProps {
  params: Promise<{ slug: string }>
}

const getSolution = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload({ config })

    const solutions = await payload.find({
      collection: 'solutions',
      depth: 2,
      limit: 1,
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
    })

    return solutions.docs[0] || null
  },
  ['solution-by-slug'],
  { revalidate: 86400, tags: ['solutions'] },
)

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const solution = await getSolution(slug)

  if (!solution) return {}

  return buildPageMetadata({
    title: solution.meta?.title || solution.title,
    description: solution.meta?.description || solution.tagline,
    image: solution.meta?.image as Media | number | null | undefined,
    path: `/solutions/${slug}`,
  })
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params
  const solution = await getSolution(slug)

  if (!solution) {
    notFound()
  }

  return (
    <>
      <SolutionHero hero={solution.hero} title={solution.title} />
      {solution.layout?.map((block, index) => (
        <BlockRenderer key={block.id || index} block={block} />
      ))}
    </>
  )
}
