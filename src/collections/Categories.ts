import type { CollectionConfig } from 'payload'

import { createRevalidateHook } from '../hooks/revalidate-cache'

export const Categories: CollectionConfig = {
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [createRevalidateHook('categories')],
  },
  admin: {
    defaultColumns: ['title', 'slug', 'sortOrder'],
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
      name: 'internalLabel',
      type: 'text',
      admin: {
        description: 'Internal name used in admin UI (optional, defaults to title)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'pathPrefix',
      type: 'text',
      admin: {
        description:
          'URL prefix for posts in this category (e.g. "changelog" → /blog/changelog/[slug]). Leave empty for flat /blog/[slug] URLs.',
      },
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
  slug: 'categories',
}
