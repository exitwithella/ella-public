import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  access: {
    read: () => true,
  },
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Site Configuration',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'ELLA',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logomark',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Square/icon version of logo for favicon and mobile',
      },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Default Open Graph image for pages without a custom og:image (1200×630px)',
      },
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'linkedIn',
          type: 'text',
        },
        {
          name: 'twitter',
          type: 'text',
        },
        {
          name: 'youtube',
          type: 'text',
        },
      ],
    },
    {
      name: 'llmsTxt',
      type: 'code',
      admin: {
        language: 'markdown',
        description: 'Content served at /llms.txt — describes your site for AI/LLM consumption',
      },
    },
    {
      name: 'announcementBar',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'message',
          type: 'text',
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
          ],
        },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'forest',
          options: [
            { label: 'Forest (green)', value: 'forest' },
            { label: 'Goldenrod (accent)', value: 'goldenrod' },
            { label: 'Ash (neutral)', value: 'ash' },
          ],
        },
      ],
    },
  ],
}
