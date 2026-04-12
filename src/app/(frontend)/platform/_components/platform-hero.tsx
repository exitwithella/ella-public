import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'

import { platformHero } from '../_lib/content'

export function PlatformHero() {
  return (
    <section className="bg-sandstone-50 py-24 md:py-32">
      <Container>
        <Eyebrow className="mb-5">The Platform</Eyebrow>
        <Heading as="h1" className="max-w-3xl text-3xl text-balance md:text-4xl xl:text-5xl">
          {platformHero.headline}
        </Heading>
        <p className="text-ash-600 mt-6 max-w-xl text-lg/relaxed">{platformHero.subheadline}</p>
      </Container>
    </section>
  )
}
