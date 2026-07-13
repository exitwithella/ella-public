'use client'

import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
} from 'motion/react'
import { useRef, useState, useCallback } from 'react'

import { PressureWalls } from './pressure-walls'
import { SqueezeContent, type SqueezeQuote } from './squeeze-content'
import { TensionThreads } from './tension-threads'

export interface SqueezeSectionProps {
  label?: string | null
  heading: string
  quotes: SqueezeQuote[]
  closer?: string | null
  pressureItems: string[]
  erosionItems: string[]
  bodyParagraphs: string[]
}

function SectionHeader({ label, heading }: { label?: string | null; heading: string }) {
  return (
    <div className="relative z-20 mb-20 text-center md:mb-28">
      {label && (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span className="text-ash-400 text-xs tracking-[0.3em] uppercase md:text-sm">
            {label}
          </span>
        </m.div>
      )}

      <m.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        viewport={{ once: true }}
        className="text-foreground font-serif text-4xl leading-[1.1] text-balance md:text-6xl lg:text-7xl"
      >
        {heading}
      </m.h2>
    </div>
  )
}

export function SqueezeSection({
  label,
  heading,
  bodyParagraphs,
  quotes,
  closer,
  pressureItems,
  erosionItems,
}: SqueezeSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const squeezeRaw = useTransform(scrollYProgress, [0.0, 0.55], [0, 1])
  const squeeze = useSpring(squeezeRaw, { stiffness: 60, damping: 25 })

  // Background warms as pressure builds — kept in MotionValue-land (no per-frame
  // React re-render) and sourced from theme tokens. The center highlight fades
  // slightly, and the outer cream shifts from sandstone-100 toward sandstone-200
  // as the squeeze deepens. Percentages match ca()'s color-mix formula.
  const centerAlphaPct = useTransform(squeeze, (v) => Math.round((1 - v * 0.08) * 100))
  const outerShiftPct = useTransform(squeeze, (v) => Math.round(v * 60))
  const background = useMotionTemplate`radial-gradient(ellipse 90% 80% at center, color-mix(in oklch, var(--color-sandstone-50) ${centerAlphaPct}%, transparent) 0%, color-mix(in oklch, var(--color-sandstone-200) ${outerShiftPct}%, var(--color-sandstone-100)) 85%)`

  const handleStepChange = useCallback((newStep: number) => {
    setStep(newStep)
  }, [])

  // Content steps = paragraphs + quotes (excluding closer) — drives wall tier count
  const contentSteps = bodyParagraphs.length + quotes.length

  return (
    <LazyMotion features={domAnimation}>
      <section ref={sectionRef} className="relative overflow-hidden">
        <div className="sticky top-0 flex min-h-screen flex-col justify-center py-20">
          <m.div className="pointer-events-none absolute inset-0" style={{ background }} />

          <TensionThreads squeeze={squeeze} />

          <PressureWalls
            step={step}
            contentSteps={contentSteps}
            scrollYProgress={scrollYProgress}
            pressureItems={pressureItems}
            erosionItems={erosionItems}
          />

          <SectionHeader label={label} heading={heading} />
          <SqueezeContent
            step={step}
            onStepChange={handleStepChange}
            bodyParagraphs={bodyParagraphs}
            quotes={quotes}
            closer={closer}
            pressureItems={pressureItems}
            erosionItems={erosionItems}
          />
        </div>
      </section>
    </LazyMotion>
  )
}
