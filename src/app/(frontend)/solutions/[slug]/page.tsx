import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@/payload.config'

import { BlockRenderer } from '../../_components/block-renderer'
import { SolutionHero } from './_components/solution-hero'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getSolution(slug: string) {
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
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const solutions = await payload.find({
    collection: 'solutions',
    limit: 100,
    where: {
      status: { equals: 'published' },
    },
  })

  return solutions.docs.map((solution) => ({
    slug: solution.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const solution = await getSolution(slug)

  if (!solution) return {}

  const title = solution.meta?.title ?? `${solution.title} — ELLA`
  const description = solution.meta?.description ?? solution.tagline ?? undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://withella.io/solutions/${slug}`,
    },
  }
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
