import type { Block } from 'payload'

const bgStyleField = {
  name: 'bgStyle',
  type: 'select' as const,
  defaultValue: 'ash-light',
  options: [
    { label: 'Cream', value: 'cream' },
    { label: 'White', value: 'white' },
    { label: 'Ash Light', value: 'ash-light' },
    { label: 'Forest Dark', value: 'forest-dark' },
  ],
}

export const TrustSecurityBlock: Block = {
  slug: 'trust-security',
  labels: {
    singular: 'Trust & Security',
    plural: 'Trust & Security Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Wrap words in *asterisks* to render them in italic.',
      },
    },
    {
      name: 'intro',
      type: 'textarea',
      admin: {
        description: 'Wrap words in *asterisks* to render them in italic.',
      },
    },
    {
      name: 'sections',
      type: 'array',
      admin: {
        description: 'Content sections displayed in a two-column grid.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'body',
          type: 'textarea',
        },
        {
          name: 'bulletHeading',
          type: 'text',
          admin: {
            description: 'Optional heading above the bullet list (e.g. "You\'re in Good Hands").',
          },
        },
        {
          name: 'bulletItems',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'column',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
        },
      ],
    },
    bgStyleField,
  ],
}
