import { RichText } from '@payloadcms/richtext-lexical/react'

import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import type { Page, Solution } from '@/payload-types'

type ContentSectionData =
  | Extract<NonNullable<Page['layout']>[number], { blockType: 'content-section' }>
  | Extract<NonNullable<Solution['layout']>[number], { blockType: 'content-section' }>

interface ContentSectionBlockProps {
  block: ContentSectionData
}

const BG_CLASS: Record<string, string> = {
  cream: 'bg-ash-50',
  white: 'bg-ash-50',
  'ash-light': 'bg-ash-100',
  'forest-dark': 'bg-moss-900',
}

export function ContentSectionBlock({ block }: ContentSectionBlockProps) {
  const bg = BG_CLASS[block.bgStyle ?? 'cream'] ?? BG_CLASS.cream
  const isForestDark = block.bgStyle === 'forest-dark'
  const mediaPos = block.mediaPosition ?? 'none'
  const hasMedia = mediaPos !== 'none' && block.media
  const isTwoColumn = hasMedia && (mediaPos === 'left' || mediaPos === 'right')

  return (
    <section className={`py-20 md:py-28 ${bg}`}>
      <Container>
        {/* Badge */}
        {block.badge && (
          <span
            className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${
              isForestDark ? 'bg-moss-800 text-moss-300' : 'bg-moss-100 text-moss-700'
            }`}
          >
            {block.badge}
          </span>
        )}

        {/* Section label */}
        {block.sectionLabel && (
          <Eyebrow color={isForestDark ? 'light' : 'moss'} className="mb-4">
            {block.sectionLabel}
          </Eyebrow>
        )}

        {/* Full-width media above */}
        {hasMedia && mediaPos === 'top' && (
          <div className="bg-ash-200 mb-10 flex aspect-video items-center justify-center rounded-sm">
            <span className="text-ash-400 text-sm">Visual</span>
          </div>
        )}

        {/* Content layout */}
        <div
          className={
            isTwoColumn
              ? `flex flex-col gap-10 md:flex-row md:items-start md:gap-16 ${mediaPos === 'left' ? 'md:flex-row-reverse' : ''}`
              : ''
          }
        >
          {/* Text column */}
          <div className={isTwoColumn ? 'flex-1' : 'max-w-[680px]'}>
            {block.heading && (
              <Heading color={isForestDark ? 'cream' : 'dark'}>{block.heading}</Heading>
            )}

            {block.body && (
              <div
                className={`prose prose-lg mt-6 max-w-none ${
                  isForestDark ? 'prose-invert text-ash-200' : 'text-ash-700'
                }`}
              >
                <RichText data={block.body} />
              </div>
            )}

            {/* Link */}
            {block.link?.href && block.link?.label && (
              <div className="mt-8">
                {block.link.style === 'button' ? (
                  <ButtonLink
                    href={block.link.href}
                    size="lg"
                    className={
                      isForestDark ? 'bg-ash-50 text-moss-900 hover:bg-ash-100' : undefined
                    }
                  >
                    {block.link.label}
                  </ButtonLink>
                ) : (
                  <PlainButtonLink
                    href={block.link.href}
                    size="lg"
                    className={isForestDark ? 'text-ash-200 hover:text-ash-50' : undefined}
                  >
                    {block.link.label} <ArrowNarrowRightIcon />
                  </PlainButtonLink>
                )}
              </div>
            )}
          </div>

          {/* Media column (two-column mode) */}
          {isTwoColumn && (
            <div className="flex-1">
              <div className="bg-ash-200 flex aspect-video items-center justify-center rounded-sm">
                <span className="text-ash-400 text-sm">Visual</span>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
