import { Container } from '@/components/elements/container'
import { aiCta } from '../_lib/content'

export function AiCta() {
  return (
    <section className="bg-ella-cream px-10 pt-24">
      <Container className="max-w-5xl">
        <div className="rounded-xl bg-ella-green p-10 sm:p-12">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-xl font-bold text-ella-cream sm:text-2xl">
                {aiCta.headline}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-ella-cream/80">
                {aiCta.description}
              </p>
            </div>

            {/* AI Buttons */}
            <div className="flex w-full flex-col gap-5 sm:w-auto">
              {aiCta.buttons.map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-ella-green-50 px-6 py-2.5 text-sm font-medium text-ella-green transition-colors hover:bg-white"
                >
                  {button.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
