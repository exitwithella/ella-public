import Image from 'next/image'

import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { ThemeSection } from '@/components/elements/theme-section'
import { PhosphorIcon } from '@/components/icons/PhosphorIcon'
import type { Media, Page } from '@/payload-types'

type CardGridData = Extract<NonNullable<Page['layout']>[number], { blockType: 'card-grid' }>

interface CardGridBlockProps {
  block: CardGridData
}

const COLUMN_CLASS: Record<string, string> = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-3',
  '4': 'sm:grid-cols-2 lg:grid-cols-4',
}

export function CardGridBlock({ block }: CardGridBlockProps) {
  const colClass = COLUMN_CLASS[block.columns ?? '3'] ?? COLUMN_CLASS['3']

  return (
    <ThemeSection bgStyle={block.bgStyle} className="py-20 md:py-28">
      <Container>
        {/* Section header */}
        {(block.sectionLabel || block.heading) && (
          <div className="mb-12 md:mb-16">
            {block.sectionLabel && <Eyebrow className="mb-3">{block.sectionLabel}</Eyebrow>}
            {block.heading && <Heading>{block.heading}</Heading>}
            {block.subheading && (
              <p className="text-theme-text-secondary mt-4 max-w-2xl text-lg/relaxed">
                {block.subheading}
              </p>
            )}
          </div>
        )}

        {/* Card grid */}
        {block.cards && block.cards.length > 0 && (
          <div className={`grid grid-cols-1 gap-8 md:gap-10 ${colClass}`}>
            {block.cards.map((card) => {
              const uploadedIcon = card.icon as Media | null
              return (
                <div
                  key={card.id}
                  id={card.anchorTarget ?? undefined}
                  className="border-theme-border bg-theme-surface rounded-sm border p-8 md:p-10"
                >
                  {/* Card icon */}
                  {(card.iconName || uploadedIcon?.url) && (
                    <div className="text-theme-accent mb-4">
                      {card.iconName ? (
                        <PhosphorIcon name={card.iconName} size={24} />
                      ) : uploadedIcon?.url ? (
                        <Image
                          src={uploadedIcon.url}
                          alt=""
                          width={24}
                          height={24}
                          className="object-contain"
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                  )}

                  {/* Card heading — Termina */}
                  <h3 className="text-theme-accent font-display mb-3 text-sm font-semibold tracking-wider uppercase">
                    {card.heading}
                  </h3>

                  {/* Card body — DM Sans */}
                  {card.body && (
                    <p className="text-theme-text-secondary text-base/relaxed">{card.body}</p>
                  )}

                  {/* Capabilities list */}
                  {card.capabilities && card.capabilities.length > 0 && (
                    <ul className="mt-6 space-y-2">
                      {card.capabilities.map((cap) => (
                        <li
                          key={cap.id}
                          className="text-theme-text-secondary flex items-start gap-2 text-sm"
                        >
                          <span
                            className="text-theme-accent mt-0.5 shrink-0 text-base leading-none"
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
                      className="text-theme-accent mt-6 inline-flex items-center gap-1 text-sm font-semibold opacity-90 hover:opacity-100"
                    >
                      {card.link.label} <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </Container>
    </ThemeSection>
  )
}
