'use client'

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'
import { ButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { principles } from '../_lib/content'
import { EllaLogoMark } from '../_assets/logo'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

function AboutHero() {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.03] sm:-right-10 md:right-0 lg:right-10">
        <EllaLogoMark className="h-[400px] w-auto sm:h-[500px] md:h-[600px] lg:h-[700px]" />
      </div>
      <Container className="relative">
        <h1 className="max-w-4xl font-display text-5xl/12 tracking-tight text-balance text-ash-950 sm:text-[5rem]/20">
          We're building tools for advisors who believe in their clients' legacies.
        </h1>
      </Container>
    </section>
  )
}

function OurBelief() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const paragraphContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  }

  return (
    <section className="py-16" ref={ref}>
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          <motion.div
            className="lg:col-span-3 lg:col-start-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            <h2 className="font-display text-[2rem]/10 tracking-tight text-ash-950 sm:text-5xl/14">
              Our Belief
            </h2>
          </motion.div>

          <motion.div
            className="space-y-6 lg:col-span-6 lg:col-start-5"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={paragraphContainer}
          >
            <motion.p className="text-base/7 text-ash-700" variants={fadeInUp}>
              Small businesses are more than engines of the economy. They represent the life's work
              of their owners, anchors in their communities, and legacies passed through families.
              When it's time to move on, they deserve more than a transaction. They deserve a future;
              one that carries forward what they built.
            </motion.p>
            <motion.p className="text-base/7 text-ash-700" variants={fadeInUp}>
              We believe exits should honor both the business and the owner: the risks taken, the
              relationships forged, and the impact made. But too often, owners are pushed toward
              quick deals, private equity offers that won't protect the legacy, or liquidation.
            </motion.p>
            <motion.p className="text-base/7 text-ash-700" variants={fadeInUp}>
              We believe trusted advisors are the key to changing this status quo. When owners have
              someone who sees beyond numbers — seeing the story and legacy of the business — better
              exits are possible.
            </motion.p>
            <motion.p className="text-base/7 font-semibold text-ash-950" variants={fadeInUp}>
              We're building ELLA to make that easier.
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

function OurPrinciples() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section className="py-16">
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mx-auto max-w-4xl"
        >
          <div className="relative rounded-[40px] border border-ash-950/10 p-8 sm:rounded-[50px] sm:p-12 md:rounded-[70px] md:p-16 lg:p-[70px]">
            <motion.div
              className="absolute -top-4 left-8 bg-ash-50 px-4 sm:-top-5 sm:left-16 sm:px-6 md:left-20"
              variants={fadeInUp}
            >
              <h2 className="font-display text-[2rem]/10 tracking-tight text-ash-950 sm:text-5xl/14">
                {principles.headline}
              </h2>
            </motion.div>

            <motion.p className="mb-8 mt-4 text-sm/7 text-ash-700 sm:text-base/7 md:mb-10 md:mt-2" variants={fadeInUp}>
              {principles.description}
            </motion.p>

            <motion.div className="grid grid-cols-1 gap-0 sm:grid-cols-2" variants={staggerContainer}>
              {principles.items.map((principle, index) => (
                <motion.div
                  key={index}
                  className={`py-6 pr-4 sm:pr-8 md:py-8 md:pr-12 ${
                    index >= 2 ? 'border-t border-ash-950/10' : ''
                  } ${
                    index % 2 === 1
                      ? 'sm:border-l sm:border-ash-950/10 sm:pl-8 md:pl-12'
                      : ''
                  } ${index < 2 ? 'border-b border-ash-950/10 sm:border-b-0' : ''}`}
                  variants={fadeInUp}
                >
                  <h3 className="text-sm/7 font-semibold text-ash-950">{principle.title}</h3>
                  <p className="mt-2 text-sm/7 text-ash-700">{principle.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
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
