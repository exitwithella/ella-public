import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

import { Container } from '../elements/container'
import { Heading } from '../elements/heading'
import { Text } from '../elements/text'
import { CheckmarkIcon } from '../icons/checkmark-icon'

export function Plan({
  name,
  price,
  period,
  subheadline,
  badge,
  features,
  cta,
  className,
}: {
  name: ReactNode
  price: ReactNode
  period?: ReactNode
  subheadline: ReactNode
  badge?: ReactNode
  features: ReactNode[]
  cta: ReactNode
} & ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'flex flex-col justify-between gap-6 rounded-xl bg-ash-950/2.5 p-6 sm:items-start',
        className,
      )}
    >
      <div className="self-stretch">
        <div className="flex items-center justify-between">
          {badge ? (
            <div className="bg-ash-950/10 text-ash-950 order-last inline-flex rounded-full px-2 text-xs/6 font-medium">
              {badge}
            </div>
          ) : null}

          <h3 className="text-ash-950 text-2xl/8 tracking-tight">{name}</h3>
        </div>
        <p className="mt-1 inline-flex gap-1 text-base/7">
          <span className="text-ash-950">{price}</span>
          {period ? <span className="text-ash-500">{period}</span> : null}
        </p>
        <div className="text-ash-700 mt-4 flex flex-col gap-4 text-sm/6">{subheadline}</div>
        <ul className="text-ash-700 mt-4 space-y-2 text-sm/6">
          {features.map((feature, index) => (
            <li key={index} className="flex gap-4">
              <CheckmarkIcon className="stroke-ash-950 h-lh shrink-0" />
              <p>{feature}</p>
            </li>
          ))}
        </ul>
      </div>
      {cta}
    </div>
  )
}

export function PricingHeroMultiTier<T extends string>({
  eyebrow,
  headline,
  subheadline,
  options,
  plans,
  footer,
  className,
  ...props
}: {
  eyebrow?: ReactNode
  headline: ReactNode
  subheadline: ReactNode
  options: readonly T[]
  plans: Record<T, ReactNode>
  footer?: ReactNode
} & ComponentProps<'section'>) {
  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col items-center gap-6">
          {eyebrow}
          <Heading>{headline}</Heading>
          <Text size="lg" className="flex max-w-xl flex-col gap-4 text-center">
            {subheadline}
          </Text>
        </div>
        {options.map((option) => (
          <div key={option} className="flex flex-col gap-6">
            {options.length > 1 ? (
              <h3 className="text-ash-950 text-center text-sm/7 font-semibold">{option}</h3>
            ) : null}
            <div className="grid grid-cols-1 gap-2 sm:has-[>:nth-child(5)]:grid-cols-2 sm:max-lg:has-[>:last-child:nth-child(even)]:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none lg:has-[>:nth-child(5)]:grid-flow-row lg:has-[>:nth-child(5)]:grid-cols-3">
              {plans[option]}
            </div>
          </div>
        ))}
        {footer}
      </Container>
    </section>
  )
}
