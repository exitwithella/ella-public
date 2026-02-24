import { RichText } from '@payloadcms/richtext-lexical/react'

import { Container } from '@/components/elements/container'
import type { Page } from '@/payload-types'

type BridgeSectionData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'bridge-section' }
>

interface BridgeSectionBlockProps {
  block: BridgeSectionData
}

const BG_CLASS: Record<string, string> = {
  cream: 'bg-ash-50',
  'ash-light': 'bg-ash-100',
  'forest-dark': 'bg-moss-900',
}

export function BridgeSectionBlock({ block }: BridgeSectionBlockProps) {
  const bg = BG_CLASS[block.bgStyle ?? 'ash-light'] ?? BG_CLASS['ash-light']
  const isForestDark = block.bgStyle === 'forest-dark'

  return (
    <section className={`py-20 md:py-28 ${bg}`}>
      <Container>
        <div className="mx-auto max-w-2xl">
          {/* Heading — Termina */}
          <h2
            className={`font-display mb-8 text-2xl font-bold tracking-tight md:text-3xl ${isForestDark ? 'text-ash-50' : 'text-ash-900'}`}
          >
            {block.heading}
          </h2>

          {/* Body — DM Sans richText */}
          {block.body && (
            <div
              className={`prose prose-lg max-w-none [&_p]:mb-5 [&_p]:leading-relaxed ${isForestDark ? 'prose-invert' : ''}`}
            >
              <RichText data={block.body} />
            </div>
          )}

          {/* Quotes — Instrument Serif, stacked */}
          {block.quotes && block.quotes.length > 0 && (
            <div className="mt-10 space-y-8">
              {block.quotes.map((quote) => (
                <blockquote key={quote.id} className="border-moss-400 border-l-2 pl-6">
                  <p
                    className={`font-serif text-xl/relaxed md:text-2xl/relaxed ${isForestDark ? 'text-ash-100' : 'text-ash-800'}`}
                  >
                    {quote.text}
                  </p>
                  {quote.attribution && (
                    <footer
                      className={`mt-3 text-sm font-medium ${isForestDark ? 'text-ash-400' : 'text-ash-500'}`}
                    >
                      {quote.attribution}
                    </footer>
                  )}
                </blockquote>
              ))}
            </div>
          )}

          {/* Closer — DM Sans medium weight, standalone */}
          {block.closer && (
            <p
              className={`mt-10 text-base font-medium md:text-lg ${isForestDark ? 'text-ash-200' : 'text-ash-700'}`}
            >
              {block.closer}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}
