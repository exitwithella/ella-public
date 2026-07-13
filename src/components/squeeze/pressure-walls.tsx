'use client'

import { m, useMotionValue, useTransform, useSpring, type MotionValue } from 'motion/react'
import { useEffect } from 'react'

export const defaultPressureItems = [
  'More clients',
  'Deeper engagements',
  'Shorter timelines',
  'Higher stakes',
  'Regulatory scrutiny',
  'Key-person risk',
]

export const defaultErosionItems = [
  'Owners Googling valuations',
  'ChatGPT drafting exit plans',
  'AI leveling the field',
  'Clients questioning fees',
  'Information parity',
  'Commoditized insights',
]

export function PressureWalls({
  step,
  contentSteps,
  scrollYProgress,
  pressureItems = defaultPressureItems,
  erosionItems = defaultErosionItems,
}: {
  step: number
  contentSteps: number
  scrollYProgress: MotionValue<number>
  pressureItems?: string[]
  erosionItems?: string[]
}) {
  // --- Scroll layer: continuous 0→1 mapped from scroll position ---
  const scrollSqueezeRaw = useTransform(scrollYProgress, [0.15, 0.55], [0, 1])

  // --- Step layer: normalized step position ---
  // When each paragraph hits center, the target advances to a new tier.
  // Follows step in both directions — walls open back up on scroll-up.
  const safeSteps = Math.max(contentSteps, 1)
  const stepFloorVal = useMotionValue(Math.min(step / safeSteps, 1))

  useEffect(() => {
    stepFloorVal.set(Math.min(step / safeSteps, 1))
  }, [step, safeSteps, stepFloorVal])

  // --- Exit: walls recede as section hits the upper 20% of viewport ---
  const exitFactor = useTransform(scrollYProgress, [0.75, 0.9], [1, 0])

  // --- Combined target: scroll advances walls, step floor prevents jitter ---
  // max() means scroll provides smooth forward motion between steps,
  // and step tier sets the minimum so walls don't flicker during forward scroll.
  // exitFactor pulls them back out as the section leaves.
  const combinedTarget = useTransform(
    [scrollSqueezeRaw, stepFloorVal, exitFactor] as MotionValue[],
    ([scroll, floor, exit]: number[]) => Math.max(scroll, floor) * exit,
  )

  // Heavy, overdamped spring — fast movement, no bounce, high inertia
  const squeeze = useSpring(combinedTarget, {
    stiffness: 180,
    damping: 35,
    mass: 1.4,
  })

  // Walls close in — mapped from 0–1 squeeze
  const leftWall = useTransform(squeeze, [0, 1], ['0%', '22%'])
  const rightWall = useTransform(squeeze, [0, 1], ['0%', '22%'])

  // Solid opacity — walls need to be readable
  const wallOpacity = useTransform(squeeze, [0, 0.05, 0.5, 1], [0, 0.85, 0.92, 0.98])

  // Edge glow
  const glowOpacity = useTransform(squeeze, [0, 0.2, 1], [0, 0.3, 0.7])

  // Labels: fade in once walls are visible, fade out as section exits
  const labelOpacity = useTransform(scrollYProgress, [0.3, 0.38, 0.75, 0.9], [0, 1, 1, 0])

  return (
    <>
      {/* Left pressure wall — light ash, hidden on mobile */}
      <m.div
        className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 hidden md:block"
        style={{
          width: leftWall,
          opacity: wallOpacity,
          background:
            'linear-gradient(to right, rgba(232, 224, 210, 1) 0%, rgba(240, 234, 222, 0.97) 70%, rgba(246, 242, 234, 0.85) 100%)',
        }}
      />

      {/* Left labels — fixed to viewport center, fades in as wall expands, hidden on mobile */}
      <m.div
        className="pointer-events-none fixed top-1/2 left-6 z-20 hidden -translate-y-1/2 flex-col items-start gap-2 md:flex"
        style={{
          opacity: labelOpacity,
        }}
      >
        <span className="text-ash-600 mb-1 font-mono text-[0.5625rem] font-semibold tracking-[0.12em] uppercase md:text-[0.625rem]">
          Growing Pressure
        </span>
        {pressureItems.map((item, i) => (
          <PressureLabel
            key={item}
            squeeze={squeeze}
            item={item}
            index={i}
            total={pressureItems.length}
            side="left"
          />
        ))}
      </m.div>

      {/* Left glow edge — goldenrod, hidden on mobile */}
      <m.div
        className="pointer-events-none absolute top-0 bottom-0 z-10 hidden md:block"
        style={{
          left: leftWall,
          width: '3px',
          opacity: glowOpacity,
          background: 'oklch(0.72 0.015 65)',
          boxShadow:
            '0 0 16px 4px oklch(0.72 0.015 65 / 0.15), 0 0 40px 12px oklch(0.72 0.015 65 / 0.06)',
        }}
      />

      {/* Right pressure wall — light ash, hidden on mobile */}
      <m.div
        className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 hidden md:block"
        style={{
          width: rightWall,
          opacity: wallOpacity,
          background:
            'linear-gradient(to left, rgba(232, 224, 210, 1) 0%, rgba(240, 234, 222, 0.97) 70%, rgba(246, 242, 234, 0.85) 100%)',
        }}
      />

      {/* Right labels — fixed to viewport center, fades in as wall expands, hidden on mobile */}
      <m.div
        className="pointer-events-none fixed top-1/2 right-6 z-20 hidden -translate-y-1/2 flex-col items-end gap-2 md:flex"
        style={{
          opacity: labelOpacity,
        }}
      >
        <span className="text-ash-600 mb-1 font-mono text-[0.5625rem] font-semibold tracking-[0.12em] uppercase md:text-[0.625rem]">
          Eroding Advantage
        </span>
        {erosionItems.map((item, i) => (
          <PressureLabel
            key={item}
            squeeze={squeeze}
            item={item}
            index={i}
            total={erosionItems.length}
            side="right"
          />
        ))}
      </m.div>

      {/* Right glow edge — goldenrod, hidden on mobile */}
      <m.div
        className="pointer-events-none absolute top-0 bottom-0 z-10 hidden md:block"
        style={{
          right: rightWall,
          width: '3px',
          opacity: glowOpacity,
          background: 'oklch(0.72 0.015 65)',
          boxShadow:
            '0 0 16px 4px oklch(0.72 0.015 65 / 0.15), 0 0 40px 12px oklch(0.72 0.015 65 / 0.06)',
        }}
      />
    </>
  )
}

