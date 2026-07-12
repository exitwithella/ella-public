'use client'

import { clsx } from 'clsx/lite'
import { motion, AnimatePresence, type Variants } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { ca } from '@/lib/color'

import { SPRING_DEFAULT, SPRING_SLOW, SPRING_SNAPPY, type TableRow } from './constants'

export interface ColumnSubtitles {
  old?: string
  rigid?: string
  patch?: string
  ella?: string
}

// ─── Shared pieces ───

function AnimatedCheck({ visible, delay }: { visible: boolean; delay: number }) {
  return (
    <motion.span
      initial={{ scale: 0, backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{
        scale: visible ? 1 : 0,
        backgroundColor: visible ? ca('var(--color-moss-400)', 0.13) : 'rgba(0,0,0,0)',
      }}
      transition={{
        ...SPRING_SNAPPY,
        delay: delay / 1000,
      }}
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center"
    >
      <motion.svg
        aria-hidden="true"
        width="12"
        height="9"
        viewBox="0 0 13 10"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, delay: (delay + 150) / 1000 }}
      >
        <motion.path
          d="M1 5L4.5 8.5L12 1"
          stroke="var(--color-moss-700)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="20"
          initial={{ strokeDashoffset: 20 }}
          animate={{ strokeDashoffset: visible ? 0 : 20 }}
          transition={{ duration: 0.4, delay: (delay + 80) / 1000 }}
        />
      </motion.svg>
    </motion.span>
  )
}

/** Left-to-right wipe highlight over an ELLA cell as it resolves in */
function WipeGradient({
  show,
  alpha,
  duration,
  delay = 0,
  initialOpacity = 0.6,
}: {
  show: boolean
  alpha: number
  duration: number
  delay?: number
  initialOpacity?: number
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scaleX: 0, opacity: initialOpacity }}
          animate={{ scaleX: 1, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration, ease: 'easeOut', delay }}
          className="pointer-events-none absolute inset-0 origin-left"
          style={{
            background: `linear-gradient(90deg, ${ca('var(--color-moss-400)', alpha)}, transparent)`,
          }}
        />
      )}
    </AnimatePresence>
  )
}

// Table row variants for staggered animation
const rowVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      ...SPRING_DEFAULT,
      delay: delay / 1000,
    },
  }),
}

const cellVariants: Variants = {
  hidden: { opacity: 0, x: 14 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      ...SPRING_DEFAULT,
      delay: delay / 1000,
    },
  }),
}

// ─── Desktop ───

const DESKTOP_CELL = 'flex items-center px-3 py-4 text-[0.75rem]'

