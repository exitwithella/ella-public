import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { clsx } from 'clsx/lite'
import Image from 'next/image'

import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { isDarkTheme, ThemeSection } from '@/components/elements/theme-section'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { MinusIcon } from '@/components/icons/minus-icon'
import { PlusIcon } from '@/components/icons/plus-icon'
import type { Media, Page } from '@/payload-types'

import { GalleryItem } from './feature-showcase-gallery-item'

// Type is generated after dev server restart; fallback to manual shape until then
type FeatureShowcaseData =
  Extract<NonNullable<Page['layout']>[number], { blockType: 'feature-showcase' }> extends never
    ? {
        blockType: 'feature-showcase'
        id?: string
        sectionId?: string | null
        headerLayout?:
          | 'text-only'
          | 'text-left'
          | 'text-left-even'
          | 'image-left'
          | 'eyebrow-left'
          | null
        textAlign?: 'left' | 'center' | 'right' | null
        sectionLabel?: string | null
        heading?: string | null
        headingFont?: 'display' | 'serif' | null
        headingSize?: 'default' | 'large' | 'small' | null
        body?: SerializedEditorState | null
        link?: {
          label?: string | null
          href?: string | null
          style?: string | null
        } | null
        headerImage?: number | Media | null
        headerImageFit?: 'cover' | 'contain' | 'square' | null
        accordionItems?:
          | {
              id?: string
              question: string
              answer?: SerializedEditorState | null
            }[]
          | null
        galleryColumns?: '3' | '4' | null
        galleryAspect?: 'landscape' | 'portrait' | 'square' | null
        galleryAlign?: 'left' | 'end' | null
        galleryImageRadius?: 'rounded' | 'sharp' | null
        galleryWidth?: 'default' | 'wide' | null
        wideHeader?: boolean | null
        galleryItems?:
          | {
              id?: string
              staticImage: number | Media
              animatedImage?: number | Media | null
              caption?: string | null
              subcaption?: string | null
              bgColor?: string | null
              frameImage?: boolean | null
              anchorTarget?: string | null
            }[]
          | null
        sectionPadding?: 'default' | 'extra' | null
        bgColorOverride?: string | null
        bgStyle?: string | null
      }
    : Extract<NonNullable<Page['layout']>[number], { blockType: 'feature-showcase' }>

interface FeatureShowcaseBlockProps {
  block: FeatureShowcaseData
}

const HEADING_SIZE_CLASS: Record<string, string> = {
  large: 'text-3xl font-semibold',
  default: 'text-2xl font-semibold',
  small: 'text-xl font-semibold',
}

const HEADING_FONT_CLASS: Record<string, string> = {
  display: 'font-display',
  serif: 'font-serif !font-light',
}

function headingClasses(block: { headingFont?: string | null; headingSize?: string | null }) {
  const font = HEADING_FONT_CLASS[block.headingFont ?? 'display'] ?? HEADING_FONT_CLASS.display
  const size = HEADING_SIZE_CLASS[block.headingSize ?? 'default']
  return clsx(font, 'tracking-tight', size)
}

