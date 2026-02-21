import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
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
      name: 'publishedDate',
      type: 'date',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'metaDescription',
      type: 'textarea',
    },
    {
      name: 'videoEmbed',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
  slug: 'posts',
}
