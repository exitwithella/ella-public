import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

import { MinusIcon } from '../icons/minus-icon'
import { PlusIcon } from '../icons/plus-icon'

export function Faq({
  question,
  answer,
  className,
  ...props
}: { question: ReactNode; answer: ReactNode } & ComponentProps<'details'>) {
  return (
    <details className={clsx('group', className)} {...props}>
      <summary className="text-ash-950 flex w-full cursor-pointer list-none items-start justify-between gap-6 py-4 text-left text-base/7 [&::-webkit-details-marker]:hidden">
        {question}
        <PlusIcon className="h-lh group-open:hidden" />
        <MinusIcon className="hidden h-lh group-open:block" />
      </summary>
      <div className="text-ash-700 -mt-2 flex flex-col gap-2 pr-12 pb-4 text-sm/7">{answer}</div>
    </details>
  )
}
