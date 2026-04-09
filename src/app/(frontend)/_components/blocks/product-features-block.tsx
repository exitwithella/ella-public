'use client'

import { AnimatePresence, motion, useInView } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import type { Media, Page } from '@/payload-types'

const SCREENSHOT_INITIAL = { opacity: 0 }
const SCREENSHOT_ANIMATE = { opacity: 1 }
const SCREENSHOT_EXIT = { opacity: 0 }
const SCREENSHOT_TRANSITION = { duration: 0.35, ease: 'easeInOut' }

type ProductFeaturesData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'product-features' }
>

type Item = NonNullable<ProductFeaturesData['items']>[number]

interface ProductFeaturesBlockProps {
  block: ProductFeaturesData
}

const BG_CLASS: Record<string, string> = {
  cream: 'bg-ash-50',
  'ash-light': 'bg-ash-100',
}

// Per-panel tracker: calls onVisible(index) when ≥50% of the panel is in view
function PanelTracker({
  index,
  onVisible,
  children,
  isActive,
}: {
  index: number
  onVisible: (i: number) => void
  children: React.ReactNode
  isActive: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5 })

  useEffect(() => {
    if (inView) onVisible(index)
  }, [inView, index, onVisible])

  return (
    <div
      ref={ref}
      className={`flex min-h-svh items-center py-24 transition-opacity duration-300 ${
        isActive ? 'opacity-100' : 'opacity-40'
      }`}
    >
      <div
        className={`pl-8 transition-all duration-300 ${
          isActive ? 'border-l-2 border-moss-600 pl-6' : 'border-l-2 border-transparent'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

function PanelContent({ item, isActive }: { item: Item; isActive: boolean }) {
  const screenshot = item.screenshot as Media | null

  return (
    <>
      {/* Mobile screenshot (shown only on mobile) */}
      {screenshot?.url && (
        <div className="mb-6 lg:hidden">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <Image
              src={screenshot.url}
              alt={screenshot.alt ?? item.title ?? ''}
              width={screenshot.width ?? 800}
              height={screenshot.height ?? 600}
              className="w-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Title */}
      <h3
        className={`font-display text-2xl font-semibold tracking-tight transition-colors duration-300 ${
          isActive ? 'text-ash-900' : 'text-ash-500'
        }`}
      >
        {item.title}
      </h3>

      {/* Description */}
      {item.description && (
        <p className="mt-3 max-w-sm text-base/relaxed text-ash-600">{item.description}</p>
      )}

      {/* Badges */}
      {item.badges && item.badges.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {item.badges.map((badge) => (
            <span
              key={badge.id}
              className="rounded-full border border-moss-300 bg-moss-50 px-3 py-1 text-xs font-medium text-moss-700"
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
}: {
  items: Item[]
  bgStyle: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = items[activeIndex]
  const activeScreenshot = activeItem?.screenshot as Media | null

  function handleDotClick(e: React.MouseEvent<HTMLButtonElement>) {
    const idx = Number(e.currentTarget.dataset.index)
    if (!Number.isNaN(idx)) setActiveIndex(idx)
  }

  return (
    <div className={`${BG_CLASS[bgStyle] ?? BG_CLASS.cream}`}>
      <Container>
        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16 xl:gap-24">
          {/* Left: scrolling panels */}
          <div>
            {items.map((item, i) => (
              <PanelTracker
                key={item.id}
                index={i}
                onVisible={setActiveIndex}
                isActive={i === activeIndex}
              >
                <PanelContent item={item} isActive={i === activeIndex} />
              </PanelTracker>
            ))}
          </div>

          {/* Right: sticky screenshot (desktop only) */}
          <div className="relative hidden lg:block">
            <div className="sticky top-0 flex h-svh items-center justify-center">
              <div className="w-full">
                {/* Screenshot frame */}
                <div className="relative overflow-hidden rounded-xl shadow-2xl ring-1 ring-ash-200 aspect-[4/3]">
                  <AnimatePresence mode="wait">
                    {activeScreenshot?.url && (
                      <motion.div
                        key={activeIndex}
                        initial={SCREENSHOT_INITIAL}
                        animate={SCREENSHOT_ANIMATE}
                        exit={SCREENSHOT_EXIT}
                        transition={SCREENSHOT_TRANSITION}
                        className="absolute inset-0"
                      >
                        <Image
                          src={activeScreenshot.url}
                          alt={activeScreenshot.alt ?? activeItem?.title ?? ''}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Progress dots */}
                <div className="mt-5 flex justify-center gap-2">
                  {items.map((item, i) => (
                    <button
                      key={item.id}
                      data-index={i}
                      onClick={handleDotClick}
                      aria-label={`View ${item.title}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeIndex ? 'w-6 bg-moss-600' : 'w-1.5 bg-ash-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export function ProductFeaturesBlock({ block }: ProductFeaturesBlockProps) {
  const bg = BG_CLASS[block.bgStyle ?? 'cream'] ?? BG_CLASS.cream

  if (!block.items || block.items.length === 0) return null

  return (
    <section>
      {/* Optional section header */}
      {(block.sectionLabel || block.heading || block.subheading) && (
        <div className={`${bg} pt-20 pb-8 md:pt-28 md:pb-12`}>
          <Container>
            {block.sectionLabel && (
              <Eyebrow color="moss" className="mb-3">
                {block.sectionLabel}
              </Eyebrow>
            )}
            {block.heading && <Heading color="dark">{block.heading}</Heading>}
            {block.subheading && (
              <p className="mt-4 max-w-2xl text-lg/relaxed text-ash-600">{block.subheading}</p>
            )}
          </Container>
        </div>
      )}

      <ProductFeaturesScroller items={block.items} bgStyle={block.bgStyle ?? 'cream'} />
    </section>
  )
}
