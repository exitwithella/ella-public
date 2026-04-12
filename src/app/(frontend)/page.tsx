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
      {page.layout?.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  )
}
