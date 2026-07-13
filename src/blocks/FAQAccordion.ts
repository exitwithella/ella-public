import type { Block } from 'payload'

import { bgStyleField } from '../fields/bgStyle'
import { FAQ_CATEGORY_OPTIONS } from '../fields/options'

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
      options: FAQ_CATEGORY_OPTIONS,
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
