import Image from 'next/image'

import type { Page } from '@/payload-types'

import { fetchSvgContent } from '../_lib/svg'

type PageBackgroundData = Page['pageBackground']

interface PageBackgroundProps {
  data: PageBackgroundData
}

export async function PageBackground({ data }: PageBackgroundProps) {
  if (!data) return null

  const media = typeof data.image === 'object' && data.image?.url ? data.image : null
  if (!media?.url) return null

  const opacity = ((data.opacity as number | null | undefined) ?? 3) / 100
  const top = (data.top as string | null | undefined) || '0'
  const right = (data.right as string | null | undefined) || '0'
  const width = (data.width as string | null | undefined) || undefined

  const isSvg = media.mimeType === 'image/svg+xml'
  const svgContent = isSvg ? await fetchSvgContent(media.url) : null

  return (
    <div
      className="pointer-events-none absolute z-0 overflow-visible"
      style={{ top, right, opacity, width }}
    >
      {svgContent ? (
        <div
          className="h-auto w-full [&_svg]:h-auto [&_svg]:w-full"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      ) : (
        <Image
          src={media.url}
          alt=""
          width={media.width ?? 800}
          height={media.height ?? 800}
          className="h-auto w-full"
          priority
        />
      )}
    </div>
  )
}
