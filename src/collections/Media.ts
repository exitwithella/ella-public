import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['filename', 'alt', 'category'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'credit',
      type: 'text',
      admin: {
        description: 'Photographer or source credit',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Product Screenshot', value: 'product' },
        { label: 'Portrait / Headshot', value: 'portrait' },
        { label: 'Logo', value: 'logo' },
        { label: 'Icon', value: 'icon' },
        { label: 'Illustration', value: 'illustration' },
        { label: 'Background', value: 'background' },
        { label: 'Document', value: 'document' },
        { label: 'Other', value: 'other' },
      ],
    },
  ],
  slug: 'media',
  upload: {
    // These are not supported on Workers yet due to lack of sharp
    crop: false,
    focalPoint: false,
  },
}
