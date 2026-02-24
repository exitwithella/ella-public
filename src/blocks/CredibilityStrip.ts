import type { Block } from 'payload'

const bgStyleField = {
  name: 'bgStyle',
  type: 'select' as const,
  defaultValue: 'cream',
  options: [
    { label: 'Cream', value: 'cream' },
    { label: 'White', value: 'white' },
    { label: 'Ash Light', value: 'ash-light' },
    { label: 'Forest Dark', value: 'forest-dark' },
  ],
}

export const CredibilityStripBlock: Block = {
  slug: 'credibility-strip',
  labels: {
    singular: 'Credibility Strip',
    plural: 'Credibility Strips',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'logos',
      options: [
        { label: 'Partner logos', value: 'logos' },
        { label: 'Statement + stats', value: 'stats' },
        { label: 'Combined', value: 'combined' },
        { label: 'Text statement', value: 'text' },
      ],
    },
    {
      name: 'statement',
      type: 'textarea',
      admin: {
        description: 'Centered text statement. Shown when variant is "Text statement".',
        condition: (_, siblingData) => siblingData?.variant === 'text',
      },
    },
    {
      name: 'label',
      type: 'text',
      admin: {
        description: 'Small label above logos (e.g. "Trusted by advisors certified through")',
      },
    },
    {
      name: 'partners',
      type: 'relationship',
      relationTo: 'partners',
      hasMany: true,
    },
    {
      name: 'stats',
      type: 'array',
      admin: {
        description: 'Shown in "stats" and "combined" variants',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "200+"',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "advisors onboarded"',
          },
        },
      ],
    },
    bgStyleField,
  ],
}