function DesktopHeader({ phase, subtitles }: { phase: number; subtitles?: ColumnSubtitles }) {
  return (
    <div className="border-ash-300 grid grid-cols-[120px_1fr_1fr_1fr_1fr] border-b border-dashed">
      <div className="px-3 py-4.5" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={SPRING_DEFAULT}
        className="bg-ash-100/25 px-3 py-4.5 text-center"
      >
        <div className="text-ash-400 mb-[3px] text-[0.625rem] font-bold tracking-[0.1em] uppercase">
          The Old Way
        </div>
        <div className="text-ash-400 text-[0.6875rem] italic">
          {subtitles?.old ?? 'Manual, memory-based'}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ ...SPRING_DEFAULT, delay: 0.06 }}
        className="bg-ocean-50 px-3 py-4.5 text-center"
      >
        <div className="text-ocean-700 mb-[3px] text-[0.625rem] font-bold tracking-[0.1em] uppercase">
          The Rigid Platform
        </div>
        <div className="text-ocean-400 text-[0.6875rem] italic">
          {subtitles?.rigid ?? 'Their process, not yours'}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 3 ? 1 : 0 }}
        transition={{ ...SPRING_DEFAULT, delay: 0.06 }}
        className="bg-goldenrod-100/38 px-3 py-4.5 text-center"
      >
        <div className="text-goldenrod-700 mb-[3px] text-[0.625rem] font-bold tracking-[0.1em] uppercase">
          Consumer AI
        </div>
        <div className="text-goldenrod-700 text-[0.6875rem] italic">
          {subtitles?.patch ?? 'Powerful, unprotected'}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 4 ? 1 : 0 }}
        transition={SPRING_DEFAULT}
        className="bg-moss-50 relative overflow-hidden px-3 py-4.5 text-center"
        style={{
          borderLeft: phase >= 4 ? '3px solid var(--color-moss-400)' : '3px solid rgba(0,0,0,0)',
        }}
      >
        <WipeGradient show={phase >= 4} alpha={0.15} duration={0.7} initialOpacity={0.5} />
        <div className="relative z-[1]">
          <div className="text-moss-700 mb-[3px] text-[0.625rem] font-bold tracking-[0.1em] uppercase">
            With ELLA
          </div>
          <div className="text-moss-700 text-[0.6875rem] italic">
            {subtitles?.ella ?? 'Your methodology, systematized'}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function DesktopRow({
  row,
  index,
  phase,
  scanReached,
}: {
  row: TableRow
  index: number
  phase: number
  scanReached: boolean
}) {
  const rd = index * 80
  const showOld = phase >= 1
  const showRigid = phase >= 2
  const showPatch = phase >= 3
  const defeated = scanReached

  return (
    <div className="border-ash-200 grid min-h-[66px] grid-cols-[120px_1fr_1fr_1fr_1fr] border-b border-dashed">
      {/* Label */}
      <motion.div
        custom={rd}
        variants={rowVariants}
        initial="hidden"
        animate={showOld ? 'visible' : 'hidden'}
        className={clsx(DESKTOP_CELL, 'text-[0.8125rem] font-semibold text-ash-900')}
      >
        {row.dim}
      </motion.div>

      {/* Old Way */}
      <motion.div
        custom={rd + 40}
        variants={cellVariants}
        initial="hidden"
        animate={showOld ? 'visible' : 'hidden'}
        className={clsx(DESKTOP_CELL, 'bg-ash-100/25 italic text-ash-400')}
        style={{
          opacity: defeated ? 0.35 : 1,
          textDecorationLine: defeated ? 'line-through' : 'none',
          textDecorationColor: defeated ? ca('var(--color-ash-200)', 0.5) : undefined,
        }}
        transition={SPRING_DEFAULT}
      >
        <span className="flex items-center gap-[5px]">
          <span aria-hidden="true" className="text-ash-200 text-[0.75rem] font-bold">
            ✕
          </span>
          {row.old}
        </span>
      </motion.div>

      {/* Rigid */}
      <motion.div
        custom={rd + 40}
        variants={cellVariants}
        initial="hidden"
        animate={showRigid ? 'visible' : 'hidden'}
        className={clsx(DESKTOP_CELL, 'bg-ocean-50 text-ocean-700')}
        style={{
          opacity: defeated ? 0.4 : 1,
          textDecorationLine: defeated ? 'line-through' : 'none',
          textDecorationColor: defeated ? ca('var(--color-ocean-400)', 0.5) : undefined,
          borderLeft:
            showRigid && !defeated
              ? `2px solid ${ca('var(--color-ocean-700)', 0.21)}`
              : '2px solid rgba(0,0,0,0)',
        }}
        transition={SPRING_DEFAULT}
      >
        <span className="flex items-center gap-[5px]">
          <svg
            aria-hidden="true"
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            className="shrink-0"
          >
            <rect
              x="3"
              y="1"
              width="6"
              height="4"
              rx="1"
              stroke={defeated ? 'var(--color-ocean-400)' : 'var(--color-ocean-700)'}
              strokeWidth="1.2"
              fill="none"
            />
            <rect
              x="2"
              y="5"
              width="8"
              height="6"
              rx="1.5"
              fill={defeated ? 'var(--color-ocean-400)' : 'var(--color-ocean-700)'}
              fillOpacity="0.5"
            />
          </svg>
          {row.rigid}
        </span>
      </motion.div>

      {/* Consumer AI */}
      <motion.div
        custom={rd + 40}
        variants={cellVariants}
        initial="hidden"
        animate={showPatch ? 'visible' : 'hidden'}
        className={clsx(DESKTOP_CELL, 'bg-goldenrod-100/31 text-goldenrod-700')}
        style={{
          opacity: defeated ? 0.4 : 1,
          textDecorationLine: defeated ? 'line-through' : 'none',
          textDecorationColor: defeated ? ca('var(--color-goldenrod)', 0.31) : undefined,
          borderLeft:
            showPatch && !defeated
              ? `2px solid ${ca('var(--color-goldenrod)', 0.27)}`
              : '2px solid rgba(0,0,0,0)',
        }}
        transition={SPRING_DEFAULT}
      >
        <span className="flex items-center gap-[5px]">{row.patch}</span>
      </motion.div>

      {/* ELLA */}
      <motion.div
        initial={{ opacity: 0, x: 22 }}
        animate={{
          opacity: scanReached ? 1 : 0,
          x: scanReached ? 0 : 22,
        }}
        transition={{
          ...SPRING_DEFAULT,
          delay: (rd * 0.4) / 1000,
        }}
        className={clsx(
          DESKTOP_CELL,
          'relative overflow-hidden bg-moss-50 font-medium text-moss-700',
        )}
        style={{
          borderLeft: scanReached ? '3px solid var(--color-moss-400)' : '3px solid rgba(0,0,0,0)',
        }}
      >
        <WipeGradient show={scanReached} alpha={0.15} duration={0.6} delay={(rd * 0.4) / 1000} />
        <span className="relative z-[1] flex items-center gap-2">
          <AnimatedCheck visible={scanReached} delay={rd * 0.4 + 100} />
          {row.ella}
        </span>
      </motion.div>
    </div>
  )
}

