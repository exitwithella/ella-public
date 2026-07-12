'use client'

import { clsx } from 'clsx/lite'
import { motion, useTransform, type Variants, type MotionValue } from 'motion/react'

import { SPRING_DEFAULT, SPRING_SLOW, SPRING_SNAPPY, type Step } from './constants'

// ═══════════════════════════════════════════════════════════
// RAILS PANEL — "Rigid Platforms"
// ═══════════════════════════════════════════════════════════

export function RailsPanel({
  steps,
  vizProgress,
  compact,
}: {
  steps: Step[]
  vizProgress: MotionValue<number>
  compact: boolean
}) {
  const elide = compact && steps.length > 4
  const visibleSteps = elide ? steps.slice(0, 3).concat([steps[steps.length - 1]]) : steps

  return (
    <div
      className={clsx(
        'flex h-full flex-col border border-dashed border-ash-300 bg-sandstone-50',
        compact ? 'px-3.5 py-4' : 'px-4.5 py-5',
      )}
    >
      {/* Header */}
      <div
        className={clsx(
          'flex items-center gap-2 border-b border-dashed border-ash-200',
          compact ? 'mb-3 pb-2.5' : 'mb-4 pb-3',
        )}
      >
        <div className="bg-ocean-700 h-1.5 w-1.5" />
        <span
          className={clsx(
            'font-semibold uppercase tracking-[0.08em] text-ocean-700',
            compact ? 'text-[0.625rem]' : 'text-[0.6875rem]',
          )}
        >
          Legacy Platform — Fixed Workflow
        </span>
      </div>

      {/* Steps */}
      <div className="flex-1">
        {visibleSteps.map((step, i) => {
          const origIdx = steps.indexOf(step)
          return (
            <StepRow
              key={origIdx}
              step={step}
              origIdx={origIdx}
              isLast={i >= visibleSteps.length - 1}
              compact={compact}
              vizProgress={vizProgress}
            />
          )
        })}

        {/* Compact ellipsis */}
        {elide && (
          <div className="text-ash-400 py-0.5 pl-7 text-center text-[0.6875rem] tracking-[0.2em]">
            • • •
          </div>
        )}
      </div>

      {/* Identical output stack — appears at progress 0.52 */}
      <OutputStack vizProgress={vizProgress} compact={compact} />
    </div>
  )
}

function StepRow({
  step,
  origIdx,
  isLast,
  compact,
  vizProgress,
}: {
  step: Step
  origIdx: number
  isLast: boolean
  compact: boolean
  vizProgress: MotionValue<number>
}) {
  const sp = useTransform(vizProgress, (p) => Math.max(0, Math.min(1, (p - origIdx * 0.08) / 0.12)))
  const locked = useTransform(sp, (v) => v >= 1)

  const borderColor = useTransform(locked, (l) =>
    l ? 'var(--color-ocean-700)' : 'var(--color-ash-200)',
  )
  const bgColor = useTransform(locked, (l) =>
    l ? 'var(--color-ocean-700)' : 'var(--color-sandstone-50)',
  )
  const connectorBg = useTransform(locked, (l) =>
    l ? 'var(--color-ocean-700)' : 'var(--color-ash-200)',
  )
  const opacity = useTransform(sp, (v) => (v > 0 ? 1 : 0.25))
  const textColor = useTransform(locked, (l) =>
    l ? 'var(--color-ocean-700)' : 'var(--color-ash-700)',
  )
  const subColor = useTransform(locked, (l) =>
    l ? 'var(--color-ocean-400)' : 'var(--color-ash-400)',
  )
  const lockedOpacity = useTransform(locked, (l) => (l ? 1 : 0))

  return (
    <div className={clsx('flex', compact ? 'gap-2' : 'gap-2.5', isLast ? '' : 'mb-0.5')}>
      {/* Step indicator */}
      <div className={clsx('flex shrink-0 flex-col items-center', compact ? 'w-5' : 'w-6')}>
        <motion.div
          className={clsx(
            'flex shrink-0 items-center justify-center border-2 border-solid',
            compact ? 'h-5 w-5' : 'h-6 w-6',
          )}
          style={{
            borderColor,
            background: bgColor,
          }}
          transition={SPRING_DEFAULT}
        >
          <LockedIcon locked={locked} compact={compact} origIdx={origIdx} />
        </motion.div>
        {!isLast && (
          <motion.div
            className={clsx('w-[1.5px] flex-1', compact ? 'min-h-[8px]' : 'min-h-[12px]')}
            style={{ background: connectorBg }}
            transition={SPRING_DEFAULT}
          />
        )}
      </div>

      {/* Step text */}
      <motion.div
        className={compact ? 'pt-px pb-2.5' : 'pt-0.5 pb-3.5'}
        style={{ opacity }}
        transition={SPRING_SLOW}
      >
        <motion.div
          className={clsx('font-semibold', compact ? 'text-[0.75rem]' : 'text-[0.8125rem]')}
          style={{ color: textColor }}
          transition={SPRING_DEFAULT}
        >
          {step.label}
        </motion.div>
        <motion.div
          className={clsx(
            'mt-0.5 italic leading-[1.4]',
            compact ? 'text-[0.625rem]' : 'text-[0.6875rem]',
          )}
          style={{ color: subColor }}
          transition={SPRING_DEFAULT}
        >
          {step.sub}
        </motion.div>
      </motion.div>

      {/* LOCKED badge */}
      {!compact && (
        <motion.div
          className="bg-ocean-50 text-ocean-700 mt-1 shrink-0 self-start px-1.5 py-0.5 text-[0.5625rem] font-bold tracking-[0.06em] uppercase"
          style={{ opacity: lockedOpacity }}
          transition={SPRING_DEFAULT}
        >
          LOCKED
        </motion.div>
      )}
    </div>
  )
}

