import type { Block } from 'payload'

import { bgStyleField } from '../fields/bgStyle'

export const TestimonialBlock: Block = {
  slug: 'testimonial-block',
  labels: {
    singular: 'Testimonial Block',
    plural: 'Testimonial Blocks',
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
      name: 'layout',
      type: 'select',
      defaultValue: 'single',
      options: [
        { label: 'Single (bridge quote)', value: 'single' },
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      filterOptions: {
        approved: { equals: true },
      },
    },
    bgStyleField,
  ],
}
