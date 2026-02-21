import { Container } from '@/components/elements/container'
import { testimonials } from '../_lib/content'

function TestimonialCard({
  quote,
  name,
  company,
}: {
  quote: string
  name: string
  company: string
}) {
  return (
    <div className="flex h-64 w-80 flex-col justify-between p-8">
      <p className="text-sm font-medium leading-relaxed text-ella-slate">{quote}</p>
      <div>
        <p className="text-sm font-semibold text-ella-green">{name}</p>
        <p className="text-sm font-medium text-ella-slate/70">{company}</p>
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="bg-ella-cream py-12">
      <Container>
        <div className="flex flex-wrap justify-center gap-0">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              company={testimonial.company}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
