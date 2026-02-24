import { RichText } from '@payloadcms/richtext-lexical/react'

import { Container } from '@/components/elements/container'
import type { Page, Testimonial } from '@/payload-types'

type FeatureDeepDiveData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'feature-deep-dive' }
>

interface FeatureDeepDiveBlockProps {
  block: FeatureDeepDiveData
}

const BG_CLASS: Record<string, string> = {
  cream: 'bg-ash-50',
  white: 'bg-ash-50',
  'ash-light': 'bg-ash-100',
  'forest-dark': 'bg-moss-900',
}

function TestimonialEmbed({ testimonial }: { testimonial: number | Testimonial }) {
  if (typeof testimonial === 'number') return null
  return (
    <blockquote className="border-moss-400 bg-ash-100 mt-8 rounded-sm border-l-2 p-6">
      {testimonial.quote && (
        <p className="font-serif text-ash-800 text-lg/relaxed">{testimonial.quote}</p>
      )}
      {(testimonial.name || testimonial.title) && (
        <footer className="text-ash-500 mt-3 text-sm font-medium">
          {[testimonial.name, testimonial.title].filter(Boolean).join(', ')}
        </footer>
      )}
    </blockquote>
  )
}

export function FeatureDeepDiveBlock({ block }: FeatureDeepDiveBlockProps) {
  const bg = BG_CLASS[block.bgStyle ?? 'cream'] ?? BG_CLASS.cream

  return (
    <section id={block.sectionId ?? undefined} className={`py-20 md:py-28 ${bg}`}>
      <Container>
        {/* Section label */}
        {block.sectionLabel && (
          <p className="text-moss-600 mb-4 text-xs font-semibold uppercase tracking-widest">
            {block.sectionLabel}
          </p>
        )}

        {/* Alternating sections */}
        {block.sections && block.sections.length > 0 && (
          <div className="space-y-20 md:space-y-28">
            {block.sections.map((section, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={section.id}
                  className={`flex flex-col gap-10 md:flex-row md:items-center md:gap-16 ${!isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Text side */}
                  <div className="flex-1">
                    <h3 className="font-display text-ash-900 mb-4 text-xl font-bold tracking-tight md:text-2xl">
                      {section.heading}
                    </h3>
                    {section.body && (
                      <div className="prose prose-lg text-ash-700 max-w-none">
                        <RichText data={section.body} />
                      </div>
                    )}
                    {section.testimonial && (
                      <TestimonialEmbed testimonial={section.testimonial} />
                    )}
                    {section.link?.href && section.link?.label && (
                      <a
                        href={section.link.href}
                        className="text-moss-700 hover:text-moss-800 mt-6 inline-flex items-center gap-1 text-sm font-semibold"
                      >
                        {section.link.label} →
                      </a>
                    )}
                  </div>

                  {/* Visual side — placeholder when no image */}
                  <div className="flex-1">
                    <div className="bg-ash-200 flex aspect-video items-center justify-center rounded-sm">
                      <span className="text-ash-400 text-sm">Product visual</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Container>
    </section>
  )
}
