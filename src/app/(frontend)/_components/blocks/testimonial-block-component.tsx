import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import type { Page, Solution, Testimonial } from '@/payload-types'

type TestimonialBlockData =
  | Extract<NonNullable<Page['layout']>[number], { blockType: 'testimonial-block' }>
  | Extract<NonNullable<Solution['layout']>[number], { blockType: 'testimonial-block' }>

interface TestimonialBlockComponentProps {
  block: TestimonialBlockData
}

const BG_CLASS: Record<string, string> = {
  cream: 'bg-ash-50',
  white: 'bg-ash-50',
  'ash-light': 'bg-ash-100',
  'forest-dark': 'bg-moss-900',
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
          <p className="text-ash-500 mt-1 text-sm">
            {[testimonial.title, testimonial.company].filter(Boolean).join(', ')}
          </p>
        )}
      </footer>
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="border-ash-200 bg-ash-50 rounded-sm border p-8">
      <blockquote>
        <p className="text-ash-700 text-base/relaxed">{testimonial.quote}</p>
      </blockquote>
      <footer className="mt-6 flex items-center gap-3">
        {/* Photo placeholder — will render actual image when media is populated */}
        <div className="bg-ash-200 size-10 shrink-0 rounded-full" aria-hidden="true" />
        <div>
          <p className="text-ash-900 text-sm font-semibold">{testimonial.name}</p>
          {(testimonial.title || testimonial.company) && (
            <p className="text-ash-500 text-xs">
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

  const bg = BG_CLASS[block.bgStyle ?? 'cream'] ?? BG_CLASS.cream
  const isForestDark = block.bgStyle === 'forest-dark'
  const layout = block.layout ?? 'single'

  return (
    <section className={`py-20 md:py-28 ${bg}`}>
      <Container>
        {/* Section header */}
        {(block.sectionLabel || block.heading) && (
          <div className={`mb-12 md:mb-16 ${layout === 'single' ? 'text-center' : ''}`}>
            {block.sectionLabel && (
              <Eyebrow color={isForestDark ? 'light' : 'moss'} className="mb-3">
                {block.sectionLabel}
              </Eyebrow>
            )}
            {block.heading && (
              <Heading color={isForestDark ? 'cream' : 'dark'}>
                {block.heading}
              </Heading>
            )}
          </div>
        )}

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
    </section>
  )
}
