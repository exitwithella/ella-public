import type { CollectionConfig } from 'payload'

export const Tools: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['title', 'status', 'pricingTier'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'toolUrl',
      type: 'text',
      admin: {
        description: 'Deep link to this tool within the ELLA app',
      },
    },
    {
      name: 'disciplines',
      type: 'relationship',
      relationTo: 'disciplines',
      hasMany: true,
    },
    {
      name: 'pricingTier',
      type: 'relationship',
      relationTo: 'pricing-tiers',
      admin: {
        description: 'Minimum tier required to access this tool',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Coming Soon', value: 'coming-soon' },
        { label: 'Beta', value: 'beta' },
      ],
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  slug: 'tools',
}
