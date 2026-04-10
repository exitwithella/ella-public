import type { Block } from 'payload'

import { bgStyleField } from '../fields/bgStyle'

export const NumberedStepsBlock: Block = {
  slug: 'numbered-steps',
  labels: {
    singular: 'Numbered Steps',
    plural: 'Numbered Steps',
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
      name: 'steps',
      type: 'array',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'body',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Screenshot or illustration for this step',
          },
        },
      ],
    },
    bgStyleField,
  ],
}
