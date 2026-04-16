import Image from 'next/image'

import { Container } from '@/components/elements/container'
import type { Page } from '@/payload-types'

import { EllaLogoMark } from '../_assets/logo'
import { fetchSvgContent } from '../_lib/svg'

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
              <h1 className="font-display text-ash-950 text-3xl font-semibold tracking-tight text-balance md:text-4xl xl:text-5xl">
                {hero.headline}
              </h1>
              {hero.subheadline && (
                <p className="text-ash-600 mt-6 max-w-xl text-lg/relaxed">{hero.subheadline}</p>
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
              ) : isCropped ? (
                <Image
                  src={visual.url}
                  alt={visual.alt ?? ''}
                  fill
                  className="rounded-lg object-cover"
                  style={{ objectPosition }}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />
              ) : (
                <Image
                  src={visual.url}
                  alt={visual.alt ?? ''}
                  width={visual.width ?? 600}
                  height={visual.height ?? 400}
                  className="h-auto w-full rounded-lg"
                  priority
                />
              )}
            </div>
          </div>
        ) : (
          <>
            <h1 className="font-display text-ash-950 max-w-3xl text-3xl font-semibold tracking-tight text-balance md:text-4xl xl:text-5xl">
              {hero.headline}
            </h1>
            {hero.subheadline && (
              <p className="text-ash-600 mt-6 max-w-xl text-lg/relaxed">{hero.subheadline}</p>
            )}
          </>
        )}
      </Container>
    </section>
  )
}
