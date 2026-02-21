'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Container } from '@/components/elements/container'
import { FeatureBlock } from './feature-block'
import { horizontalScroll } from '../_lib/content'

function DecorativeLine() {
  return (
    <div className="absolute -bottom-4 left-0 h-1 w-screen -translate-x-1/2 bg-gradient-to-r from-transparent via-ella-gold/30 to-transparent" />
  )
}

export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Calculate the translation based on the number of cards
  const cardWidth = 970 // 950px card + 20px gap
  const totalCards = horizontalScroll.features.length
  const totalWidth = cardWidth * totalCards

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(totalWidth - 1000)]
  )

  return (
    <section ref={containerRef} className="relative bg-ella-slate" style={{ height: '250vh' }}>
      {/* Sticky Header */}
      <div className="sticky top-5 z-10 px-10 pt-24">
        <Container className="max-w-5xl">
          <div className="relative">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {horizontalScroll.headline}
            </h2>
            <DecorativeLine />
          </div>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-white/70">
            {horizontalScroll.description}
          </p>
        </Container>
      </div>

      {/* Sticky Horizontal Gallery */}
      <div className="sticky top-56 overflow-hidden px-10 pb-10">
        <Container className="max-w-6xl">
          <motion.div className="flex gap-5 py-10" style={{ x }}>
            {horizontalScroll.features.map((feature, index) => (
              <FeatureBlock
                key={index}
                title={feature.title}
                description={feature.description}
                tags={feature.tags}
              />
            ))}
          </motion.div>
        </Container>
      </div>
    </section>
  )
}
