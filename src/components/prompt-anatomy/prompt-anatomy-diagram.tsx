'use client'

import { clsx } from 'clsx/lite'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useIsMobile } from '@/hooks/use-media-query'

interface PromptAnatomyItem {
  heading: string
  body: string
  annotationLabel: string
  annotationDetail?: string | null
  color: 'moss' | 'goldenrod'
}

interface ConnectorLine {
  id: number
  path: string
  cx: number
  cy: number
  color: 'moss' | 'goldenrod'
}

interface PromptAnatomyDiagramProps {
  items: PromptAnatomyItem[]
  promptText?: string | null
  responseLabel?: string | null
  responseMetadata?: string | null
}

const COLOR_CLASSES = {
  moss: {
    dot: 'bg-moss-500',
    dotBorder: 'border-moss-400',
    text: 'text-moss-600',
    stroke: 'var(--color-moss-400)',
  },
  goldenrod: {
    dot: 'bg-goldenrod-500',
    dotBorder: 'border-goldenrod-400',
    text: 'text-goldenrod-600',
    stroke: 'var(--color-goldenrod-400)',
  },
} as const

// Annotation stagger offsets per side — hardcoded like the original.
// These are marginTop values that position annotations in document flow
// to roughly align with their corresponding findings.
const LEFT_TOPS = [20, 132, 226, 320]
const RIGHT_TOPS = [56, 190, 284]

