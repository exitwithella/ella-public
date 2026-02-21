'use client'

import { useScroll, useTransform, useMotionValueEvent, MotionValue } from 'motion/react'
import { useRef, useState, useEffect } from 'react'

/**
 * Hook for scroll-based word reveal animation
 * Each word fades in based on scroll progress
 */
export function useScrollRevealWords(text: string) {
  const containerRef = useRef<HTMLDivElement>(null)
  const words = text.split(' ')

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  return {
    containerRef,
    words,
    scrollYProgress,
  }
}

/**
 * Calculate opacity for each word based on scroll progress
 */
export function useWordOpacity(
  scrollYProgress: MotionValue<number>,
  wordIndex: number,
  totalWords: number
) {
  const start = wordIndex / totalWords
  const end = (wordIndex + 1) / totalWords

  return useTransform(scrollYProgress, [start, end], [0.2, 1])
}

/**
 * Hook for slide-out navbar animation
 * Hides navbar on scroll down, reveals on scroll up
 */
export function useSlideOutNavbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollThreshold = 100

      if (currentScrollY < scrollThreshold) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return isVisible
}

/**
 * Hook for horizontal scroll animation
 * Translates content horizontally based on vertical scroll
 */
export function useHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return {
    containerRef,
    scrollContainerRef,
    scrollYProgress,
  }
}

/**
 * Calculate horizontal translation based on scroll progress
 * @param scrollYProgress - Motion value from 0 to 1
 * @param totalWidth - Total width of scrollable content
 * @param viewportWidth - Width of the viewport/container
 */
export function useHorizontalTranslate(
  scrollYProgress: MotionValue<number>,
  totalWidth: number,
  viewportWidth: number
) {
  const maxTranslate = Math.max(0, totalWidth - viewportWidth)
  return useTransform(scrollYProgress, [0, 1], [0, -maxTranslate])
}
