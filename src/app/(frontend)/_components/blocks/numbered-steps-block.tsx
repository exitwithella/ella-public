import { Container } from '@/components/elements/container'
import type { Page, Solution } from '@/payload-types'

type NumberedStepsData =
  | Extract<NonNullable<Page['layout']>[number], { blockType: 'numbered-steps' }>
  | Extract<NonNullable<Solution['layout']>[number], { blockType: 'numbered-steps' }>

interface NumberedStepsBlockProps {
  block: NumberedStepsData
}

const BG_CLASS: Record<string, string> = {
  cream: 'bg-ash-50',
  white: 'bg-ash-50',
  'ash-light': 'bg-ash-100',
  'forest-dark': 'bg-moss-900',
}

export function NumberedStepsBlock({ block }: NumberedStepsBlockProps) {
  const bg = BG_CLASS[block.bgStyle ?? 'cream'] ?? BG_CLASS.cream
  const isForestDark = block.bgStyle === 'forest-dark'

  if (!block.steps || block.steps.length === 0) return null

  return (
    <section className={`py-20 md:py-28 ${bg}`}>
      <Container>
        {/* Section header */}
        {(block.sectionLabel || block.heading) && (
          <div className="mb-12 md:mb-16">
            {block.sectionLabel && (
              <p
                className={`mb-3 text-xs font-semibold tracking-widest uppercase ${
                  isForestDark ? 'text-moss-400' : 'text-moss-600'
                }`}
              >
                {block.sectionLabel}
              </p>
            )}
            {block.heading && (
              <h2
                className={`font-display text-2xl font-bold tracking-tight md:text-3xl ${
                  isForestDark ? 'text-ash-50' : 'text-ash-900'
                }`}
              >
                {block.heading}
              </h2>
            )}
            {block.subheading && (
              <p
                className={`mt-4 max-w-2xl text-lg/relaxed ${
                  isForestDark ? 'text-ash-300' : 'text-ash-600'
                }`}
              >
                {block.subheading}
              </p>
            )}
          </div>
        )}

        {/* Steps */}
        <div className="space-y-0">
          {block.steps.map((step, index) => (
            <div
              key={step.id}
              className={`border-ash-200 grid grid-cols-1 gap-4 py-8 md:grid-cols-[80px_1fr] md:gap-8 ${
                index < block.steps!.length - 1 ? 'border-b' : ''
              } ${isForestDark ? 'border-moss-700' : ''}`}
            >
              {/* Step number */}
              <div
                className={`font-display text-2xl font-bold md:text-5xl ${
                  isForestDark ? 'text-moss-700' : 'text-ash-200'
                }`}
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Step content */}
              <div>
                <h3
                  className={`font-display text-lg font-semibold tracking-tight md:text-xl ${
                    isForestDark ? 'text-ash-50' : 'text-ash-900'
                  }`}
                >
                  {step.heading}
                </h3>
                {step.body && (
                  <p
                    className={`mt-3 max-w-xl text-base/relaxed ${
                      isForestDark ? 'text-ash-300' : 'text-ash-600'
                    }`}
                  >
                    {step.body}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
