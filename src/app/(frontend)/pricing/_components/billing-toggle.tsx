'use client'

import { useRef, useState, useEffect, useCallback, useMemo } from 'react'

export type BillingPeriod = 'month' | 'quarter' | 'year'

interface BillingToggleProps {
  value: BillingPeriod
  onChange: (period: BillingPeriod) => void
}

const OPTIONS: { value: BillingPeriod; label: string; badge?: string }[] = [
  { value: 'month', label: 'Monthly' },
  { value: 'quarter', label: 'Quarterly' },
  { value: 'year', label: 'Annually', badge: 'Best value' },
]

export function BillingToggle({ value, onChange }: BillingToggleProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  const updateIndicator = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const activeButton = container.querySelector<HTMLButtonElement>('[data-active="true"]')
    if (!activeButton) return
    setIndicator({
      left: activeButton.offsetLeft,
      width: activeButton.offsetWidth,
    })
  }, [])

  useEffect(() => {
    updateIndicator()
  }, [value, updateIndicator])

  useEffect(() => {
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [updateIndicator])

  const indicatorStyle = useMemo(
    () => ({ left: indicator.left, width: indicator.width }),
    [indicator.left, indicator.width],
  )

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label="Billing period"
      className="bg-ash-100 relative inline-flex rounded-full p-1"
    >
      {/* Sliding indicator */}
      <div
        aria-hidden="true"
        className="bg-sandstone-50 absolute top-1 bottom-1 rounded-full shadow-sm transition-all duration-200 ease-out"
        style={indicatorStyle}
      />

      {OPTIONS.map((option) => {
        const isActive = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            data-active={isActive}
            onClick={() => onChange(option.value)}
            className={`relative z-10 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 ${
              isActive ? 'text-ash-900' : 'text-ash-500 hover:text-ash-700'
            }`}
          >
            {option.label}
            {option.badge && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold transition-colors duration-150 ${
                  isActive ? 'bg-goldenrod-100 text-goldenrod-700' : 'bg-ash-200/60 text-ash-500'
                }`}
              >
                {option.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
