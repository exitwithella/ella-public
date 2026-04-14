import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  access: {
    read: () => true,
  },
  slug: 'navigation',
  label: 'Navigation',
  admin: {
    group: 'Site Configuration',
  },
  fields: [
    {
      name: 'primaryNav',
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
        },
        {
          name: 'type',
          type: 'select',
          defaultValue: 'link',
          options: [
            { label: 'Simple link', value: 'link' },
            { label: 'Dropdown', value: 'dropdown' },
          ],
        },
        {
          name: 'dropdownItems',
          type: 'array',
          admin: {
            condition: (_, siblingData) => siblingData.type === 'dropdown',
          },
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
            {
              name: 'description',
              type: 'text',
              admin: {
                description: 'Short descriptor shown under label in mega-menu',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'loginLink',
      type: 'group',
      label: 'Login Link',
      admin: {
        description: 'Optional "Log in" link displayed between the secondary and primary CTAs',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Log in',
        },
        {
          name: 'href',
          type: 'text',
          defaultValue: 'https://app.withella.io',
          admin: {
            description: 'URL for the login page (e.g. https://app.withella.io)',
          },
        },
      ],
    },
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Primary CTA (right side)',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Get Started',
        },
        {
          name: 'href',
          type: 'text',
          defaultValue: '/get-started',
        },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      label: 'Secondary CTA (right side)',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Book a Demo',
        },
        {
          name: 'href',
          type: 'text',
          defaultValue: '/demo',
        },
      ],
    },
  ],
}
