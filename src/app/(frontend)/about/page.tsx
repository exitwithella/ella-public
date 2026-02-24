import { ButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'

import { EllaLogoMark } from '../_assets/logo'
import { OurBelief } from './_components/our-belief'
import { OurPrinciples } from './_components/our-principles'

function AboutHero() {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="pointer-events-none absolute top-1/2 -right-20 -translate-y-1/2 opacity-[0.03] sm:-right-10 md:right-0 lg:right-10">
        <EllaLogoMark className="h-[400px] w-auto sm:h-[500px] md:h-[600px] lg:h-[700px]" />
      </div>
      <Container className="relative">
        <h1 className="font-display text-ash-950 max-w-4xl text-2xl font-semibold text-balance md:text-3xl xl:text-4xl">
          We're building tools for advisors who believe in their clients' legacies.
        </h1>
      </Container>
    </section>
  )
}

function AboutCta() {
  return (
    <CallToActionSimpleCentered
      headline="Believe what we believe?"
      subheadline={
        <p>
          We're crafting ELLA for you. Be one of the first to get access. Sign up for the waitlist
          for timely updates as we bring ELLA to market.
        </p>
      }
      cta={
        <ButtonLink href="https://app.exitwithella.io/sign-up" size="lg" target="_blank">
          Get Started
        </ButtonLink>
      }
    />
  )
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurBelief />
      <OurPrinciples />
      <AboutCta />
    </>
  )
}
