import { Container } from '@/components/elements/container'

import { trustSecurity } from '../../_lib/content'

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      className="text-moss-600 mt-0.5 h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    </svg>
  )
}

export function PlatformTrust() {
  return (
    <section className="bg-ash-100/50 py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-ash-900 mb-6 text-2xl font-semibold tracking-tight md:text-3xl">
            {trustSecurity.headline}
          </h2>
          <p className="text-ash-600 mb-10 max-w-2xl text-lg/relaxed">
            {trustSecurity.description}
          </p>

          <ul className="mb-10 space-y-4" role="list">
            {trustSecurity.features.map((feature) => (
              <li key={feature.title} className="flex items-start gap-3">
                <ShieldIcon />
                <div>
                  <span className="text-ash-800 font-medium">{feature.title}</span>
                  <p className="text-ash-500 mt-0.5 text-sm/relaxed">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-ash-200 flex flex-wrap gap-2 border-t pt-8">
            {trustSecurity.badges.map((badge) => (
              <span
                key={badge}
                className="border-ash-300 text-ash-600 rounded-full border px-3 py-1 text-xs font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
