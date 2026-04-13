import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@/payload.config'

import { BlockRenderer } from '../_components/block-renderer'

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

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    notFound()
  }

  return (
    <>
      {page.layout?.map((block, index) => (
        <BlockRenderer key={block.id || index} block={block} />
      ))}
    </>
  )
}
