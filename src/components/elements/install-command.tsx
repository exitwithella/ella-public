import { ElCopyable } from '@tailwindplus/elements/react'
import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

import { CheckmarkIcon } from '../icons/checkmark-icon'
import { Squares2StackedIcon } from '../icons/squares-2-stacked-icon'

export function InstallCommand({
  snippet,
  variant = 'normal',
  className,
  ...props
}: {
  snippet: ReactNode
  variant?: 'normal' | 'overlay'
} & ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-6 rounded-full p-1 font-mono text-sm/7 inset-ring-1',
        variant === 'normal' && 'bg-white text-ash-600 inset-ring-black/10',
        variant === 'overlay' && 'bg-white/15 text-white inset-ring-white/10',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 pl-3">
        <div className="text-current/60 select-none">$</div>
        <ElCopyable id="snippet">{snippet}</ElCopyable>
      </div>
      <button
        command="--copy"
        commandfor="snippet"
        type="button"
        aria-label="Copy to clipboard"
        className="group hover:bg-ash-950/10 relative flex size-9 items-center justify-center rounded-full after:absolute after:-inset-1 after:pointer-fine:hidden"
      >
        <Squares2StackedIcon className="group-data-copied:hidden" />
        <CheckmarkIcon className="not-group-data-copied:hidden" />
      </button>
    </div>
  )
}
