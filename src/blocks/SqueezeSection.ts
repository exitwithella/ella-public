import type { Block } from 'payload'

export const SqueezeSectionBlock: Block = {
  slug: 'squeeze-section',
  labels: {
    singular: 'Squeeze Section',
    plural: 'Squeeze Sections',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      admin: {
        description: 'Eyebrow text above the heading, e.g. "The Problem"',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Section headline. Rendered in Instrument Serif.',
      },
    },
    {
      name: 'body',
      type: 'richText',
      admin: {
        description: 'Body copy — each paragraph becomes a separate animated content block.',
      },
    },
    {
      name: 'quotes',
      type: 'array',
      maxRows: 3,
      admin: {
        description: 'Blockquotes rendered in Instrument Serif.',
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
            description: 'e.g. "Exit planning advisor, 20+ years experience"',
          },
        },
      ],
    },
    {
      name: 'closer',
      type: 'text',
      admin: {
        description: 'Standalone closing line after the content blocks.',
      },
    },
    {
      name: 'pressureItems',
      type: 'array',
      admin: {
        description:
          'Left-wall "Growing Pressure" labels. Shown on desktop walls and mobile inline callouts.',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'erosionItems',
      type: 'array',
      admin: {
        description:
          'Right-wall "Eroding Advantage" labels. Shown on desktop walls and mobile inline callouts.',
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
}
