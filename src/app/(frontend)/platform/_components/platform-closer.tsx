import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'

import { platformCloser } from '../_lib/content'

export function PlatformCloser() {
  return (
    <section className="bg-moss-900 py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-ash-50 mb-8 font-serif text-2xl/snug md:text-3xl/snug">
            {platformCloser.headline}
          </h2>

          <p className="text-ash-200 mb-10 text-lg/relaxed">{platformCloser.body}</p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <ButtonLink
              href={platformCloser.primaryCta.href}
              size="lg"
              target="_blank"
              className="bg-ash-50 text-moss-900 hover:bg-ash-100 w-full sm:w-auto"
            >
              {platformCloser.primaryCta.label}
            </ButtonLink>
            <PlainButtonLink
              href={platformCloser.secondaryCta.href}
              size="lg"
              target="_blank"
              className="text-ash-200 hover:text-ash-50 w-full justify-center sm:w-auto"
            >
              {platformCloser.secondaryCta.label} <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>

          <p className="text-ash-400 mt-4 text-sm">{platformCloser.microcopy}</p>
        </div>
      </Container>
    </section>
  )
}
