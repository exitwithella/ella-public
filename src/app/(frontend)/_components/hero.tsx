'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Container } from '@/components/elements/container'
import { hero } from '../_lib/content'

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ml-1"
    >
      <path
        d="M2.646 9.354a.5.5 0 0 1 0-.707L8.293 3H4.5a.5.5 0 0 1 0-1H10a.5.5 0 0 1 .5.5v5.5a.5.5 0 0 1-1 0V3.707L3.354 9.354a.5.5 0 0 1-.708 0Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
}

// Word-by-word animated headline
function AnimatedHeadline({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  const words = text.split(' ')

  return (
    <h1 className="flex flex-wrap justify-center gap-x-3 text-center text-4xl font-bold uppercase tracking-tight text-ella-green sm:text-5xl md:text-6xl">
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
      className="text-center text-4xl font-bold uppercase tracking-tight text-ella-green sm:text-5xl md:text-6xl"
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
        delay: 1.2 + 0.05, // 1.2s base delay + 0.05s effect delay
      }}
    >
      {text}
    </motion.h1>
  )
}

export function Hero() {
  return (
    <section className="bg-ella-cream pb-8 pt-28">
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
          <Link
            href={hero.badge.href}
            className="inline-flex items-center rounded-lg bg-ella-green-50/50 px-4 py-1.5 text-sm text-ella-green transition hover:bg-ella-green-50"
          >
            {hero.badge.text}
            <ArrowIcon />
          </Link>
        </motion.div>

        {/* Headlines */}
        <div className="flex flex-col items-center">
          {/* First headline - word by word, starts immediately */}
          <AnimatedHeadline text={hero.headline[0]} baseDelay={0} />

          {/* Second headline - blur/fade after 1.2s */}
          <AnimatedSecondHeadline text={hero.headline[1]} />
        </div>

        {/* Subheadline - delay 2.3s */}
        <motion.p
          className="max-w-md text-center text-base font-medium uppercase tracking-wide text-ella-slate sm:text-lg"
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
          {hero.subheadline}
        </motion.p>

        {/* CTA - delay 2.5s */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            duration: 0.4,
            bounce: 0.2,
            delay: 2.5,
          }}
        >
          <Link
            href={hero.cta.href}
            target="_blank"
            className="inline-flex items-center justify-center rounded-lg bg-ella-gold px-4 py-2.5 text-sm font-bold text-white transition hover:bg-ella-leather"
          >
            {hero.cta.label}
          </Link>
          <span className="text-sm text-ella-slate/70">{hero.footnote}</span>
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
