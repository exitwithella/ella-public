'use client'

import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { ThemeSection } from '@/components/elements/theme-section'
import type { Media, Page } from '@/payload-types'

import { ImagePreloader, type PreloadImage } from '../image-preloader'

const SCREENSHOT_INITIAL = { opacity: 0, scale: 1.02 }
const SCREENSHOT_ANIMATE = { opacity: 1, scale: 1 }
const SCREENSHOT_EXIT = { opacity: 0, scale: 0.98 }
const SCREENSHOT_TRANSITION = { duration: 0.4, ease: 'easeInOut' as const }

type ProductFeaturesData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'product-features' }
>

type Item = NonNullable<ProductFeaturesData['items']>[number]

interface ProductFeaturesBlockProps {
  block: ProductFeaturesData
}

// Scroll-driven panel with fade in/out as it enters and exits the feature zone
function PanelTracker({
  index,
  onVisible,
  children,
  className,
}: {
  index: number
  onVisible: (i: number) => void
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Smooth fade curve: invisible → fade in → full → fade out → invisible
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35, 0.65, 0.8, 1],
    [0, 0.1, 1, 1, 0.1, 0],
  )
  // Subtle vertical slide for a "riding the rail" feel
  const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [30, 0, 0, -30])

  // Switch active image when panel is centered in viewport
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      if (v > 0.35 && v < 0.65) onVisible(index)
    })
  }, [scrollYProgress, onVisible, index])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={`flex min-h-[70vh] items-center py-12 first:pt-48${className ? ` ${className}` : ''}`}
    >
      {children}
    </motion.div>
  )
}

function PanelContent({ item, index }: { item: Item; index: number }) {
  const screenshot = item.screenshot as Media | null
  const stepNum = String(index + 1).padStart(2, '0')
  const fitMode = (item as { screenshotFit?: string }).screenshotFit ?? 'contain'
  const isCropped = fitMode === 'crop' || fitMode === 'square'
  const objectPosition = (item as { screenshotPosition?: string }).screenshotPosition ?? 'center'

  return (
    <>
      {/* Mobile screenshot */}
      {screenshot?.url && (
        <div className="mb-6 lg:hidden">
          <div
            className={`border-theme-border/40 overflow-hidden border ${fitMode === 'square' ? 'aspect-square' : isCropped ? 'aspect-[4/3]' : ''}`}
          >
            {isCropped ? (
              <div className="relative h-full w-full">
                <Image
                  src={screenshot.url}
                  alt={screenshot.alt ?? item.title ?? ''}
                  fill
                  className="object-cover"
                  style={{ objectPosition }}
                />
              </div>
            ) : (
              <Image
                src={screenshot.url}
                alt={screenshot.alt ?? item.title ?? ''}
                width={screenshot.width ?? 800}
                height={screenshot.height ?? 600}
                className="h-auto w-full"
              />
            )}
          </div>
        </div>
      )}

      {/* Step counter — architectural rhythm */}
      <p className="text-theme-text-muted mb-3 font-mono text-xs tracking-wider">{stepNum}</p>

      {/* Title */}
      <h3 className="font-display text-theme-text text-2xl font-semibold tracking-tight lg:text-3xl">
        {item.title}
      </h3>

      {/* Description */}
      {item.description && (
        <p className="text-theme-text-secondary mt-3 max-w-md text-base/relaxed">
          {item.description}
        </p>
      )}

      {/* Badges — sharp rectangular blueprint tags */}
      {item.badges && item.badges.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {item.badges.map((badge) => (
            <span
              key={badge.id}
              className="border-theme-border text-theme-text-muted border px-2.5 py-1 font-mono text-xs tracking-wide"
            >
              {badge.text}
            </span>
          ))}
        </div>
      )}
    </>
  )
}

