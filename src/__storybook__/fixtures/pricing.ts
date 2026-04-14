import type { FaqItem, PricingTier } from '@/payload-types'

import { richText } from './richtext'

export const mockTiers: PricingTier[] = [
  {
    id: 1,
    name: 'Practitioner',
    slug: 'practitioner',
    tagline: 'For independent advisors building systematic practices.',
    price: {
      amount: 9900,
      period: 'month',
    },
    pricePer: 'user',
    monthSurchargePercent: 20,
    quarterSurchargePercent: 10,
    cta: { label: 'Get Started', href: 'https://app.exitwithella.io/sign-up' },
    features: [],
    sortOrder: 1,
    updatedAt: '',
    createdAt: '',
  },
  {
    id: 2,
    name: 'Enterprise',
    slug: 'enterprise',
    tagline: 'For firms that need advanced controls and dedicated support.',
    price: {
      amount: null,
      period: 'custom',
      customLabel: 'Custom',
    },
    pricePer: 'flat',
    cta: { label: 'Talk to Sales', href: 'https://cal.com/team/ella/ella-intro' },
    features: [],
    sortOrder: 2,
    updatedAt: '',
    createdAt: '',
  },
]

export const mockFaqs: FaqItem[] = [
  {
    id: 1,
    question: 'Can I switch plans later?',
    answer: richText('Yes. You can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.') as FaqItem['answer'],
    sortOrder: 1,
    updatedAt: '',
    createdAt: '',
  },
  {
    id: 2,
    question: 'What counts as a user?',
    answer: richText('A user is anyone who logs into ELLA with their own account. Collaborators that clients invite do not count toward your user limit.') as FaqItem['answer'],
    sortOrder: 2,
    updatedAt: '',
    createdAt: '',
  },
  {
    id: 3,
    question: 'Do you offer a free trial?',
    answer: richText('We do not currently offer a free trial, but you can book a demo to see ELLA in action before committing.') as FaqItem['answer'],
    sortOrder: 3,
    updatedAt: '',
    createdAt: '',
  },
]