function LockedIcon({
  locked,
  compact,
  origIdx,
}: {
  locked: MotionValue<boolean>
  compact: boolean
  origIdx: number
}) {
  const scale = useTransform(locked, (l) => (l ? 1 : 0))
  const numberOpacity = useTransform(locked, (l) => (l ? 0 : 1))

  return (
    <>
      <motion.svg
        width="10"
        height="10"
        viewBox="0 0 12 12"
        fill="none"
        className="absolute"
        style={{ scale }}
        transition={SPRING_SNAPPY}
      >
        <rect
          x="3"
          y="1"
          width="6"
          height="4"
          rx="1"
          stroke="white"
          strokeWidth="1.3"
          fill="none"
        />
        <rect x="2" y="5" width="8" height="6" rx="1.5" fill="white" />
      </motion.svg>
      <motion.span
        className={clsx('font-bold text-ash-400', compact ? 'text-[0.5625rem]' : 'text-[0.625rem]')}
        style={{ opacity: numberOpacity }}
        transition={SPRING_DEFAULT}
      >
        {origIdx + 1}
      </motion.span>
    </>
  )
}

function OutputStack({
  vizProgress,
  compact,
}: {
  vizProgress: MotionValue<number>
  compact: boolean
}) {
  const opacity = useTransform(vizProgress, (p) => (p > 0.52 ? Math.min(1, (p - 0.52) * 4) : 0))

  const stackVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        ...SPRING_DEFAULT,
        delay: i * 0.08,
      },
    }),
  }

  return (
    <motion.div
      className={clsx('border-t border-ocean-700/7', compact ? 'mt-2 pt-2' : 'mt-3 pt-3')}
      style={{ opacity }}
      transition={SPRING_SLOW}
    >
      <div className="text-ocean-400 mb-2 text-center text-[0.625rem] font-semibold tracking-[0.06em] uppercase">
        Output: identical every time
      </div>
      <div className={clsx('relative', compact ? 'h-12' : 'h-15')}>
        {['Client A', 'Client B', 'Client C'].map((n, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={stackVariants}
            initial="hidden"
            animate="visible"
            className={clsx(
              'absolute left-1/2 w-[85%] border border-ocean-700/13 bg-sandstone-50',
              compact ? 'px-2 py-1' : 'px-2.5 py-1.5',
            )}
            style={{
              top: `${i * (compact ? 4 : 6)}px`,
              x: '-50%',
              zIndex: 3 - i,
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className={clsx(
                  'font-semibold text-ocean-700',
                  compact ? 'text-[0.5625rem]' : 'text-[0.625rem]',
                )}
              >
                {n}
              </span>
              <span className="text-ash-400 text-[0.5625rem]">90 pages</span>
            </div>
            {!compact && (
              <div className="mt-1 flex gap-0.5">
                {[55, 40, 65, 30, 50, 45].map((w, j) => (
                  <div key={j} className="bg-ocean-700/8 h-0.5" style={{ width: `${w}%` }} />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
