import config from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'

import { FeatureComparison } from './_components/feature-comparison'
import { PricingCloser } from './_components/pricing-closer'
import { PricingContent } from './_components/pricing-content'
import { PricingFAQ } from './_components/pricing-faq'
import { PricingHero } from './_components/pricing-hero'
import { SharedFeatures } from './_components/shared-features'

export const metadata: Metadata = {
  title: 'Pricing — ELLA',
  description:
    'Simple, transparent pricing for trusted advisors. Per-user plans that scale with your practice.',
  openGraph: {
    title: 'Pricing — ELLA',
    description:
      'Simple, transparent pricing for trusted advisors. Per-user plans that scale with your practice.',
    url: 'https://withella.io/pricing',
  },
}

async function getPricingData() {
  const payload = await getPayload({ config })

  const [tiersResult, faqsResult, pricingPage] = await Promise.all([
    payload.find({
      collection: 'pricing-tiers',
      sort: 'sortOrder',
      limit: 10,
    }),
    payload.find({
      collection: 'faq-items',
      where: {
        showOnPricing: { equals: true },
      },
      sort: 'sortOrder',
      limit: 20,
    }),
    payload.findGlobal({ slug: 'pricing-page' }),
  ])

  return {
    tiers: tiersResult.docs,
    faqs: faqsResult.docs,
    pricingPage,
  }
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
