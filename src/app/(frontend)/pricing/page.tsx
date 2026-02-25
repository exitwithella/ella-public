import config from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'

import { FeatureComparison } from './_components/feature-comparison'
import { PricingCloser } from './_components/pricing-closer'
import { PricingFAQ } from './_components/pricing-faq'
import { PricingHero } from './_components/pricing-hero'
import { TierCards } from './_components/tier-cards'
import { TrustStrip } from './_components/trust-strip'

export const metadata: Metadata = {
  title: 'Pricing — ELLA',
  description:
    'Simple, transparent pricing for trusted advisors. One plan for the solo practitioner. Custom solutions for teams and firms.',
  openGraph: {
    title: 'Pricing — ELLA',
    description:
      'Simple, transparent pricing. One plan for the solo practitioner. Custom solutions for teams and firms.',
    url: 'https://withella.io/pricing',
  },
}

async function getPricingData() {
  const payload = await getPayload({ config })

  const [tiersResult, faqsResult] = await Promise.all([
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
  ])

  return {
    tiers: tiersResult.docs,
    faqs: faqsResult.docs,
  }
}

export default async function PricingPage() {
  const { tiers, faqs } = await getPricingData()

  return (
    <>
      <PricingHero />
      <TierCards tiers={tiers} />
      <TrustStrip />
      <FeatureComparison />
      <PricingFAQ faqs={faqs} />
      <PricingCloser />
    </>
  )
}
