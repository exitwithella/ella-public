import type { Block } from 'payload'

import { bgStyleField } from '../fields/bgStyle'

export const BridgeSectionBlock: Block = {
  slug: 'bridge-section',
  labels: {
    singular: 'Bridge Section',
    plural: 'Bridge Sections',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      admin: {
        description: 'Optional eyebrow label above the heading.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Section headline. Rendered in Termina.',
      },
    },
    {
      name: 'bodyStyle',
      type: 'select',
      defaultValue: 'body',
      options: [
        { label: 'Body Text', value: 'body' },
        { label: 'Feature', value: 'feature' },
      ],
      admin: {
        description: 'Body = standard DM Sans body text. Feature = larger serif text.',
        width: '50%',
      },
    },
    {
      name: 'body',
      type: 'richText',
      admin: {
        description: 'Body copy — 2–4 paragraphs.',
      },
    },
    {
      name: 'quotes',
      type: 'array',
      maxRows: 3,
      admin: {
        description: 'Stacked blockquotes. Rendered in Instrument Serif.',
      },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
        {
          name: 'attribution',
          type: 'text',
          admin: {
            description: 'e.g. "Advisor, on what they need from technology"',
          },
        },
      ],
    },
    {
      name: 'closer',
      type: 'text',
      admin: {
        description: 'Standalone closing line after the quotes. DM Sans medium weight.',
      },
    },
    {
      name: 'link',
      type: 'group',
      admin: {
        description: 'Optional trailing link below the content.',
      },
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
    bgStyleField,
  ],
}
