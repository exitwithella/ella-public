import type { GlobalConfig } from 'payload'

import { createGlobalRevalidateHook } from '../hooks/revalidate-cache'

export const ScriptInjection: GlobalConfig = {
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [createGlobalRevalidateHook('script-injection')],
  },
  slug: 'script-injection',
  label: 'Script Injection',
  admin: {
    group: 'Site Configuration',
    description: 'Manage third-party scripts injected into all pages (analytics, pixels, etc.)',
  },
  fields: [
    {
      name: 'scripts',
      type: 'array',
      labels: { singular: 'Script', plural: 'Scripts' },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Label for this script (e.g., "Google Analytics")',
          },
        },
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'placement',
          type: 'select',
          required: true,
          defaultValue: 'head',
          options: [
            { label: 'Head', value: 'head' },
            { label: 'Body (start)', value: 'body-start' },
            { label: 'Body (end)', value: 'body-end' },
          ],
        },
        {
          name: 'code',
          type: 'code',
          required: true,
          admin: {
            language: 'html',
            description: 'Paste the full script tag(s) including <script> wrappers',
          },
        },
      ],
    },
  ],
}
