import type { Metadata } from 'next'

import type { Media } from '@/payload-types'

import { BlockRenderer } from './_components/block-renderer'
import { Hero } from './_components/hero'
import { JsonLd } from './_components/json-ld'
import { buildPageMetadata } from './_lib/build-metadata'
import { getHomepage } from './_lib/get-homepage'
import { getSiteSettings } from './_lib/get-site-settings'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomepage()
  const meta = page?.meta ?? {}

  return buildPageMetadata({
    title: meta.title,
    description: meta.description,
    image: meta.image as Media | number | null | undefined,
    path: '/',
    titleAbsolute: true,
  })
}

export default async function HomePage() {
  const [page, settings] = await Promise.all([getHomepage(), getSiteSettings()])

  // Fallback while CMS has no homepage document yet
  if (!page) {
    return (
      <p className="text-ash-1000 py-32 text-center text-sm">
        Homepage not found. Run <code>pnpm seed</code> to populate content.
      </p>
    )
  }

  return (
    <>
      <JsonLd variant="website" settings={settings} />
      <Hero hero={page.hero} />
      <div className="bg-sandstone-50 relative z-10">
        {page.layout?.map((block, index) => (
          <div
            key={block.id}
            style={
              index > 1
                ? { contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }
                : undefined
            }
          >
            <BlockRenderer block={block} />
          </div>
        ))}
      </div>
    </>
  )
}
