import type { Block } from 'payload'

export const ProductFeaturesBlock: Block = {
  slug: 'product-features',
  labels: {
    singular: 'Product Features',
    plural: 'Product Features',
  },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      admin: {
        description: 'Optional eyebrow label above the heading',
      },
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
      name: 'items',
      type: 'array',
      minRows: 2,
      maxRows: 4,
      admin: {
        description: '2–4 feature tiers. Each item drives one scroll panel.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'screenshot',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'badges',
          type: 'array',
          maxRows: 3,
          admin: {
            description: 'Short capability labels shown as pill badges (max 3)',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'bgStyle',
      type: 'select',
      defaultValue: 'cream',
      options: [
        { label: 'Cream', value: 'cream' },
        { label: 'Ash Light', value: 'ash-light' },
      ],
    },
  ],
}
