import { clsx } from 'clsx/lite'
import Image from 'next/image'

import type { Media } from '@/payload-types'

interface CoverImageProps {
  image: Media
  minHeight?: 'sm' | 'md' | 'lg' | null
  objectPosition?: 'top' | 'center' | 'bottom' | null
  overlayOpacity?: '40' | '60' | '80' | null
  children: React.ReactNode
}

const MIN_HEIGHT_CLASS: Record<string, string> = {
  sm: 'min-h-80',
  md: 'min-h-[400px]',
  lg: 'min-h-[560px]',
}

const POSITION_CLASS: Record<string, string> = {
  top: 'object-top',
  center: 'object-center',
  bottom: 'object-bottom',
}

const OVERLAY_CLASS: Record<string, string> = {
  '40': 'bg-black/40',
  '60': 'bg-black/60',
  '80': 'bg-black/80',
}

export function CoverImage({
  image,
  minHeight = 'md',
  objectPosition = 'center',
  overlayOpacity = '60',
  children,
}: CoverImageProps) {
  return (
    <div className={clsx('relative', MIN_HEIGHT_CLASS[minHeight ?? 'md'])}>
      <Image
        src={image.url!}
        alt={image.alt ?? ''}
        fill
        className={clsx('object-cover', POSITION_CLASS[objectPosition ?? 'center'])}
        sizes="100vw"
      />
      <div className={clsx('absolute inset-0', OVERLAY_CLASS[overlayOpacity ?? '60'])} />
      <div className="relative">{children}</div>
    </div>
  )
}