/**
 * A single pressure/erosion label. Opacity stays in MotionValue-land — derived
 * from the squeeze spring via useTransform so it never round-trips through React
 * state (no per-frame re-render).
 */
function PressureLabel({
  squeeze,
  item,
  index,
  total,
  side,
}: {
  squeeze: MotionValue<number>
  item: string
  index: number
  total: number
  side: 'left' | 'right'
}) {
  const opacity = useTransform(squeeze, (v) => getItemOpacity(v, index, total))
  const arrow = side === 'left' ? '→' : '←'

  return (
    <m.span
      className="text-ash-600 flex items-center gap-1 text-[0.625rem] font-medium whitespace-nowrap md:text-xs"
      style={{ opacity }}
    >
      <span className="text-ash-400 text-[0.5rem] md:text-[0.625rem]">{arrow}</span>
      <span className="hidden sm:inline">{item}</span>
      <span className="sm:hidden">{item.split(' ')[0]}</span>
      {side === 'left' && (
        <span className="text-ash-400 text-[0.5rem] md:text-[0.625rem]">{arrow}</span>
      )}
    </m.span>
  )
}

/** Stagger each label's appearance across the 0–1 squeeze progress */
function getItemOpacity(progress: number, index: number, total: number): number {
  const start = 0
  const end = 0.85
  const threshold = start + (index / Math.max(total - 1, 1)) * (end - start)
  const fadeWindow = 0.12
  if (progress < threshold) return 0
  if (progress > threshold + fadeWindow) return 1
  return (progress - threshold) / fadeWindow
}
