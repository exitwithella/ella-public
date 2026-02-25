import { Container } from '@/components/elements/container'

export function PricingHero() {
  return (
    <section className="bg-ash-50 py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-moss-600 mb-4 text-sm font-semibold tracking-widest uppercase">
            Pricing
          </p>
          <h1 className="font-display text-ash-950 mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            Simple, transparent pricing.
          </h1>
          <p className="text-ash-600 text-lg/relaxed">
            One plan for the solo practitioner. Custom solutions for teams and firms.
          </p>
        </div>
      </Container>
    </section>
  )
}
