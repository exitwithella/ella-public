import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { PhosphorIcon } from '@/components/icons/PhosphorIcon'
import type { PricingPage } from '@/payload-types'

type TrustBadge = NonNullable<PricingPage['trustBadges']>[number]

interface PricingHeroProps {
  eyebrow: string
  headline: string
  subtitle: string
  trustBadges: TrustBadge[]
}

function BadgeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M4 8l3 3L12 5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PricingHero({ eyebrow, headline, subtitle, trustBadges }: PricingHeroProps) {
  return (
    <section className="bg-sandstone-50 pt-24 pb-12 md:pt-32 md:pb-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow size="sm" className="mb-4">
            {eyebrow}
          </Eyebrow>
          <Heading as="h1" className="text-ash-950 mb-5">
            {headline}
          </Heading>
          {subtitle && <p className="text-ash-600 mx-auto max-w-xl text-lg/relaxed">{subtitle}</p>}

          {trustBadges.length > 0 && (
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {trustBadges.map((badge) => (
                <li
                  key={badge.id}
                  className="text-ash-400 flex items-center gap-1.5 text-xs font-medium"
                >
                  {badge.icon ? (
                    <PhosphorIcon name={badge.icon} size={16} className="shrink-0" />
                  ) : (
                    <BadgeIcon />
                  )}
                  <span>{badge.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  )
}