function ProductFeaturesScroller({
  items,
  bgStyle,
  sectionLabel,
  heading,
  subheading,
  showBottomBorder = true,
}: {
  items: Item[]
  bgStyle: string
  sectionLabel?: string | null
  heading?: string | null
  subheading?: string | null
  showBottomBorder?: boolean | null
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = items[activeIndex]
  const activeScreenshot = activeItem?.screenshot as Media | null
  const activeFit =
    (activeItem as { screenshotFit?: string } | undefined)?.screenshotFit ?? 'contain'
  const activeIsCropped = activeFit === 'crop' || activeFit === 'square'
  const activePosition =
    (activeItem as { screenshotPosition?: string } | undefined)?.screenshotPosition ?? 'center'

  const handleVisible = useCallback((i: number) => setActiveIndex(i), [])
  const hasHeader = sectionLabel || heading || subheading

  // Preload all screenshot images on first scroll interaction
  const preloadImages = useMemo<PreloadImage[]>(
    () =>
      items
        .map((item) => {
          const screenshot = item.screenshot as Media | null
          return screenshot?.url
            ? ({
                src: screenshot.url,
                sizes: '(min-width: 1024px) 55vw, 100vw',
                fill: true,
              } satisfies PreloadImage)
            : null
        })
        .filter((x: PreloadImage | null): x is PreloadImage => x !== null),
    [items],
  )

  // Track when the section's bottom edge is 20vh above viewport bottom → drives panel shrink
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress: sectionEndProgress } = useScroll({
    target: sectionRef,
    offset: ['end 0.9', 'end start'],
  })

  // progress 0 = section bottom hits viewport bottom, 1 = section bottom hits viewport top
  const panelHeight = useTransform(sectionEndProgress, [0, 0.5], ['100%', '0%'])
  const panelOpacity = useTransform(sectionEndProgress, [0, 0.25], [1, 0])
  const panelRadius = useTransform(sectionEndProgress, [0, 0.5], [16, 24])

  return (
    <ThemeSection
      bgStyle={bgStyle}
      ref={sectionRef}
      className={`relative ${showBottomBorder !== false ? 'border-theme-surface border-b' : ''}`}
      style={{ overflowX: 'clip' }}
    >
      <ImagePreloader images={preloadImages} />

      {/* Sticky header — bg color only on the left column, right stays transparent */}
      <div className="sticky top-0 z-20">
        {hasHeader && (
          <Container>
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-8 xl:gap-16">
              {/* Left column: header content with cream background */}
              <div className="relative">
                <div className="bg-theme-bg pointer-events-none absolute inset-y-0 right-0 -left-4" />
                <div className="relative pt-20 pb-8 md:pt-28 md:pb-10">
                  {sectionLabel && <Eyebrow className="mb-3">{sectionLabel}</Eyebrow>}
                  {heading && <Heading>{heading}</Heading>}
                  {subheading && (
                    <p className="text-theme-text-secondary mt-4 text-lg/relaxed">{subheading}</p>
                  )}
                </div>
              </div>
              {/* Right column: transparent — ash panel shows through */}
              <div className="hidden lg:block" />
            </div>
          </Container>
        )}
        {/* Top horizontal rail — sticks with the header */}
        <div className="bg-theme-surface h-px" />
      </div>

      {/* Two-column feature area */}
      <Container>
        <div className="relative lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-8 xl:gap-16">
          {/* Left column: throughline rail + scrolling features (z-auto, scrolls behind header) */}
          <div className="relative pt-32">
            {/* Vertical throughline — the rail */}
            <div className="bg-theme-surface absolute top-0 bottom-0 left-0 hidden w-px lg:block" />

            {items.map((item, i) => (
              <PanelTracker
                key={item.id}
                index={i}
                onVisible={handleVisible}
                className="first:pt-60"
              >
                {/* Left border overlays the throughline: bold when active */}
                <div
                  className={`transition-all duration-500 lg:-ml-[2px] lg:border-l-[3px] lg:pl-8 ${
                    i === activeIndex ? 'lg:border-theme-accent' : 'lg:border-transparent'
                  }`}
                >
                  <PanelContent item={item} index={i} />
                </div>
              </PanelTracker>
            ))}
          </div>

          {/* Right column: sticky background panel with image (z-30, paints above header rail) */}
          <div className="relative z-30 hidden lg:block">
            <div className="sticky top-0 flex h-svh flex-col pt-36 pb-6">
              {/* Background box — shrinks to 0 as section ends */}
              <motion.div className="relative" style={{ height: panelHeight }}>
                {/* Background fill with rounded left corners */}
                <motion.div
                  className="bg-theme-surface absolute inset-0"
                  style={{
                    borderTopLeftRadius: panelRadius,
                    borderBottomLeftRadius: panelRadius,
                  }}
                />
                {/* Bleed extension — outside overflow-hidden, extends to viewport edge */}
                <div className="bg-theme-surface absolute inset-y-0 left-full w-[50vw]" />

                {/* Content — clipped by the panel height, fades out */}
                <div
                  className="absolute inset-y-0 left-0 flex flex-col justify-center overflow-hidden py-5 pl-8 xl:pl-10"
                  style={{ right: 'min(0px, calc(680px - 50vw))' }}
                >
                  <motion.div
                    className="relative z-20 flex min-h-0 w-full flex-1 flex-col"
                    style={{ opacity: panelOpacity }}
                  >
                    {/* Image frame */}
                    <div className="relative min-h-0 w-full flex-1">
                      <AnimatePresence mode="wait">
                        {activeScreenshot?.url && (
                          <motion.div
                            key={activeIndex}
                            initial={SCREENSHOT_INITIAL}
                            animate={SCREENSHOT_ANIMATE}
                            exit={SCREENSHOT_EXIT}
                            transition={SCREENSHOT_TRANSITION}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <div className="relative h-full w-full overflow-hidden rounded-l-lg">
                              <Image
                                src={activeScreenshot.url}
                                alt={activeScreenshot.alt ?? activeItem?.title ?? ''}
                                fill
                                className={activeIsCropped ? 'object-cover' : 'object-contain'}
                                style={
                                  activeIsCropped ? { objectPosition: activePosition } : undefined
                                }
                                sizes="(min-width: 1024px) 55vw, 100vw"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom rail is the section's border-b */}
    </ThemeSection>
  )
}

export function ProductFeaturesBlock({ block }: ProductFeaturesBlockProps) {
  if (!block.items || block.items.length === 0) return null

  return (
    <ProductFeaturesScroller
      items={block.items}
      bgStyle={block.bgStyle ?? 'sandstone'}
      sectionLabel={block.sectionLabel}
      heading={block.heading}
      subheading={block.subheading}
      showBottomBorder={block.showBottomBorder}
    />
  )
}
