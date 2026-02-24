import { Container } from '@/components/elements/container'
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
              <p
                className={`mb-3 text-xs font-semibold tracking-widest uppercase ${isForestDark ? 'text-moss-400' : 'text-moss-600'}`}
              >
                {block.sectionLabel}
              </p>
            )}
            {block.heading && (
              <h2
                className={`font-display text-2xl font-bold tracking-tight md:text-3xl ${isForestDark ? 'text-ash-50' : 'text-ash-900'}`}
              >
                {block.heading}
              </h2>
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
                className={`rounded-sm p-8 md:p-10 ${isForestDark ? 'bg-moss-800' : 'bg-white/60'}`}
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
                    {card.link.label} →
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
