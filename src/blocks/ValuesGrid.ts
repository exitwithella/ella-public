import type { Block } from 'payload'

import { bgStyleField } from '../fields/bgStyle'

export const ValuesGridBlock: Block = {
  slug: 'values-grid',
  labels: {
    singular: 'Values Grid',
    plural: 'Values Grids',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Floating title displayed above the bordered container.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Short paragraph below the heading, inside the container.',
      },
    },
    {
      name: 'items',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    bgStyleField,
  ],
}
