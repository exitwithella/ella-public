import type { Block } from 'payload'

import { bgStyleField } from '../fields/bgStyle'

export const ContentSectionBlock: Block = {
  slug: 'content-section',
  labels: {
    singular: 'Content Section',
    plural: 'Content Sections',
  },
  fields: [
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
    {
      name: 'link',
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
        {
          name: 'style',
          type: 'select',
          defaultValue: 'button',
          options: [
            { label: 'Button', value: 'button' },
            { label: 'Link', value: 'link' },
          ],
        },
      ],
    },
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
