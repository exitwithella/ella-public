import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'

export function PricingHero() {
  return (
    <section className="bg-sandstone-50 py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow size="sm" className="mb-4">
            Pricing
          </Eyebrow>
          <Heading as="h1" className="text-ash-950 mb-6">
            Simple, transparent pricing.
          </Heading>
          <p className="text-ash-600 text-lg/relaxed">
            One plan for the solo practitioner. Custom solutions for teams and firms.
          </p>
        </div>
      </Container>
    </section>
  )
}
