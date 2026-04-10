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
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Section headline. Rendered in Termina.',
      },
    },
    {
      name: 'body',
      type: 'richText',
      admin: {
        description: 'Body copy — 2–4 paragraphs in DM Sans.',
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
    bgStyleField,
  ],
}
