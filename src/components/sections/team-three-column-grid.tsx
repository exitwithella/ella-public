import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Section } from '../elements/section'

export function TeamMember({
  img,
  name,
  byline,
  className,
  ...props
}: {
  img: ReactNode
  name: ReactNode
  byline: ReactNode
} & ComponentProps<'li'>) {
  return (
    <li className={clsx('flex flex-col gap-4 text-sm/7', className)} {...props}>
      <div className="aspect-3/4 w-full overflow-hidden rounded-sm outline -outline-offset-1 outline-black/5 *:size-full *:object-cover">
        {img}
      </div>
      <div>
        <p className="font-semibold text-ash-950">{name}</p>
        <p className="text-ash-700">{byline}</p>
      </div>
    </li>
  )
}

export function TeamThreeColumnGrid({ children, ...props }: ComponentProps<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="grid grid-cols-2 gap-x-2 gap-y-10 md:grid-cols-3">
        {children}
      </ul>
    </Section>
  )
}
