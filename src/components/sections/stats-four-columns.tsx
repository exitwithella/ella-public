import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

import { Section } from '../elements/section'

export function Stat({
  stat,
  text,
  className,
  ...props
}: { stat: ReactNode; text: ReactNode } & ComponentProps<'div'>) {
  return (
    <div className={clsx('rounded-xl bg-ash-950/2.5 p-6', className)} {...props}>
      <div className="text-ash-950 text-2xl/10 tracking-tight">{stat}</div>
      <p className="text-ash-700 mt-2 text-sm/7">{text}</p>
    </div>
  )
}

export function StatsFourColumns({ children, ...props }: ComponentProps<typeof Section>) {
  return (
    <Section {...props}>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
    </Section>
  )
}
