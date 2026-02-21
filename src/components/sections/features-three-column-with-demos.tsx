import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

import { Section } from '../elements/section'

export function FeatureThreeColumnWithDemos({
  demo,
  headline,
  subheadline,
  className,
  ...props
}: {
  demo: ReactNode
  headline: ReactNode
  subheadline: ReactNode
} & ComponentProps<'div'>) {
  return (
    <div className={clsx('rounded-lg bg-ash-950/2.5 p-2', className)} {...props}>
      <div className="relative overflow-hidden rounded-sm">{demo}</div>
      <div className="p-6 sm:p-10 lg:p-6">
        <h3 className="text-ash-950 text-base/8 font-medium">{headline}</h3>
        <div className="text-ash-700 mt-2 flex flex-col gap-4 text-sm/7">{subheadline}</div>
      </div>
    </div>
  )
}

export function Features({
  features,
  ...props
}: { features: ReactNode } & Omit<ComponentProps<typeof Section>, 'children'>) {
  return (
    <Section {...props}>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">{features}</div>
    </Section>
  )
}
