import { Container } from '@/components/elements/container'

const TRUST_SIGNALS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M10 2L3 5v5c0 4.418 3.134 7.98 7 9 3.866-1.02 7-4.582 7-9V5l-7-3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    text: 'SOC 2 compliant. Your client data is never used to train AI.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 6v4l2.5 2.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    text: 'Cancel anytime. No long-term contracts.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M4 10h12M10 4l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    text: 'Built by ei Innovations, Erie Insurance\u2019s venture studio.',
  },
]

export function TrustStrip() {
  return (
    <section className="bg-ash-100 py-10 md:py-14">
      <Container>
        <ul className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10 md:gap-14">
          {TRUST_SIGNALS.map((signal) => (
            <li key={signal.text} className="text-ash-500 flex items-center gap-3 text-sm">
              <span className="text-ash-400 shrink-0">{signal.icon}</span>
              <span>{signal.text}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
