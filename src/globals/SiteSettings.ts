import type { GlobalConfig } from 'payload'

import { ctaField } from '../fields/cta'
import { createGlobalRevalidateHook } from '../hooks/revalidate-cache'

export const SiteSettings: GlobalConfig = {
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [createGlobalRevalidateHook('site-settings')],
  },
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Site Configuration',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          description: 'Site branding, social links, and operational settings.',
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
              name: 'indexNow',
              type: 'group',
              admin: {
                description: 'IndexNow pings search engines when content is published or updated',
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: false,
                },
              ],
            },
            {
              name: 'llmsTxt',
              type: 'code',
              admin: {
                language: 'markdown',
                description:
                  'Content served at /llms.txt — describes your site for AI/LLM consumption',
              },
            },
            {
              name: 'creditsBody',
              type: 'richText',
              admin: {
                description:
                  'Credits & attribution. One source, two renderings: the HTML page at /credits (clickable links) and plaintext at /humans.txt. Keep required attributions (e.g. Logo.dev, licensed fonts) as real links.',
              },
            },
            {
              name: 'blogNewsletter',
              type: 'group',
              admin: {
                description:
                  'Loops configuration for the newsletter CTA in the blog sidebar (copy is hardcoded)',
              },
              fields: [
                {
                  name: 'loopsListIds',
                  type: 'array',
                  admin: {
                    description:
                      'Loops mailing lists for blog subscribers. Copy list IDs from Loops → Mailing Lists.',
                  },
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      admin: { description: 'Internal label for your reference' },
                    },
                    {
                      name: 'listId',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'cacheManagement',
              type: 'ui',
              admin: {
                components: {
                  Field: '@/components/admin/RevalidateAllButton#RevalidateAllButton',
                },
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
                ctaField({ name: 'link' }),
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
        },
        {
          label: 'SEO',
          description:
            'Site-wide SEO defaults. Per-page overrides (on individual Pages, Posts, Solutions) take precedence over these values.',
          fields: [
            {
              name: 'defaultTitle',
              type: 'text',
              required: true,
              defaultValue: 'ELLA | Practice Systematization for Trusted Advisors',
              admin: {
                description:
                  'Fallback page title used when a page has no meta.title of its own. 50–60 chars ideal.',
              },
            },
            {
              name: 'titleTemplate',
              type: 'text',
              defaultValue: '%s | ELLA',
              admin: {
                description:
                  'Template applied to per-page titles. %s is replaced with the page title. Leave the %s placeholder — remove only if you want page titles shown exactly as entered.',
              },
            },
            {
              name: 'defaultDescription',
              type: 'textarea',
              required: true,
              defaultValue:
                'ELLA turns trust into action with tools built for advisor-led transitions. Go from intake to insight in a fraction of the time.',
              admin: {
                description:
                  'Fallback meta description used when a page has no meta.description. 150–160 chars ideal.',
              },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Default Open Graph image for pages without a per-page meta.image (1200×630px recommended).',
              },
            },
            {
              name: 'twitterHandle',
              type: 'text',
              admin: {
                description:
                  'Twitter/X handle for twitter:site and twitter:creator (include the @, e.g. @withella). Optional.',
              },
            },
            {
              name: 'organizationSchema',
              type: 'group',
              admin: {
                description:
                  'Fields used to emit JSON-LD Organization structured data sitewide. Leave blank to omit fields from the schema.',
              },
              fields: [
                {
                  name: 'legalName',
                  type: 'text',
                  admin: {
                    description: 'Full legal name if different from siteName (e.g. "ELLA, Inc.")',
                  },
                },
                {
                  name: 'foundingDate',
                  type: 'text',
                  admin: {
                    description: 'ISO date or year (e.g. "2024" or "2024-06-01").',
                  },
                },
                {
                  name: 'sameAs',
                  type: 'array',
                  admin: {
                    description:
                      'Additional canonical URLs for this organization (e.g. Crunchbase, Wikipedia). Socials from the General tab are merged in automatically.',
                  },
                  fields: [
                    {
                      name: 'url',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
