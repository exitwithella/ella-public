'use client'

import { clsx } from 'clsx/lite'
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import { useState, useEffect, useRef } from 'react'

import { useIsMobile } from '@/hooks/use-media-query'

import { BleedPanel } from './bleed-panel'
import { ComparisonTable, type ColumnSubtitles } from './comparison-table'
import { STATUS_TEXTS, STEPS, TABLE_ROWS, SPRING_SLOW, getStatusIndex } from './constants'
import { RailsPanel } from './rails-panel'

export interface DilemmaSectionProps {
  label?: string
  heading?: string
  headingAccent?: string
  body?: string
  transitionLine1?: string
  transitionLine2?: string
  tableData?: Array<{
    dim: string
    old: string
    rigid: string
    patch: string
    ella: string
  }>
  steps?: Array<{ label: string; sub: string }>
  columnSubtitles?: ColumnSubtitles
  closer?: string
}

/** Floating pill naming each visualization panel */
function PanelLabel({
  variant,
  children,
}: {
  variant: 'ocean' | 'goldenrod'
  children: React.ReactNode
}) {
  return (
    <div
      className={clsx(
        'absolute -top-3 left-1/2 z-10 -translate-x-1/2 border px-3 py-1 text-[0.625rem] font-semibold tracking-[0.06em] uppercase whitespace-nowrap',
        variant === 'ocean'
          ? 'border-ocean-700/15 bg-ocean-50 text-ocean-700'
          : 'border-goldenrod/15 bg-goldenrod-100 text-goldenrod-700',
      )}
    >
      {children}
    </div>
  )
}

