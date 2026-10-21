import Image from 'next/image'

import type { Media } from '@/payload-types'

import { resolveMedia } from './resolve-media'

interface BlockMediaFrameProps {
  media: number | Media | null | undefined
  alt?: string | null
  sizes: string
  fallback: string
  className?: string
}

export function BlockMediaFrame({ media, alt, sizes, fallback, className }: BlockMediaFrameProps) {
  const resolved = resolveMedia(media)
  const frameClass = ['aspect-video rounded-sm', className].filter(Boolean).join(' ')

  if (!resolved) {
    return (
      <div
        className={`bg-theme-surface flex items-center justify-center ${frameClass}`}
        aria-hidden="true"
      >
        <span className="text-theme-text-muted text-sm">{fallback}</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${frameClass}`}>
      <Image
        src={resolved.url}
        alt={alt?.trim() || resolved.alt}
        fill
        className="object-cover"
        sizes={sizes}
      />
    </div>
  )
}
