import type { Block } from 'payload'

const bgStyleField = {
  name: 'bgStyle',
  type: 'select' as const,
  defaultValue: 'cream',
  options: [
    { label: 'Cream', value: 'cream' },
    { label: 'White', value: 'white' },
    { label: 'Ash Light', value: 'ash-light' },
    { label: 'Forest Dark', value: 'forest-dark' },
  ],
}

export const FAQAccordionBlock: Block = {
  slug: 'faq-accordion',
  labels: {
    singular: 'FAQ Accordion',
    plural: 'FAQ Accordions',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'filterByCategory',
      type: 'select',
      admin: {
        description: 'Only show FAQs from this category (leave blank for all)',
      },
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
      name: 'items',
      type: 'relationship',
      relationTo: 'faq-items',
      hasMany: true,
      admin: {
        description: 'Manually select FAQ items (overrides category filter)',
      },
    },
    bgStyleField,
  ],
}
