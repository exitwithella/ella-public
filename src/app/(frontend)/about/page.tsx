import type { Metadata } from 'next'

import { Container } from '@/components/elements/container'

import { EllaLogoMark } from '../_assets/logo'
import { AboutCloser } from './_components/about-closer'
import { OriginStory } from './_components/origin-story'
import { OurBelief } from './_components/our-belief'
import { OurPrinciples } from './_components/our-principles'

export const metadata: Metadata = {
  title: 'About — ELLA',
  description:
    'ELLA was built by advisors, for advisors. We started with conversations, not code — 100+ real advisor conversations before writing a line.',
  openGraph: {
    title: 'About ELLA',
    description:
      'We started with conversations, not code. The origin story behind ELLA and why we built it.',
    url: 'https://withella.io/about',
  },
}

function AboutHero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute top-1/2 -right-20 -translate-y-1/2 opacity-[0.03] sm:-right-10 md:right-0 lg:right-10">
        <EllaLogoMark className="h-[400px] w-auto sm:h-[500px] md:h-[600px] lg:h-[700px]" />
      </div>
      <Container className="relative">
        <h1 className="font-display text-ash-950 max-w-3xl text-3xl font-semibold tracking-tight text-balance md:text-4xl xl:text-5xl">
          We're building for advisors who believe practice is more than process.
        </h1>
        <p className="text-ash-600 mt-6 max-w-xl text-lg/relaxed">
          ELLA was built from conversations, not assumptions. Over a year of listening before a line
          of code was written.
        </p>
      </Container>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurBelief />
      <OurPrinciples />
      <OriginStory />
      <AboutCloser />
    </>
  )
}
