import Image from 'next/image'

import type { Media } from '@/payload-types'

interface GalleryItemProps {
  staticImage: Media
  animatedImage?: Media | null
  caption?: string | null
  subcaption?: string | null
  bgColor?: string | null
  sizes: string
}

export function GalleryItem({
  staticImage,
  animatedImage,
  caption,
  subcaption,
  bgColor,
  sizes,
}: GalleryItemProps) {
  if (!staticImage?.url) return null

  const animatedUrl = animatedImage && typeof animatedImage === 'object' ? animatedImage.url : null

  const containerStyle = bgColor ? { backgroundColor: bgColor } : undefined

  return (
    <div>
      <div
        className="group bg-theme-surface relative aspect-[4/3] overflow-hidden rounded-lg"
        style={containerStyle}
      >
        {/* Static image — zooms on hover */}
        <Image
          src={staticImage.url}
          alt={staticImage.alt ?? caption ?? ''}
          width={staticImage.width ?? 800}
          height={staticImage.height ?? 600}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes={sizes}
        />

        {/* Animated overlay — fades in on hover */}
        {animatedUrl && (
          // eslint-disable-next-line @next/next/no-img-element -- GIFs should bypass next/image optimization
          <img
            src={animatedUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
            loading="lazy"
            aria-hidden="true"
          />
        )}
      </div>

      {caption && <h3 className="text-theme-text mt-3 text-sm font-medium">{caption}</h3>}
      {subcaption && <p className="text-theme-text-secondary mt-1 text-sm">{subcaption}</p>}
    </div>
  )
}
