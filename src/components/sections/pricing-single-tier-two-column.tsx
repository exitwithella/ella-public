import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

import { Container } from '../elements/container'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'
import { CheckmarkIcon } from '../icons/checkmark-icon'

export function PricingSingleTierTwoColumn({
  headline,
  subheadline,
  price,
  period,
  features,
  cta,
  className,
  ...props
}: {
  headline: ReactNode
  subheadline: ReactNode
  price: ReactNode
  period?: ReactNode
  features: ReactNode[]
  cta: ReactNode
} & ComponentProps<'section'>) {
  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container>
        <div className="bg-ash-950/2.5 grid grid-cols-1 gap-x-2 rounded-xl p-2 lg:grid-cols-2">
          <div className="flex flex-col items-start justify-between gap-10 p-6 sm:p-10">
            <div className="flex flex-col gap-6">
              <Subheading>{headline}</Subheading>
              <Text className="flex flex-col gap-4 text-pretty">{subheadline}</Text>
            </div>
            {cta}
          </div>
          <div className="bg-ash-100 rounded-sm p-6 sm:p-10">
            <div className="flex items-baseline gap-2">
              <p className="text-ash-950 text-[5rem]/24 font-light tracking-tight sm:text-8xl/32">
                {price}
              </p>
              <Text size="lg">{period}</Text>
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-1">
              {features.map((feature, index) => (
                <li key={index} className="flex gap-3 text-sm/5">
                  <span className="bg-ash-950 flex size-5 shrink-0 items-center justify-center rounded-xs">
                    <CheckmarkIcon className="size-3 stroke-white" />
                  </span>
                  <p className="text-ash-700">{feature}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