// ─── Mobile ───

const MOBILE_OPTION = 'px-3 py-2.5 text-[0.8125rem] leading-[1.4] border-l-[3px]'
const MOBILE_OPTION_LABEL = 'mb-1 text-[0.5625rem] font-bold tracking-[0.08em] uppercase'

/** Dynamic (defeat-dependent) styles for a mobile option block */
function defeatStyle(borderColor: string, defeated: boolean): React.CSSProperties {
  return {
    opacity: defeated ? 0.4 : 1,
    textDecorationLine: defeated ? 'line-through' : 'none',
    textDecorationColor: defeated ? ca(borderColor, 0.38) : undefined,
  }
}

function MobileCard({
  row,
  index,
  phase,
  scanReached,
}: {
  row: TableRow
  index: number
  phase: number
  scanReached: boolean
}) {
  const showOld = phase >= 1
  const showRigid = phase >= 2
  const showPatch = phase >= 3
  const defeated = scanReached
  const rd = index * 120

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...SPRING_DEFAULT,
        delay: rd / 1000,
      },
    },
  }

  const optionVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        ...SPRING_DEFAULT,
        delay: delay / 1000,
      },
    }),
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={phase >= 1 ? 'visible' : 'hidden'}
      className="border-ash-300 bg-sandstone-50 overflow-hidden border border-dashed"
    >
      <div className="border-ash-200 border-b border-dashed px-4 pt-3.5 pb-2.5">
        <div className="text-ash-700 text-[0.6875rem] font-bold tracking-[0.08em] uppercase">
          {row.dim}
        </div>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <motion.div
          custom={rd + 40}
          variants={optionVariants}
          initial="hidden"
          animate={showOld ? 'visible' : 'hidden'}
          className={clsx(MOBILE_OPTION, 'border-l-ash-200 bg-ash-100/25 text-ash-400')}
          style={defeatStyle('var(--color-ash-200)', defeated)}
        >
          <div className={clsx(MOBILE_OPTION_LABEL, 'text-ash-400')}>The Old Way</div>
          <div className="italic">{row.old}</div>
        </motion.div>

        <motion.div
          custom={rd + 40}
          variants={optionVariants}
          initial="hidden"
          animate={showRigid ? 'visible' : 'hidden'}
          className={clsx(MOBILE_OPTION, 'border-l-ocean-700 bg-ocean-50 text-ocean-700')}
          style={defeatStyle('var(--color-ocean-700)', defeated)}
        >
          <div className={clsx(MOBILE_OPTION_LABEL, 'text-ocean-400')}>Rigid Platform</div>
          <div>{row.rigid}</div>
        </motion.div>

        <motion.div
          custom={rd + 40}
          variants={optionVariants}
          initial="hidden"
          animate={showPatch ? 'visible' : 'hidden'}
          className={clsx(
            MOBILE_OPTION,
            'border-l-goldenrod bg-goldenrod-100/38 text-goldenrod-700',
          )}
          style={defeatStyle('var(--color-goldenrod)', defeated)}
        >
          <div className={clsx(MOBILE_OPTION_LABEL, 'text-goldenrod-700')}>Consumer AI</div>
          <div>{row.patch}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: scanReached ? 1 : 0,
            y: scanReached ? 0 : 10,
          }}
          transition={{
            ...SPRING_DEFAULT,
            delay: (rd * 0.5) / 1000,
          }}
          className="text-moss-700 bg-moss-50 relative overflow-hidden p-3 text-[0.8125rem] leading-[1.4] font-medium"
          style={{
            borderLeft: `3px solid ${scanReached ? 'var(--color-moss-400)' : 'rgba(0,0,0,0)'}`,
          }}
        >
          <WipeGradient show={scanReached} alpha={0.13} duration={0.6} />
          <div className="relative z-[1]">
            <div className={clsx(MOBILE_OPTION_LABEL, 'flex items-center gap-1.5 text-moss-700')}>
              <AnimatedCheck visible={scanReached} delay={rd * 0.4 + 100} />
              With ELLA
            </div>
            <div>{row.ella}</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─── Comparison table (desktop grid + mobile cards, one state machine) ───

