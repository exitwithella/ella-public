import type { ReactNode } from 'react'

import type { Media } from '@/payload-types'

import { CoverImage } from './cover-image'
import { ThemeSection, type ThemeName } from './theme-section'

type CoverImageField = {
  image?: Media | number | null
  minHeight?: 'sm' | 'md' | 'lg' | null
  objectPosition?: 'top' | 'center' | 'bottom' | null
  overlayOpacity?: '40' | '60' | '80' | null
} | null

interface OptionalCoverSectionProps {
  bgStyle?: ThemeName | string | null
  /** The block's raw `coverImage` field (types are not generated for it yet). */
  coverImage: unknown
  /** Vertical padding applied to the section (or the inner cover wrapper when a cover image is set). */
  padding: string
  children: ReactNode
}

/**
 * Wraps section content in a `ThemeSection`, optionally rendering it over a full-bleed
 * `CoverImage` when the block supplies one. Shared by bridge/cta section blocks.
 */
export function OptionalCoverSection({
  bgStyle,
  coverImage,
  padding,
  children,
}: OptionalCoverSectionProps) {
  const cover = coverImage as CoverImageField
  const hasCover = cover?.image && typeof cover.image === 'object' && cover.image?.url

  return (
    <ThemeSection bgStyle={bgStyle} className={hasCover ? '' : padding}>
      {hasCover ? (
        <CoverImage
          image={cover.image as Media}
          minHeight={cover.minHeight}
          objectPosition={cover.objectPosition}
          overlayOpacity={cover.overlayOpacity}
        >
          <div className={padding}>{children}</div>
        </CoverImage>
      ) : (
        children
      )}
    </ThemeSection>
  )
}
