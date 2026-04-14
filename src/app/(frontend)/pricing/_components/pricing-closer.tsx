import { Container } from '@/components/elements/container'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'

interface PricingCloserProps {
  headline: string
  subtitle: string
  primaryCta: { label?: string | null; href?: string | null }
  secondaryCta: { label?: string | null; href?: string | null }
  footnote: string
}

export function PricingCloser({
  headline,
  subtitle,
  primaryCta,
  secondaryCta,
  footnote,
}: PricingCloserProps) {
  return (
    <section className="bg-moss-900 py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-ash-100 mb-6 font-serif text-2xl/snug md:text-3xl/snug">
            {headline}
          </h2>
          {subtitle && <p className="text-ash-200 mb-10 text-lg/relaxed">{subtitle}</p>}

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {primaryCta.href && (
              <a
                href={primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sandstone-50 text-moss-900 hover:bg-ash-100 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors sm:w-auto"
              >
                {primaryCta.label ?? 'Get Started'}
              </a>
            )}
            {secondaryCta.href && (
              <a
                href={secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ash-200 hover:text-ash-100 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-colors sm:w-auto"
              >
                {secondaryCta.label ?? 'Book a Demo'} <ArrowNarrowRightIcon />
              </a>
            )}
          </div>

          {footnote && <p className="text-ash-400 mt-4 text-sm">{footnote}</p>}
        </div>
      </Container>
    </section>
  )
}
