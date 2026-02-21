import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

import { Container } from '../elements/container'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'
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
        <MinusIcon className="h-lh hidden group-open:block" />
      </summary>
      <div className="text-ash-700 -mt-2 flex flex-col gap-2 pr-12 pb-4 text-sm/7">
        {answer}
      </div>
    </details>
  )
}

export function FAQsTwoColumnAccordion({
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
      <Container className="grid grid-cols-1 gap-x-2 gap-y-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Subheading>{headline}</Subheading>
          {subheadline ? <Text className="flex flex-col gap-4 text-pretty">{subheadline}</Text> : null}
        </div>
        <div className="divide-ash-950/10 border-ash-950/10 divide-y border-y">{children}</div>
      </Container>
    </section>
  )
}
