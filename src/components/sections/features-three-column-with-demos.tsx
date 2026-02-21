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
      <div className="relative overflow-hidden rounded-sm">
        {demo}
      </div>
      <div className="p-6 sm:p-10 lg:p-6">
        <h3 className="text-base/8 font-medium text-ash-950">{headline}</h3>
        <div className="mt-2 flex flex-col gap-4 text-sm/7 text-ash-700">{subheadline}</div>
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
