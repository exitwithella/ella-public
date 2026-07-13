import type { CollectionConfig } from 'payload'

export const CaseStudies: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['title', 'discipline', 'featured', 'approved'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal title — not shown publicly (client is anonymous)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Stable identifier used for content sync — must be unique',
      },
    },
    {
      name: 'headline',
      type: 'text',
      admin: {
        description: 'Public-facing headline, e.g. "How one advisor tripled engagement in 90 days"',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: {
        description: 'Short summary paragraph shown in card/list views',
      },
    },
    {
      name: 'body',
      type: 'richText',
      admin: {
        description: 'Full case study narrative',
      },
    },
    {
      name: 'client',
      type: 'group',
      admin: {
        description: 'Anonymous client descriptor — no identifying information',
      },
      fields: [
        {
          name: 'descriptor',
          type: 'text',
          admin: {
            description: 'e.g. "Mid-size RIA, Southeast US" or "Solo CEPA practitioner"',
          },
        },
        {
          name: 'firmSize',
          type: 'select',
          options: [
            { label: 'Solo (1 advisor)', value: 'solo' },
            { label: 'Small (2–10)', value: 'small' },
            { label: 'Mid-size (11–50)', value: 'mid' },
            { label: 'Large (50+)', value: 'large' },
          ],
        },
      ],
    },
    {
      name: 'metrics',
      type: 'array',
      admin: {
        description: 'Quantitative outcomes to highlight',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "3x" or "40%"',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "increase in client engagement"',
          },
        },
      ],
    },
    {
      name: 'discipline',
      type: 'relationship',
      relationTo: 'disciplines',
      hasMany: false,
      admin: {
        description: 'Primary discipline this case study belongs to',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Pin to featured placement on case studies index',
      },
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Only approved case studies appear on the site',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  slug: 'case-studies',
}
