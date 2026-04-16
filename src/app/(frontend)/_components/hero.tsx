'use client'

import { LazyMotion, domAnimation, m } from 'motion/react'
import Image from 'next/image'

import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Text } from '@/components/elements/text'
import { Wallpaper, type WallpaperColor } from '@/components/elements/wallpaper'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import type { Page } from '@/payload-types'

// Maps CMS highlightColor values to Tailwind text classes (full class names required for Tailwind JIT)
const HIGHLIGHT_COLOR_MAP: Record<string, string> = {
  goldenrod: 'text-goldenrod-500',
  moss: 'text-moss-600',
  coral: 'text-coral-500',
  ocean: 'text-ocean-600',
}

// Hardcoded — tightly coupled to animation timing and unlikely to change via CMS
const BADGE = {
  href: '/blog/why-we-re-building-ella',
  text: "Why we're building ELLA",
  cta: 'Read more',
}
const FALLBACK_IMAGE = {
  src: '/images/ella-dashboard.avif',
  alt: 'ELLA product screenshot',
}

// Word-by-word animated headline line
function AnimatedHeadlineLine({
  text,
  baseDelay = 0,
  highlight,
  highlightClass = 'text-goldenrod-500',
}: {
  text: string
  baseDelay?: number
  highlight?: string | null
  highlightClass?: string
}) {
  const words = text.split(' ')
  const highlightWords = highlight ? highlight.split(' ') : []
  const highlightStart = highlight ? text.indexOf(highlight) : -1
  const highlightStartWord =
    highlightStart >= 0 ? text.slice(0, highlightStart).split(' ').filter(Boolean).length : -1

  return (
    <span className="flex flex-wrap justify-center gap-x-3">
      {words.map((word, index) => (
        <m.span
          key={index}
          className={
            highlightStartWord >= 0 &&
            index >= highlightStartWord &&
            index < highlightStartWord + highlightWords.length
              ? highlightClass
              : undefined
          }
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
        </m.span>
      ))}
    </span>
  )
}

// Second headline line with blur and fade effect
function AnimatedSecondLine({ text, delay = 1.25 }: { text: string; delay?: number }) {
  return (
    <m.span
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
        delay,
        duration: 0.6,
        type: 'spring',
      }}
    >
      {text}
    </m.span>
  )
}

interface HeroProps {
  hero: Page['hero']
}

export function Hero({ hero }: HeroProps) {
  const line1 = hero.headline
  const line1Animation = hero.headlineAnimation ?? 'word-by-word'
  const line2 = hero.headlineLine2 ?? null
  const line2Animation = hero.headlineAnimation2 ?? 'blur-fade'

  const highlightClass =
    HIGHLIGHT_COLOR_MAP[hero.highlightColor ?? 'goldenrod'] ?? 'text-goldenrod-500'

  const primaryHref = hero.primaryCta?.href ?? 'https://app.exitwithella.io/sign-up'
  const primaryLabel = hero.primaryCta?.label ?? 'Get Started'
  const secondaryHref =
    hero.secondaryCta?.href ?? 'https://cal.com/team/ella/ella-intro?overlayCalendar=true'
  const secondaryLabel = hero.secondaryCta?.label ?? 'Book a Demo'

  // Resolve CMS visual — depth:2 populates it as a Media object
  const visualMedia = hero.visual && typeof hero.visual === 'object' ? hero.visual : null
  const heroSrc = visualMedia?.url ?? FALLBACK_IMAGE.src
  const heroAlt = visualMedia?.alt ?? FALLBACK_IMAGE.alt
  const heroWidth = visualMedia?.width ?? 1600
  const heroHeight = visualMedia?.height ?? 900

  return (
    <LazyMotion features={domAnimation}>
      <section className="pt-24 md:pt-36">
        <Container className="flex flex-col items-center gap-6">
          {/* Announcement Badge */}
          <m.div
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
            <AnnouncementBadge href={BADGE.href} text={BADGE.text} cta={BADGE.cta} />
          </m.div>

          {/* Headlines */}
          <h1 className="font-display text-theme-text flex flex-col items-center text-center text-2xl font-bold text-balance md:text-4xl">
            {line1Animation === 'blur-fade' ? (
              <AnimatedSecondLine text={line1} delay={0} />
            ) : (
              <AnimatedHeadlineLine
                text={line1}
                baseDelay={0}
                highlight={hero.highlightText}
                highlightClass={highlightClass}
              />
            )}
            {line2 &&
              (line2Animation === 'word-by-word' ? (
                <AnimatedHeadlineLine text={line2} baseDelay={1.25} />
              ) : (
                <AnimatedSecondLine text={line2} />
              ))}
          </h1>

          {/* Subheadline */}
          {hero.subheadline && (
            <m.div
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
              <Text className="max-w-md text-center text-xl text-pretty md:text-2xl">
                {hero.subheadline}
              </Text>
            </m.div>
          )}

          {/* CTAs */}
          <m.div
            className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              bounce: 0.2,
              delay: 2.5,
              duration: 0.4,
              type: 'spring',
            }}
          >
            <ButtonLink
              href={primaryHref}
              size="lg"
              target="_blank"
              rel="noopener"
              className="w-full sm:w-auto"
            >
              {primaryLabel}
            </ButtonLink>
            <PlainButtonLink
              href={secondaryHref}
              size="lg"
              target="_blank"
              rel="noopener"
              className="w-full sm:w-auto"
            >
              {secondaryLabel} <ArrowNarrowRightIcon aria-hidden="true" />
            </PlainButtonLink>
          </m.div>

          {hero.microcopy && (
            <m.div
              className="text-theme-text-secondary text-sm/7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.4 }}
            >
              {hero.microcopy}
            </m.div>
          )}
        </Container>
      </section>

      {/* Hero Image — sticky sibling so layout blocks act as its scroll runway.
        Sticks at top-0; the z-10 layout blocks scroll up and cover it. */}
      {hero.heroWallpaper ? (
        // Animation wraps the whole card (Container + Wallpaper) — the boundary box animates,
        // not just the image. No bottom rounding — image clips sharply at the bottom edge.
        <div className="sticky top-(--scroll-padding-top) z-0 px-2">
          <m.div
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              bounce: 0.2,
              delay: 2.7,
              duration: 0.4,
              type: 'spring',
            }}
          >
            <Container>
              <Wallpaper
                color={(hero.heroWallpaperColor ?? 'green') as WallpaperColor}
                className="mt-8 rounded-t-2xl"
              >
                <div className="px-6 pt-8 sm:px-10 sm:pt-12">
                  <div className="overflow-hidden rounded-t-sm ring-1 ring-black/10">
                    <Image
                      src={heroSrc}
                      alt={heroAlt}
                      width={heroWidth}
                      height={heroHeight}
                      className="w-full"
                      priority
                    />
                  </div>
                </div>
              </Wallpaper>
            </Container>
          </m.div>
        </div>
      ) : (
        <div className="sticky top-(--scroll-padding-top) z-0">
          <Container>
            <m.div
              className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-sm"
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
                src={heroSrc}
                alt={heroAlt}
                width={heroWidth}
                height={heroHeight}
                className="w-full"
                priority
              />
            </m.div>
          </Container>
        </div>
      )}
    </LazyMotion>
  )
}
