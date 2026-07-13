import type { Block } from 'payload'

import { bgStyleField } from '../fields/bgStyle'
import { ctaField } from '../fields/cta'

export const FeatureDeepDiveBlock: Block = {
  slug: 'feature-deep-dive',
  labels: {
    singular: 'Feature Deep Dive',
    plural: 'Feature Deep Dives',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'HTML id attribute for anchor links (e.g. "coverage")',
      },
    },
    {
      name: 'sectionLabel',
      type: 'text',
    },
    {
      name: 'sections',
      type: 'array',
      admin: {
        description: 'Alternating text+visual rows',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'body',
          type: 'richText',
        },
        {
          name: 'visual',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'visualAlt',
          type: 'text',
        },
        {
          name: 'testimonial',
          type: 'relationship',
          relationTo: 'testimonials',
          admin: {
            description: 'Optional embedded testimonial',
          },
        },
        ctaField({ name: 'link' }),
      ],
    },
    bgStyleField,
  ],
}
