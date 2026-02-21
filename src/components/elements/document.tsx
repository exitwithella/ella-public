import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Document({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'space-y-4 text-sm/7 text-ash-700 [&_a]:font-semibold [&_a]:text-ash-950 [&_a]:underline [&_a]:underline-offset-4 [&_h2]:text-base/8 [&_h2]:font-medium [&_h2]:text-ash-950 [&_h2]:not-first:mt-8 [&_li]:pl-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_strong]:font-semibold [&_strong]:text-ash-950 [&_ul]:list-[square] [&_ul]:pl-6 [&_ul]:marker:text-ash-400',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
