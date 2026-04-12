import type { Block } from 'payload'

import { bgStyleField } from '../fields/bgStyle'
import { iconField } from '../fields/icon'

export const CardGridBlock: Block = {
  slug: 'card-grid',
  labels: {
    singular: 'Card Grid',
    plural: 'Card Grids',
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
      name: 'variant',
      type: 'select',
      defaultValue: 'feature',
      options: [
        { label: 'Feature (pillars)', value: 'feature' },
        { label: 'Icon', value: 'icon' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
      ],
    },
    {
      name: 'cards',
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
        iconField({
          admin: {
            description: 'Phosphor icon for this card. Overrides the uploaded icon image when set.',
          },
        }),
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Fallback icon image (used if no Phosphor icon is selected above).',
          },
        },
        {
          name: 'link',
          type: 'group',
          fields: [
            {
              name: 'label',
              type: 'text',
            },
            {
              name: 'href',
              type: 'text',
            },
          ],
        },
        {
          name: 'anchorTarget',
          type: 'text',
          admin: {
            description: 'ID of a section further down the page to link to (without #)',
          },
        },
        {
          name: 'capabilities',
          type: 'array',
          admin: {
            description: 'Short capability bullets shown below the card description',
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
    bgStyleField,
  ],
}
