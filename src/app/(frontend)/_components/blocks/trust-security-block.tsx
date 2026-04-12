import type { ReactNode } from 'react'

import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { ThemeSection } from '@/components/elements/theme-section'
import type { Page } from '@/payload-types'

type TrustSecurityData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'trust-security' }
>

interface TrustSecurityBlockProps {
  block: TrustSecurityData
}

/**
 * Parses *asterisk-wrapped* segments into <em> elements.
 * Returns a ReactNode array safe for JSX rendering.
 */
function parseEmphasis(text: string): ReactNode[] {
  const parts = text.split(/(\*[^*]+\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>
    }
    return part
  })
}

type Section = NonNullable<TrustSecurityData['sections']>[number]

function SectionCard({ section }: { section: Section }) {
  return (
    <div>
      <h3 className="text-theme-text mb-3 text-lg font-bold">{section.title}</h3>

      {section.body && (
        <div className="text-theme-text-secondary space-y-4 text-base/relaxed">
          {section.body.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      )}

      {section.bulletHeading && (
        <h4 className="text-theme-text mt-6 mb-3 text-base font-bold">{section.bulletHeading}</h4>
      )}

      {section.bulletItems && section.bulletItems.length > 0 && (
        <ul className="border-theme-border space-y-2 border-b pb-6">
          {section.bulletItems.map((item) => (
            <li key={item.id} className="text-theme-text-secondary text-sm/relaxed">
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function TrustSecurityBlock({ block }: TrustSecurityBlockProps) {
  const leftSections = block.sections?.filter((s) => s.column === 'left') ?? []
  const rightSections = block.sections?.filter((s) => s.column === 'right') ?? []

  return (
    <ThemeSection bgStyle={block.bgStyle} className="py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-5xl">
          {block.heading && <Heading className="mb-8">{parseEmphasis(block.heading)}</Heading>}

          {(block.heading || block.intro) && <hr className="border-theme-border mb-8" />}

          {block.intro && (
            <p className="text-theme-text-secondary mb-14 max-w-4xl text-base/relaxed">
              {parseEmphasis(block.intro)}
            </p>
          )}

          {(leftSections.length > 0 || rightSections.length > 0) && (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
              {leftSections.length > 0 && (
                <div className="space-y-8 lg:col-span-3">
                  {leftSections.map((section) => (
                    <SectionCard key={section.id} section={section} />
                  ))}
                </div>
              )}

              {rightSections.length > 0 && (
                <div className="space-y-10 lg:col-span-2">
                  {rightSections.map((section) => (
                    <SectionCard key={section.id} section={section} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </ThemeSection>
  )
}
