import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { Feature, FeaturesThreeColumn } from '@/components/sections/features-three-column'

import { CredibilityStrip } from './_components/credibility-strip'
import { Hero } from './_components/hero'
import { hero, pillarCards, trustSecurity, closerCta } from './_lib/content'

// Temporary hardcoded hero shape — replaced by CMS fetch in Phase 5 (MKT-75)
const HARDCODED_HERO = {
  headline: 'GO FROM INTAKE TO INSIGHT\nIN A FRACTION OF THE TIME',
  subheadline: hero.subheadline,
  primaryCta: { label: 'Get Started', href: hero.cta.href },
  secondaryCta: { label: hero.demoCta.label, href: hero.demoCta.href },
  visual: null as null,
  style: 'default' as const,
  highlightText: 'INTAKE TO INSIGHT',
  highlightColor: 'goldenrod' as const,
}

export default function HomePage() {
  return (
    <>
      <Hero hero={HARDCODED_HERO} />

      <CredibilityStrip />

      {/* Pillar Cards */}
      <FeaturesThreeColumn
        eyebrow={pillarCards.eyebrow}
        headline={pillarCards.headline}
        subheadline={<p>{pillarCards.description}</p>}
        features={
          <>
            {pillarCards.pillars.map((pillar) => (
              <Feature
                key={pillar.tag}
                headline={pillar.tag}
                subheadline={
                  <>
                    <p className="text-ash-950 font-semibold">{pillar.headline}</p>
                    <p>{pillar.description}</p>
                  </>
                }
              />
            ))}
          </>
        }
      />

      {/* Trust & Security */}
      <FeaturesThreeColumn
        eyebrow="Security & trust"
        headline={trustSecurity.headline}
        subheadline={<p>{trustSecurity.description}</p>}
        features={
          <>
            {trustSecurity.features.map((feature) => (
              <Feature
                key={feature.title}
                headline={feature.title}
                subheadline={<p>{feature.description}</p>}
              />
            ))}
          </>
        }
      />

      {/* Closer CTA */}
      <CallToActionSimpleCentered
        headline={closerCta.headline}
        subheadline={<p>{closerCta.description}</p>}
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href={closerCta.primaryCta.href} size="lg" target="_blank">
              {closerCta.primaryCta.label}
            </ButtonLink>
            <PlainButtonLink href={closerCta.secondaryCta.href} size="lg" target="_blank">
              {closerCta.secondaryCta.label} <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        }
      />
    </>
  )
}
