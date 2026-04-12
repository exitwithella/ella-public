import type { Block } from 'payload'

import { bgStyleField } from '../fields/bgStyle'

export const AdvisorPersonasBlock: Block = {
  slug: 'advisor-personas',
  labels: {
    singular: 'Advisor Personas',
    plural: 'Advisor Personas',
  },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      admin: {
        description: 'Eyebrow label above the heading (e.g. "Built for your practice")',
      },
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Full-height image for the left column. Use a portrait-oriented photo.',
      },
    },
    {
      name: 'imageQuote',
      type: 'group',
      admin: {
        description:
          'Optional quote overlaid on the lower portion of the image with a dark gradient. Leave all fields empty to show the image clean.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          admin: {
            description: 'Small label above the quote (e.g. "From the field")',
          },
        },
        {
          name: 'text',
          type: 'textarea',
          admin: {
            description: 'The quote text',
          },
        },
        {
          name: 'attribution',
          type: 'text',
          admin: {
            description: 'Attribution line (e.g. "CEPA, 12 years in practice")',
          },
        },
      ],
    },
    {
      name: 'personas',
      type: 'array',
      minRows: 2,
      maxRows: 8,
      admin: {
        description: 'Advisor persona cards. Each card describes a type of advisor and their ELLA outcome.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'The persona identifier (e.g. "The CEPA with 40 clients and one associate")',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            description: 'The pain or context paragraph for this advisor type',
          },
        },
        {
          name: 'withElla',
          type: 'textarea',
          required: true,
          admin: {
            description: 'The "With ELLA:" resolution — what changes for this advisor',
          },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional icon image for the card. SVG recommended. Fallback icon shown if empty.',
          },
        },
        {
          name: 'accentColor',
          type: 'select',
          defaultValue: 'forest',
          admin: {
            description: 'Icon background tint color. Defaults to forest green.',
          },
          options: [
            { label: 'Forest (default)', value: 'forest' },
            { label: 'Moss', value: 'moss' },
            { label: 'Goldenrod', value: 'goldenrod' },
            { label: 'Ocean', value: 'ocean' },
            { label: 'Coral', value: 'coral' },
            { label: 'Emerald', value: 'emerald' },
          ],
        },
      ],
    },
    bgStyleField,
  ],
}
