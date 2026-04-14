import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import type { PricingPage } from '@/payload-types'

type SharedFeature = NonNullable<PricingPage['sharedFeatures']>[number]

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

export function SharedFeatures({ features }: { features: SharedFeature[] }) {
  if (features.length === 0) return null

  return (
    <section className="bg-moss-50 py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <Eyebrow size="sm">Included in every plan</Eyebrow>
          </div>

          <div
            className={`grid grid-cols-2 gap-x-8 gap-y-4 ${features.length > 4 ? 'md:grid-cols-3' : ''}`}
          >
            {features.map((feature) => (
              <div key={feature.id} className="flex items-start gap-2.5">
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
