import { Container } from '@/components/elements/container'
import { principles } from '../_lib/content'

export function PrinciplesGrid() {
  return (
    <section className="bg-ella-cream pb-24 pt-0">
      <Container>
        <div className="relative mx-auto max-w-4xl rounded-[70px] border border-gray-300 p-12 sm:p-16 lg:p-[70px]">
          {/* Floating title */}
          <div className="absolute -top-5 left-20 bg-ella-cream px-6 sm:left-24">
            <h2 className="text-xl font-semibold tracking-tight text-ella-green sm:text-2xl lg:text-[29px]">
              {principles.headline}
            </h2>
          </div>

          {/* Description */}
          <p className="mb-8 text-base leading-relaxed text-ella-slate/80">
            {principles.description}
          </p>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 gap-px bg-gray-300 sm:grid-cols-2">
            {principles.items.map((principle, index) => (
              <div key={index} className="bg-ella-cream py-5 pr-8 sm:pr-12">
                <h3 className="font-bold text-ella-green">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ella-slate/70">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
