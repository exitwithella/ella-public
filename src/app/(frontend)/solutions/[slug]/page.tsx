import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import type { Media } from '@/payload-types'

import { BlockRenderer } from '../../_components/block-renderer'
import { buildPageMetadata } from '../../_lib/build-metadata'
import { getSolutionBySlug } from '../../_lib/get-solution'
import { SolutionHero } from './_components/solution-hero'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const solution = await getSolutionBySlug(slug)

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
  const solution = await getSolutionBySlug(slug)

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
