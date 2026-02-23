import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  access: {
    read: () => true,
  },
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Site Configuration',
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        description: 'Footer link columns',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'newsletterSection',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Stay current',
        },
        {
          name: 'subheading',
          type: 'text',
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
      ],
    },
    {
      name: 'legalLinks',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      defaultValue: '© ELLA. All rights reserved.',
    },
  ],
}
