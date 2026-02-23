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

export const ComparisonTableBlock: Block = {
  slug: 'comparison-table',
  dbName: 'cmp_tbl',
  labels: {
    singular: 'Comparison Table',
    plural: 'Comparison Tables',
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
      name: 'columns',
      type: 'array',
      maxRows: 3,
      admin: {
        description: '3 columns: Old Way / Patchwork / With ELLA',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'subheading',
          type: 'text',
        },
        {
          name: 'highlighted',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Visually emphasize this column (the "With ELLA" column)',
          },
        },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Row label (the feature or criterion)',
          },
        },
        {
          name: 'values',
          type: 'array',
          maxRows: 3,
          admin: {
            description: 'One value per column (in order)',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
            },
            {
              name: 'indicator',
              type: 'select',
              defaultValue: 'text',
              options: [
                { label: 'Text only', value: 'text' },
                { label: 'Check (yes)', value: 'check' },
                { label: 'Cross (no)', value: 'cross' },
                { label: 'Partial', value: 'partial' },
              ],
            },
          ],
        },
      ],
    },
    bgStyleField,
  ],
}
