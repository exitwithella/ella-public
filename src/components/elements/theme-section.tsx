import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export type ThemeName =
  | 'sandstone'
  | 'white'
  | 'mint'
  | 'goldenrod'
  | 'ash'
  | 'forest'
  | 'tannery'
  | 'leather'
  | 'ocean'
  | 'brand-black'

const DARK_THEMES: ReadonlySet<string> = new Set([
  'forest',
  'tannery',
  'leather',
  'ocean',
  'brand-black',
])

export function isDarkTheme(theme?: string | null): boolean {
  return DARK_THEMES.has(theme ?? '')
}

export function ThemeSection({
  bgStyle,
  className,
  children,
  ...props
}: {
  bgStyle?: ThemeName | string | null
} & ComponentProps<'section'>) {
  return (
    <section
      data-theme={bgStyle ?? 'sandstone'}
      className={clsx('bg-theme-bg', className)}
      {...props}
    >
      {children}
    </section>
  )
}
