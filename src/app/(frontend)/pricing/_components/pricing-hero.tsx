import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'

const TRUST_BADGES = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 1.5L2.5 4v4c0 3.5 2.5 6.4 5.5 7.2 3-.8 5.5-3.7 5.5-7.2V4L8 1.5z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    text: 'SOC 2 compliant',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
        <path
          d="M8 4.5v3.5l2 2"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    text: 'Cancel anytime',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M3 8h10M8 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    text: 'Built by ei Innovations',
  },
]

export function PricingHero() {
  return (
    <section className="bg-sandstone-50 pt-24 pb-12 md:pt-32 md:pb-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow size="sm" className="mb-4">
            Pricing
          </Eyebrow>
          <Heading as="h1" className="text-ash-950 mb-5">
            Invest in your practice.
          </Heading>
          <p className="text-ash-600 mx-auto max-w-xl text-lg/relaxed">
            Simple, transparent pricing for trusted advisors. Annual billing by default — pay
            monthly or quarterly if you prefer flexibility.
          </p>

          {/* Trust badges */}
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {TRUST_BADGES.map((badge) => (
              <li
                key={badge.text}
                className="text-ash-400 flex items-center gap-1.5 text-xs font-medium"
              >
                <span className="shrink-0">{badge.icon}</span>
                <span>{badge.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
