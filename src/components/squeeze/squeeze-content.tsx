'use client'

import {
  m,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  type MotionValue,
} from 'motion/react'
import { useEffect, useRef } from 'react'

import { useIsMobile } from '@/hooks/use-media-query'

export interface SqueezeQuote {
  text: string
  attribution?: string | null
}

export interface SqueezeContentProps {
  step: number
  onStepChange: (step: number) => void
  bodyParagraphs: string[]
  quotes: SqueezeQuote[]
  closer?: string | null
  pressureItems: string[]
  erosionItems: string[]
}

/** Shared hook for step-based scroll tracking and spring animation */
function useStepTracking<T extends HTMLElement = HTMLDivElement>(
  index: number,
  step: number,
  onStepChange: (step: number) => void,
): {
  ref: React.RefObject<T | null>
  opacity: number
  springVal: MotionValue<number>
} {
  const ref = useRef<T>(null)
  const isInView = useInView(ref, {
    margin: '-45% 0px -45% 0px',
    once: false,
  })

  useEffect(() => {
    if (isInView && index + 1 > step) {
      onStepChange(index + 1)
    } else if (!isInView && index + 1 === step && step > 0) {
      onStepChange(index)
    }
  }, [isInView, index, step, onStepChange])

  const stepVal = useMotionValue(step)
  const springVal = useSpring(stepVal, {
    stiffness: 100,
    damping: 18,
    mass: 0.6,
  })

  useEffect(() => {
    stepVal.set(step)
  }, [step, stepVal])

  const revealed = useRef(false)
  if (step > index) revealed.current = true
  const opacity = revealed.current ? 1 : 0.4

  return { ref, opacity, springVal }
}

function ContentBlock({
  children,
  index,
  step,
  onStepChange,
  isMobile,
}: {
  children: React.ReactNode
  index: number
  step: number
  onStepChange: (step: number) => void
  isMobile: boolean
}) {
  const { ref, opacity, springVal } = useStepTracking(index, step, onStepChange)
  const scaleX = useTransform(springVal, [0, 7], [1, 0.92])

  return (
    <m.div
      ref={ref}
      animate={{ opacity }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={isMobile ? undefined : { scaleX }}
      className="relative z-20 origin-center"
    >
      {children}
    </m.div>
  )
}

/** Mobile-only inline callout that shows pressure/erosion items */
function InlineCallout({
  type,
  itemIndex,
  pressureItems,
  erosionItems,
}: {
  type: 'pressure' | 'erosion'
  itemIndex: number
  pressureItems: string[]
  erosionItems: string[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    margin: '-80% 0px 0px 0px',
    once: true,
  })

  const items = type === 'pressure' ? pressureItems : erosionItems
  const item = items[itemIndex]
  if (!item) return null

  const isPressure = type === 'pressure'

  const bgColor = isPressure
    ? 'bg-sandstone-50/90 border-sandstone-100/60'
    : 'bg-sandstone-50/90 border-sandstone-200/60'

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, x: isPressure ? -40 : 40, scale: 0.9 }}
      animate={{
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : isPressure ? -40 : 40,
        scale: isInView ? 1 : 0.9,
      }}
      transition={{
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
        opacity: { duration: 0.3 },
      }}
      className={`text-ash-700 flex items-center gap-2 border px-3 py-2 font-mono text-xs md:hidden ${bgColor} ${
        isPressure ? 'self-start' : 'self-end'
      }`}
    >
      {isPressure && <span className="text-goldenrod-500 text-xs">{'\u2192'}</span>}
      <span className="text-ash-600 text-[0.625rem] font-semibold tracking-wider uppercase">
        {type === 'pressure' ? 'Pressure' : 'Erosion'}
      </span>
      <span className="text-ash-800">{item}</span>
      {!isPressure && <span className="text-goldenrod-500 text-xs">{'\u2190'}</span>}
    </m.div>
  )
}

function QuoteBlock({
  quote,
  attribution,
  step,
  index,
  onStepChange,
  isMobile,
}: {
  quote: string
  attribution: string
  step: number
  index: number
  onStepChange: (step: number) => void
  isMobile: boolean
}) {
  const { ref, opacity, springVal } = useStepTracking<HTMLQuoteElement>(index, step, onStepChange)
  const scaleX = useTransform(springVal, [0, 7], [1, 0.94])
  const rotate = useTransform(springVal, [3, 7], [0, index % 2 === 0 ? -0.5 : 0.5])

  return (
    <m.blockquote
      ref={ref}
      animate={{ opacity }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={isMobile ? undefined : { scaleX, rotate }}
      className="border-sandstone-300/60 relative z-20 origin-center border-l-2 py-4 pl-6"
    >
      <p className="text-ash-800 font-serif text-lg leading-relaxed italic md:text-xl">{quote}</p>
      <footer className="text-goldenrod-500 mt-3 text-sm tracking-wide uppercase">
        {attribution}
      </footer>
    </m.blockquote>
  )
}

export function SqueezeContent({
  step,
  onStepChange,
  bodyParagraphs,
  quotes,
  closer,
  pressureItems,
  erosionItems,
}: SqueezeContentProps) {
  const isMobile = useIsMobile()

  // Build content items: paragraphs, then quotes, then closer
  // Each gets a sequential index for step tracking
  const contentItems: Array<
    | { type: 'paragraph'; text: string }
    | { type: 'quote'; text: string; attribution: string }
    | { type: 'closer'; text: string }
  > = []

  for (const text of bodyParagraphs) {
    contentItems.push({ type: 'paragraph', text })
  }
  for (const q of quotes) {
    contentItems.push({
      type: 'quote',
      text: q.text,
      attribution: q.attribution ?? '',
    })
  }
  if (closer) {
    contentItems.push({ type: 'closer', text: closer })
  }

  // Interleave callouts: pressure before each item, erosion after
  let calloutIndex = 0

  return (
    <div className="relative z-20 mx-auto flex max-w-2xl flex-col gap-10 px-6 md:gap-20 md:px-8">
      {contentItems.map((item, i) => {
        const currentCalloutIndex = calloutIndex
        calloutIndex++
        return (
          <div key={`${item.type}-${i}`} className="contents">
            <InlineCallout
              type="pressure"
              itemIndex={currentCalloutIndex}
              pressureItems={pressureItems}
              erosionItems={erosionItems}
            />

            {item.type === 'paragraph' && (
              <ContentBlock index={i} step={step} onStepChange={onStepChange} isMobile={isMobile}>
                <p className="text-ash-700 text-lg leading-relaxed md:text-xl">{item.text}</p>
              </ContentBlock>
            )}

            {item.type === 'quote' && (
              <QuoteBlock
                index={i}
                step={step}
                onStepChange={onStepChange}
                quote={item.text}
                attribution={item.attribution}
                isMobile={isMobile}
              />
            )}

            {item.type === 'closer' && (
              <ContentBlock index={i} step={step} onStepChange={onStepChange} isMobile={isMobile}>
                <p className="text-goldenrod-600 font-serif text-xl leading-snug font-black text-balance md:text-5xl">
                  {item.text}
                </p>
              </ContentBlock>
            )}

            <InlineCallout
              type="erosion"
              itemIndex={currentCalloutIndex}
              pressureItems={pressureItems}
              erosionItems={erosionItems}
            />
          </div>
        )
      })}
    </div>
  )
}
