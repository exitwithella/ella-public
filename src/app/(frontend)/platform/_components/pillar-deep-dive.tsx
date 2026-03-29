'use client'

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'

import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'

interface PillarData {
  id: string
  tag: string
  headline: string
  description: string
  capabilities: string[]
}

interface PillarDeepDiveProps {
  pillar: PillarData
  index: number
  bgLight?: boolean
}

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.1 },
  },
}

function VisualPlaceholder({ tag }: { tag: string }) {
  return (
    <div className="bg-ash-200/60 border-ash-300/50 flex aspect-[4/3] w-full items-center justify-center rounded-sm border">
      <div className="text-center">
        <div className="bg-ash-300/60 mx-auto mb-3 h-1 w-12 rounded-full" />
        <Eyebrow color="ash" className="font-display text-ash-400">
          {tag}
        </Eyebrow>
        <p className="text-ash-400 mt-1 text-xs">Screenshot coming soon</p>
        <div className="bg-ash-300/60 mx-auto mt-3 h-1 w-8 rounded-full" />
      </div>
    </div>
  )
}

export function PillarDeepDive({ pillar, index, bgLight = false }: PillarDeepDiveProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '-80px', once: true })

  const reversed = index % 2 === 1

  return (
    <section id={pillar.id} className={`py-20 md:py-28 ${bgLight ? 'bg-ash-100/50' : 'bg-ash-50'}`}>
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
            reversed ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          <div>
            <motion.div variants={fadeInUp}>
              <Eyebrow className="font-display mb-4">{pillar.tag}</Eyebrow>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Heading className="text-ash-950 mb-5 text-balance">{pillar.headline}</Heading>
            </motion.div>
            <motion.p
              variants={fadeInUp}
              className="text-ash-600 mb-8 text-base/relaxed md:text-lg/relaxed"
            >
              {pillar.description}
            </motion.p>

            <motion.ul variants={staggerContainer} className="space-y-3">
              {pillar.capabilities.map((cap) => (
                <motion.li key={cap} variants={fadeInUp} className="flex items-start gap-3">
                  <span
                    className="text-moss-600 mt-0.5 shrink-0 text-base leading-none"
                    aria-hidden="true"
                  >
                    →
                  </span>
                  <span className="text-ash-700 text-sm/relaxed">{cap}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.div variants={fadeInUp}>
            <VisualPlaceholder tag={pillar.tag} />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
