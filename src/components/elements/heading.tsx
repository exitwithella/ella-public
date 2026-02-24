import { clsx } from 'clsx/lite'
import type { ComponentProps, ElementType } from 'react'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export function Heading<T extends HeadingTag = 'h1'>({
  as,
  children,
  color = 'dark/light',
  className,
  ...props
}: { as?: T; color?: 'dark/light' | 'light' } & Omit<ComponentProps<T>, 'as'>) {
  const Tag = (as ?? 'h1') as ElementType
  return (
    <Tag
      className={clsx(
        'font-display text-2xl font-bold text-balance md:text-4xl',
        color === 'dark/light' && 'text-ash-950',
        color === 'light' && 'text-white',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
