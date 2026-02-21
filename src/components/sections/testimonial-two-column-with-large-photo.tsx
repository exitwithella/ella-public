import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

import { Container } from '../elements/container'

export function TestimonialTwoColumnWithLargePhoto({
  quote,
  img,
  name,
  byline,
  className,
  ...props
}: {
  quote: ReactNode
  img: ReactNode
  name: ReactNode
  byline: ReactNode
} & ComponentProps<'section'>) {
  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container>
        <figure className="bg-ash-950/2.5 grid grid-cols-1 gap-x-2 rounded-xl p-2 lg:grid-cols-2">
          <div className="text-ash-950 flex flex-col items-start justify-between gap-10 p-6 sm:p-10">
            <blockquote className="relative flex flex-col gap-4 text-2xl/9 text-pretty *:first:before:absolute *:first:before:inline *:first:before:-translate-x-full *:first:before:content-['“'] *:last:after:inline *:last:after:content-['”']">
              {quote}
            </blockquote>
            <figcaption className="text-sm/7">
              <p className="font-semibold">{name}</p>
              <p className="text-ash-700">{byline}</p>
            </figcaption>
          </div>
          <div className="flex overflow-hidden rounded-sm outline -outline-offset-1 outline-black/5 *:object-cover">
            {img}
          </div>
        </figure>
      </Container>
    </section>
  )
}
