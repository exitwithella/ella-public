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

export const PricingJourneyBlock: Block = {
  slug: 'pricing-journey',
  labels: {
    singular: 'Pricing Journey',
    plural: 'Pricing Journeys',
  },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
    },
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'tiers',
      type: 'relationship',
      relationTo: 'pricing-tiers',
      hasMany: true,
      admin: {
        description:
          'Select pricing tiers in display order. Leave empty to show all tiers automatically.',
      },
    },
    {
      name: 'showToggle',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show monthly/annual billing toggle',
      },
    },
    bgStyleField,
  ],
}
