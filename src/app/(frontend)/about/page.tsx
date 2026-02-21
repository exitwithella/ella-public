'use client'

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'
import { Main } from '@/components/elements/main'
import { Navbar } from '../_components/navbar'
import { Footer } from '../_components/footer'
import { Container } from '@/components/elements/container'
import { principles } from '../_lib/content'
import { EllaLogoMark } from '../_assets/logo'

// Animation variants for fade-in effect
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

// Animated section wrapper
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Hero section with offset layout and subtle background logo
// Main headline is visible immediately (no animation)
function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-ella-cream pb-16 pt-32 md:pb-24 md:pt-40">
      {/* Subtle background logo */}
      <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.03] sm:-right-10 md:right-0 lg:right-10">
        <EllaLogoMark className="h-[400px] w-auto sm:h-[500px] md:h-[600px] lg:h-[700px]" />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          {/* Offset headline - visible immediately, no fade */}
          <div className="lg:col-span-10 lg:col-start-2">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-ella-green sm:text-4xl md:text-5xl lg:text-[52px] lg:leading-[1.1]">
              We're building tools for advisors who believe in their clients' legacies.
            </h1>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Our Belief section with offset layout
// Heading fades in first, then body paragraphs fade in sequentially
function OurBelief() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  // Stagger container for paragraphs - starts after heading
  const paragraphContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3 // Delay after heading fades in
      }
    }
  }

  return (
    <section className="bg-ella-cream pb-20 md:pb-28" ref={ref}>
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          {/* Offset heading - fades in first */}
          <motion.div
            className="lg:col-span-3 lg:col-start-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            <h2 className="text-xl font-semibold text-ella-green md:text-2xl">
              Our Belief
            </h2>
          </motion.div>

          {/* Content offset to the right - paragraphs fade in sequentially after heading */}
          <motion.div
            className="space-y-6 lg:col-span-6 lg:col-start-5"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={paragraphContainer}
          >
            <motion.p
              className="text-base leading-relaxed text-ella-slate/90 md:text-lg md:leading-relaxed"
              variants={fadeInUp}
            >
              Small businesses are more than engines of the economy. They represent the life's work of their owners, anchors in their communities, and legacies passed through families. When it's time to move on, they deserve more than a transaction. They deserve a future; one that carries forward what they built.
            </motion.p>
            <motion.p
              className="text-base leading-relaxed text-ella-slate/90 md:text-lg md:leading-relaxed"
              variants={fadeInUp}
            >
              We believe exits should honor both the business and the owner: the risks taken, the relationships forged, and the impact made. But too often, owners are pushed toward quick deals, private equity offers that won't protect the legacy, or liquidation.
            </motion.p>
            <motion.p
              className="text-base leading-relaxed text-ella-slate/90 md:text-lg md:leading-relaxed"
              variants={fadeInUp}
            >
              We believe trusted advisors are the key to changing this status quo. When owners have someone who sees beyond numbers—seeing the story and legacy of the business—better exits are possible.
            </motion.p>
            <motion.p
              className="text-base font-medium leading-relaxed text-ella-green md:text-lg md:leading-relaxed"
              variants={fadeInUp}
            >
              We're building ELLA to make that easier.
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

// Our Principles section with 2x2 grid
function OurPrinciples() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section className="bg-ella-cream pb-24 pt-8 md:pb-32">
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mx-auto max-w-4xl"
        >
          {/* Rounded border container with floating title */}
          <div className="relative rounded-[40px] border border-ella-slate/20 p-8 sm:rounded-[50px] sm:p-12 md:rounded-[70px] md:p-16 lg:p-[70px]">
            {/* Floating title */}
            <motion.div
              className="absolute -top-4 left-8 bg-ella-cream px-4 sm:-top-5 sm:left-16 sm:px-6 md:left-20"
              variants={fadeInUp}
            >
              <h2 className="text-lg font-semibold tracking-tight text-ella-green sm:text-xl md:text-2xl lg:text-[29px]">
                {principles.headline}
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              className="mb-8 mt-4 text-sm leading-relaxed text-ella-slate/80 sm:text-base md:mb-10 md:mt-2"
              variants={fadeInUp}
            >
              {principles.description}
            </motion.p>

            {/* 2x2 Grid with dividers */}
            <motion.div
              className="grid grid-cols-1 gap-0 sm:grid-cols-2"
              variants={staggerContainer}
            >
              {principles.items.map((principle, index) => (
                <motion.div
                  key={index}
                  className={`py-6 pr-4 sm:pr-8 md:py-8 md:pr-12 ${
                    // Add top border for items not in first row
                    index >= 2 ? 'border-t border-ella-slate/15' : ''
                  } ${
                    // Add left border for items in second column on sm+
                    index % 2 === 1 ? 'sm:border-l sm:border-ella-slate/15 sm:pl-8 md:pl-12' : ''
                  } ${
                    // First row items get bottom border on mobile only
                    index < 2 ? 'border-b border-ella-slate/15 sm:border-b-0' : ''
                  }`}
                  variants={fadeInUp}
                >
                  <h3 className="text-base font-bold text-ella-green md:text-lg">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ella-slate/70 md:mt-3 md:text-[15px]">
                    {principle.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

// CTA Section
function AboutCta() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section className="bg-ella-green py-20 md:py-28">
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2
            className="text-2xl font-bold text-white sm:text-3xl md:text-4xl"
            variants={fadeInUp}
          >
            Believe what we believe?
          </motion.h2>
          <motion.p
            className="mt-4 text-base leading-relaxed text-white/80 md:mt-6 md:text-lg"
            variants={fadeInUp}
          >
            We're crafting ELLA for you. Be one of the first to get access. Sign up for the waitlist for timely updates as we bring ELLA to market.
          </motion.p>
          <motion.div className="mt-8" variants={fadeInUp}>
            <a
              href="https://app.exitwithella.io/sign-up"
              className="inline-block rounded-lg bg-ella-gold px-8 py-3 font-semibold text-white transition-colors hover:bg-ella-leather"
            >
              Get Started
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <Main>
        <AboutHero />
        <OurBelief />
        <OurPrinciples />
        <AboutCta />
      </Main>
      <Footer />
    </>
  )
}