const GALLERY_COL_CLASS: Record<string, string> = {
  '3': 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
  '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

const GALLERY_SIZES: Record<string, string> = {
  '3': '(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw',
  '4': '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw',
}

function HeaderTextContent({ block }: { block: FeatureShowcaseData }) {
  const hasAccordion = block.accordionItems && block.accordionItems.length > 0

  return (
    <>
      {block.sectionLabel && <Eyebrow className="mb-4">{block.sectionLabel}</Eyebrow>}

      {block.heading && <Heading className={headingClasses(block)}>{block.heading}</Heading>}

      {block.body && (
        <div
          className={clsx(
            'prose prose-lg text-theme-text-secondary mt-6 max-w-none',
            isDarkTheme(block.bgStyle) && 'prose-invert',
          )}
        >
          <RichText data={block.body} className="text-sm [&_p]:mb-3 [&_p:last-child]:mb-0" />
        </div>
      )}

      {block.link?.href && block.link?.label && (
        <div className="mt-8">
          {block.link.style === 'button' ? (
            <ButtonLink href={block.link.href} size="lg">
              {block.link.label}
            </ButtonLink>
          ) : (
            <PlainButtonLink href={block.link.href} size="lg">
              {block.link.label} <ArrowNarrowRightIcon />
            </PlainButtonLink>
          )}
        </div>
      )}

      {hasAccordion && (
        <div className="divide-theme-border border-theme-border mt-8 divide-y border-y">
          {block.accordionItems!.map((item) => (
            <details key={item.id} className="group">
              <summary className="text-theme-text flex w-full cursor-pointer list-none items-start justify-between gap-6 py-3 text-left text-sm [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="shrink-0 group-open:hidden">
                  <PlusIcon className="h-lh" />
                </span>
                <span className="hidden shrink-0 group-open:inline">
                  <MinusIcon className="h-lh" />
                </span>
              </summary>
              {item.answer && (
                <div className="prose prose-sm text-theme-text-secondary pr-12 pb-4 text-sm/7 [&_p+p]:mt-3">
                  <RichText data={item.answer} />
                </div>
              )}
            </details>
          ))}
        </div>
      )}
    </>
  )
}

function TextOnlyHeader({ block }: { block: FeatureShowcaseData }) {
  const align = block.textAlign ?? 'left'

  return (
    <div
      className={clsx(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
      )}
    >
      <div
        className={clsx(align === 'left' && 'max-w-3xl', align === 'right' && 'ml-auto max-w-3xl')}
      >
        <HeaderTextContent block={block} />
      </div>
    </div>
  )
}

function SplitHeader({ block }: { block: FeatureShowcaseData }) {
  const imageLeft = block.headerLayout === 'image-left'
  const even = block.headerLayout === 'text-left-even'
  const headerImage = block.headerImage as Media | null
  const sharp = block.galleryImageRadius === 'sharp'
  const fit = block.headerImageFit ?? 'cover'

  const gridClass = imageLeft
    ? 'lg:grid-cols-[2fr_1fr]'
    : even
      ? 'lg:grid-cols-2'
      : 'lg:grid-cols-[1fr_2fr]'

  const imageSizes = even ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 66vw, 100vw'

  return (
    <div className={clsx('mb-12 flex flex-col gap-10 md:mb-16 lg:gap-16', `lg:grid ${gridClass}`)}>
      {/* Text column — always first in DOM for mobile, grid reorders on desktop */}
      <div className={clsx('lg:self-start', imageLeft && 'lg:order-2')}>
        <HeaderTextContent block={block} />
      </div>

      {/* Image column — sticky so it stays in place when accordion opens */}
      <div className={clsx('lg:self-start lg:sticky lg:top-24', imageLeft && 'lg:order-1')}>
        {headerImage?.url ? (
          <div
            className={clsx(
              'relative overflow-hidden',
              fit === 'square' ? 'aspect-square' : 'aspect-[4/3]',
              !sharp && 'rounded-lg',
            )}
          >
            <Image
              src={headerImage.url}
              alt={headerImage.alt ?? block.heading ?? ''}
              fill
              className={fit === 'contain' ? 'object-contain' : 'object-cover'}
              sizes={imageSizes}
            />
          </div>
        ) : (
          <div
            className={clsx(
              'bg-theme-surface flex aspect-video items-center justify-center',
              !sharp && 'rounded-lg',
            )}
            aria-hidden="true"
          >
            <span className="text-theme-text-muted text-sm">Product visual</span>
          </div>
        )}
      </div>
    </div>
  )
}

function EyebrowLeftHeader({ block }: { block: FeatureShowcaseData }) {
  return (
    <div className="mb-12 grid grid-cols-1 gap-6 md:mb-16 lg:grid-cols-[1fr_3fr] lg:items-baseline lg:gap-10">
      <div>{block.sectionLabel && <Eyebrow>{block.sectionLabel}</Eyebrow>}</div>
      <div>
        {block.heading && <Heading className={headingClasses(block)}>{block.heading}</Heading>}
      </div>
    </div>
  )
}

function Gallery({ block }: { block: FeatureShowcaseData }) {
  if (!block.galleryItems || block.galleryItems.length === 0) return null

  const cols = block.galleryColumns ?? '3'
  const colCount = Number(cols)
  const sizes = GALLERY_SIZES[cols] ?? GALLERY_SIZES['3']
  const aspect = block.galleryAspect ?? 'landscape'
  const sharp = block.galleryImageRadius === 'sharp'
  const isWide = block.galleryWidth === 'wide'
  const alignEnd = block.galleryAlign === 'end'

  // When right-aligned with fewer items than columns, offset the first item
  const itemCount = block.galleryItems.length
  const startCol = alignEnd && itemCount < colCount ? colCount - itemCount + 1 : 0
  const firstItemStyle = startCol > 0 ? ({ gridColumnStart: startCol } as const) : undefined

  return (
    <div className={clsx('grid', isWide ? 'gap-4' : 'gap-6', GALLERY_COL_CLASS[cols])}>
      {block.galleryItems.map((item, index) => {
        const staticImage = item.staticImage as Media | null
        const animatedImage = item.animatedImage as Media | null

        if (!staticImage) return null

        return (
          <GalleryItem
            key={item.id}
            staticImage={staticImage}
            animatedImage={animatedImage}
            caption={item.caption}
            subcaption={item.subcaption}
            bgColor={item.bgColor}
            frameImage={item.frameImage}
            anchorTarget={(item as { anchorTarget?: string | null }).anchorTarget}
            sizes={sizes}
            aspect={aspect}
            sharp={sharp}
            style={index === 0 ? firstItemStyle : undefined}
          />
        )
      })}
    </div>
  )
}

const SECTION_PADDING_CLASS: Record<string, string> = {
  default: 'py-20 md:py-28',
  extra: 'py-28 md:py-40',
}

export function FeatureShowcaseBlock({ block }: FeatureShowcaseBlockProps) {
  const layout = block.headerLayout ?? 'text-only'
  const hasHeader = block.sectionLabel || block.heading || block.body
  const isWideGallery = block.galleryWidth === 'wide'
  const isWideHeader = isWideGallery && Boolean(block.wideHeader)
  const paddingClass = SECTION_PADDING_CLASS[block.sectionPadding ?? 'default']
  const bgOverrideStyle = block.bgColorOverride
    ? ({ backgroundColor: block.bgColorOverride } as const)
    : undefined

  return (
    <ThemeSection
      bgStyle={block.bgStyle}
      id={block.sectionId ?? undefined}
      className={paddingClass}
      style={bgOverrideStyle}
    >
      {hasHeader &&
        (isWideHeader ? (
          <div className="mx-auto w-full max-w-[1680px] px-6">
            {layout === 'text-only' && <TextOnlyHeader block={block} />}
            {(layout === 'text-left' || layout === 'text-left-even' || layout === 'image-left') && (
              <SplitHeader block={block} />
            )}
            {layout === 'eyebrow-left' && <EyebrowLeftHeader block={block} />}
          </div>
        ) : (
          <Container>
            {layout === 'text-only' && <TextOnlyHeader block={block} />}
            {(layout === 'text-left' || layout === 'text-left-even' || layout === 'image-left') && (
              <SplitHeader block={block} />
            )}
            {layout === 'eyebrow-left' && <EyebrowLeftHeader block={block} />}
          </Container>
        ))}
      {isWideGallery ? (
        <div className="mx-auto w-full max-w-[1680px] px-6">
          <Gallery block={block} />
        </div>
      ) : (
        <Container>
          <Gallery block={block} />
        </Container>
      )}
    </ThemeSection>
  )
}
