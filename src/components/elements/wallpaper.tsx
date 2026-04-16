import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

const html = String.raw

const noisePattern = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  html`
    <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 100 100">
      <filter id="n">
        <feTurbulence
          type="turbulence"
          baseFrequency="1.4"
          numOctaves="1"
          seed="2"
          stitchTiles="stitch"
          result="n"
        />
        <feComponentTransfer result="g">
          <feFuncR type="linear" slope="4" intercept="1" />
          <feFuncG type="linear" slope="4" intercept="1" />
          <feFuncB type="linear" slope="4" intercept="1" />
        </feComponentTransfer>
        <feColorMatrix type="saturate" values="0" in="g" />
      </filter>
      <rect width="100%" height="100%" filter="url(#n)" />
    </svg>
  `.replace(/\s+/g, ' '),
)}")`

// Brand token mappings — light stop (top) → dark stop (bottom)
// green:  moss-400 (sage, oklch 0.69 0.055 125) → moss-700 (forest, oklch 0.41 0.03 125)
// blue:   ocean-600 (muted slate, oklch 0.57 0.05 245) → ocean-400 (sky, oklch 0.74 0.045 245)
// brown:  goldenrod-600 (warm tan, oklch 0.57 0.1 75) → goldenrod-800 (deep leather, oklch 0.41 0.06 75)
// purple: coral-600 (warm rose, oklch 0.57 0.13 25) → coral-800 (deep ember, oklch 0.41 0.09 25)
const COLOR_CLASSES = {
  green: 'from-moss-400 to-moss-700',
  blue: 'from-ocean-600 to-ocean-400',
  brown: 'from-goldenrod-600 to-goldenrod-800',
  purple: 'from-coral-600 to-coral-800',
  sandstone: 'from-sandstone-200 to-sandstone-400',
  ash: 'from-ash-800 to-ash-950',
} as const

export type WallpaperColor = keyof typeof COLOR_CLASSES

export function Wallpaper({
  children,
  color,
  className,
  ...props
}: { color: WallpaperColor } & ComponentProps<'div'>) {
  return (
    <div
      className={clsx('relative overflow-hidden bg-linear-to-b', COLOR_CLASSES[color], className)}
      {...props}
    >
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundPosition: 'center',
          backgroundImage: noisePattern,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
