import { ButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import type { Page } from '@/payload-types'

type Block = NonNullable<Page['layout']>[number]

interface BlockRendererProps {
  block: Block
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.blockType) {
    case 'hero': {
      return <HeroBlock block={block} />
    }
    case 'content': {
      return <ContentBlock block={block} />
    }
    case 'featureGrid': {
      return <FeatureGridBlock block={block} />
    }
    case 'testimonials': {
      return <TestimonialsBlock block={block} />
    }
    case 'cta': {
      return <CTABlock block={block} />
    }
    case 'formEmbed': {
      return <FormEmbedBlock block={block} />
    }
    default: {
      return null
    }
  }
}

function HeroBlock({ block }: { block: Extract<Block, { blockType: 'hero' }> }) {
  return (
    <section className="py-16">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Subheading>{block.headline}</Subheading>
        {block.subheadline && <Text className="max-w-2xl text-pretty">{block.subheadline}</Text>}
        {block.ctaText && block.ctaLink && (
          <ButtonLink href={block.ctaLink} size="lg">
            {block.ctaText}
          </ButtonLink>
        )}
      </Container>
    </section>
  )
}

function ContentBlock({ block }: { block: Extract<Block, { blockType: 'content' }> }) {
  return (
    <section className="py-16">
      <Container className="mx-auto max-w-3xl">
        <div className="prose prose-lg">
          <p className="text-ash-700">[Rich text content]</p>
        </div>
      </Container>
    </section>
  )
}

function FeatureGridBlock({ block }: { block: Extract<Block, { blockType: 'featureGrid' }> }) {
  return (
    <section className="py-16">
      <Container>
        {block.headline && <Subheading className="mb-4 text-center">{block.headline}</Subheading>}
        {block.subheadline && (
          <Text className="mb-12 text-center text-pretty">{block.subheadline}</Text>
        )}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {block.features?.map((feature, index) => (
            <div key={feature.id || index} className="flex flex-col gap-2 text-sm/7">
              <h3 className="text-ash-950 font-semibold">{feature.title}</h3>
              {feature.description && <p className="text-ash-700">{feature.description}</p>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function TestimonialsBlock({ block }: { block: Extract<Block, { blockType: 'testimonials' }> }) {
  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {block.testimonials?.map((testimonial, index) => (
            <div key={testimonial.id || index} className="flex flex-col gap-4 text-sm/7">
              <p className="font-serif text-ash-950">"{testimonial.quote}"</p>
              <div>
                <p className="text-ash-950 font-semibold">{testimonial.author}</p>
                {testimonial.company && <p className="text-ash-700">{testimonial.company}</p>}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function CTABlock({ block }: { block: Extract<Block, { blockType: 'cta' }> }) {
  return (
    <section className="py-16">
      <Container className="flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col gap-6">
          <Subheading className="max-w-4xl text-center">{block.headline}</Subheading>
          {block.description && (
            <Text className="max-w-3xl text-center text-pretty">{block.description}</Text>
          )}
        </div>
        {block.buttonText && block.buttonLink && (
          <ButtonLink href={block.buttonLink} size="lg">
            {block.buttonText}
          </ButtonLink>
        )}
      </Container>
    </section>
  )
}

function FormEmbedBlock({ block }: { block: Extract<Block, { blockType: 'formEmbed' }> }) {
  if (block.embedType === 'typeform' && block.formId) {
    return (
      <section className="py-16">
        <Container className="max-w-3xl">
          <iframe
            src={`https://form.typeform.com/to/${block.formId}`}
            title="Contact form"
            width="100%"
            height="500"
            className="border-0"
            loading="lazy"
            allow="camera; microphone; autoplay; encrypted-media;"
          />
        </Container>
      </section>
    )
  }

  if (block.embedType === 'loops' && block.formId) {
    return (
      <section className="py-16">
        <Container className="max-w-xl text-center">
          <p className="text-ash-700">[Loops form: {block.formId}]</p>
        </Container>
      </section>
    )
  }

  if (block.embedType === 'custom' && block.embedCode) {
    return (
      <section className="py-16">
        <Container className="max-w-3xl" dangerouslySetInnerHTML={{ __html: block.embedCode }} />
      </section>
    )
  }

  return null
}
