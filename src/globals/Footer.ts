import type { GlobalConfig } from 'payload'

import { bgStyleField } from '../fields/bgStyle'
import { linkFields } from '../fields/link'

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
    { ...bgStyleField, defaultValue: 'brand-black' },
    {
      name: 'logomark',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Logo mark shown in the top-left of the footer. Upload an SVG or PNG.',
      },
    },
    {
      name: 'footerLogo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Full logo displayed as a large watermark at the bottom of the footer. Upload an SVG or PNG.',
      },
    },
    {
      name: 'footerLogoColor',
      type: 'text',
      admin: {
        description:
          'CSS color for the watermark logo (e.g. "rgba(255,255,255,0.04)", "var(--color-moss-700)"). Leave blank for default theme text at 4% opacity.',
        width: '50%',
      },
    },
    {
      name: 'footerLogoOpacity',
      type: 'number',
      min: 0,
      max: 100,
      admin: {
        description:
          'Opacity of the watermark logo in percent (0-100). Only used when no custom color is set. Default: 4',
        width: '50%',
      },
    },
    {
      name: 'footerLogoClipPercent',
      type: 'number',
      defaultValue: 25,
      min: 0,
      max: 80,
      admin: {
        description:
          'Percentage of the watermark logo to clip off the bottom (0 = fully visible, 33 = bottom third hidden)',
        width: '50%',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'ELLA turns trust into action with tools built for advisor-led transitions.',
      admin: {
        description: 'Brief description shown in the footer left column beneath the logo',
      },
    },
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
            ...linkFields,
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
    {
      name: 'easterEgg',
      type: 'group',
      admin: {
        description: 'Hidden content revealed when users pull past the bottom of the page',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description:
              'Background image for the hidden section (e.g. American Dynamism illustration)',
          },
        },
        {
          name: 'text',
          type: 'text',
          defaultValue: 'Believe in Main Street',
          admin: {
            description: 'Large serif text displayed across the center of the image',
          },
        },
        {
          name: 'localImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Alternate background image shown to visitors in the Erie, PA area',
          },
        },
        {
          name: 'localText',
          type: 'text',
          admin: {
            description: 'Alternate text for local visitors (leave blank to use the default text)',
          },
        },
        {
          name: 'height',
          type: 'number',
          defaultValue: 400,
          min: 200,
          max: 600,
          admin: {
            description: 'Height of the hidden section in pixels',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'statusBadge',
      type: 'group',
      admin: {
        description: 'Optional status page embed (e.g. Instatus, BetterStack)',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'embedHtml',
          type: 'code',
          admin: {
            language: 'html',
            description: 'Paste your status page embed snippet HTML',
          },
        },
      ],
    },
  ],
}
