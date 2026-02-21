'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Container } from '@/components/elements/container'
import { introText } from '../_lib/content'

function Word({
  word,
  index,
  totalWords,
  scrollYProgress,
}: {
  word: string
  index: number
  totalWords: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const start = index / totalWords
  const end = (index + 1) / totalWords

  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1])

  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{' '}
    </motion.span>
  )
}

export function IntroTextReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const words = introText.text.split(' ')

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.3'],
  })

  return (
    <section ref={containerRef} className="bg-ella-green py-28 min-h-[50vh]">
      <Container className="flex items-center justify-center px-10">
        <p className="max-w-4xl text-center text-xl font-semibold leading-[1.5] tracking-tight text-ella-cream sm:text-2xl md:text-[26px]">
          {words.map((word, index) => (
            <Word
              key={index}
              word={word}
              index={index}
              totalWords={words.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </p>
      </Container>
    </section>
  )
}
