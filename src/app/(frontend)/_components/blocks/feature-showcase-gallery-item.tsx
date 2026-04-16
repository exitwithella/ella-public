import { clsx } from 'clsx/lite'
import Image from 'next/image'

import type { Media } from '@/payload-types'

const ASPECT_CLASS: Record<string, string> = {
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
}

interface GalleryItemProps {
  staticImage: Media
  animatedImage?: Media | null
  caption?: string | null
  subcaption?: string | null
  bgColor?: string | null
  frameImage?: boolean | null
  anchorTarget?: string | null
  sizes: string
  aspect?: 'landscape' | 'portrait' | 'square'
  sharp?: boolean
  style?: React.CSSProperties
}

export function GalleryItem({
  staticImage,
  animatedImage,
  caption,
  subcaption,
  bgColor,
  frameImage,
  anchorTarget,
  sizes,
  aspect = 'landscape',
  sharp = false,
  style,
}: GalleryItemProps) {
  if (!staticImage?.url) return null

  const animatedUrl = animatedImage && typeof animatedImage === 'object' ? animatedImage.url : null

  const showFrame = bgColor && frameImage
  const containerStyle = bgColor ? { backgroundColor: bgColor } : undefined

  const Wrapper = anchorTarget ? 'a' : 'div'
  const wrapperProps = anchorTarget ? { href: `#${anchorTarget}` } : {}

  return (
    <Wrapper {...wrapperProps} style={style}>
      <div
        className={clsx(
          'group bg-theme-surface relative overflow-hidden',
          !sharp && 'rounded-lg',
          ASPECT_CLASS[aspect],
        )}
        style={containerStyle}
      >
        {/* Image wrapper — inset from edges when framed, grows to fill on hover */}
        <div
          className={clsx(
            'absolute overflow-hidden transition-[inset] duration-500 ease-out',
            showFrame ? 'inset-[0.75rem] sm:inset-[1rem] group-hover:inset-0' : 'inset-0',
            showFrame && !sharp && 'rounded-md group-hover:rounded-none',
          )}
        >
          <Image
            src={staticImage.url}
            alt={staticImage.alt ?? caption ?? ''}
            width={staticImage.width ?? 800}
            height={staticImage.height ?? 600}
            className={clsx(
              'h-full w-full object-cover transition-transform duration-500 ease-out',
              !showFrame && 'group-hover:scale-105',
            )}
            sizes={sizes}
          />

          {/* Animated overlay — fades in on hover */}
          {animatedUrl && (
            // eslint-disable-next-line @next/next/no-img-element -- GIFs should bypass next/image optimization
            <img
              src={animatedUrl}
              alt=""
              className={clsx(
                'absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-300 group-hover:opacity-100',
                !showFrame && 'group-hover:scale-105',
              )}
              loading="lazy"
              aria-hidden="true"
            />
          )}
        </div>
      </div>

      {caption && <h3 className="text-theme-text mt-3 text-sm font-medium">{caption}</h3>}
      {subcaption && <p className="text-theme-text-secondary mt-1 text-sm">{subcaption}</p>}
    </Wrapper>
  )
}
