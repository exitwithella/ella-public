import type { Block } from 'payload'

import { bgStyleField } from '../fields/bgStyle'
import { IMAGE_FIT_OPTIONS, IMAGE_POSITION_OPTIONS } from '../fields/options'

export const ProductFeaturesBlock: Block = {
  slug: 'product-features',
  labels: {
    singular: 'Product Features',
    plural: 'Product Features',
  },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      admin: {
        description: 'Optional eyebrow label above the heading',
      },
    },
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 2,
      maxRows: 4,
      admin: {
        description: '2–4 feature tiers. Each item drives one scroll panel.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'screenshot',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'screenshotFit',
          type: 'select',
          defaultValue: 'contain',
          options: IMAGE_FIT_OPTIONS,
          admin: {
            description:
              'Contain: image shown in full. Crop: image fills the frame and may clip. Square: forced 1:1 with cropping.',
            width: '50%',
          },
        },
        {
          name: 'screenshotPosition',
          type: 'select',
          defaultValue: 'center',
          options: IMAGE_POSITION_OPTIONS,
          admin: {
            description: 'Focal point for cropping. Only applies when fit is Crop or Square.',
            width: '50%',
            condition: (_, siblingData) =>
              siblingData?.screenshotFit === 'crop' || siblingData?.screenshotFit === 'square',
          },
        },
        {
          name: 'badges',
          type: 'array',
          maxRows: 3,
          admin: {
            description: 'Short capability labels shown as pill badges (max 3)',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'showBottomBorder',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show the bottom border line on this section.',
      },
    },
    bgStyleField,
  ],
}
