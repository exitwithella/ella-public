'use client'

import Image from 'next/image'

import { useDeferredPreload } from '../_lib/use-deferred-preload'

export interface PreloadImage {
  src: string
  /** Must match the sizes attribute on the real <Image> for srcset cache alignment */
  sizes: string
  fill?: boolean
  width?: number
  height?: number
}

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  opacity: 0,
  pointerEvents: 'none',
}

const FILL_WRAPPER_STYLE: React.CSSProperties = {
  position: 'relative',
  width: 1,
  height: 1,
}

/**
 * Renders invisible next/image elements to warm the browser cache on first
 * user scroll interaction. Uses the same srcset/sizes as the real images
 * so the browser fetches the correct resolution and caches it.
 */
export function ImagePreloader({ images }: { images: PreloadImage[] }) {
  const active = useDeferredPreload()

  if (!active || images.length === 0) return null

  return (
    <div aria-hidden="true" style={CONTAINER_STYLE}>
      {images.map((img) =>
        img.fill ? (
          <div key={img.src} style={FILL_WRAPPER_STYLE}>
            <Image src={img.src} alt="" fill sizes={img.sizes} />
          </div>
        ) : (
          <Image
            key={img.src}
            src={img.src}
            alt=""
            width={img.width ?? 16}
            height={img.height ?? 16}
            sizes={img.sizes}
          />
        ),
      )}
    </div>
  )
}
