import { Container } from '@/components/elements/container'
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

// Minimal inline SVG shield icon — no external asset dependency
function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      className="text-moss-600 mt-0.5 h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    </svg>
  )
}

export function TrustSecurityBlock({ block }: TrustSecurityBlockProps) {
  const bg = BG_CLASS[block.bgStyle ?? 'ash-light'] ?? BG_CLASS['ash-light']

  return (
    <section className={`py-20 md:py-28 ${bg}`}>
      <Container>
        <div className="mx-auto max-w-3xl">
          {/* Heading — Termina */}
          {block.heading && (
            <h2 className="font-display text-ash-900 mb-6 text-2xl font-bold tracking-tight md:text-3xl">
              {block.heading}
            </h2>
          )}

          {/* Intro prose — DM Sans */}
          {block.intro && (
            <p className="text-ash-600 mb-10 max-w-2xl text-lg/relaxed">{block.intro}</p>
          )}

          {/* 7-item capability list */}
          {block.items && block.items.length > 0 && (
            <ul className="space-y-4" role="list">
              {block.items.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <ShieldIcon />
                  <div>
                    <span className="text-ash-800 font-medium">{item.title}</span>
                    {item.body && (
                      <p className="text-ash-500 mt-0.5 text-sm/relaxed">{item.body}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Closing line — standalone, muted */}
          {block.closingLine && (
            <p className="text-ash-500 border-ash-200 mt-10 border-t pt-8 text-sm/relaxed">
              {block.closingLine}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}
