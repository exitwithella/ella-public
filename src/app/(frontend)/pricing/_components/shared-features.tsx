import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'

const SHARED_FEATURES = [
  {
    icon: 'MagnifyingGlass',
    label: 'Fact Finding with custom templates',
  },
  {
    icon: 'Brain',
    label: 'AI Sensemaking for all advisors',
  },
  {
    icon: 'FileText',
    label: 'Deliverables & custom templates',
  },
  {
    icon: 'Microphone',
    label: 'Voice recording with meeting prep',
  },
  {
    icon: 'EnvelopeSimple',
    label: 'Meeting prep & recap emails',
  },
  {
    icon: 'ArrowsClockwise',
    label: 'Calendar sync & MCP integrations',
  },
]

function FeatureIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="text-moss-600 shrink-0"
    >
      <path
        d="M4 10l4.5 4.5L16 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SharedFeatures() {
  return (
    <section className="bg-moss-50 py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <Eyebrow size="sm">Included in every plan</Eyebrow>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-3">
            {SHARED_FEATURES.map((feature) => (
              <div key={feature.label} className="flex items-start gap-2.5">
                <FeatureIcon />
                <span className="text-ash-700 text-sm">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
