import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

const colorClass = {
  moss: 'text-moss-600',
  ash: 'text-ash-500',
  light: 'text-moss-400',
  'ash-dark': 'text-ash-700',
} as const

export function Eyebrow({
  children,
  color = 'moss',
  className,
  ...props
}: { color?: keyof typeof colorClass } & ComponentProps<'p'>) {
  return (
    <p
      className={clsx(
        'text-xs font-semibold tracking-widest uppercase',
        colorClass[color],
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
}
