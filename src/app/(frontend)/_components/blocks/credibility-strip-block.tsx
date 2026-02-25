import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import type { Page } from '@/payload-types'

type CredibilityStripData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'credibility-strip' }
>

interface CredibilityStripBlockProps {
  block: CredibilityStripData
}

const BG_CLASS: Record<string, string> = {
  cream: 'bg-ash-50',
  white: 'bg-ash-50', // no pure white per design brief
  'ash-light': 'bg-ash-100',
  'forest-dark': 'bg-moss-900',
}

export function CredibilityStripBlock({ block }: CredibilityStripBlockProps) {
  const bg = BG_CLASS[block.bgStyle ?? 'cream'] ?? BG_CLASS.cream

  if (block.variant === 'text' && block.statement) {
    return (
      <section className={`py-10 ${bg}`}>
        <Container>
          <p className="text-ash-800 mx-auto max-w-2xl text-center font-serif text-lg/relaxed md:text-xl/relaxed">
            {block.statement}
          </p>
        </Container>
      </section>
    )
  }

  // logos / stats / combined variants — placeholder until logo assets are available
  return (
    <section className={`py-8 ${bg}`}>
      <Container>
        {block.label && (
          <Eyebrow color="ash" className="mb-4 text-center">
            {block.label}
          </Eyebrow>
        )}
        {block.stats && block.stats.length > 0 && (
          <dl className="flex flex-wrap justify-center gap-8">
            {block.stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <dt className="font-display text-ash-900 text-3xl font-bold">{stat.value}</dt>
                <dd className="text-ash-600 text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </section>
  )
}
