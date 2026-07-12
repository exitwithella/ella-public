import type { CollectionConfig } from 'payload'

import { createDeleteRevalidateHook, createRevalidateHook } from '../hooks/revalidate-cache'

export const Partners: CollectionConfig = {
  access: {
    read: () => true,
  },
  hooks: {
    // Embedded via CredibilityStrip into pages (e.g. the homepage strip).
    afterChange: [createRevalidateHook('pages')],
    afterDelete: [createDeleteRevalidateHook('pages')],
  },
  admin: {
    defaultColumns: ['name', 'type', 'showOnHomepage'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Association', value: 'association' },
        { label: 'Technology Partner', value: 'technology' },
        { label: 'Certification Body', value: 'certification' },
        { label: 'Media', value: 'media' },
        { label: 'Integration', value: 'integration' },
      ],
    },
    {
      name: 'url',
      type: 'text',
    },
    {
      name: 'showOnHomepage',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
  ],
  slug: 'partners',
}
