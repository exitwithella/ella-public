import type { Block } from 'payload'

import { bgStyleField } from '../fields/bgStyle'

export const NewsletterCaptureBlock: Block = {
  slug: 'newsletter-capture',
  labels: {
    singular: 'Newsletter Capture',
    plural: 'Newsletter Captures',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'placeholder',
      type: 'text',
      defaultValue: 'Your email address',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      defaultValue: 'Subscribe',
    },
    {
      name: 'successMessage',
      type: 'text',
      defaultValue: "You're in. We'll be in touch.",
    },
    {
      name: 'microcopy',
      type: 'text',
      admin: {
        description: 'Small trust text below form (e.g. "No spam. Unsubscribe anytime.")',
      },
    },
    {
      name: 'segmentIds',
      type: 'array',
      admin: {
        description:
          'Resend segments to add subscribers to. Copy segment IDs from Resend → Audiences → Segments.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          admin: { description: 'Internal label for your reference' },
        },
        {
          name: 'segmentId',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        description: 'Source tag sent to Resend as a contact property (e.g. "pricing-page-cta")',
      },
    },
    bgStyleField,
  ],
}
