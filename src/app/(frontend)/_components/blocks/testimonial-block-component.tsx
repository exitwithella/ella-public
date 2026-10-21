import Image from 'next/image'

import { Container } from '@/components/elements/container'
import { SectionHeader } from '@/components/elements/section-header'
import { ThemeSection } from '@/components/elements/theme-section'
import type { Page, Solution, Testimonial } from '@/payload-types'

import { resolveMedia } from './resolve-media'

type TestimonialBlockData =
  | Extract<NonNullable<Page['layout']>[number], { blockType: 'testimonial-block' }>
  | Extract<NonNullable<Solution['layout']>[number], { blockType: 'testimonial-block' }>

interface TestimonialBlockComponentProps {
  block: TestimonialBlockData
}

function isPopulated(t: number | Testimonial): t is Testimonial {
  return typeof t !== 'number'
}

function SingleTestimonial({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {/* Decorative quote mark */}
      <span
        className="text-goldenrod-400 font-serif text-6xl leading-none select-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <blockquote className="-mt-4">
        <p className="text-ash-800 font-serif text-xl/relaxed md:text-2xl/relaxed">
          {testimonial.quote}
        </p>
      </blockquote>
      <footer className="mt-6">
        <p className="text-ash-900 text-sm font-semibold">{testimonial.name}</p>
        {(testimonial.title || testimonial.company) && (
          <p className="text-ash-700 mt-1 text-sm">
            {[testimonial.title, testimonial.company].filter(Boolean).join(', ')}
          </p>
        )}
      </footer>
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const photo = resolveMedia(testimonial.photo)

  return (
    <div className="border-ash-200 bg-sandstone-50 rounded-sm border p-8">
      <blockquote>
        <p className="text-ash-700 text-base/relaxed">{testimonial.quote}</p>
      </blockquote>
      <footer className="mt-6 flex items-center gap-3">
        {photo ? (
          <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src={photo.url}
              alt={photo.alt || testimonial.name}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
        ) : null}
        <div>
          <p className="text-ash-900 text-sm font-semibold">{testimonial.name}</p>
          {(testimonial.title || testimonial.company) && (
            <p className="text-ash-700 text-xs">
              {[testimonial.title, testimonial.company].filter(Boolean).join(', ')}
            </p>
          )}
        </div>
      </footer>
    </div>
  )
}

export function TestimonialBlockComponent({ block }: TestimonialBlockComponentProps) {
  const populated = (block.testimonials ?? []).filter(isPopulated)
  if (populated.length === 0) return null

  const layout = block.layout ?? 'single'

  return (
    <ThemeSection bgStyle={block.bgStyle} className="py-20 md:py-28">
      <Container>
        <SectionHeader
          label={block.sectionLabel}
          heading={block.heading}
          align={layout === 'single' ? 'center' : 'left'}
        />

        {/* Single layout */}
        {layout === 'single' && populated[0] && <SingleTestimonial testimonial={populated[0]} />}

        {/* Grid layout (also used as carousel fallback) */}
        {(layout === 'grid' || layout === 'carousel') && (
          <div
            className={`grid grid-cols-1 gap-8 ${
              populated.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {populated.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}
      </Container>
    </ThemeSection>
  )
}
