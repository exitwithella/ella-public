import { Container } from '@/components/elements/container'
import { alternatingFeatures } from '../_lib/content'

function ImagePlaceholder({ alt }: { alt: string }) {
  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg bg-ella-green-50">
      <span className="text-sm text-ella-slate/50">{alt}</span>
    </div>
  )
}

function FeatureRow({
  headline,
  description,
  imageAlt,
  reversed,
}: {
  headline: string
  description: string
  imageAlt: string
  reversed?: boolean
}) {
  return (
    <div
      className={`flex flex-col items-center gap-16 lg:flex-row ${
        reversed ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Image */}
      <div className="w-full lg:w-1/2">
        <ImagePlaceholder alt={imageAlt} />
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2">
        <h3 className="text-2xl font-semibold tracking-tight text-ella-green sm:text-[29px]">
          {headline}
        </h3>
        <p className="mt-5 text-lg leading-relaxed text-ella-slate/80">{description}</p>
      </div>
    </div>
  )
}

export function AlternatingFeatures() {
  return (
    <section className="bg-ella-cream py-10 pb-24">
      <Container className="max-w-5xl">
        <div className="flex flex-col gap-24">
          {alternatingFeatures.map((feature, index) => (
            <FeatureRow
              key={index}
              headline={feature.headline}
              description={feature.description}
              imageAlt={feature.imageAlt}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
