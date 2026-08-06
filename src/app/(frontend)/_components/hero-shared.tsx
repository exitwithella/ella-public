import { clsx } from 'clsx/lite'
import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'

import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import type { Page } from '@/payload-types'

const HEADLINE_BASE = 'text-3xl font-semibold tracking-tight text-balance md:text-4xl xl:text-5xl'

// Maps CMS headlineFont values to Tailwind font-family classes.
export const FONT_CLASSES: Record<string, string> = {
  display: 'font-display',
  sans: 'font-sans',
  serif: 'font-serif',
  data: 'font-data',
}

export function resolveHeadlineFont(hero: Page['hero']) {
  const font = hero.headlineFont ?? 'display'
  return FONT_CLASSES[font] ?? FONT_CLASSES.display
}

// Maps CMS highlightColor values to Tailwind text classes (full class names required for Tailwind JIT).
export const HIGHLIGHT_COLOR_MAP: Record<string, string> = {
  goldenrod: 'text-goldenrod-500',
  moss: 'text-moss-600',
  coral: 'text-coral-500',
  ocean: 'text-ocean-600',
}

export function resolveHighlightClass(hero: Page['hero']) {
  return HIGHLIGHT_COLOR_MAP[hero.highlightColor ?? 'goldenrod'] ?? 'text-goldenrod-500'
}

/**
 * Wraps the first occurrence of `highlight` within `text` in an accent-colored span.
 * Non-animated counterpart to the per-word highlight logic in the animated hero — used
 * by the static (server) heroes and the blur-fade headline path.
 */
export function renderWithHighlight(
  text: string,
  highlight?: string | null,
  highlightClass?: string,
): ReactNode {
  if (!highlight || !highlightClass) return text
  const idx = text.indexOf(highlight)
  if (idx < 0) return text
  return (
    <>
      {text.slice(0, idx)}
      <span className={highlightClass}>{text.slice(idx, idx + highlight.length)}</span>
      {text.slice(idx + highlight.length)}
    </>
  )
}

/** Renders the headline plus optional second line as block spans, applying the highlight to each. */
export function HeroHeadlineLines({
  hero,
  highlightClass,
}: {
  hero: Page['hero']
  highlightClass?: string
}) {
  return (
    <>
      <span className="block">
        {renderWithHighlight(hero.headline, hero.highlightText, highlightClass)}
      </span>
      {hero.headlineLine2 && (
        <span className="block">
          {renderWithHighlight(hero.headlineLine2, hero.highlightText, highlightClass)}
        </span>
      )}
    </>
  )
}

/** Resolves the CMS announcement group into badge props, or null when disabled/incomplete. */
export function resolveAnnouncement(
  hero: Page['hero'],
): { text: string; href: string; cta: string } | null {
  const announcement = hero.announcement
  if (!announcement?.enabled || !announcement.text || !announcement.href) return null
  return {
    text: announcement.text,
    href: announcement.href,
    cta: announcement.ctaLabel ?? 'Learn more',
  }
}

/** Announcement badge (eyebrow slot) — rendered above the headline when configured in the CMS. */
export function HeroEyebrow({ hero, overlay }: { hero: Page['hero']; overlay?: boolean }) {
  const announcement = resolveAnnouncement(hero)
  if (!announcement) return null

  return (
    <AnnouncementBadge
      href={announcement.href}
      text={announcement.text}
      cta={announcement.cta}
      variant={overlay ? 'overlay' : 'normal'}
    />
  )
}

/** Trust-signal microcopy (footer slot) — small muted line below the CTAs. */
export function HeroMicrocopy({
  hero,
  light,
  className,
}: {
  hero: Page['hero']
  light?: boolean
  className?: string
}) {
  if (!hero.microcopy) return null

  return (
    <p className={clsx('text-sm/relaxed', light ? 'text-white/70' : 'text-ash-600', className)}>
      {hero.microcopy}
    </p>
  )
}

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
