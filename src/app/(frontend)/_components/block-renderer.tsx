import type { Page } from '@/payload-types'

type Block = NonNullable<Page['layout']>[number]

interface BlockRendererProps {
  block: Block
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.blockType) {
    case 'hero':
      return <HeroBlock block={block} />
    case 'content':
      return <ContentBlock block={block} />
    case 'featureGrid':
      return <FeatureGridBlock block={block} />
    case 'testimonials':
      return <TestimonialsBlock block={block} />
    case 'cta':
      return <CTABlock block={block} />
    case 'formEmbed':
      return <FormEmbedBlock block={block} />
    default:
      return null
  }
}

function HeroBlock({ block }: { block: Extract<Block, { blockType: 'hero' }> }) {
  return (
    <section className="flex flex-col items-center justify-center gap-5 px-10 py-20 text-center">
      <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
        {block.headline}
      </h1>
      {block.subheadline && (
        <p className="max-w-2xl text-lg text-gray-600 md:text-xl">{block.subheadline}</p>
      )}
      {block.ctaText && block.ctaLink && (
        <a
          href={block.ctaLink}
          className="mt-4 rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition hover:bg-amber-700"
        >
          {block.ctaText}
        </a>
      )}
    </section>
  )
}

function ContentBlock({ block }: { block: Extract<Block, { blockType: 'content' }> }) {
  // For richText, we'd need a proper renderer - for now just show a placeholder
  return (
    <section className="mx-auto max-w-3xl px-10 py-16">
      <div className="prose prose-lg">
        {/* TODO: Add Lexical richText renderer */}
        <p className="text-gray-500">[Rich text content]</p>
      </div>
    </section>
  )
}

function FeatureGridBlock({ block }: { block: Extract<Block, { blockType: 'featureGrid' }> }) {
  return (
    <section className="px-10 py-16">
      <div className="mx-auto max-w-6xl">
        {block.headline && (
          <h2 className="mb-4 text-center text-3xl font-bold">{block.headline}</h2>
        )}
        {block.subheadline && (
          <p className="mb-12 text-center text-lg text-gray-600">{block.subheadline}</p>
        )}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {block.features?.map((feature, index) => (
            <div key={feature.id || index} className="rounded-lg border p-6">
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              {feature.description && <p className="text-gray-600">{feature.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsBlock({ block }: { block: Extract<Block, { blockType: 'testimonials' }> }) {
  return (
    <section className="bg-gray-50 px-10 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {block.testimonials?.map((testimonial, index) => (
            <div key={testimonial.id || index} className="rounded-lg bg-white p-6 shadow">
              <p className="mb-4 text-gray-700">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                {testimonial.company && (
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTABlock({ block }: { block: Extract<Block, { blockType: 'cta' }> }) {
  const bgColor = block.backgroundColor || '#3f4839'

  return (
    <section className="px-10 py-16" style={{ backgroundColor: bgColor }}>
      <div className="mx-auto max-w-3xl text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">{block.headline}</h2>
        {block.description && <p className="mb-8 text-lg opacity-90">{block.description}</p>}
        {block.buttonText && block.buttonLink && (
          <a
            href={block.buttonLink}
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-gray-900 transition hover:bg-gray-100"
          >
            {block.buttonText}
          </a>
        )}
      </div>
    </section>
  )
}

function FormEmbedBlock({ block }: { block: Extract<Block, { blockType: 'formEmbed' }> }) {
  if (block.embedType === 'typeform' && block.formId) {
    return (
      <section className="px-10 py-16">
        <div className="mx-auto max-w-3xl">
          <iframe
            src={`https://form.typeform.com/to/${block.formId}`}
            width="100%"
            height="500"
            frameBorder="0"
            allow="camera; microphone; autoplay; encrypted-media;"
          />
        </div>
      </section>
    )
  }

  if (block.embedType === 'loops' && block.formId) {
    return (
      <section className="px-10 py-16">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-gray-500">[Loops form: {block.formId}]</p>
        </div>
      </section>
    )
  }

  if (block.embedType === 'custom' && block.embedCode) {
    return (
      <section className="px-10 py-16">
        <div
          className="mx-auto max-w-3xl"
          dangerouslySetInnerHTML={{ __html: block.embedCode }}
        />
      </section>
    )
  }

  return null
}
