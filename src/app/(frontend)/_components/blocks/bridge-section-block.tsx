import { RichText } from '@payloadcms/richtext-lexical/react'

import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { OptionalCoverSection } from '@/components/elements/optional-cover-section'
import { SmartLink } from '@/components/elements/smart-link'
import type { Page } from '@/payload-types'

type BridgeSectionData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'bridge-section' }
>

interface BridgeSectionBlockProps {
  block: BridgeSectionData
}

const bodyStyleClasses = {
  body: 'text-theme-text-secondary max-w-none [&_p]:mb-5 [&_p]:text-lg [&_p]:md:text-xl',
  feature: 'text-theme-text max-w-none font-serif [&_p]:mb-6 [&_p]:text-xl [&_p]:md:text-2xl',
}

export function BridgeSectionBlock({ block }: BridgeSectionBlockProps) {
  const style = block.bodyStyle === 'feature' ? 'feature' : 'body'

  const content = (
    <Container>
      <div className="mx-auto max-w-3xl">
        {/* Label — eyebrow */}
        {block.label && (
          <span className="text-theme-text-muted mb-4 block text-xs tracking-[0.3em] uppercase md:text-sm">
            {block.label}
          </span>
        )}

        {/* Heading */}
        {block.heading && (
          <Heading
            className={
              (block as Record<string, unknown>).headingStyle === 'serif'
                ? 'mb-8 font-serif text-3xl font-light italic md:text-5xl'
                : 'mb-8 font-bold'
            }
          >
            {block.heading}
          </Heading>
        )}

        {/* Body */}
        {block.body && (
          <div className={bodyStyleClasses[style]}>
            <RichText data={block.body} />
          </div>
        )}

        {/* Quotes — Instrument Serif, stacked */}
        {block.quotes && block.quotes.length > 0 && (
          <div className="mt-10 space-y-8">
            {block.quotes.map((quote) => (
              <blockquote key={quote.id} className="border-moss-400 border-l-2 pl-6">
                <p className="text-theme-text font-serif text-xl md:text-2xl">{quote.text}</p>
                {quote.attribution && (
                  <footer className="text-theme-text-muted mt-3 text-sm font-medium">
                    {quote.attribution}
                  </footer>
                )}
              </blockquote>
            ))}
          </div>
        )}

        {/* Closer — DM Sans medium weight, standalone */}
        {block.closer && (
          <p className="text-theme-text-secondary mt-10 text-base font-medium md:text-lg">
            {block.closer}
          </p>
        )}

        {/* Optional trailing link */}
        {block.link?.href && block.link?.label && (
          <div className="mt-10">
            <SmartLink
              href={block.link.href}
              className="text-moss-700 hover:text-moss-800 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
            >
              {block.link.label}
              <span aria-hidden="true">→</span>
            </SmartLink>
          </div>
        )}
      </div>
    </Container>
  )

  return (
    <OptionalCoverSection
      bgStyle={block.bgStyle}
      coverImage={(block as Record<string, unknown>).coverImage}
      padding="py-20 md:py-28"
    >
      {content}
    </OptionalCoverSection>
  )
}
