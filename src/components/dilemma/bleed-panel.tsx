'use client'

import { clsx } from 'clsx/lite'
import { motion, useMotionTemplate, useTransform, type MotionValue } from 'motion/react'

import { ca } from '@/lib/color'

import { SPRING_SLOW, CL_A, CL_B, DRIFT_A, DRIFT_B, type ClientCard, type Drift } from './constants'

// ═══════════════════════════════════════════════════════════
// BLEED PANEL — "Consumer AI"
// ═══════════════════════════════════════════════════════════

export function BleedPanel({
  vizProgress,
  compact,
}: {
  vizProgress: MotionValue<number>
  compact: boolean
}) {
  const cardOpacity = useTransform(vizProgress, (p) => Math.max(0.3, 1 - p * 0.6))
  const cardBlur = useTransform(vizProgress, (p) => `blur(${p * 1}px)`)
  const integrityAlpha = useTransform(vizProgress, (p) => Math.max(0, 1 - p * 1.8) * 0.2)
  const gapSize = useTransform(vizProgress, (p) => 3 + p * 16)
  const dividerBlur = useTransform(vizProgress, (p) => `blur(${p * 2}px)`)
  const warningOpacity = useTransform(vizProgress, (p) => (p > 0.5 ? (p - 0.5) * 0.45 : 0))
  const labelOpacity = useTransform(vizProgress, (p) =>
    p > 0.6 ? Math.min(1, (p - 0.6) * 2.5) : 0,
  )

  const mkCard = (cl: ClientCard) => (
    <motion.div
      className="flex-1"
      style={{ opacity: cardOpacity, filter: cardBlur }}
      transition={SPRING_SLOW}
    >
      <div
        className={clsx('bg-sandstone-50', compact ? 'p-2' : 'p-2.5')}
        style={{ border: `1px solid ${ca(cl.color, 0.13)}` }}
      >
        <div
          className={clsx('flex items-center gap-1', compact ? 'mb-1 pb-1' : 'mb-1.5 pb-[5px]')}
          style={{ borderBottom: `1px solid ${ca(cl.color, 0.06)}` }}
        >
          <div className="h-[5px] w-[5px]" style={{ background: cl.color }} />
          <span
            className={clsx(
              'font-semibold uppercase tracking-[0.06em]',
              compact ? 'text-[0.5rem]' : 'text-[0.5625rem]',
            )}
            style={{ color: cl.color }}
          >
            {cl.name}
          </span>
        </div>
        {cl.frags.slice(0, compact ? 2 : 3).map((f, i) => (
          <div
            key={i}
            className={clsx(
              'text-ash-700 py-[1.5px]',
              compact ? 'text-[0.5rem]' : 'text-[0.5625rem]',
            )}
          >
            {f}
          </div>
        ))}
      </div>
    </motion.div>
  )

  return (
    <div
      className={clsx(
        'border-ash-300 bg-sandstone-50 flex h-full flex-col border border-dashed',
        compact ? 'px-3 py-3.5' : 'px-3.5 py-4',
      )}
    >
      <div
        className={clsx(
          'border-ash-200 flex items-center gap-1.5 border-b border-dashed',
          compact ? 'mb-2.5 pb-2' : 'mb-3 pb-2.5',
        )}
      >
        <div className="bg-goldenrod h-1.5 w-1.5" />
        <span
          className={clsx(
            'text-goldenrod-700 font-semibold uppercase tracking-[0.08em]',
            compact ? 'text-[0.5625rem]' : 'text-[0.625rem]',
          )}
        >
          Consumer AI — No Guardrails
        </span>
      </div>

      <div className={clsx('relative flex-1', compact ? 'min-h-[140px]' : 'min-h-[180px]')}>
        <div className={clsx('relative z-[1] flex h-full', compact ? 'gap-1.5' : 'gap-2.5')}>
          {mkCard(CL_A)}
          {mkCard(CL_B)}
        </div>

        {/* Divider dissolve */}
        <div className="absolute top-[4%] bottom-[4%] left-1/2 z-[5] w-[1.5px] -translate-x-1/2">
          <DividerLine integrityAlpha={integrityAlpha} gapSize={gapSize} blur={dividerBlur} />
        </div>

        {/* Drifting fragments — desktop only */}
        {!compact && (
          <>
            {CL_A.frags.map(
              (f, i) =>
                DRIFT_A[i] && (
                  <DriftingFragment
                    key={`a${i}`}
                    fragment={f}
                    drift={DRIFT_A[i]}
                    startOffset={0.08 + i * 0.1}
                    color={CL_A.color}
                    vizProgress={vizProgress}
                  />
                ),
            )}
            {CL_B.frags.map(
              (f, i) =>
                DRIFT_B[i] && (
                  <DriftingFragment
                    key={`b${i}`}
                    fragment={f}
                    drift={DRIFT_B[i]}
                    startOffset={0.1 + i * 0.1}
                    color={CL_B.color}
                    vizProgress={vizProgress}
                  />
                ),
            )}
          </>
        )}

        {/* Warning border */}
        <motion.div
          className="border-coral-500 pointer-events-none absolute -inset-0.5 z-20 border-[1.5px] border-solid"
          style={{ opacity: warningOpacity }}
          transition={SPRING_SLOW}
        />
      </div>

      {/* Bottom label */}
      <motion.div
        className={clsx(
          'border-goldenrod/8 border-t border-solid pt-2 text-center',
          compact ? 'mt-2' : 'mt-2.5',
        )}
        style={{ opacity: labelOpacity }}
        transition={SPRING_SLOW}
      >
        <div className="text-goldenrod-700 text-[0.625rem] leading-[1.4] italic">
          Freedom, but no boundaries. Built for everyone — which means built for no one.
        </div>
      </motion.div>
    </div>
  )
}

