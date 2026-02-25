import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

const sizes = {
  lg: 'px-4 py-2',
  md: 'px-3 py-1',
}

export function Button({
  size = 'md',
  type = 'button',
  color = 'dark/light',
  className,
  ...props
}: {
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light'
} & ComponentProps<'button'>) {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center gap-1 rounded-full text-sm/7 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss-600',
        color === 'dark/light' && 'bg-ash-950 text-ash-50 hover:bg-ash-800',
        color === 'light' && 'bg-ash-50 text-ash-950 hover:bg-ash-100',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function ButtonLink({
  size = 'md',
  color = 'dark/light',
  className,
  href,
  ...props
}: {
  href: string
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light'
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <a
      href={href}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center gap-1 rounded-full text-sm/7 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss-600',
        color === 'dark/light' && 'bg-ash-950 text-ash-50 hover:bg-ash-800',
        color === 'light' && 'bg-ash-50 text-ash-950 hover:bg-ash-100',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function SoftButton({
  size = 'md',
  type = 'button',
  className,
  ...props
}: {
  size?: keyof typeof sizes
} & ComponentProps<'button'>) {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-ash-950/10 text-sm/7 font-medium text-ash-950 hover:bg-ash-950/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss-600',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function SoftButtonLink({
  size = 'md',
  href,
  className,
  ...props
}: {
  href: string
  size?: keyof typeof sizes
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <a
      href={href}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-ash-950/10 text-sm/7 font-medium text-ash-950 hover:bg-ash-950/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss-600',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function PlainButton({
  size = 'md',
  color = 'dark/light',
  type = 'button',
  className,
  ...props
}: {
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light'
} & ComponentProps<'button'>) {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm/7 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss-600',
        color === 'dark/light' && 'text-ash-950 hover:bg-ash-950/10',
        color === 'light' && 'text-ash-50 hover:bg-ash-50/15',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function PlainButtonLink({
  size = 'md',
  color = 'dark/light',
  href,
  className,
  ...props
}: {
  href: string
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light'
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <a
      href={href}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm/7 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss-600',
        color === 'dark/light' && 'text-ash-950 hover:bg-ash-950/10',
        color === 'light' && 'text-ash-50 hover:bg-ash-50/15',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
