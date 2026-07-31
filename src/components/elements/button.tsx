import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

import { SmartLink } from './smart-link'

const sizes = {
  lg: 'px-4 py-2',
  md: 'px-3 py-1',
}

type ButtonColor = 'auto' | 'dark/light' | 'light'

const BASE =
  'inline-flex shrink-0 items-center justify-center rounded-full text-sm/7 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent'

const SOLID_COLORS: Record<ButtonColor, string> = {
  auto: 'bg-theme-text text-theme-bg hover:opacity-90',
  'dark/light': 'bg-ash-950 text-ash-100 hover:bg-ash-800',
  light: 'bg-sandstone-50 text-ash-950 hover:bg-ash-100',
}

const PLAIN_COLORS: Record<ButtonColor, string> = {
  auto: 'text-theme-text hover:bg-theme-text/10',
  'dark/light': 'text-ash-950 hover:bg-ash-950/10',
  light: 'text-ash-100 hover:bg-sandstone-50/15',
}

const SOFT_CLASS = 'bg-theme-text/10 text-theme-text hover:bg-theme-text/15'

function solidClasses(color: ButtonColor, size: keyof typeof sizes, className?: string) {
  return clsx(BASE, 'gap-1', SOLID_COLORS[color], sizes[size], className)
}

function softClasses(size: keyof typeof sizes, className?: string) {
  return clsx(BASE, 'gap-1', SOFT_CLASS, sizes[size], className)
}

function plainClasses(color: ButtonColor, size: keyof typeof sizes, className?: string) {
  return clsx(BASE, 'gap-2', PLAIN_COLORS[color], sizes[size], className)
}

export function Button({
  size = 'md',
  type = 'button',
  color = 'auto',
  className,
  ...props
}: {
  size?: keyof typeof sizes
  color?: ButtonColor
} & ComponentProps<'button'>) {
  return <button type={type} className={solidClasses(color, size, className)} {...props} />
}

export function ButtonLink({
  size = 'md',
  color = 'auto',
  className,
  href,
  ...props
}: {
  href: string
  size?: keyof typeof sizes
  color?: ButtonColor
} & Omit<ComponentProps<'a'>, 'href'>) {
  return <SmartLink href={href} className={solidClasses(color, size, className)} {...props} />
}

export function SoftButton({
  size = 'md',
  type = 'button',
  className,
  ...props
}: {
  size?: keyof typeof sizes
} & ComponentProps<'button'>) {
  return <button type={type} className={softClasses(size, className)} {...props} />
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
  return <SmartLink href={href} className={softClasses(size, className)} {...props} />
}

export function PlainButton({
  size = 'md',
  color = 'auto',
  type = 'button',
  className,
  ...props
}: {
  size?: keyof typeof sizes
  color?: ButtonColor
} & ComponentProps<'button'>) {
  return <button type={type} className={plainClasses(color, size, className)} {...props} />
}

export function PlainButtonLink({
  size = 'md',
  color = 'auto',
  href,
  className,
  ...props
}: {
  href: string
  size?: keyof typeof sizes
  color?: ButtonColor
} & Omit<ComponentProps<'a'>, 'href'>) {
  return <SmartLink href={href} className={plainClasses(color, size, className)} {...props} />
}
