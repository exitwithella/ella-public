'use client'

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import Link from 'next/link'
import { useRef } from 'react'

import { Container } from '@/components/elements/container'

import { originStory } from '../../_lib/content'

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const stagger = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.14 },
  },
}

export function OriginStory() {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '-60px', once: true })

  return (
    <section className="bg-ash-100/50 py-20 md:py-28">
      <Container>
        <motion.div
          ref={ref}
          className="mx-auto max-w-[680px]"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.h2
            className="font-display text-ash-950 mb-10 text-2xl font-semibold tracking-tight md:text-3xl"
            variants={fadeInUp}
          >
            {originStory.headline}
          </motion.h2>

          {originStory.paragraphs.map((para, index) => (
            <motion.p
              key={index}
              className={`text-ash-700 mb-6 text-base/7 ${para.serif ? 'text-ash-900 font-serif text-xl/8 md:text-2xl/9' : ''}`}
              variants={fadeInUp}
            >
              {para.text}
            </motion.p>
          ))}

          <motion.div className="mt-10" variants={fadeInUp}>
            <Link
              href={originStory.link.href}
              className="text-moss-700 hover:text-moss-800 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
            >
              {originStory.link.label}
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
