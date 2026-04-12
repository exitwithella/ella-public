'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

type PhosphorWeight = 'thin' | 'light' | 'regular' | 'bold' | 'duotone' | 'fill'

interface PhosphorIconProps {
  name: string | null | undefined
  size?: number
  weight?: PhosphorWeight
  className?: string
}

interface IconProps {
  size?: number
  weight?: PhosphorWeight
  className?: string
}

// Module-level cache — createing each dynamic component once keeps React's
// reconciler stable across renders (dynamic() called inside a render creates
// a new type every time, breaking hydration).
const iconCache = new Map<string, ComponentType<IconProps>>()

function getIcon(name: string): ComponentType<IconProps> {
  if (!iconCache.has(name)) {
    const Icon = dynamic<IconProps>(
      () =>
        import('@phosphor-icons/react').then((mod) => {
          const Component = (mod as unknown as Record<string, ComponentType<IconProps>>)[name]
          if (!Component) return { default: () => null }
          return { default: Component }
        }),
      { ssr: false },
    )
    iconCache.set(name, Icon)
  }
  return iconCache.get(name)!
}

export function PhosphorIcon({
  name,
  size = 24,
  weight = 'regular',
  className,
}: PhosphorIconProps) {
  if (!name) return null
  const Icon = getIcon(name)
  return <Icon size={size} weight={weight} className={className} />
}
