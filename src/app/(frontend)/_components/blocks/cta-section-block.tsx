import { Container } from '@/components/elements/container'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import type { Page } from '@/payload-types'

type CTASectionData = Extract<NonNullable<Page['layout']>[number], { blockType: 'cta-section' }>

interface CTASectionBlockProps {
  block: CTASectionData
}

const BG_CLASS: Record<string, string> = {
  cream: 'bg-ash-50',
  white: 'bg-ash-50',
  'ash-light': 'bg-ash-100',
  'forest-dark': 'bg-moss-900',
}

export function CTASectionBlock({ block }: CTASectionBlockProps) {
  const bg = BG_CLASS[block.bgStyle ?? 'cream'] ?? BG_CLASS.cream
  const isForestDark = block.bgStyle === 'forest-dark'

  // Body stored as textarea with \n\n paragraph separators
  const paragraphs = block.body
    ? block.body.split('\n\n').filter((p) => p.trim().length > 0)
    : []

  const primaryHref = block.primaryCta?.href ?? 'https://app.exitwithella.io/sign-up'
  const primaryLabel = block.primaryCta?.label ?? 'Get Started'
  const secondaryHref =
    block.secondaryCta?.href ?? 'https://cal.com/team/ella/ella-intro?overlayCalendar=true'
  const secondaryLabel = block.secondaryCta?.label ?? 'Book a Demo'

  return (
    <section className={`py-24 md:py-32 ${bg}`}>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {/* Optional headline */}
          {block.headline && (
            <h2
              className={`font-display mb-8 text-2xl font-bold tracking-tight md:text-3xl ${isForestDark ? 'text-ash-50' : 'text-ash-900'}`}
            >
              {block.headline}
            </h2>
          )}

          {/* Manifesto body — DM Sans, multi-paragraph */}
          {paragraphs.length > 0 && (
            <div className="mb-10 space-y-5">
              {paragraphs.map((para, index) => (
                <p
                  key={index}
                  className={`text-lg/relaxed ${isForestDark ? 'text-ash-200' : 'text-ash-700'}`}
                >
                  {para}
                </p>
              ))}
            </div>
          )}

          {/* Closing line — Instrument Serif */}
          {block.closingLine && (
            <p
              className={`font-serif mb-10 text-xl/relaxed md:text-2xl/relaxed ${isForestDark ? 'text-ash-100' : 'text-ash-800'}`}
            >
              {block.closingLine}
            </p>
          )}

          {/* CTAs */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <ButtonLink
              href={primaryHref}
              size="lg"
              target="_blank"
              className={
                isForestDark
                  ? 'bg-ash-50 text-moss-900 hover:bg-ash-100'
                  : undefined
              }
            >
              {primaryLabel}
            </ButtonLink>
            <PlainButtonLink
              href={secondaryHref}
              size="lg"
              target="_blank"
              className={isForestDark ? 'text-ash-200 hover:text-ash-50' : undefined}
            >
              {secondaryLabel} <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>

          {/* Microcopy */}
          {block.microcopy && (
            <p
              className={`mt-4 text-sm ${isForestDark ? 'text-ash-400' : 'text-ash-500'}`}
            >
              {block.microcopy}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}
