import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Button } from './button'

export function EmailSignupForm({
  label = 'Email address',
  inputId,
  placeholder = 'Enter your email',
  cta,
  variant = 'normal',
  className,
  ...props
}: {
  label?: string
  // When provided, renders a visually-hidden <label> linked to the input via
  // htmlFor/id. This satisfies WCAG 1.3.1 (explicit label association) while
  // preserving the existing aria-label fallback for callers that don't need a
  // visible label anchor. Both approaches are valid; inputId gives callers the
  // option to use an associated visible label if the design calls for it.
  inputId?: string
  placeholder?: string
  cta: ReactNode
  variant?: 'normal' | 'overlay'
} & ComponentProps<'form'>) {
  return (
    <form
      className={clsx(
        'flex rounded-full p-1 inset-ring-1 dark:bg-white/10 dark:inset-ring-white/10',
        variant === 'normal' && 'bg-white inset-ring-black/10',
        variant === 'overlay' && 'bg-white/15 inset-ring-white/10',
        className,
      )}
      {...props}
    >
      {inputId ? (
        <label htmlFor={inputId} className="sr-only">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={clsx(
          'min-w-0 flex-1 px-3 text-sm/7 focus:outline-hidden dark:text-white',
          variant === 'normal' && 'text-olive-950',
          variant === 'overlay' && 'text-white placeholder:text-white/60',
        )}
        type="email"
        aria-label={inputId ? undefined : label}
        placeholder={placeholder}
      />
      <Button color={variant === 'normal' ? 'dark/light' : 'light'} type="submit">
        {cta}
      </Button>
    </form>
  )
}
