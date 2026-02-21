'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Text } from '@/components/elements/text'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { hero } from '../_lib/content'

// Word-by-word animated headline
function AnimatedHeadline({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  const words = text.split(' ')

  return (
    <h1 className="flex flex-wrap justify-center gap-x-3 text-center font-display text-5xl/12 tracking-tight text-balance text-ash-950 sm:text-[5rem]/20">
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 69,
            damping: 31,
            mass: 10.3,
            delay: baseDelay + index * 0.075,
          }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  )
}

// Second headline with blur and fade effect
function AnimatedSecondHeadline({ text }: { text: string }) {
  return (
    <motion.h1
      className="text-center font-display text-5xl/12 tracking-tight text-balance text-ash-950 sm:text-[5rem]/20"
      initial={{
        opacity: 0,
        y: 10,
        filter: 'blur(10px)',
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      transition={{
        type: 'spring',
        duration: 0.6,
        bounce: 0,
        delay: 1.2 + 0.05,
      }}
    >
      {text}
    </motion.h1>
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
            type: 'spring',
            stiffness: 378,
            damping: 29,
            mass: 8.8,
            delay: 2.7,
          }}
        >
          <AnnouncementBadge
            href={hero.badge.href}
            text={hero.badge.text}
            cta={hero.badge.cta}
          />
        </motion.div>

        {/* Headlines */}
        <div className="flex flex-col items-center">
          <AnimatedHeadline text={hero.headline[0]} baseDelay={0} />
          <AnimatedSecondHeadline text={hero.headline[1]} />
        </div>

        {/* Subheadline - delay 2.3s */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 378,
            damping: 29,
            mass: 8.8,
            delay: 2.3,
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
            type: 'spring',
            duration: 0.4,
            bounce: 0.2,
            delay: 2.5,
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
          className="text-sm/7 text-ash-700"
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
            type: 'spring',
            duration: 0.4,
            bounce: 0.2,
            delay: 2.7,
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
