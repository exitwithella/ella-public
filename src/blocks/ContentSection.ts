import type { Block } from 'payload'

import { bgStyleField } from '../fields/bgStyle'
import { ctaField } from '../fields/cta'

export const ContentSectionBlock: Block = {
  slug: 'content-section',
  labels: {
    singular: 'Content Section',
    plural: 'Content Sections',
  },
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Split Heading', value: 'split-heading' },
      ],
      admin: {
        description:
          'Default = standard layout. Split Heading = heading on left, body on right in a two-column grid.',
      },
    },
    {
      name: 'sectionLabel',
      type: 'text',
      admin: {
        description: 'Small eyebrow label above the heading (optional)',
      },
    },
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'body',
      type: 'richText',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'mediaPosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
        { label: 'Top', value: 'top' },
        { label: 'None', value: 'none' },
      ],
    },
    ctaField({ name: 'link', withStyle: true }),
    {
      name: 'badge',
      type: 'text',
      admin: {
        description: 'Small badge/tag to display near the heading',
      },
    },
    bgStyleField,
  ],
}
