import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import type { Page } from '@/payload-types'

type CardGridData = Extract<NonNullable<Page['layout']>[number], { blockType: 'card-grid' }>

interface CardGridBlockProps {
  block: CardGridData
}

const BG_CLASS: Record<string, string> = {
  cream: 'bg-ash-50',
  white: 'bg-ash-50',
  'ash-light': 'bg-ash-100',
  'forest-dark': 'bg-moss-900',
}

const COLUMN_CLASS: Record<string, string> = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-3',
  '4': 'sm:grid-cols-2 lg:grid-cols-4',
}

export function CardGridBlock({ block }: CardGridBlockProps) {
  const bg = BG_CLASS[block.bgStyle ?? 'cream'] ?? BG_CLASS.cream
  const isForestDark = block.bgStyle === 'forest-dark'
  const colClass = COLUMN_CLASS[block.columns ?? '3'] ?? COLUMN_CLASS['3']

  return (
    <section className={`py-20 md:py-28 ${bg}`}>
      <Container>
        {/* Section header */}
        {(block.sectionLabel || block.heading) && (
          <div className="mb-12 md:mb-16">
            {block.sectionLabel && (
              <Eyebrow color={isForestDark ? 'light' : 'moss'} className="mb-3">
                {block.sectionLabel}
              </Eyebrow>
            )}
            {block.heading && (
              <Heading color={isForestDark ? 'cream' : 'dark'}>{block.heading}</Heading>
            )}
            {block.subheading && (
              <p
                className={`mt-4 max-w-2xl text-lg/relaxed ${isForestDark ? 'text-ash-300' : 'text-ash-600'}`}
              >
                {block.subheading}
              </p>
            )}
          </div>
        )}

        {/* Card grid */}
        {block.cards && block.cards.length > 0 && (
          <div className={`grid grid-cols-1 gap-8 md:gap-10 ${colClass}`}>
            {block.cards.map((card) => (
              <div
                key={card.id}
                id={card.anchorTarget ?? undefined}
                className={`rounded-sm border p-8 md:p-10 ${isForestDark ? 'border-moss-700 bg-moss-800' : 'border-ash-200 bg-ash-100'}`}
              >
                {/* Card heading — Termina */}
                <h3
                  className={`font-display mb-3 text-sm font-semibold tracking-wider uppercase ${isForestDark ? 'text-moss-300' : 'text-moss-700'}`}
                >
                  {card.heading}
                </h3>

                {/* Card body — DM Sans */}
                {card.body && (
                  <p
                    className={`text-base/relaxed ${isForestDark ? 'text-ash-200' : 'text-ash-700'}`}
                  >
                    {card.body}
                  </p>
                )}

                {/* Capabilities list */}
                {card.capabilities && card.capabilities.length > 0 && (
                  <ul className="mt-6 space-y-2">
                    {card.capabilities.map((cap) => (
                      <li
                        key={cap.id}
                        className={`flex items-start gap-2 text-sm ${isForestDark ? 'text-ash-300' : 'text-ash-600'}`}
                      >
                        <span
                          className={`mt-0.5 shrink-0 text-base leading-none ${isForestDark ? 'text-moss-400' : 'text-moss-600'}`}
                          aria-hidden="true"
                        >
                          →
                        </span>
                        {cap.text}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Card link */}
                {card.link?.href && card.link?.label && (
                  <a
                    href={card.link.href}
                    className={`mt-6 inline-flex items-center gap-1 text-sm font-semibold ${isForestDark ? 'text-moss-300 hover:text-moss-200' : 'text-moss-700 hover:text-moss-800'}`}
                  >
                    {card.link.label} <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
