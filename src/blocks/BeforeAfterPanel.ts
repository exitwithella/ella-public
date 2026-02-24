import type { Block } from 'payload'

/**
 * BeforeAfterPanel — interactive comparison slider deferred from homepage Block 6.
 * Schema-only for P2.1. Frontend implementation is a fast-follow post-launch.
 */
export const BeforeAfterPanelBlock: Block = {
  slug: 'before-after-panel',
  dbName: 'bfr_aftr',
  labels: {
    singular: 'Before / After Panel',
    plural: 'Before / After Panels',
  },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      admin: {
        description: 'Eyebrow label above heading, e.g. "The ELLA Difference"',
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
      name: 'before',
      type: 'group',
      admin: {
        description: 'The "before" state — life without ELLA',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Without ELLA',
          admin: {
            description: 'Tab/panel label',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'caption',
          type: 'text',
        },
        {
          name: 'points',
          type: 'array',
          admin: {
            description: 'Pain points / friction items',
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
      name: 'after',
      type: 'group',
      admin: {
        description: 'The "after" state — life with ELLA',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'With ELLA',
          admin: {
            description: 'Tab/panel label',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'caption',
          type: 'text',
        },
        {
          name: 'points',
          type: 'array',
          admin: {
            description: 'Benefits / improvements',
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
  ],
}
