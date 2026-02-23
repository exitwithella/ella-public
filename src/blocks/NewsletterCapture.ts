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
    bgStyleField,
  ],
}
