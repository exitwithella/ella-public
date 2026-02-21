import { clsx } from 'clsx/lite'
import type { ComponentProps, ElementType } from 'react'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const fontByLevel: Record<HeadingTag, string> = {
  h1: 'font-display text-5xl/12 tracking-tight text-balance sm:text-[5rem]/20',
  h2: 'font-serif text-[2rem]/10 tracking-tight text-balance sm:text-5xl/14',
  h3: 'font-serif text-[1.75rem]/9 tracking-tight text-balance sm:text-4xl/12',
  h4: 'font-sans text-xl/8 font-semibold text-balance',
  h5: 'font-sans text-base/7 font-semibold',
  h6: 'font-sans text-sm/6 font-semibold',
}

export function Heading<T extends HeadingTag = 'h1'>({
  as,
  children,
  color = 'dark/light',
  className,
  ...props
}: { as?: T; color?: 'dark/light' | 'light' } & Omit<ComponentProps<T>, 'as'>) {
  const Tag = (as ?? 'h1') as ElementType
  const level = (as ?? 'h1') as HeadingTag
  return (
    <Tag
      className={clsx(
        fontByLevel[level],
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