function DividerLine({
  integrityAlpha,
  gapSize,
  blur,
}: {
  integrityAlpha: MotionValue<number>
  gapSize: MotionValue<number>
  blur: MotionValue<string>
}) {
  // Stay in MotionValue-land — no per-frame re-render. `alphaPct` matches the
  // Math.round(opacity * 100) rounding in ca() (src/lib/color.ts), and the
  // template reproduces ca()'s color-mix output byte-for-byte.
  const alphaPct = useTransform(integrityAlpha, (a) => Math.round(a * 100))
  const background = useMotionTemplate`repeating-linear-gradient(to bottom, color-mix(in oklch, var(--color-ash-400) ${alphaPct}%, transparent) 0px, color-mix(in oklch, var(--color-ash-400) ${alphaPct}%, transparent) 3px, transparent 3px, transparent ${gapSize}px)`

  return <motion.div className="h-full w-full" style={{ background, filter: blur }} />
}

function DriftingFragment({
  fragment,
  drift,
  startOffset,
  color,
  vizProgress,
}: {
  fragment: string
  drift: Drift
  startOffset: number
  color: string
  vizProgress: MotionValue<number>
}) {
  const fp = useTransform(vizProgress, (p) => Math.max(0, Math.min(1, (p - startOffset) / 0.35)))
  // Ease out cubic
  const easedProgress = useTransform(fp, (v) => 1 - Math.pow(1 - v, 3))
  const left = useTransform(easedProgress, (e) => `${drift.sx + (drift.ex - drift.sx) * e}%`)
  const top = useTransform(easedProgress, (e) => `${drift.sy + (drift.ey - drift.sy) * e}%`)
  const opacity = useTransform(fp, (v) => (v === 0 ? 0 : Math.min(0.75, 0.2 + v * 0.55)))

  return (
    <motion.div className="pointer-events-none absolute z-10" style={{ left, top, opacity }}>
      <div
        className="px-1.5 py-0.5 text-[0.5625rem] font-medium whitespace-nowrap"
        style={{
          color,
          background: ca(color, 0.05),
          border: `1px solid ${ca(color, 0.13)}`,
        }}
      >
        {fragment}
      </div>
    </motion.div>
  )
}
