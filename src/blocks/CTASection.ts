import type { Block } from 'payload'

import { bgStyleField } from '../fields/bgStyle'
import { coverImageField } from '../fields/coverImage'
import { ctaField } from '../fields/cta'

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
    ctaField({ name: 'primaryCta' }),
    ctaField({ name: 'secondaryCta' }),
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
    coverImageField,
  ],
}
