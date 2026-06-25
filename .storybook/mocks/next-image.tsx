import type { CSSProperties } from 'react'

interface ImageProps {
  src: string | { default: { src: string } }
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  sizes?: string
  className?: string
  style?: CSSProperties
  quality?: number
  placeholder?: string
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
  [key: string]: unknown
}

export default function Image({
  src,
  alt,
  width,
  height,
  fill,
  className,
  style,
  priority: _priority,
  sizes: _sizes,
  quality: _quality,
  placeholder: _placeholder,
  onLoad,
  loading,
  ...rest
}: ImageProps) {
  const resolvedSrc = typeof src === 'object' && 'default' in src ? src.default.src : src

  const fillStyle: CSSProperties = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }
    : {}

  return (
    // oxlint-disable-next-line nextjs/no-img-element -- Storybook mock for next/image; no Next.js runtime in stories
    <img
      src={resolvedSrc as string}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      style={{ ...fillStyle, ...style }}
      loading={loading ?? 'lazy'}
      onLoad={onLoad}
      {...rest}
    />
  )
}
