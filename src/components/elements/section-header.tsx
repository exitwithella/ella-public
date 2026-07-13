import { clsx } from 'clsx/lite'
import type { ReactNode } from 'react'

import { Eyebrow } from './eyebrow'
import { Heading } from './heading'

interface SectionHeaderProps {
  label?: ReactNode
  heading?: ReactNode
  subheading?: ReactNode
  align?: 'left' | 'center'
  /** Wrapper bottom-margin (override for the rare block that spaces its header differently). */
  marginClassName?: string
  /** Extra wrapper classes (e.g. `mx-auto max-w-3xl` for a centered, width-capped header). */
  className?: string
  headingClassName?: string
  /** Override the subheading's layout extras (defaults to `mt-4 max-w-2xl` left / none centered). */
  subheadingClassName?: string
  eyebrowSize?: 'xs' | 'sm'
}

/**
 * Shared block section header — eyebrow label + heading + optional subheading.
 * Replaces the markup copy-pasted across the block components.
 */
export function SectionHeader({
  label,
  heading,
  subheading,
  align = 'left',
  marginClassName = 'mb-12 md:mb-16',
  className,
  headingClassName,
  subheadingClassName,
  eyebrowSize,
}: SectionHeaderProps) {
  if (!label && !heading && !subheading) return null

  const centered = align === 'center'
  const subExtras = subheadingClassName ?? (centered ? '' : 'mt-4 max-w-2xl')

  return (
    <div className={clsx(marginClassName, centered && 'text-center', className)}>
      {label && (
        <Eyebrow size={eyebrowSize} className="mb-3">
          {label}
        </Eyebrow>
      )}
      {heading && <Heading className={headingClassName}>{heading}</Heading>}
      {subheading && (
        <p className={clsx('text-theme-text-secondary text-lg/relaxed', subExtras)}>{subheading}</p>
      )}
    </div>
  )
}