export function ComparisonTable({
  rows,
  isMobile,
  columnSubtitles,
  closer,
}: {
  rows: TableRow[]
  isMobile: boolean
  columnSubtitles?: ColumnSubtitles
  closer?: string
}) {
  const tableRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState(0)
  const [scanReached, setScanReached] = useState<boolean[]>(() => rows.map(() => false))
  const timers = useRef<NodeJS.Timeout[]>([])
  const seqStarted = useRef(false)

  const allLocked = scanReached.length > 0 && scanReached.every(Boolean)

  useEffect(() => {
    if (!tableRef.current) return
    const activeTimers = timers.current
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !seqStarted.current) {
          seqStarted.current = true
          setPhase(1)
          activeTimers.push(setTimeout(() => setPhase(2), 300))
          activeTimers.push(setTimeout(() => setPhase(3), 600))
          activeTimers.push(
            setTimeout(() => {
              setPhase(4)
              rows.forEach((_, i) => {
                activeTimers.push(
                  setTimeout(
                    () => {
                      setScanReached((prev) => {
                        const n = rows.map((_, j) => prev[j] ?? false)
                        n[i] = true
                        return n
                      })
                    },
                    i * (isMobile ? 200 : 100),
                  ),
                )
              })
            }, 1000),
          )
        }
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0.08 },
    )
    obs.observe(tableRef.current)
    return () => {
      obs.disconnect()
      activeTimers.forEach(clearTimeout)
    }
  }, [isMobile, rows])

  return (
    <div ref={tableRef} className={clsx('mx-auto max-w-[1080px]', isMobile ? 'px-4' : 'px-5')}>
      {isMobile ? (
        <div className="flex flex-col gap-4">
          {rows.map((row, i) => (
            <MobileCard key={i} row={row} index={i} phase={phase} scanReached={scanReached[i]} />
          ))}
        </div>
      ) : (
        <div className="border-ash-300 bg-sandstone-50 overflow-hidden border border-dashed">
          <DesktopHeader phase={phase} subtitles={columnSubtitles} />
          {rows.map((row, i) => (
            <DesktopRow key={i} row={row} index={i} phase={phase} scanReached={scanReached[i]} />
          ))}
        </div>
      )}

      {/* Closer */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{
          opacity: allLocked ? 1 : 0,
          y: allLocked ? 0 : 14,
        }}
        transition={{ ...SPRING_SLOW, delay: 0.3 }}
        className={clsx('text-center', isMobile ? 'pt-9' : 'pt-12')}
      >
        <p
          className="text-ash-900 m-0 font-serif leading-[1.3]"
          style={{
            fontSize: isMobile ? '1.375rem' : 'clamp(1.25rem, 2.5vw, 1.75rem)',
          }}
        >
          {closer ?? 'Hours to the first real conversation. Not weeks.'}
        </p>
      </motion.div>
    </div>
  )
}
