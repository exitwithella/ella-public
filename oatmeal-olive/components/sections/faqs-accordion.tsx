import { clsx } from 'clsx/lite'
import { type ComponentProps, type ReactNode } from 'react'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'
import { MinusIcon } from '../icons/minus-icon'
import { PlusIcon } from '../icons/plus-icon'

// Replaced ElDisclosure + command="--toggle" (custom command, requires JS) with
// native <details>/<summary>. Same semantics, zero JS, server-renderable, better
// SEO (answer content is always in the DOM).
//
// Open/close icon toggling uses Tailwind's group-open: modifier:
//   - PlusIcon: visible by default, hidden when <details> is open
//   - MinusIcon: hidden by default, visible when <details> is open
//
// list-none + [&::-webkit-details-marker]:hidden removes the browser's default
// disclosure triangle from <summary> so we fully control the indicator styling.
export function Faq({
  question,
  answer,
  className,
  ...props
}: { question: ReactNode; answer: ReactNode } & ComponentProps<'details'>) {
  return (
    <details className={clsx('group', className)} {...props}>
      <summary className="flex w-full cursor-pointer list-none items-start justify-between gap-6 py-4 text-left text-base/7 text-olive-950 [&::-webkit-details-marker]:hidden dark:text-white">
        {question}
        <PlusIcon className="h-lh group-open:hidden" />
        <MinusIcon className="h-lh hidden group-open:block" />
      </summary>
      <div className="-mt-2 flex flex-col gap-2 pr-12 pb-4 text-sm/7 text-olive-700 dark:text-olive-400">
        {answer}
      </div>
    </details>
  )
}

export function FAQsAccordion({
  headline,
  subheadline,
  className,
  children,
  ...props
}: {
  headline?: ReactNode
  subheadline?: ReactNode
} & ComponentProps<'section'>) {
  return (
    <section className={clsx('py-16', className)} {...props}>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 lg:max-w-5xl lg:px-10">
        <div className="flex flex-col gap-6">
          <Subheading>{headline}</Subheading>
          {subheadline ? <Text className="flex flex-col gap-4 text-pretty">{subheadline}</Text> : null}
        </div>
        <div className="divide-y divide-olive-950/10 border-y border-olive-950/10 dark:divide-white/10 dark:border-white/10">
          {children}
        </div>
      </div>
    </section>
  )
}
