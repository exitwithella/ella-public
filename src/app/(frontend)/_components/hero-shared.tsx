import { clsx } from 'clsx/lite'
import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'

const HEADLINE_BASE = 'text-3xl font-semibold tracking-tight text-balance md:text-4xl xl:text-5xl'

/** Hero h1 — shared display headline across split-hero and minimal-hero variants. */
export function HeroHeadline({
  fontClass = 'font-display',
  color = 'text-ash-950',
  className,
  children,
}: {
  fontClass?: string
  color?: string
  className?: string
  children: ReactNode
}) {
  return <h1 className={clsx(fontClass, HEADLINE_BASE, color, className)}>{children}</h1>
}

/** Hero subheadline paragraph — callers supply max-width / top-margin via className. */
export function HeroText({
  color = 'text-ash-600',
  className,
  children,
}: {
  color?: string
  className?: string
  children: ReactNode
}) {
  return <p className={clsx('text-lg/relaxed', color, className)}>{children}</p>
}

/**
 * CMS-backed hero image: cropped (fill + object-cover) or intrinsic (natural
 * dimensions with fallbacks) depending on the resolved fit mode.
 */
export function CmsImage({
  src,
  alt,
  isCropped,
  positionStyle,
  sizes,
  priority,
  croppedClassName = 'object-cover',
  intrinsicClassName,
  width,
  height,
  fallbackWidth,
  fallbackHeight,
}: {
  src: string
  alt: string
  isCropped: boolean
  positionStyle?: CSSProperties
  sizes: string
  priority?: boolean
  croppedClassName?: string
  intrinsicClassName: string
  width?: number | null
  height?: number | null
  fallbackWidth: number
  fallbackHeight: number
}) {
  return isCropped ? (
    <Image
      src={src}
      alt={alt}
      fill
      className={croppedClassName}
      style={positionStyle}
      sizes={sizes}
      priority={priority}
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={width ?? fallbackWidth}
      height={height ?? fallbackHeight}
      className={intrinsicClassName}
      priority={priority}
    />
  )
}
