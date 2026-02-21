import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  fields: [
    {
      name: 'testimonials',
      type: 'array',
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'author',
          type: 'text',
          required: true,
        },
        {
          name: 'company',
          type: 'text',
        },
      ],
    },
  ],
  slug: 'testimonials',
}
