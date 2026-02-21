import { Container } from '@/components/elements/container'
import { sectionHeader } from '../_lib/content'

function DecorativeLine() {
  return (
    <div className="absolute -bottom-4 left-0 h-1 w-screen -translate-x-1/2 bg-gradient-to-r from-transparent via-ella-gold/30 to-transparent" />
  )
}

export function SectionHeader() {
  return (
    <section className="bg-ella-cream pb-12 pt-24">
      <Container className="max-w-5xl">
        <div className="flex flex-col gap-10">
          {/* Headline with decorative line */}
          <div className="relative">
            {sectionHeader.headline.map((line, index) => (
              <h2
                key={index}
                className="text-3xl font-bold tracking-tight text-ella-green sm:text-4xl"
              >
                {line}
              </h2>
            ))}
            <DecorativeLine />
          </div>

          {/* Description */}
          <p className="max-w-2xl text-base leading-relaxed text-ella-slate/80">
            {sectionHeader.description}
          </p>
        </div>
      </Container>
    </section>
  )
}
