import { Container } from '@/components/elements/container'

import { platformHero } from '../../_lib/content'

export function PlatformHero() {
  return (
    <section className="bg-ash-50 py-24 md:py-32">
      <Container>
        <p className="text-moss-600 mb-5 text-xs font-semibold tracking-widest uppercase">
          The Platform
        </p>
        <h1 className="font-display text-ash-950 max-w-3xl text-3xl font-semibold tracking-tight text-balance md:text-4xl xl:text-5xl">
          {platformHero.headline}
        </h1>
        <p className="text-ash-600 mt-6 max-w-xl text-lg/relaxed">{platformHero.subheadline}</p>
      </Container>
    </section>
  )
}
