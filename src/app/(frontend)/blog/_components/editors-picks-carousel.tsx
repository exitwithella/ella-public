'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'

const scrollButtonStyle = {
  base: 'flex size-10 items-center justify-center rounded-full border transition-colors',
  enabled: 'border-ash-300 text-ash-700 hover:bg-ash-100 hover:border-ash-400 cursor-pointer',
  disabled: 'border-ash-200 text-ash-300 cursor-default',
}

export function EditorsPicksCarousel({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 2)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    const ro = new ResizeObserver(checkScroll)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      ro.disconnect()
    }
  }, [checkScroll])

  const scrollLeft = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-carousel-item]')
    const distance = card ? card.offsetWidth + 24 : el.clientWidth * 0.6
    el.scrollBy({ left: -distance, behavior: 'smooth' })
  }, [])

  const scrollRight = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-carousel-item]')
    const distance = card ? card.offsetWidth + 24 : el.clientWidth * 0.6
    el.scrollBy({ left: distance, behavior: 'smooth' })
  }, [])

  return (
    <div>
      {/* Header row */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-ash-700 text-sm font-semibold tracking-widest uppercase">
          Editor's Picks
        </h2>
        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={`${scrollButtonStyle.base} ${canScrollLeft ? scrollButtonStyle.enabled : scrollButtonStyle.disabled}`}
          >
            <ArrowLeft size={18} weight="bold" />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={`${scrollButtonStyle.base} ${canScrollRight ? scrollButtonStyle.enabled : scrollButtonStyle.disabled}`}
          >
            <ArrowRight size={18} weight="bold" />
          </button>
        </div>
      </div>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="no-scrollbar -mx-4 flex gap-6 overflow-x-auto px-4 md:-mx-6 md:px-6"
      >
        {children}
      </div>
    </div>
  )
}

/**
 * Wrapper for each card inside the carousel to set consistent sizing.
 * Shows ~2.2 cards on desktop, ~1.15 on mobile (peek effect).
 */
export function CarouselItem({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-carousel-item
      className="w-[85vw] max-w-[560px] shrink-0 sm:w-[45vw] lg:w-[calc(50%-12px)] lg:max-w-none"
    >
      {children}
    </div>
  )
}
