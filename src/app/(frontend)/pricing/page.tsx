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
      <PricingContent tiers={tiers} />
      <SharedFeatures />
      <FeatureComparison />
      <PricingFAQ faqs={faqs} />
      <PricingCloser />
    </>
  )
}