export default function DilemmaSection(props: DilemmaSectionProps = {}) {
  const resolvedTableRows = props.tableData ?? TABLE_ROWS
  const resolvedSteps = props.steps ?? STEPS
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null)

  // Motion scroll progress — track element position in viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Viz completes within the scroll runway (~200-250vh of total section height)
  const vizEnd = isMobile ? 0.4 : 0.45
  const vizProgress = useTransform(scrollYProgress, [0, vizEnd], [0, 1])

  // For status pill and transition copy (need raw value)
  const [vizProgressValue, setVizProgressValue] = useState(0)
  useEffect(() => {
    return vizProgress.on('change', setVizProgressValue)
  }, [vizProgress])

  const statusIndex = getStatusIndex(vizProgressValue)

  return (
    <div ref={containerRef} className="w-full font-sans">
      <div className={isMobile ? 'pt-12 pb-20' : 'pt-20 pb-30'}>
        {/* ─── SCROLL RUNWAY: pins header + caption + viz while scroll drives animations ─── */}
        <div className={isMobile ? 'min-h-[140vh]' : 'min-h-[175vh]'}>
          <div className={clsx('sticky top-0 z-[1]', isMobile ? 'pt-4 pb-6' : 'pt-6 pb-8')}>
            {/* ─── HEADER ─── */}
            <div
              className={clsx(
                'mx-auto mb-12 max-w-[680px] text-center',
                isMobile ? 'px-5' : 'px-8',
              )}
            >
              <div className="text-ash-400 mb-4 text-[0.6875rem] font-semibold tracking-[0.1em] uppercase">
                {props.label ?? 'The Advisor’s Dilemma'}
              </div>
              <h2 className="text-theme-text mb-4 font-serif text-4xl font-normal">
                {props.heading ?? 'Rigid or improvised.'}
                <br />
                <span className="text-theme-text-muted">
                  {props.headingAccent ?? 'Those aren’t the only options.'}
                </span>
              </h2>
              <p
                className={clsx(
                  'm-0 leading-[1.55] text-ash-700',
                  isMobile ? 'text-[0.9375rem]' : 'text-[1.0625rem]',
                )}
              >
                {props.body ??
                  'Rigid platforms were built for advisors but don’t respect your methodology. Consumer AI tools are powerful but weren’t built for client work. Advisors shouldn’t have to choose.'}
              </p>
            </div>

            {/* ─── STICKY CAPTION ─── */}
            <div
              className={clsx(
                'pointer-events-none sticky z-20 text-center',
                isMobile ? 'top-3 mb-6 px-5' : 'top-5 mb-8 px-8',
              )}
            >
              <div
                className={clsx(
                  'inline-block rounded-[2px] border border-ash-200/50 bg-sandstone/93 backdrop-blur-[8px]',
                  isMobile ? 'min-h-10 px-5 py-2.5' : 'min-h-11 px-7 py-3',
                )}
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={statusIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className={clsx(
                      'm-0 font-serif leading-[1.4] tracking-[-0.01em] text-ash-700',
                      isMobile ? 'text-[0.9375rem]' : 'text-[1.125rem]',
                    )}
                  >
                    {STATUS_TEXTS[statusIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* ─── VISUALIZATION ─── */}
            <div className={clsx('mx-auto', isMobile ? 'max-w-full px-4' : 'max-w-[820px] px-6')}>
              {isMobile ? (
                /* ═══ MOBILE: Stacked ═══ */
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <PanelLabel variant="ocean">Rigid Platforms</PanelLabel>
                    <RailsPanel steps={resolvedSteps} vizProgress={vizProgress} compact={true} />
                  </div>

                  <div className="text-ash-400 py-1 text-center text-[0.8125rem] font-semibold tracking-[0.06em]">
                    — or —
                  </div>

                  <div className="relative">
                    <PanelLabel variant="goldenrod">Consumer AI</PanelLabel>
                    <BleedPanel vizProgress={vizProgress} compact={true} />
                  </div>
                </div>
              ) : (
                /* ═══ DESKTOP: Side-by-side ═══ */
                <div className="flex min-h-[440px] items-stretch gap-5">
                  <div className="relative flex-[0_0_58%]">
                    <PanelLabel variant="ocean">Rigid Platforms</PanelLabel>
                    <RailsPanel steps={resolvedSteps} vizProgress={vizProgress} compact={false} />
                  </div>

                  {/* Divider */}
                  <div className="flex flex-col items-center justify-center gap-1.5 py-5">
                    <div className="bg-ash-200/38 w-px flex-1" />
                    <span className="text-ash-400 py-1.5 text-[0.6875rem] font-semibold tracking-[0.06em]">
                      OR
                    </span>
                    <div className="bg-ash-200/38 w-px flex-1" />
                  </div>

                  <div className="relative flex-[0_0_38%]">
                    <PanelLabel variant="goldenrod">Consumer AI</PanelLabel>
                    <BleedPanel vizProgress={vizProgress} compact={false} />
                  </div>
                </div>
              )}

              {/* Status caption (sticky version rendered above viz) */}
            </div>
          </div>
          {/* end sticky frame */}
        </div>
        {/* end scroll runway */}

        {/* ─── TRANSITION COPY ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={vizProgressValue > 0.7 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={SPRING_SLOW}
          className={clsx('text-center', isMobile ? 'px-5 pt-10 pb-11' : 'px-8 pt-13 pb-14')}
        >
          <p
            className={clsx(
              'mb-1.5 font-serif leading-[1.4] text-ash-900',
              isMobile ? 'text-[1.125rem]' : 'text-[clamp(1.125rem,2.2vw,1.5rem)]',
            )}
          >
            {props.transitionLine1 ?? 'What if your tools were built for advisory work —'}
          </p>
          <p
            className={clsx(
              'm-0 font-serif leading-[1.4] text-moss-700',
              isMobile ? 'text-[1.125rem]' : 'text-[clamp(1.125rem,2.2vw,1.5rem)]',
            )}
          >
            {props.transitionLine2 ?? 'and adapted to your methodology, not the other way around?'}
          </p>
        </motion.div>

        {/* ═══ TABLE ═══ */}
        <ComparisonTable
          rows={resolvedTableRows}
          isMobile={isMobile}
          columnSubtitles={props.columnSubtitles}
          closer={props.closer}
        />
      </div>
    </div>
  )
}
