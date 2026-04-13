'use client'

import { useState } from 'react'

import type { PricingTier } from '@/payload-types'

import { BillingToggle, type BillingPeriod } from './billing-toggle'
import { TierCards } from './tier-cards'

interface PricingContentProps {
  tiers: PricingTier[]
}

export function PricingContent({ tiers }: PricingContentProps) {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('year')

  return (
    <section className="bg-sandstone-100 py-16 md:py-20">
      {/* Billing toggle */}
      <div className="mb-10 flex justify-center md:mb-12">
        <BillingToggle value={billingPeriod} onChange={setBillingPeriod} />
      </div>

      {/* Tier cards + feature details */}
      <TierCards tiers={tiers} billingPeriod={billingPeriod} />
    </section>
  )
}
