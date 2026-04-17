'use client'

import { ImagePreloader, type PreloadImage } from '../image-preloader'

/**
 * Thin client boundary that preloads gallery images on first scroll interaction.
 * Mounted alongside the server-rendered Gallery grid so GalleryItem stays a
 * server component with zero client JS.
 */
export function GalleryImagePreloader({ images }: { images: PreloadImage[] }) {
  return <ImagePreloader images={images} />
}
