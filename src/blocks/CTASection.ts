import type { Block } from 'payload'

import { bgStyleField } from '../fields/bgStyle'

export const CTASectionBlock: Block = {
  slug: 'cta-section',
  labels: {
    singular: 'CTA Section',
    plural: 'CTA Sections',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
    },
    {
      name: 'body',
      type: 'textarea',
    },
    {
      name: 'primaryCta',
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
      name: 'secondaryCta',
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
      name: 'closingLine',
      type: 'text',
      admin: {
        description: 'Small text below CTAs (e.g. "No credit card required")',
      },
    },
    {
      name: 'microcopy',
      type: 'text',
      admin: {
        description: 'Trust signal near CTA (e.g. "Join 200+ advisors")',
      },
    },
    { ...bgStyleField, defaultValue: 'forest' },
  ],
}
