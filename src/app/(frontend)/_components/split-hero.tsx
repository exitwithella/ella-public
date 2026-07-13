import Image from 'next/image'

import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Wallpaper, type WallpaperColor } from '@/components/elements/wallpaper'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import type { Page } from '@/payload-types'

import { AdaptiveRadiusImage } from './adaptive-radius-image'
import { CmsImage, HeroHeadline, HeroText } from './hero-shared'

interface SplitHeroProps {
  hero: Page['hero']
  variant: 'split' | 'split-full'
}

const OBJECT_POSITION_STYLES: Record<string, React.CSSProperties> = {
  center: { objectPosition: 'center' },
  top: { objectPosition: 'top' },
  bottom: { objectPosition: 'bottom' },
  left: { objectPosition: 'left' },
  right: { objectPosition: 'right' },
  'top left': { objectPosition: 'top left' },
  'top right': { objectPosition: 'top right' },
  'bottom left': { objectPosition: 'bottom left' },
  'bottom right': { objectPosition: 'bottom right' },
}

const FONT_CLASSES: Record<string, string> = {
  display: 'font-display',
  sans: 'font-sans',
  serif: 'font-serif',
  data: 'font-data',
}

function resolveHeadlineFont(hero: Page['hero']) {
  const font = (hero as { headlineFont?: string | null }).headlineFont ?? 'display'
  return FONT_CLASSES[font] ?? FONT_CLASSES.display
}

function resolveVisual(hero: Page['hero']) {
  const visual = typeof hero.visual === 'object' && hero.visual?.url ? hero.visual : null
  const ext = hero as { visualFit?: string | null; visualPosition?: string | null }
  const pos = ext.visualPosition ?? 'center'
  return {
    visual,
    fitMode: ext.visualFit ?? 'contain',
    positionStyle: OBJECT_POSITION_STYLES[pos] ?? OBJECT_POSITION_STYLES.center,
  }
}

function HeroCtas({ hero, light }: { hero: Page['hero']; light?: boolean }) {
  const primaryHref = hero.primaryCta?.href
  const primaryLabel = hero.primaryCta?.label
  const secondaryHref = hero.secondaryCta?.href
  const secondaryLabel = hero.secondaryCta?.label
  const color = light ? 'light' : undefined

  if (!primaryHref && !secondaryHref) return null

  return (
    <div className="flex flex-wrap items-center gap-4">
      {primaryHref && primaryLabel && (
        <ButtonLink href={primaryHref} size="lg" color={color}>
          {primaryLabel}
        </ButtonLink>
      )}
      {secondaryHref && secondaryLabel && (
        <PlainButtonLink href={secondaryHref} size="lg" color={color}>
          {secondaryLabel} <ArrowNarrowRightIcon />
        </PlainButtonLink>
      )}
    </div>
  )
}

/**
 * Split variant — adapted from Oatmeal homepage-02.
 * Text left within the container, image overflows to the right viewport edge.
 * When heroWallpaper is enabled, wraps in a textured gradient background with light text.
 */
function SplitOverflow({ hero }: { hero: Page['hero'] }) {
  const { visual, fitMode, positionStyle } = resolveVisual(hero)
  const isCropped = fitMode === 'crop' || fitMode === 'square'
  const hasWallpaper = Boolean(hero.heroWallpaper)
  const wallpaperColor = (hero.heroWallpaperColor ?? 'green') as WallpaperColor
  const fontClass = resolveHeadlineFont(hero)

  const heroImage = visual?.url && (
    <CmsImage
      src={visual.url}
      alt={visual.alt ?? ''}
      isCropped={isCropped}
      positionStyle={positionStyle}
      sizes="(min-width: 1024px) 60vw, 100vw"
      priority
      intrinsicClassName="h-full w-auto max-w-none"
      width={visual.width}
      height={visual.height}
      fallbackWidth={1200}
      fallbackHeight={800}
    />
  )

  const imageColumn = visual?.url && (
    <div className="pt-8 sm:pt-12 lg:pt-24">
      <div className="relative h-72 sm:h-92 md:h-[500px] lg:size-full">
        <AdaptiveRadiusImage>{heroImage}</AdaptiveRadiusImage>
      </div>
    </div>
  )

  const content = (
    <div className="-mx-2 sm:px-6 md:px-12 lg:px-0">
      <Container>
        <div className="flex gap-x-12 gap-y-12 max-lg:flex-col sm:gap-y-24 lg:min-h-[600px]">
          <div className="flex shrink-0 flex-col items-start gap-6 pt-16 sm:pt-32 lg:basis-md lg:py-40 xl:basis-lg">
            <HeroHeadline
              fontClass={fontClass}
              color={hasWallpaper ? 'text-white' : 'text-ash-950'}
            >
              {hero.headline}
            </HeroHeadline>
            {hero.subheadline && (
              <HeroText
                color={hasWallpaper ? 'text-white/70' : 'text-ash-600'}
                className="max-w-xl"
              >
                {hero.subheadline}
              </HeroText>
            )}
            <HeroCtas hero={hero} light={hasWallpaper} />
          </div>
          {imageColumn}
        </div>
      </Container>
    </div>
  )

  if (hasWallpaper) {
    return (
      <section className="px-2 pb-16">
        <Wallpaper className="rounded-lg" color={wallpaperColor} data-clip-boundary>
          {content}
        </Wallpaper>
      </section>
    )
  }

  return (
    <section className="overflow-hidden py-20 md:py-28 lg:py-36">
      <Container>
        <div className="flex gap-x-12 gap-y-12 max-lg:flex-col lg:min-h-[600px] lg:items-center">
          <div className="flex shrink-0 flex-col items-start gap-6 lg:basis-md xl:basis-lg">
            <HeroHeadline fontClass={fontClass}>{hero.headline}</HeroHeadline>
            {hero.subheadline && <HeroText className="max-w-xl">{hero.subheadline}</HeroText>}
            <HeroCtas hero={hero} />
          </div>
          {visual?.url && (
            <div className="lg:pt-4">
              <div className="relative h-72 sm:h-92 md:h-[500px] lg:size-full">
                <div className="absolute inset-y-0 left-0 flex w-screen overflow-hidden max-lg:rounded-lg lg:rounded-l-lg">
                  {heroImage}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

/**
 * Split Full variant — Legora-inspired.
 * True 50/50 grid. Left: text content with generous whitespace. Right: edge-to-edge image.
 */
function SplitFull({ hero }: { hero: Page['hero'] }) {
  const { visual, positionStyle } = resolveVisual(hero)
  const fontClass = resolveHeadlineFont(hero)

  return (
    <section className="lg:grid lg:min-h-[85vh] lg:grid-cols-2">
      {/* Text column */}
      <div className="flex flex-col justify-end gap-6 px-6 py-20 md:px-12 md:py-28 lg:py-36 lg:pr-16 xl:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
        <HeroHeadline fontClass={fontClass}>{hero.headline}</HeroHeadline>
        {hero.subheadline && <HeroText className="max-w-md">{hero.subheadline}</HeroText>}
        <HeroCtas hero={hero} />
      </div>

      {/* Image column — square with inset border, clips non-square media */}
      {visual?.url && (
        <div className="p-2 lg:p-3">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={visual.url}
              alt={visual.alt ?? ''}
              fill
              className="object-cover"
              style={positionStyle}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>
      )}
    </section>
  )
}

export function SplitHero({ hero, variant }: SplitHeroProps) {
  if (variant === 'split-full') {
    return <SplitFull hero={hero} />
  }
  return <SplitOverflow hero={hero} />
}
