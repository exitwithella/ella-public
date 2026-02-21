import Link from 'next/link'
import { Container } from '@/components/elements/container'
import { ButtonLink } from '@/components/elements/button'
import { featuresGrid } from '../_lib/content'

function FeatureTag({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="inline-flex rounded-full bg-ella-green-50 px-3 py-1 text-sm font-bold text-ella-green transition hover:bg-ella-green-50/70"
    >
      {children}
    </Link>
  )
}

function FeatureCard({
  tag,
  headline,
  description,
  ctaHref,
}: {
  tag: string
  headline: string
  description: string
  ctaHref: string
}) {
  return (
    <div className="flex flex-col gap-2.5 px-6 py-10">
      <FeatureTag href={ctaHref}>{tag}</FeatureTag>
      <h3 className="text-base font-semibold leading-snug text-ella-green">{headline}</h3>
      <p className="text-sm font-medium leading-relaxed text-ella-slate/70">{description}</p>
    </div>
  )
}

export function FeaturesGrid() {
  return (
    <section className="bg-ella-cream py-12">
      <Container className="max-w-5xl">
        {/* Header */}
        <div className="mb-4 px-6 pt-10 text-center">
          <p className="text-sm font-medium text-ella-slate/70">{featuresGrid.eyebrow}</p>
          <h2 className="mt-1 text-2xl font-bold text-ella-green sm:text-3xl">
            {featuresGrid.headline}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
          {featuresGrid.features.map((feature) => (
            <FeatureCard
              key={feature.tag}
              tag={feature.tag}
              headline={feature.headline}
              description={feature.description}
              ctaHref={featuresGrid.cta.href}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center pb-10 pt-6">
          <ButtonLink
            href={featuresGrid.cta.href}
            target="_blank"
            className="!rounded-full !bg-ella-slate !px-5 !py-2.5 !text-sm !font-medium !text-white hover:!bg-ella-green"
          >
            {featuresGrid.cta.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
