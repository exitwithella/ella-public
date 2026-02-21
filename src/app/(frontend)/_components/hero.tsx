'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Text } from '@/components/elements/text'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'

import { hero } from '../_lib/content'

// Word-by-word animated headline line
function AnimatedHeadlineLine({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  const words = text.split(' ')

  return (
    <span className="flex flex-wrap justify-center gap-x-3">
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            damping: 31,
            delay: baseDelay + index * 0.075,
            mass: 10.3,
            stiffness: 69,
            type: 'spring',
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// Second headline line with blur and fade effect
function AnimatedSecondLine({ text }: { text: string }) {
  return (
    <motion.span
      className="block"
      initial={{
        filter: 'blur(10px)',
        opacity: 0,
        y: 10,
      }}
      animate={{
        filter: 'blur(0px)',
        opacity: 1,
        y: 0,
      }}
      transition={{
        bounce: 0,
        delay: 1.2 + 0.05,
        duration: 0.6,
        type: 'spring',
      }}
    >
      {text}
    </motion.span>
  )
}

export function Hero() {
  return (
    <section className="py-16">
      <Container className="flex flex-col items-center gap-6">
        {/* Announcement Badge - delay 2.7s */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            damping: 29,
            delay: 2.7,
            mass: 8.8,
            stiffness: 378,
            type: 'spring',
          }}
        >
          <AnnouncementBadge href={hero.badge.href} text={hero.badge.text} cta={hero.badge.cta} />
        </motion.div>

        {/* Headlines */}
        <h1 className="font-display text-ash-950 flex flex-col items-center text-center text-5xl/12 tracking-tight text-balance sm:text-[5rem]/20">
          <AnimatedHeadlineLine text={hero.headline[0]} baseDelay={0} />
          <AnimatedSecondLine text={hero.headline[1]} />
        </h1>

        {/* Subheadline - delay 2.3s */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            damping: 29,
            delay: 2.3,
            mass: 8.8,
            stiffness: 378,
            type: 'spring',
          }}
        >
          <Text className="max-w-md text-center text-pretty">{hero.subheadline}</Text>
        </motion.div>

        {/* CTAs - delay 2.5s */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            bounce: 0.2,
            delay: 2.5,
            duration: 0.4,
            type: 'spring',
          }}
        >
          <ButtonLink href={hero.cta.href} size="lg" target="_blank">
            {hero.cta.label}
          </ButtonLink>
          <PlainButtonLink href={hero.demoCta.href} size="lg" target="_blank">
            {hero.demoCta.label} <ArrowNarrowRightIcon />
          </PlainButtonLink>
        </motion.div>

        <motion.div
          className="text-ash-700 text-sm/7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.4 }}
        >
          {hero.footnote}
        </motion.div>

        {/* Hero Image - delay 2.7s */}
        <motion.div
          className="mt-8 w-full max-w-4xl overflow-hidden rounded-sm"
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            bounce: 0.2,
            delay: 2.7,
            duration: 0.4,
            type: 'spring',
          }}
        >
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            width={1600}
            height={900}
            className="w-full"
            priority
          />
        </motion.div>
      </Container>
    </section>
  )
}
