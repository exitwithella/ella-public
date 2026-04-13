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
        headerLayout?: 'text-only' | 'text-left' | 'image-left' | null
        textAlign?: 'left' | 'center' | null
        sectionLabel?: string | null
        heading?: string | null
        headingSize?: 'default' | 'large' | 'small' | null
        body?: SerializedEditorState | null
        link?: { label?: string | null; href?: string | null; style?: string | null } | null
        headerImage?: number | Media | null
        accordionItems?:
          | { id?: string; question: string; answer?: SerializedEditorState | null }[]
          | null
        galleryColumns?: '3' | '4' | null
        galleryItems?:
          | {
              id?: string
              staticImage: number | Media
              animatedImage?: number | Media | null
              caption?: string | null
              subcaption?: string | null
              bgColor?: string | null
            }[]
          | null
        bgStyle?: string | null
      }
    : Extract<NonNullable<Page['layout']>[number], { blockType: 'feature-showcase' }>

interface FeatureShowcaseBlockProps {
  block: FeatureShowcaseData
}

const HEADING_SIZE_CLASS: Record<string, string> = {
  large: 'text-4xl font-semibold md:text-5xl',
  default: 'text-4xl font-bold',
  small: 'text-xl font-semibold md:text-2xl',
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

      {block.heading && (
        <Heading
          className={clsx(
            'font-display tracking-tight',
            HEADING_SIZE_CLASS[block.headingSize ?? 'default'],
          )}
        >
          {block.heading}
        </Heading>
      )}

      {block.body && (
        <div
          className={clsx(
            'prose prose-lg text-theme-text-secondary mt-6 max-w-none',
            isDarkTheme(block.bgStyle) && 'prose-invert',
          )}
        >
          <RichText data={block.body} />
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
              <summary className="text-theme-text flex w-full cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-base/7 font-medium [&::-webkit-details-marker]:hidden">
                {item.question}
                <PlusIcon className="text-theme-text-muted h-lh shrink-0 group-open:hidden" />
                <MinusIcon className="text-theme-text-muted hidden h-lh shrink-0 group-open:block" />
              </summary>
              {item.answer && (
                <div className="text-theme-text-secondary -mt-2 pr-10 pb-5 text-sm/7">
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
  const centered = block.textAlign === 'center'

  return (
    <div className={clsx('mb-12 md:mb-16', centered && 'text-center')}>
      <div className={clsx(!centered && 'max-w-3xl')}>
        <HeaderTextContent block={block} />
      </div>
    </div>
  )
}

function SplitHeader({ block }: { block: FeatureShowcaseData }) {
  const imageLeft = block.headerLayout === 'image-left'
  const headerImage = block.headerImage as Media | null

  return (
    <div
      className={clsx(
        'mb-12 flex flex-col gap-10 md:mb-16 lg:items-center lg:gap-16',
        imageLeft ? 'lg:grid lg:grid-cols-[2fr_1fr]' : 'lg:grid lg:grid-cols-[1fr_2fr]',
      )}
    >
      {/* Text column — always first in DOM for mobile, grid reorders on desktop */}
      <div className={clsx(imageLeft && 'lg:order-2')}>
        <HeaderTextContent block={block} />
      </div>

      {/* Image column */}
      <div className={clsx(imageLeft && 'lg:order-1')}>
        {headerImage?.url ? (
          <div className="overflow-hidden rounded-lg">
            <Image
              src={headerImage.url}
              alt={headerImage.alt ?? block.heading ?? ''}
              width={headerImage.width ?? 1200}
              height={headerImage.height ?? 800}
              className="h-auto w-full object-cover"
              sizes={
                imageLeft ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 66vw, 100vw'
              }
            />
          </div>
        ) : (
          <div
            className="bg-theme-surface flex aspect-video items-center justify-center rounded-lg"
            aria-hidden="true"
          >
            <span className="text-theme-text-muted text-sm">Product visual</span>
          </div>
        )}
      </div>
    </div>
  )
}

function Gallery({ block }: { block: FeatureShowcaseData }) {
  if (!block.galleryItems || block.galleryItems.length === 0) return null

  const cols = block.galleryColumns ?? '3'
  const sizes = GALLERY_SIZES[cols] ?? GALLERY_SIZES['3']

  return (
    <div className={clsx('grid gap-6', GALLERY_COL_CLASS[cols])}>
      {block.galleryItems.map((item) => {
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
            sizes={sizes}
          />
        )
      })}
    </div>
  )
}

export function FeatureShowcaseBlock({ block }: FeatureShowcaseBlockProps) {
  const layout = block.headerLayout ?? 'text-only'
  const hasHeader = block.sectionLabel || block.heading || block.body

  return (
    <ThemeSection
      bgStyle={block.bgStyle}
      id={block.sectionId ?? undefined}
      className="py-20 md:py-28"
    >
      <Container>
        {hasHeader && (
          <>
            {layout === 'text-only' && <TextOnlyHeader block={block} />}
            {(layout === 'text-left' || layout === 'image-left') && <SplitHeader block={block} />}
          </>
        )}
        <Gallery block={block} />
      </Container>
    </ThemeSection>
  )
}
