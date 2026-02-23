import type { CollectionConfig } from 'payload'

export const FAQItems: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['question', 'category', 'showOnPricing'],
    useAsTitle: 'question',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Pricing', value: 'pricing' },
        { label: 'Platform', value: 'platform' },
        { label: 'Exit Planning', value: 'exit-planning' },
        { label: 'Onboarding', value: 'onboarding' },
        { label: 'Security', value: 'security' },
      ],
    },
    {
      name: 'showOnPricing',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Include in the FAQ section on the Pricing page',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
  ],
  slug: 'faq-items',
}
