import type { Block } from 'payload'

import { bgStyleField } from '../fields/bgStyle'
import { ctaField } from '../fields/cta'

export const TrustSecurityBlock: Block = {
  slug: 'trust-security',
  labels: {
    singular: 'Trust & Security',
    plural: 'Trust & Security Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Wrap words in *asterisks* to render them in italic.',
      },
    },
    {
      name: 'intro',
      type: 'richText',
    },
    ctaField({
      name: 'link',
      admin: {
        description: 'Optional CTA button displayed below the intro text.',
      },
    }),
    {
      name: 'sections',
      type: 'array',
      admin: {
        description: 'Items displayed in a 2-column grid to the right of the heading.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'body',
          type: 'textarea',
          admin: {
            description: 'Short description (1-2 sentences).',
          },
        },
      ],
    },
    {
      name: 'patternSvg',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Decorative SVG pattern displayed as the section background.',
      },
    },
    {
      name: 'patternColor',
      type: 'text',
      admin: {
        description:
          'CSS color for the SVG pattern fill (e.g. "var(--color-moss-300)", "#5A6B4A"). Leave blank to use the theme border color.',
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      admin: {
        description:
          'CSS color for the section/pattern background (e.g. "var(--color-sandstone-100)"). Leave blank to use the theme background.',
      },
    },
    {
      name: 'contentBackgroundColor',
      type: 'text',
      admin: {
        description:
          'CSS color for the content panel (e.g. "var(--color-sandstone-50)"). Leave blank to use the theme background.',
      },
    },
    bgStyleField,
  ],
}
