'use client'

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'

import { Container } from '@/components/elements/container'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    y: 0,
  },
}

export function OurBelief() {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '-50px', once: true })

  const paragraphContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.12,
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
            <h2 className="font-serif text-ash-950 text-[2rem]/10 tracking-tight sm:text-5xl/14">
              Our Belief
            </h2>
          </motion.div>

          <motion.div
            className="space-y-6 lg:col-span-6 lg:col-start-5"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={paragraphContainer}
          >
            <motion.p className="text-ash-700 text-base/7" variants={fadeInUp}>
              Small businesses are more than engines of the economy. They represent the life's work
              of their owners, anchors in their communities, and legacies passed through families.
              When it's time to move on, they deserve more than a transaction. They deserve a
              future; one that carries forward what they built.
            </motion.p>
            <motion.p className="text-ash-700 text-base/7" variants={fadeInUp}>
              We believe exits should honor both the business and the owner: the risks taken, the
              relationships forged, and the impact made. But too often, owners are pushed toward
              quick deals, private equity offers that won't protect the legacy, or liquidation.
            </motion.p>
            <motion.p className="text-ash-700 text-base/7" variants={fadeInUp}>
              We believe trusted advisors are the key to changing this status quo. When owners have
              someone who sees beyond numbers — seeing the story and legacy of the business — better
              exits are possible.
            </motion.p>
            <motion.p className="text-ash-950 text-base/7 font-semibold" variants={fadeInUp}>
              We're building ELLA to make that easier.
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
