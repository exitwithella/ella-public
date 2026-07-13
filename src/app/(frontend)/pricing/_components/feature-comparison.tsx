import { clsx } from 'clsx/lite'

import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import type { PricingPage, PricingTier } from '@/payload-types'

type ComparisonCategory = NonNullable<PricingPage['categories']>[number]
type ComparisonRow = NonNullable<ComparisonCategory['rows']>[number]
type TierValue = NonNullable<ComparisonRow['values']>[number]

type Indicator = 'check' | 'cross' | 'text'

function tierIdOf(tier: TierValue['tier']): number {
  return typeof tier === 'object' ? tier.id : tier
}

/** The cell for a given row + tier column. A tier with no entry reads as excluded. */
function cellFor(
  row: ComparisonRow,
  tierId: number,
): { indicator: Indicator; displayText?: string | null } {
  const match = row.values?.find((v) => tierIdOf(v.tier) === tierId)
  if (!match) return { indicator: 'cross' }
  return { indicator: match.indicator as Indicator, displayText: match.displayText }
}

// ─────────────────────────────────────────────────────────
// Cell value display
// ─────────────────────────────────────────────────────────

function CellValue({ text, indicator }: { text?: string | null; indicator: Indicator }) {
  if (indicator === 'check') {
    return (
      <span className="text-moss-600 inline-flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8l3.5 3.5L13 4.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="sr-only">Yes</span>
      </span>
    )
  }
  if (indicator === 'cross') {
    return (
      <span className="text-ash-300 inline-flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="sr-only">No</span>
      </span>
    )
  }
  return <span className="text-ash-700 text-sm">{text ?? '—'}</span>
}

// ─────────────────────────────────────────────────────────
// Chevron icon for expand/collapse
// ─────────────────────────────────────────────────────────

function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="text-ash-400 group-open:text-moss-600 shrink-0 transition-all duration-200 group-open:rotate-180"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────
// Desktop table — one column per tier, derived from the tiers themselves
// ─────────────────────────────────────────────────────────

function DesktopComparison({
  tiers,
  categories,
}: {
  tiers: PricingTier[]
  categories: ComparisonCategory[]
}) {
  const gridStyle = { gridTemplateColumns: `1fr repeat(${tiers.length}, 180px)` }

  return (
    <div className="hidden md:block">
      {/* Header row */}
      <div className="border-ash-200 grid gap-0 border-b pb-4" style={gridStyle}>
        <div />
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={clsx(
              'font-display text-center text-sm font-semibold tracking-wide uppercase',
              tier.highlighted ? 'text-ash-800' : 'text-ash-500',
            )}
          >
            {tier.name}
          </div>
        ))}
      </div>

      {/* Collapsible categories */}
      {categories.map((category) => (
        <details key={category.id} className="group" open={category.defaultOpen ? true : undefined}>
          <summary className="flex cursor-pointer list-none items-center gap-3 py-4 [&::-webkit-details-marker]:hidden">
            <ChevronIcon />
            <span className="font-display text-ash-500 group-open:text-moss-600 text-xs font-semibold tracking-widest uppercase transition-colors">
              {category.name}
            </span>
          </summary>

          <div className="pb-2">
            {category.rows?.map((row) => (
              <div key={row.id} className="grid gap-0 py-2.5" style={gridStyle}>
                <div className="text-ash-600 pl-7 text-sm">{row.label}</div>
                {tiers.map((tier) => {
                  const cell = cellFor(row, tier.id)
                  return (
                    <div key={tier.id} className="flex items-center justify-center">
                      <CellValue indicator={cell.indicator} text={cell.displayText} />
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Mobile cards — one card per tier
// ─────────────────────────────────────────────────────────

function MobileTierCard({
  tier,
  categories,
}: {
  tier: PricingTier
  categories: ComparisonCategory[]
}) {
  return (
    <div className="border-ash-200 border p-5">
      <h3
        className={clsx(
          'font-display border-ash-200 mb-4 border-b pb-3 text-sm font-bold tracking-wide uppercase',
          tier.highlighted ? 'text-ash-800' : 'text-ash-600',
        )}
      >
        {tier.name}
      </h3>
      {categories.map((category) => (
        <div key={category.id} className="mb-4 last:mb-0">
          <p className="font-display text-ash-400 mb-2 text-xs font-semibold tracking-widest uppercase">
            {category.name}
          </p>
          <dl className="space-y-2.5">
            {category.rows?.map((row) => {
              const cell = cellFor(row, tier.id)
              return (
                <div key={row.id} className="flex items-start justify-between gap-4">
                  <dt className="text-ash-600 text-sm">{row.label}</dt>
                  <dd className="text-right text-sm font-medium">
                    <CellValue indicator={cell.indicator} text={cell.displayText} />
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      ))}
    </div>
  )
}

function MobileComparison({
  tiers,
  categories,
}: {
  tiers: PricingTier[]
  categories: ComparisonCategory[]
}) {
  return (
    <div className="space-y-6 md:hidden">
      {tiers.map((tier) => (
        <MobileTierCard key={tier.id} tier={tier} categories={categories} />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────

interface FeatureComparisonProps {
  eyebrow: string
  heading: string
  tiers: PricingTier[]
  categories: ComparisonCategory[]
}

export function FeatureComparison({ eyebrow, heading, tiers, categories }: FeatureComparisonProps) {
  if (categories.length === 0 || tiers.length === 0) return null

  return (
    <section className="bg-sandstone-50 py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center md:mb-16">
            <Eyebrow size="sm" className="mb-3">
              {eyebrow}
            </Eyebrow>
            <Heading className="text-3xl md:text-4xl">{heading}</Heading>
          </div>

          <DesktopComparison tiers={tiers} categories={categories} />
          <MobileComparison tiers={tiers} categories={categories} />
        </div>
      </Container>
    </section>
  )
}
