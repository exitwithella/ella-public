import type { CollectionConfig } from 'payload'

export const Redirects: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['from', 'to', 'type', 'active'],
    useAsTitle: 'from',
  },
  fields: [
    {
      name: 'from',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Source path (e.g. "/old-page" or full URL from exitwithella.io)',
      },
    },
    {
      name: 'to',
      type: 'text',
      required: true,
      admin: {
        description: 'Destination path or URL',
      },
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: '301',
      options: [
        { label: '301 Permanent', value: '301' },
        { label: '302 Temporary', value: '302' },
      ],
    },
    {
      name: 'sourceDomain',
      type: 'select',
      defaultValue: 'withella',
      options: [
        { label: 'withella.io', value: 'withella' },
        { label: 'exitwithella.io', value: 'exitwithella' },
      ],
      admin: {
        description: 'Which domain this redirect originates from',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
  slug: 'redirects',
}
