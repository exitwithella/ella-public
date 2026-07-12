import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'

export { Faq } from './faq'

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
          {subheadline ? (
            <Text className="flex flex-col gap-4 text-pretty">{subheadline}</Text>
          ) : null}
        </div>
        <div className="divide-ash-950/10 border-ash-950/10 divide-y border-y">{children}</div>
      </div>
    </section>
  )
}
