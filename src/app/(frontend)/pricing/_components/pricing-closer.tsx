import { Container } from '@/components/elements/container'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'

export function PricingCloser() {
  return (
    <section className="bg-moss-900 py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-ash-50 mb-6 font-serif text-2xl/snug md:text-3xl/snug">
            Ready to systematize your practice?
          </h2>
          <p className="text-ash-200 mb-10 text-lg/relaxed">
            Get started today. No credit card required.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://app.exitwithella.io/sign-up"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ash-50 text-moss-900 hover:bg-ash-100 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors sm:w-auto"
            >
              Get Started
            </a>
            <a
              href="https://cal.com/team/ella/ella-intro?overlayCalendar=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ash-200 hover:text-ash-50 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-colors sm:w-auto"
            >
              Book a Demo <ArrowNarrowRightIcon />
            </a>
          </div>

          <p className="text-ash-400 mt-4 text-sm">Your first 3 clients are on us.</p>
        </div>
      </Container>
    </section>
  )
}
