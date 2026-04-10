import type { Block } from 'payload'

import { bgStyleField } from '../fields/bgStyle'

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
