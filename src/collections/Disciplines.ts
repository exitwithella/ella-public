import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Disciplines: CollectionConfig = {
  access: {
    read: () => true,
    readVersions: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'slug', 'sortOrder'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-safe identifier, e.g. "exit-planning"',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first',
      },
    },
  ],
  slug: 'disciplines',
}
