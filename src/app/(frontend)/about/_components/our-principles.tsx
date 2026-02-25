'use client'

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'

import { Container } from '@/components/elements/container'

import { principles } from '../_lib/content'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    y: 0,
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
}

export function OurPrinciples() {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '-50px', once: true })

  return (
    <section className="py-20 md:py-28">
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mx-auto max-w-4xl"
        >
          <div className="border-ash-950/10 relative rounded-[40px] border p-8 sm:rounded-[50px] sm:p-12 md:rounded-[70px] md:p-16 lg:p-[70px]">
            <motion.div
              className="bg-ash-50 absolute -top-4 left-8 px-4 sm:-top-5 sm:left-16 sm:px-6 md:left-20"
              variants={fadeInUp}
            >
              <h2 className="text-ash-950 font-serif text-[2rem]/10 tracking-tight sm:text-5xl/14">
                {principles.headline}
              </h2>
            </motion.div>

            <motion.p
              className="text-ash-700 mt-4 mb-8 text-sm/7 sm:text-base/7 md:mt-2 md:mb-10"
              variants={fadeInUp}
            >
              {principles.description}
            </motion.p>

            <motion.div
              className="grid grid-cols-1 gap-0 sm:grid-cols-2"
              variants={staggerContainer}
            >
              {principles.items.map((principle, index) => (
                <motion.div
                  key={index}
                  className={`py-6 pr-4 sm:pr-8 md:py-8 md:pr-12 ${
                    index >= 2 ? 'border-ash-950/10 border-t' : ''
                  } ${
                    index % 2 === 1 ? 'sm:border-ash-950/10 sm:border-l sm:pl-8 md:pl-12' : ''
                  } ${index < 2 ? 'border-ash-950/10 border-b sm:border-b-0' : ''}`}
                  variants={fadeInUp}
                >
                  <h3 className="text-ash-950 text-sm/7 font-semibold">{principle.title}</h3>
                  <p className="text-ash-700 mt-2 text-sm/7">{principle.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
