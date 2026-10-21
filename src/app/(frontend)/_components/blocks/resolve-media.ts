import type { Media } from '@/payload-types'

export type ResolvedMedia = Media & { url: string }

/** Upload relations arrive as an id until depth populates them. Only a record with a URL can render. */
export function resolveMedia(value: number | Media | null | undefined): ResolvedMedia | null {
  if (!value || typeof value === 'number' || !value.url) return null
  return value as ResolvedMedia
}

export const BLOCK_MEDIA_SIZES = {
  half: '(min-width: 768px) 50vw, 100vw',
  full: '(min-width: 1200px) 72rem, 100vw',
} as const
