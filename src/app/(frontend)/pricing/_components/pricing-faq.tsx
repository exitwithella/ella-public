import { RichText } from '@payloadcms/richtext-lexical/react'

import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { MinusIcon } from '@/components/icons/minus-icon'
import { PlusIcon } from '@/components/icons/plus-icon'
import type { FaqItem } from '@/payload-types'

interface PricingFAQProps {
  faqs: FaqItem[]
}

export function PricingFAQ({ faqs }: PricingFAQProps) {
  if (faqs.length === 0) return null

  return (
    <section className="bg-ash-50 py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <Eyebrow className="font-display text-moss-700 mb-3 text-sm">FAQ</Eyebrow>
            <Heading className="text-3xl md:text-4xl">Common questions.</Heading>
          </div>

          {/* Accordion */}
          <div className="divide-ash-200 border-ash-200 divide-y border-y">
            {faqs.map((faq) => (
              <details key={faq.id} className="group">
                <summary className="text-ash-900 flex w-full cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-base/7 font-medium [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <PlusIcon className="text-ash-500 h-lh shrink-0 group-open:hidden" />
                  <MinusIcon className="text-ash-500 hidden h-lh shrink-0 group-open:block" />
                </summary>
                <div className="text-ash-700 -mt-2 pr-10 pb-5 text-sm/7">
                  <RichText data={faq.answer} />
                </div>
              </details>
            ))}
          </div>

          {/* Still have questions? */}
          <div className="mt-10 text-center">
            <p className="text-ash-500 text-sm">
              Still have questions?{' '}
              <a
                href="https://cal.com/team/ella/ella-intro?overlayCalendar=true"
                target="_blank"
                rel="noopener noreferrer"
                className="text-moss-700 hover:text-moss-800 inline-flex items-center gap-1 font-medium underline-offset-2 hover:underline"
              >
                Talk to our team <ArrowNarrowRightIcon className="h-3 w-3" />
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
