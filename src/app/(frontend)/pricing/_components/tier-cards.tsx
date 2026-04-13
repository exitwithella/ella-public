import { Container } from '@/components/elements/container'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import type { PricingTier } from '@/payload-types'

import type { BillingPeriod } from './billing-toggle'

interface TierCardsProps {
  tiers: PricingTier[]
  billingPeriod: BillingPeriod
}

function calculatePrice(
  baseCents: number,
  period: BillingPeriod,
  surcharges: { month?: number | null; quarter?: number | null },
): number {
  if (period === 'year') return baseCents
  const pct = period === 'quarter' ? (surcharges.quarter ?? 0) : (surcharges.month ?? 0)
  return Math.round(baseCents * (1 + pct / 100))
}

function formatPrice(
  tier: PricingTier,
  period: BillingPeriod,
): { display: string; suffix: string | null } {
  const price = tier.price
  if (!price) return { display: 'Contact us', suffix: null }

  if (price.period === 'custom') {
    return { display: price.customLabel ?? 'Custom', suffix: null }
  }

  if (price.amount == null || price.amount === 0) {
    return { display: 'Free', suffix: null }
  }

  const cents = calculatePrice(price.amount, period, {
    month: tier.monthSurchargePercent,
    quarter: tier.quarterSurchargePercent,
  })
  const dollars = Math.round(cents / 100)
  const perLabel = tier.pricePer === 'user' ? '/user/mo' : '/mo'
  return { display: `$${dollars}`, suffix: perLabel }
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="text-moss-600 mt-0.5 shrink-0"
    >
      <path
        d="M3 8l3.5 3.5L13 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────
// Per-tier feature data for the below-card feature lists
// ─────────────────────────────────────────────────────────
const TIER_FEATURES: Record<string, { header: string; items: string[] }> = {
  Practitioner: {
    header: 'KEY FEATURES INCLUDE:',
    items: [
      'Up to 3 advisors, 30 active clients',
      'All clients shared between advisors',
      '20 collaborators per client',
      'Limited Max model usage',
      '20 hours/mo/user voice recording',
      'MCP & calendar sync integrations',
      'Email support',
    ],
  },
  Enterprise: {
    header: 'EVERYTHING IN PRACTITIONER, PLUS:',
    items: [
      'AI governance & decision tracing',
      'BYOK & custom AI guardrails',
      'SIEM & scheduled posture reporting',
      'Dedicated capacity & regional processing',
      'Custom log retention & log drains',
      'Custom release schedule',
      'Premium support SLA & dedicated success manager',
      'Custom integration development',
    ],
  },
}

// ─────────────────────────────────────────────────────────
// Desktop: Unified bordered container (Fin-style)
// ─────────────────────────────────────────────────────────

function DesktopTierCards({
  tiers,
  billingPeriod,
}: {
  tiers: PricingTier[]
  billingPeriod: BillingPeriod
}) {
  const billingLabel =
    billingPeriod === 'year' ? 'annually' : billingPeriod === 'quarter' ? 'quarterly' : 'monthly'

  return (
    <div className="mx-auto hidden max-w-5xl md:block">
      {/* Unified container — solid border on Practitioner, dashed on Enterprise */}
      <div className="grid grid-cols-2">
        {tiers.map((tier, idx) => {
          const { display: priceDisplay, suffix: priceSuffix } = formatPrice(tier, billingPeriod)
          const isCustom = tier.price?.period === 'custom'
          const ctaHref = tier.cta?.href ?? 'https://app.exitwithella.io/sign-up'
          const ctaLabel = tier.cta?.label ?? 'Get Started'
          const isFirst = idx === 0

          return (
            <div
              key={tier.id}
              className={`border-ash-200 flex flex-col p-10 ${
                isFirst ? 'border' : 'border border-l-0 border-dashed'
              }`}
            >
              {/* Tier name */}
              <h2 className="font-display text-ash-900 text-xl font-bold tracking-tight">
                {tier.name}
              </h2>

              {/* Tagline */}
              {tier.tagline && <p className="text-ash-600 mt-1 text-sm">{tier.tagline}</p>}

              {/* Price */}
              <div className="mt-8 mb-8">
                <div className="flex items-baseline gap-1.5">
                  <span
                    key={`${tier.id}-${billingPeriod}`}
                    className={`font-display animate-in fade-in text-4xl font-bold duration-150 ${
                      isCustom ? 'text-goldenrod-700' : 'text-ash-900'
                    }`}
                  >
                    {priceDisplay}
                  </span>
                  {priceSuffix && <span className="text-ash-500 text-base">{priceSuffix}</span>}
                </div>
              </div>

              {/* CTA row */}
              <div className="flex items-center gap-3">
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                    isFirst
                      ? 'bg-moss-700 text-sandstone-50 hover:bg-moss-800'
                      : 'bg-ash-950 text-ash-100 hover:bg-ash-800'
                  }`}
                >
                  {ctaLabel}
                </a>
                {!isCustom && (
                  <a
                    href="https://cal.com/team/ella/ella-intro?overlayCalendar=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ash-500 hover:text-ash-700 inline-flex items-center gap-1 text-sm font-medium transition-colors"
                  >
                    Get a demo <ArrowNarrowRightIcon className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Feature lists — continues the solid/dashed border pattern */}
      <div className="grid grid-cols-2">
        {tiers.map((tier, idx) => {
          const data = TIER_FEATURES[tier.name]
          if (!data) return <div key={`features-${tier.id}`} />
          const isFirst = idx === 0

          return (
            <div
              key={`features-${tier.id}`}
              className={`border-ash-200 p-10 ${
                isFirst ? 'border-r border-b border-l' : 'border-r border-b border-dashed'
              }`}
            >
              <h3 className="font-display text-ash-500 mb-4 text-xs font-semibold tracking-widest uppercase">
                {data.header}
              </h3>
              <ul className="space-y-3">
                {data.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="text-ash-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Billing note */}
      <p className="text-ash-400 mt-6 text-center text-sm">
        All plans billed {billingLabel}. Cancel anytime.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Mobile: Stacked cards with individual borders
// ─────────────────────────────────────────────────────────

function MobileTierCards({
  tiers,
  billingPeriod,
}: {
  tiers: PricingTier[]
  billingPeriod: BillingPeriod
}) {
  const billingLabel =
    billingPeriod === 'year' ? 'annually' : billingPeriod === 'quarter' ? 'quarterly' : 'monthly'

  return (
    <div className="mx-auto max-w-lg space-y-6 md:hidden">
      {tiers.map((tier, idx) => {
        const { display: priceDisplay, suffix: priceSuffix } = formatPrice(tier, billingPeriod)
        const isCustom = tier.price?.period === 'custom'
        const ctaHref = tier.cta?.href ?? 'https://app.exitwithella.io/sign-up'
        const ctaLabel = tier.cta?.label ?? 'Get Started'
        const isFirst = idx === 0
        const data = TIER_FEATURES[tier.name]

        return (
          <div
            key={tier.id}
            className={`border-ash-200 ${isFirst ? 'border' : 'border border-dashed'}`}
          >
            {/* Card content */}
            <div className="p-6">
              <h2 className="font-display text-ash-900 text-xl font-bold tracking-tight">
                {tier.name}
              </h2>
              {tier.tagline && <p className="text-ash-600 mt-1 text-sm">{tier.tagline}</p>}

              <div className="mt-6 mb-6">
                <div className="flex items-baseline gap-1.5">
                  <span
                    key={`mobile-${tier.id}-${billingPeriod}`}
                    className={`font-display animate-in fade-in text-4xl font-bold duration-150 ${
                      isCustom ? 'text-goldenrod-700' : 'text-ash-900'
                    }`}
                  >
                    {priceDisplay}
                  </span>
                  {priceSuffix && <span className="text-ash-500 text-base">{priceSuffix}</span>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                    isFirst
                      ? 'bg-moss-700 text-sandstone-50 hover:bg-moss-800'
                      : 'bg-ash-950 text-ash-100 hover:bg-ash-800'
                  }`}
                >
                  {ctaLabel}
                </a>
                {!isCustom && (
                  <a
                    href="https://cal.com/team/ella/ella-intro?overlayCalendar=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ash-500 hover:text-ash-700 inline-flex items-center gap-1 text-sm font-medium transition-colors"
                  >
                    Get a demo <ArrowNarrowRightIcon className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Feature list */}
            {data && (
              <div className="border-ash-200 border-t p-6">
                <h3 className="font-display text-ash-500 mb-4 text-xs font-semibold tracking-widest uppercase">
                  {data.header}
                </h3>
                <ul className="space-y-3">
                  {data.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckIcon />
                      <span className="text-ash-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      })}

      <p className="text-ash-400 text-center text-sm">
        All plans billed {billingLabel}. Cancel anytime.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────

export function TierCards({ tiers, billingPeriod }: TierCardsProps) {
  if (tiers.length === 0) return null

  return (
    <Container>
      <DesktopTierCards tiers={tiers} billingPeriod={billingPeriod} />
      <MobileTierCards tiers={tiers} billingPeriod={billingPeriod} />
    </Container>
  )
}
