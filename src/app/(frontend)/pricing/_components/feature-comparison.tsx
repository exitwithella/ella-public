import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'

// ─────────────────────────────────────────────────────────
// Cell value display
// ─────────────────────────────────────────────────────────

type Indicator = 'check' | 'cross' | 'text'

function CellValue({ text, indicator }: { text?: string; indicator: Indicator }) {
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
// Feature data — hardcoded from Notion pricing workspace
// ─────────────────────────────────────────────────────────

type FeatureRow = {
  label: string
  practitioner: { indicator: Indicator; text?: string }
  enterprise: { indicator: Indicator; text?: string }
}

type FeatureCategory = {
  name: string
  defaultOpen?: boolean
  rows: FeatureRow[]
}

const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    name: 'Core Platform',
    defaultOpen: true,
    rows: [
      {
        label: 'Max advisors',
        practitioner: { indicator: 'text', text: '3' },
        enterprise: { indicator: 'text', text: 'Custom' },
      },
      {
        label: 'Max active clients',
        practitioner: { indicator: 'text', text: '30' },
        enterprise: { indicator: 'text', text: 'Unlimited' },
      },
      {
        label: 'Collaborators per client',
        practitioner: { indicator: 'text', text: '20' },
        enterprise: { indicator: 'text', text: 'Custom' },
      },
      {
        label: 'Team visibility',
        practitioner: { indicator: 'text', text: 'All clients shared' },
        enterprise: { indicator: 'text', text: 'Per-client & department' },
      },
      {
        label: 'Fact Finding with custom templates',
        practitioner: { indicator: 'check' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'Sensemaking (AI analysis)',
        practitioner: { indicator: 'check' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'Deliverables & document generation',
        practitioner: { indicator: 'check' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'Voice recording & meeting prep',
        practitioner: { indicator: 'check' },
        enterprise: { indicator: 'check' },
      },
    ],
  },
  {
    name: 'Automation & Workflows',
    defaultOpen: true,
    rows: [
      {
        label: 'CRM & 3rd party workflow sync',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'Audit logs',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'text', text: 'Custom retention' },
      },
      {
        label: 'Whitelabeled collaborator portal',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'Branded reports & custom PDF templates',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'Excel-based templates',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
    ],
  },
  {
    name: 'Security & Compliance',
    defaultOpen: false,
    rows: [
      {
        label: 'SOC 2 compliant infrastructure',
        practitioner: { indicator: 'check' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'Encryption at rest and in transit',
        practitioner: { indicator: 'check' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'AI decision tracing',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'BYOK (Bring Your Own Key)',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'Custom AI guardrails',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'SIEM integration',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'Scheduled posture reporting',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'Log drains',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
    ],
  },
  {
    name: 'Platform & Infrastructure',
    defaultOpen: false,
    rows: [
      {
        label: 'Dedicated capacity',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'Regional processing controls',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'Custom release schedule',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
    ],
  },
  {
    name: 'Integrations',
    defaultOpen: false,
    rows: [
      {
        label: 'MCP',
        practitioner: { indicator: 'check' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'Calendar sync',
        practitioner: { indicator: 'check' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'n8n / Zapier',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'HubSpot, Wealthbox, eMoney, RightCapital',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'Salesforce',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'Custom integration development',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
    ],
  },
  {
    name: 'Support',
    defaultOpen: false,
    rows: [
      {
        label: 'Email support',
        practitioner: { indicator: 'check' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'Priority support',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'Dedicated success manager',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'Custom onboarding',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'check' },
      },
      {
        label: 'Custom sourcing & vendor management',
        practitioner: { indicator: 'cross' },
        enterprise: { indicator: 'text', text: '$25K annual min' },
      },
    ],
  },
  {
    name: 'Usage Limits',
    defaultOpen: false,
    rows: [
      {
        label: 'Max model usage',
        practitioner: { indicator: 'text', text: 'Limited' },
        enterprise: { indicator: 'text', text: 'Custom' },
      },
      {
        label: 'Voice recording',
        practitioner: { indicator: 'text', text: '20 hrs/mo/user' },
        enterprise: { indicator: 'text', text: 'Custom' },
      },
    ],
  },
]

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
// Desktop table
// ─────────────────────────────────────────────────────────

function DesktopComparison() {
  return (
    <div className="hidden md:block">
      {/* Header row */}
      <div className="border-ash-200 grid grid-cols-[1fr_180px_180px] gap-0 border-b pb-4">
        <div />
        <div className="font-display text-ash-800 text-center text-sm font-semibold tracking-wide uppercase">
          Practitioner
        </div>
        <div className="font-display text-ash-500 text-center text-sm font-semibold tracking-wide uppercase">
          Enterprise
        </div>
      </div>

      {/* Collapsible categories */}
      {FEATURE_CATEGORIES.map((category) => (
        <details
          key={category.name}
          className="group"
          open={category.defaultOpen ? true : undefined}
        >
          <summary className="flex cursor-pointer list-none items-center gap-3 py-4 [&::-webkit-details-marker]:hidden">
            <ChevronIcon />
            <span className="font-display text-ash-500 group-open:text-moss-600 text-xs font-semibold tracking-widest uppercase transition-colors">
              {category.name}
            </span>
          </summary>

          <div className="pb-2">
            {category.rows.map((row) => (
              <div key={row.label} className="grid grid-cols-[1fr_180px_180px] gap-0 py-2.5">
                <div className="text-ash-600 pl-7 text-sm">{row.label}</div>
                <div className="flex items-center justify-center">
                  <CellValue indicator={row.practitioner.indicator} text={row.practitioner.text} />
                </div>
                <div className="flex items-center justify-center">
                  <CellValue indicator={row.enterprise.indicator} text={row.enterprise.text} />
                </div>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Mobile cards
// ─────────────────────────────────────────────────────────

function MobileComparison() {
  return (
    <div className="space-y-6 md:hidden">
      {/* Practitioner card */}
      <div className="border-ash-200 border p-5">
        <h3 className="font-display border-ash-200 text-ash-800 mb-4 border-b pb-3 text-sm font-bold tracking-wide uppercase">
          Practitioner
        </h3>
        {FEATURE_CATEGORIES.map((category) => (
          <div key={category.name} className="mb-4 last:mb-0">
            <p className="font-display text-ash-400 mb-2 text-xs font-semibold tracking-widest uppercase">
              {category.name}
            </p>
            <dl className="space-y-2.5">
              {category.rows.map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4">
                  <dt className="text-ash-600 text-sm">{row.label}</dt>
                  <dd className="text-right text-sm font-medium">
                    <CellValue
                      indicator={row.practitioner.indicator}
                      text={row.practitioner.text}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {/* Enterprise card */}
      <div className="border-ash-200 border p-5">
        <h3 className="font-display border-ash-200 text-ash-600 mb-4 border-b pb-3 text-sm font-bold tracking-wide uppercase">
          Enterprise
        </h3>
        {FEATURE_CATEGORIES.map((category) => (
          <div key={category.name} className="mb-4 last:mb-0">
            <p className="font-display text-ash-400 mb-2 text-xs font-semibold tracking-widest uppercase">
              {category.name}
            </p>
            <dl className="space-y-2.5">
              {category.rows.map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4">
                  <dt className="text-ash-600 text-sm">{row.label}</dt>
                  <dd className="text-right text-sm font-medium">
                    <CellValue indicator={row.enterprise.indicator} text={row.enterprise.text} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────

export function FeatureComparison() {
  return (
    <section className="bg-sandstone-50 py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center md:mb-16">
            <Eyebrow size="sm" className="mb-3">
              Compare Plans
            </Eyebrow>
            <Heading className="text-3xl md:text-4xl">
              Everything you need, nothing you don't.
            </Heading>
          </div>

          <DesktopComparison />
          <MobileComparison />
        </div>
      </Container>
    </section>
  )
}
