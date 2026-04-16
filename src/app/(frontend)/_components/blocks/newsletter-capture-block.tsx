import { Container } from '@/components/elements/container'
import { ThemeSection } from '@/components/elements/theme-section'
import type { Page } from '@/payload-types'

import { NewsletterForm } from '../newsletter-form'

type NewsletterCaptureData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'newsletter-capture' }
>

interface NewsletterCaptureBlockProps {
  block: NewsletterCaptureData
}

export function NewsletterCaptureBlock({ block }: NewsletterCaptureBlockProps) {
  const listIds =
    block.loopsListIds
      ?.map((l) => l.listId)
      .filter((id): id is string => typeof id === 'string' && id.length > 0) ?? []

  return (
    <ThemeSection bgStyle={block.bgStyle} className="py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {block.heading && (
            <h2 className="text-theme-text font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
              {block.heading}
            </h2>
          )}
          {block.subheading && (
            <p className="text-theme-text-secondary mx-auto mt-4 max-w-xl text-lg/relaxed text-pretty">
              {block.subheading}
            </p>
          )}
          <div className="mx-auto mt-8 max-w-lg">
            <NewsletterForm
              variant="default"
              source={block.source ?? undefined}
              listIds={listIds}
              placeholder={block.placeholder ?? 'Your email address'}
              buttonLabel={block.buttonLabel ?? 'Subscribe'}
              successMessage={block.successMessage ?? "You're in. We'll be in touch."}
              microcopy={block.microcopy ?? undefined}
            />
          </div>
        </div>
      </Container>
    </ThemeSection>
  )
}
