import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { CoverImage } from '@/components/elements/cover-image'
import { Heading } from '@/components/elements/heading'
import { ThemeSection } from '@/components/elements/theme-section'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import type { Media, Page } from '@/payload-types'

type CTASectionData = Extract<NonNullable<Page['layout']>[number], { blockType: 'cta-section' }>

interface CTASectionBlockProps {
  block: CTASectionData
}

export function CTASectionBlock({ block }: CTASectionBlockProps) {
  // Body stored as textarea with \n\n paragraph separators
  const paragraphs = block.body ? block.body.split('\n\n').filter((p) => p.trim().length > 0) : []

  const primaryHref = block.primaryCta?.href ?? 'https://app.exitwithella.io/sign-up'
  const primaryLabel = block.primaryCta?.label ?? 'Get Started'
  const secondaryHref =
    block.secondaryCta?.href ?? 'https://cal.com/team/ella/ella-intro?overlayCalendar=true'
  const secondaryLabel = block.secondaryCta?.label ?? 'Book a Demo'

  const coverImg = (block as Record<string, unknown>).coverImage as {
    image?: Media | number | null
    minHeight?: 'sm' | 'md' | 'lg' | null
    objectPosition?: 'top' | 'center' | 'bottom' | null
    overlayOpacity?: '40' | '60' | '80' | null
  } | null
  const hasCover = coverImg?.image && typeof coverImg.image === 'object' && coverImg.image?.url

  const content = (
    <Container>
      <div className="mx-auto max-w-2xl text-center">
        {/* Optional headline */}
        {block.headline && <Heading className="mb-8">{block.headline}</Heading>}

        {/* Manifesto body — DM Sans, multi-paragraph */}
        {paragraphs.length > 0 && (
          <div className="mb-10 space-y-5">
            {paragraphs.map((para, index) => (
              <p key={index} className="text-theme-text-secondary text-lg/relaxed">
                {para}
              </p>
            ))}
          </div>
        )}

        {/* Closing line — Instrument Serif */}
        {block.closingLine && (
          <p className="text-theme-text mb-10 font-serif text-xl/relaxed md:text-3xl/relaxed">
            {block.closingLine}
          </p>
        )}

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <ButtonLink href={primaryHref} size="lg" target="_blank" rel="noopener">
            {primaryLabel}
          </ButtonLink>
          <PlainButtonLink href={secondaryHref} size="lg" target="_blank" rel="noopener">
            {secondaryLabel} <ArrowNarrowRightIcon />
          </PlainButtonLink>
        </div>

        {/* Microcopy */}
        {block.microcopy && <p className="text-theme-text-muted mt-4 text-sm">{block.microcopy}</p>}
      </div>
    </Container>
  )

  return (
    <ThemeSection bgStyle={block.bgStyle} className={hasCover ? '' : 'py-24 md:py-32'}>
      {hasCover ? (
        <CoverImage
          image={coverImg.image as Media}
          minHeight={coverImg.minHeight}
          objectPosition={coverImg.objectPosition}
          overlayOpacity={coverImg.overlayOpacity}
        >
          <div className="py-24 md:py-32">{content}</div>
        </CoverImage>
      ) : (
        content
      )}
    </ThemeSection>
  )
}
