import { BlockRenderer } from './_components/block-renderer'
import { Hero } from './_components/hero'
import { getHomepage } from './_lib/get-homepage'

export default async function HomePage() {
  const page = await getHomepage()

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
      <Hero hero={page.hero} />
      <div className="bg-sandstone-50 relative z-10">
        {page.layout?.map((block, index) => (
          <div
            key={block.id}
            style={index > 1 ? { contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' } : undefined}
          >
            <BlockRenderer block={block} />
          </div>
        ))}
      </div>
    </>
  )
}
