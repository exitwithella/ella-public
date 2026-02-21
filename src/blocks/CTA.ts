import type { Block } from 'payload'

export const CTABlock: Block = {
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'buttonText',
      type: 'text',
    },
    {
      name: 'buttonLink',
      type: 'text',
    },
    {
      name: 'backgroundColor',
      type: 'text',
    },
  ],
  slug: 'cta',
}
