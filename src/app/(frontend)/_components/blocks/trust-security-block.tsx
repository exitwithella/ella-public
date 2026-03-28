import type { ReactNode } from 'react'

import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import type { Page } from '@/payload-types'

type TrustSecurityData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'trust-security' }
>

interface TrustSecurityBlockProps {
  block: TrustSecurityData
}

const BG_CLASS: Record<string, string> = {
  cream: 'bg-ash-50',
  white: 'bg-ash-50',
  'ash-light': 'bg-ash-100',
  'forest-dark': 'bg-moss-900',
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
      <h3 className="text-ash-900 mb-3 text-lg font-bold">{section.title}</h3>

      {section.body && (
        <div className="text-ash-600 space-y-4 text-base/relaxed">
          {section.body.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      )}

      {section.bulletHeading && (
        <h4 className="text-ash-900 mt-6 mb-3 text-base font-bold">{section.bulletHeading}</h4>
      )}

      {section.bulletItems && section.bulletItems.length > 0 && (
        <ul className="border-ash-200 space-y-2 border-b pb-6">
          {section.bulletItems.map((item) => (
            <li key={item.id} className="text-ash-700 text-sm/relaxed">
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function TrustSecurityBlock({ block }: TrustSecurityBlockProps) {
  const bg = BG_CLASS[block.bgStyle ?? 'ash-light'] ?? BG_CLASS['ash-light']

  const leftSections = block.sections?.filter((s) => s.column === 'left') ?? []
  const rightSections = block.sections?.filter((s) => s.column === 'right') ?? []

  return (
    <section className={`py-20 md:py-28 ${bg}`}>
      <Container>
        <div className="mx-auto max-w-5xl">
          {block.heading && (
            <Heading className="mb-8">{parseEmphasis(block.heading)}</Heading>
          )}

          {(block.heading || block.intro) && (
            <hr className="border-ash-300 mb-8" />
          )}

          {block.intro && (
            <p className="text-ash-700 mb-14 max-w-4xl text-base/relaxed">
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
    </section>
  )
}
