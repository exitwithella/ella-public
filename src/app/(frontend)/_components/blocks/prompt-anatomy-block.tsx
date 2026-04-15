import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { ThemeSection } from '@/components/elements/theme-section'
import { PromptAnatomyDiagram } from '@/components/prompt-anatomy/prompt-anatomy-diagram'
import type { Page } from '@/payload-types'

type PromptAnatomyData =
  Extract<NonNullable<Page['layout']>[number], { blockType: 'prompt-anatomy' }> extends never
    ? {
        blockType: 'prompt-anatomy'
        sectionId?: string | null
        sectionLabel?: string | null
        heading?: string | null
        description?: string | null
        promptText?: string | null
        responseLabel?: string | null
        responseMetadata?: string | null
        items?: Array<{
          heading: string
          body: string
          annotationLabel: string
          annotationDetail?: string | null
          color: 'moss' | 'goldenrod'
        }> | null
        footerLeft?: string | null
        footerRight?: string | null
        bgColorOverride?: string | null
        bgStyle?: string | null
      }
    : Extract<NonNullable<Page['layout']>[number], { blockType: 'prompt-anatomy' }>

interface PromptAnatomyBlockProps {
  block: PromptAnatomyData
}

export function PromptAnatomyBlock({ block }: PromptAnatomyBlockProps) {
  const items = (block.items ?? []).map((item) => ({
    heading: item.heading,
    body: item.body,
    annotationLabel: item.annotationLabel,
    annotationDetail: item.annotationDetail,
    color: (item.color ?? 'moss') as 'moss' | 'goldenrod',
  }))

  if (items.length === 0) return null

  const bgOverrideStyle = block.bgColorOverride
    ? ({ backgroundColor: block.bgColorOverride } as const)
    : undefined

  return (
    <ThemeSection
      bgStyle={block.bgStyle}
      className="py-16 md:py-24"
      id={block.sectionId ?? undefined}
      style={bgOverrideStyle}
    >
      <Container>
        {/* Header */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:mb-10 lg:grid-cols-[2fr_1fr] lg:items-end">
          <div>
            {block.sectionLabel && <Eyebrow className="mb-3">{block.sectionLabel}</Eyebrow>}
            {block.heading && <Heading as="h3">{block.heading}</Heading>}
          </div>
          {block.description && (
            <p className="text-theme-text-secondary text-sm leading-relaxed lg:text-right">
              {block.description}
            </p>
          )}
        </div>

        <div
          className="border-theme-border mb-7 h-px w-full"
          style={{ backgroundColor: 'var(--color-theme-border)' }}
        />

        {/* Interactive diagram */}
        <PromptAnatomyDiagram
          items={items}
          promptText={block.promptText}
          responseLabel={block.responseLabel}
          responseMetadata={block.responseMetadata}
        />

        {/* Footer */}
        {(block.footerLeft || block.footerRight) && (
          <div className="border-theme-border mt-8 flex items-center justify-between border-t pt-5">
            {block.footerLeft && (
              <p className="text-theme-text-muted text-[11px]">{block.footerLeft}</p>
            )}
            {block.footerRight && (
              <p className="text-theme-text-muted text-[11px] italic opacity-60">
                {block.footerRight}
              </p>
            )}
          </div>
        )}
      </Container>
    </ThemeSection>
  )
}
