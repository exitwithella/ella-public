import type { Metadata } from 'next'

import { buildPageMetadata } from '../_lib/build-metadata'
import { getPricingData } from '../_lib/get-pricing'
import { FeatureComparison } from './_components/feature-comparison'
import { PricingCloser } from './_components/pricing-closer'
import { PricingContent } from './_components/pricing-content'
import { PricingFAQ } from './_components/pricing-faq'
import { PricingHero } from './_components/pricing-hero'
import { SharedFeatures } from './_components/shared-features'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: 'Pricing',
    description:
      'Simple, transparent pricing for trusted advisors. Per-user plans that scale with your practice.',
    path: '/pricing',
  })
}

export default async function PricingPage() {
  const { tiers, faqs, pricingPage } = await getPricingData()

  return (
    <>
      <PricingHero
        eyebrow={pricingPage.heroEyebrow ?? 'Pricing'}
        headline={pricingPage.heroHeadline ?? 'Invest in your practice.'}
        subtitle={pricingPage.heroSubtitle ?? ''}
        trustBadges={pricingPage.trustBadges ?? []}
      />
      <PricingContent tiers={tiers} />
      <SharedFeatures features={pricingPage.sharedFeatures ?? []} />
      <FeatureComparison
        eyebrow={pricingPage.comparisonEyebrow ?? 'Compare Plans'}
        heading={pricingPage.comparisonHeading ?? "Everything you need, nothing you don't."}
        categories={pricingPage.categories ?? []}
      />
      <PricingFAQ faqs={faqs} />
      <PricingCloser
        headline={pricingPage.closerHeadline ?? 'Ready to systematize your practice?'}
        subtitle={pricingPage.closerSubtitle ?? ''}
        primaryCta={
          pricingPage.closerPrimaryCta ?? {
            label: 'Get Started',
            href: 'https://app.exitwithella.io/sign-up',
          }
        }
        secondaryCta={
          pricingPage.closerSecondaryCta ?? {
            label: 'Book a Demo',
            href: 'https://cal.com/team/ella/ella-intro?overlayCalendar=true',
          }
        }
        footnote={pricingPage.closerFootnote ?? ''}
      />
    </>
  )
}
