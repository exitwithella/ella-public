import { Container } from '@/components/elements/container'
import { finalCta } from '../_lib/content'

function EmailSignupPlaceholder() {
  return (
    <form className="flex w-full max-w-lg gap-2">
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-ella-slate placeholder:text-ella-slate/50 focus:border-ella-gold focus:outline-none focus:ring-1 focus:ring-ella-gold"
      />
      <button
        type="submit"
        className="rounded-lg bg-ella-gold px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-ella-leather"
      >
        Join Waitlist
      </button>
    </form>
  )
}

export function FinalCta() {
  return (
    <section className="bg-ella-cream px-10 py-24">
      <Container className="max-w-5xl">
        <div className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ella-green sm:text-4xl">
            {finalCta.headline}
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-ella-slate/80">
            {finalCta.description}
          </p>
          <EmailSignupPlaceholder />
        </div>
      </Container>
    </section>
  )
}
