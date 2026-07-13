import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { SectionHeader } from '@/components/elements/section-header'
import { ThemeSection } from '@/components/elements/theme-section'
import type { Page, Solution } from '@/payload-types'

type NumberedStepsData =
  | Extract<NonNullable<Page['layout']>[number], { blockType: 'numbered-steps' }>
  | Extract<NonNullable<Solution['layout']>[number], { blockType: 'numbered-steps' }>

interface NumberedStepsBlockProps {
  block: NumberedStepsData
}

export function NumberedStepsBlock({ block }: NumberedStepsBlockProps) {
  if (!block.steps || block.steps.length === 0) return null

  return (
    <ThemeSection bgStyle={block.bgStyle} className="py-20 md:py-28">
      <Container>
        <SectionHeader
          label={block.sectionLabel}
          heading={block.heading}
          subheading={block.subheading}
        />

        {/* Steps */}
        <div className="space-y-0">
          {block.steps.map((step, index) => (
            <div
              key={step.id}
              className={`border-theme-border grid grid-cols-1 gap-4 py-8 md:grid-cols-[80px_1fr] md:gap-8 ${
                index < block.steps!.length - 1 ? 'border-b' : ''
              }`}
            >
              {/* Step number */}
              <div
                className="text-theme-border font-display text-2xl font-bold md:text-5xl"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Step content */}
              <div>
                <Heading as="h3" className="text-lg md:text-xl">
                  {step.heading}
                </Heading>
                {step.body && (
                  <p className="text-theme-text-secondary mt-3 max-w-xl text-base/relaxed">
                    {step.body}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </ThemeSection>
  )
}
