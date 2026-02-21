import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Main } from '@/components/elements/main'
import { Navbar } from '../_components/navbar'
import { Footer } from '../_components/footer'
import { BlockRenderer } from '../_components/block-renderer'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getPage(slug: string) {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  return pages.docs[0] || null
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
  })

  return pages.docs.map((page) => ({
    slug: page.slug,
  }))
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <Main>
        {page.layout?.map((block, index) => (
          <BlockRenderer key={block.id || index} block={block} />
        ))}
      </Main>
      <Footer />
    </>
  )
}
