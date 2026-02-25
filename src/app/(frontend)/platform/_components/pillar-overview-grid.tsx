'use client'

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'

import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'

import { pillarCards } from '../../_lib/content'
import { platformPillars } from '../_lib/content'

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.12,
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export function PillarOverviewGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '-50px', once: true })

  return (
    <section className="bg-ash-50 pb-20 md:pb-28">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="mb-12 md:mb-16"
        >
          <Eyebrow color="ash" className="mb-3">
            {pillarCards.eyebrow}
          </Eyebrow>
          <Heading className="text-ash-950">{pillarCards.headline}</Heading>
          <p className="text-ash-600 mt-4 max-w-2xl text-lg/relaxed">{pillarCards.description}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
        >
          {platformPillars.map((pillar) => (
            <motion.a
              key={pillar.id}
              href={`#${pillar.id}`}
              variants={fadeInUp}
              className="border-ash-200 bg-ash-100 group hover:border-moss-300 block rounded-sm border p-8 transition-colors md:p-10"
            >
              <p className="font-display text-moss-700 mb-3 text-sm font-semibold tracking-wider uppercase">
                {pillar.tag}
              </p>
              <h3 className="text-ash-900 mb-3 text-lg font-semibold">{pillar.headline}</h3>
              <p className="text-ash-600 text-sm/relaxed">{pillar.description}</p>

              <ul className="mt-6 space-y-2">
                {pillar.capabilities.map((cap) => (
                  <li key={cap} className="text-ash-600 flex items-start gap-2 text-sm">
                    <span className="text-moss-600 mt-0.5 shrink-0 leading-none" aria-hidden="true">
                      →
                    </span>
                    {cap}
                  </li>
                ))}
              </ul>

              <p className="text-moss-700 group-hover:text-moss-800 mt-6 text-sm font-semibold transition-colors">
                See details ↓
              </p>
            </motion.a>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
