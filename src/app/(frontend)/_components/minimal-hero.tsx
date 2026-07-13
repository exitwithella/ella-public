import { Container } from '@/components/elements/container'
import type { Page } from '@/payload-types'

import { EllaLogoMark } from '../_assets/logo'
import { fetchSvgContent } from '../_lib/svg'
import { CmsImage, HeroHeadline, HeroText } from './hero-shared'

interface MinimalHeroProps {
  hero: Page['hero']
}

export async function MinimalHero({ hero }: MinimalHeroProps) {
  const showLogoWatermark = (hero as { showLogoWatermark?: boolean }).showLogoWatermark
  const visual = typeof hero.visual === 'object' && hero.visual?.url ? hero.visual : null
  const isSvg = visual?.mimeType === 'image/svg+xml'
  const svgContent = isSvg && visual.url ? await fetchSvgContent(visual.filename, visual.url) : null

  const heroExt = hero as {
    visualFit?: string | null
    visualPosition?: string | null
  }
  const fitMode = heroExt.visualFit ?? 'contain'
  const isCropped = fitMode === 'crop' || fitMode === 'square'
  const objectPosition = heroExt.visualPosition ?? 'center'

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {showLogoWatermark && (
        <div className="pointer-events-none absolute top-1/2 -right-20 -translate-y-1/2 opacity-[0.03] sm:-right-10 md:right-0 lg:right-10">
          <EllaLogoMark className="h-[400px] w-auto sm:h-[500px] md:h-[600px] lg:h-[700px]" />
        </div>
      )}
      <Container className="relative">
        {visual?.url ? (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16">
            <div className="flex flex-col justify-center">
              <HeroHeadline>{hero.headline}</HeroHeadline>
              {hero.subheadline && (
                <HeroText className="mt-6 max-w-xl">{hero.subheadline}</HeroText>
              )}
            </div>
            <div
              className={
                isCropped
                  ? `relative overflow-hidden rounded-lg ${fitMode === 'square' ? 'aspect-square' : 'min-h-[300px] sm:min-h-[400px]'}`
                  : 'relative flex min-h-[300px] items-center sm:min-h-[400px]'
              }
            >
              {svgContent ? (
                <div
                  className="w-full [&_svg]:h-auto [&_svg]:w-full"
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                />
              ) : (
                <CmsImage
                  src={visual.url}
                  alt={visual.alt ?? ''}
                  isCropped={isCropped}
                  positionStyle={{ objectPosition }}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                  croppedClassName="rounded-lg object-cover"
                  intrinsicClassName="h-auto w-full rounded-lg"
                  width={visual.width}
                  height={visual.height}
                  fallbackWidth={600}
                  fallbackHeight={400}
                />
              )}
            </div>
          </div>
        ) : (
          <>
            <HeroHeadline className="max-w-3xl">{hero.headline}</HeroHeadline>
            {hero.subheadline && <HeroText className="mt-6 max-w-xl">{hero.subheadline}</HeroText>}
          </>
        )}
      </Container>
    </section>
  )
}
