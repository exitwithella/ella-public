'use client'

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'

import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'

import { connectedWorkflow } from '../_lib/content'

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.12 },
  },
}

export function ConnectedWorkflow() {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '-50px', once: true })

  return (
    <section className="bg-ash-50 py-20 md:py-28">
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
              <Heading className="text-ash-950 text-xl sm:text-2xl md:text-3xl">
                {connectedWorkflow.headline}
              </Heading>
            </motion.div>

            <motion.p className="text-ash-600 mt-4 mb-10 text-sm/7 md:mt-2" variants={fadeInUp}>
              {connectedWorkflow.description}
            </motion.p>

            <motion.div
              className="grid grid-cols-1 gap-0 sm:grid-cols-3"
              variants={staggerContainer}
            >
              {connectedWorkflow.items.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`py-6 pr-4 sm:pr-8 md:py-8 md:pr-10 ${
                    index > 0
                      ? 'border-ash-950/10 border-t sm:border-t-0 sm:border-l sm:pl-8 md:pl-10'
                      : ''
                  }`}
                >
                  <Eyebrow className="mb-1 tracking-wider">
                    0{index + 1}
                  </Eyebrow>
                  <h3 className="text-ash-950 mb-2 text-sm font-semibold">{item.title}</h3>
                  <p className="text-ash-600 text-sm/6">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
