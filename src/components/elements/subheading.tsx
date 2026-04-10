import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Subheading({ children, className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      className={clsx(
        'font-serif text-[2rem]/10 tracking-tight text-pretty text-theme-text sm:text-5xl/14',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}
