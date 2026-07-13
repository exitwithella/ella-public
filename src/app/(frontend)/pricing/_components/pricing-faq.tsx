import { RichText } from '@payloadcms/richtext-lexical/react'

import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { MinusIcon } from '@/components/icons/minus-icon'
import { PlusIcon } from '@/components/icons/plus-icon'
import type { FaqItem } from '@/payload-types'

import { BOOK_DEMO_URL } from '../../_lib/content'

const CATEGORY_LABELS: Record<string, string> = {
  general: 'General',
  pricing: 'Pricing',
  platform: 'Platform',
  'exit-planning': 'Exit Planning',
  onboarding: 'Onboarding',
  security: 'Security',
}

const CATEGORY_ORDER = ['platform', 'pricing', 'exit-planning', 'onboarding', 'security', 'general']

function groupByCategory(faqs: FaqItem[]) {
  const groups = new Map<string, FaqItem[]>()
  for (const faq of faqs) {
    const cat = faq.category ?? 'general'
    if (!groups.has(cat)) groups.set(cat, [])
    groups.get(cat)!.push(faq)
  }
  return CATEGORY_ORDER.filter((cat) => groups.has(cat)).map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat] ?? cat,
    items: groups.get(cat)!,
  }))
}

interface PricingFAQProps {
  faqs: FaqItem[]
}

export function PricingFAQ({ faqs }: PricingFAQProps) {
  if (faqs.length === 0) return null

  const sections = groupByCategory(faqs)

  return (
    <section className="bg-sandstone-50 py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <Eyebrow size="sm" className="mb-3">
              FAQ
            </Eyebrow>
            <Heading className="text-3xl md:text-4xl">Common questions.</Heading>
          </div>

          {/* Grouped accordion */}
          <div className="space-y-14">
            {sections.map((section) => (
              <div key={section.category}>
                <h3 className="font-display text-moss-600 mb-4 text-xs font-semibold tracking-widest uppercase">
                  {section.label}
                </h3>
                <div className="divide-ash-200 border-ash-200 divide-y border-y">
                  {section.items.map((faq) => (
                    <details key={faq.id} className="group">
                      <summary className="text-ash-900 focus-visible:outline-moss-700 flex w-full cursor-pointer list-none items-start justify-between gap-6 rounded-sm py-5 text-left text-base/7 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden">
                        {faq.question}
                        <span className="relative h-lh w-[13px] shrink-0" aria-hidden="true">
                          <PlusIcon className="text-ash-1000 absolute inset-0 h-lh group-open:opacity-0" />
                          <MinusIcon className="text-ash-1000 absolute inset-0 h-lh opacity-0 group-open:opacity-100" />
                        </span>
                      </summary>
                      <div className="text-ash-700 -mt-2 pr-10 pb-5">
                        <RichText
                          data={faq.answer}
                          className="text-sm [&_p]:mb-3 [&_p:last-child]:mb-0"
                        />
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions? */}
          <div className="mt-10 text-center">
            <p className="text-ash-1000 text-sm">
              Still have questions?{' '}
              <a
                href={BOOK_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Talk to our team (opens in new tab)"
                className="text-moss-700 hover:text-moss-800 focus-visible:outline-moss-700 inline-flex items-center gap-1 rounded-sm font-medium underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Talk to our team <ArrowNarrowRightIcon className="h-3 w-3" aria-hidden="true" />
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
