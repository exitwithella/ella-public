import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import type { FaqItem, PricingPage, PricingTier } from '@/payload-types'

import { CACHE_TAGS } from './cache-tags'

export interface PricingData {
  tiers: PricingTier[]
  faqs: FaqItem[]
  pricingPage: PricingPage
}

/**
 * Pricing tiers + pricing-page FAQ items + the pricing-page global, fetched
 * together under one cache entry so the `pricing` tag governs the whole page.
 */
export const getPricingData = unstable_cache(
  async (): Promise<PricingData> => {
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
  },
  ['pricing-data'],
  { revalidate: 86400, tags: [CACHE_TAGS.pricing] },
)