export function PromptAnatomyDiagram({
  items,
  promptText,
  responseLabel,
  responseMetadata,
}: PromptAnatomyDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [lines, setLines] = useState<ConnectorLine[]>([])
  const isMobile = useIsMobile(900)

  // Line calculation — matches original: querySelector for data-ann / data-target
  const calculateLines = useCallback(() => {
    if (!containerRef.current || isMobile) {
      setLines([])
      return
    }
    const c = containerRef.current.getBoundingClientRect()
    const result: ConnectorLine[] = []

    for (let i = 0; i < items.length; i++) {
      const side = i % 2 === 0 ? 'left' : 'right'
      const target = containerRef.current.querySelector<HTMLElement>(`[data-target='${i}']`)
      const ann = containerRef.current.querySelector<HTMLElement>(`[data-ann='${i}']`)
      if (!target || !ann) continue

      const tR = target.getBoundingClientRect()
      const aR = ann.getBoundingClientRect()
      const isLeft = side === 'left'

      const x1 = isLeft ? aR.right - c.left + 6 : aR.left - c.left - 6
      const y1 = aR.top + 8 - c.top
      const x2 = isLeft ? tR.left - c.left - 6 : tR.right - c.left + 6
      const y2 = tR.top + tR.height / 2 - c.top

      const dx = Math.abs(x2 - x1)
      const cp = dx * 0.45
      const path = isLeft
        ? `M ${x1} ${y1} C ${x1 + cp} ${y1}, ${x2 - cp} ${y2}, ${x2} ${y2}`
        : `M ${x1} ${y1} C ${x1 - cp} ${y1}, ${x2 + cp} ${y2}, ${x2} ${y2}`

      result.push({ id: i, path, cx: x2, cy: y2, color: items[i].color })
    }
    setLines(result)
  }, [isMobile, items])

  useEffect(() => {
    calculateLines()
    window.addEventListener('resize', calculateLines)
    const t = setTimeout(calculateLines, 200)
    return () => {
      window.removeEventListener('resize', calculateLines)
      clearTimeout(t)
    }
  }, [calculateLines])

  const hover = (i: number) => !isMobile && setHoveredIndex(i)
  const unhover = () => !isMobile && setHoveredIndex(null)

  const leftItems = items
    .map((item, i) => ({ item, index: i }))
    .filter(({ index }) => index % 2 === 0)
  const rightItems = items
    .map((item, i) => ({ item, index: i }))
    .filter(({ index }) => index % 2 !== 0)

  // ── Mobile layout ──
  if (isMobile) {
    return (
      <div>
        <div className="border-theme-border mb-6 flex items-center gap-4 border-t pt-4 pb-5">
          {promptText && (
            <p className="text-theme-text-secondary min-w-0 flex-1 font-serif text-lg leading-snug italic">
              {promptText}
            </p>
          )}
          <div className="bg-moss-600 flex size-8 shrink-0 items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              />
            </svg>
          </div>
        </div>

        {items.map((item, i) => (
          <div
            key={i}
            className={clsx('mb-6 pb-6', i < items.length - 1 && 'border-theme-border border-b')}
          >
            <p className="text-theme-text mb-1.5 flex items-start gap-2.5 text-sm leading-snug font-semibold">
              <span
                className={clsx(
                  'mt-1.5 inline-block size-1.5 shrink-0 rounded-full',
                  COLOR_CLASSES[item.color].dot,
                )}
              />
              {item.heading}
            </p>
            <p className="text-theme-text-muted pl-4 text-sm leading-relaxed">{item.body}</p>

            <div className="mt-3 flex items-start gap-2 pl-4">
              <div
                className={clsx(
                  'mt-0.5 w-px shrink-0 self-stretch opacity-40',
                  item.color === 'moss' ? 'bg-moss-500' : 'bg-goldenrod-500',
                )}
              />
              <div>
                <p className={clsx('text-xs font-semibold', COLOR_CLASSES[item.color].text)}>
                  {item.annotationLabel}
                </p>
                {item.annotationDetail && (
                  <p className="text-theme-text-muted mt-0.5 text-[11px] leading-snug">
                    {item.annotationDetail}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // ── Desktop layout ──
  return (
    <div ref={containerRef} className="relative">
      {/* SVG connector layer */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 3 }}>
        {lines.map((line) => {
          const active = hoveredIndex === line.id
          const dimmed = hoveredIndex !== null && hoveredIndex !== line.id
          return (
            <g key={line.id}>
              <path
                d={line.path}
                stroke={active ? COLOR_CLASSES[line.color].stroke : 'var(--color-theme-border)'}
                strokeWidth={active ? 1 : 0.5}
                fill="none"
                style={{
                  transition: 'stroke 0.4s, stroke-width 0.4s',
                  opacity: dimmed ? 0.1 : 1,
                }}
              />
              <circle
                cx={line.cx}
                cy={line.cy}
                r={active ? 3 : 2}
                fill={active ? COLOR_CLASSES[line.color].stroke : 'var(--color-theme-border)'}
                style={{ transition: 'fill 0.4s', opacity: dimmed ? 0.1 : 1 }}
              />
            </g>
          )
        })}
      </svg>

      {/* Three-column flexbox layout — matches original structure */}
      <div className="relative flex items-start" style={{ zIndex: 2 }}>
        {/* Left annotations — in normal document flow with marginTop staggering */}
        <div className="shrink-0 basis-[170px] pr-6">
          {leftItems.map(({ item, index }, i) => {
            const active = hoveredIndex === index
            const dimmed = hoveredIndex !== null && hoveredIndex !== index
            const top =
              LEFT_TOPS[i] ?? LEFT_TOPS[LEFT_TOPS.length - 1] + 90 * (i - LEFT_TOPS.length + 1)
            const mt = i === 0 ? top : top - (LEFT_TOPS[i - 1] ?? 0) - 40
            return (
              <div
                key={index}
                data-ann={index}
                onMouseEnter={() => hover(index)}
                onMouseLeave={unhover}
                className="cursor-default text-right"
                style={{
                  marginTop: mt,
                  opacity: dimmed ? 0.12 : 1,
                  transition: 'opacity 0.35s',
                }}
              >
                <p
                  className={clsx(
                    'mb-0.5 text-[11px] font-semibold',
                    active ? COLOR_CLASSES[item.color].text : 'text-theme-text-muted',
                  )}
                  style={{ transition: 'color 0.35s' }}
                >
                  {item.annotationLabel}
                </p>
                {item.annotationDetail && (
                  <p className="text-theme-text-muted text-[10px] leading-snug opacity-70">
                    {item.annotationDetail}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Center card */}
        <div className="border-theme-border min-w-0 flex-1 border bg-white/60">
          {promptText && (
            <div className="border-theme-border flex items-center gap-4 border-b bg-white/50 px-6 py-4">
              <p className="text-theme-text-secondary min-w-0 flex-1 font-serif text-base leading-snug italic">
                {promptText}
              </p>
              <div className="bg-moss-600 flex size-8 shrink-0 items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M1 7h12M8 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  />
                </svg>
              </div>
            </div>
          )}

          {(responseLabel || responseMetadata) && (
            <div className="border-theme-border flex items-center justify-between border-b px-6 py-2.5">
              {responseLabel && (
                <span className="text-theme-text-muted text-[10px] tracking-[0.06em] uppercase">
                  {responseLabel}
                </span>
              )}
              {responseMetadata && (
                <span className="text-theme-border text-[10px]">{responseMetadata}</span>
              )}
            </div>
          )}

          {items.map((item, i) => {
            const active = hoveredIndex === i
            const dimmed = hoveredIndex !== null && hoveredIndex !== i
            return (
              <div
                key={i}
                onMouseEnter={() => hover(i)}
                onMouseLeave={unhover}
                className={clsx(
                  'cursor-default px-6 py-3.5',
                  i < items.length - 1 && 'border-theme-border border-b',
                )}
                style={{
                  opacity: dimmed ? 0.12 : 1,
                  background: active ? 'rgba(0,0,0,0.015)' : 'transparent',
                  transition: 'opacity 0.35s, background 0.35s',
                }}
              >
                <p className="text-theme-text mb-1 text-[13px] leading-snug font-semibold">
                  <span
                    data-target={i}
                    className={clsx(
                      'mr-2.5 inline-block size-[5px] rounded-full border-[1.5px] align-middle',
                      active
                        ? clsx(COLOR_CLASSES[item.color].dot, COLOR_CLASSES[item.color].dotBorder)
                        : 'border-theme-text-muted bg-transparent',
                    )}
                    style={{ position: 'relative', top: -1, transition: 'all 0.35s' }}
                  />
                  {item.heading}
                </p>
                <p className="text-theme-text-muted pl-[19px] text-xs leading-relaxed">
                  {item.body}
                </p>
              </div>
            )
          })}
        </div>

        {/* Right annotations — in normal document flow with marginTop staggering */}
        <div className="shrink-0 basis-[170px] pl-6">
          {rightItems.map(({ item, index }, i) => {
            const active = hoveredIndex === index
            const dimmed = hoveredIndex !== null && hoveredIndex !== index
            const top =
              RIGHT_TOPS[i] ?? RIGHT_TOPS[RIGHT_TOPS.length - 1] + 90 * (i - RIGHT_TOPS.length + 1)
            const mt = i === 0 ? top : top - (RIGHT_TOPS[i - 1] ?? 0) - 40
            return (
              <div
                key={index}
                data-ann={index}
                onMouseEnter={() => hover(index)}
                onMouseLeave={unhover}
                className="cursor-default"
                style={{
                  marginTop: mt,
                  opacity: dimmed ? 0.12 : 1,
                  transition: 'opacity 0.35s',
                }}
              >
                <p
                  className={clsx(
                    'mb-0.5 text-[11px] font-semibold',
                    active ? COLOR_CLASSES[item.color].text : 'text-theme-text-muted',
                  )}
                  style={{ transition: 'color 0.35s' }}
                >
                  {item.annotationLabel}
                </p>
                {item.annotationDetail && (
                  <p className="text-theme-text-muted text-[10px] leading-snug opacity-70">
                    {item.annotationDetail}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
