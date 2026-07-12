import type { CollectionConfig } from 'payload'

import { publishedOrAuthed } from '../access/publishedOrAuthed'
import { metaField } from '../fields/meta'
import { createIndexNowHook } from '../hooks/notify-indexnow'
import { createRevalidateHook } from '../hooks/revalidate-cache'

export const Posts: CollectionConfig = {
  access: {
    read: publishedOrAuthed,
  },
  hooks: {
    afterChange: [
      createRevalidateHook('posts'),
      createIndexNowHook((doc) => {
        if (doc.status !== 'published') return null
        return `/blog/${doc.slug}`
      }),
    ],
  },
  admin: {
    defaultColumns: ['title', 'publishedDate', 'tier', 'status'],
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
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short summary used in blog cards and RSS feed (1-2 sentences)',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'team-members',
      filterOptions: {
        isAuthor: { equals: true },
      },
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
      name: 'disciplines',
      type: 'relationship',
      relationTo: 'disciplines',
      hasMany: true,
    },
    {
      name: 'tier',
      type: 'select',
      defaultValue: 'standard',
      admin: {
        description: 'Editorial tier for 3-tier blog layout (Ramp Velocity pattern)',
      },
      options: [
        { label: 'Hero (featured/lead)', value: 'hero' },
        { label: 'Featured', value: 'featured' },
        { label: 'Standard', value: 'standard' },
      ],
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      admin: {
        description: 'Manually curated related posts',
      },
    },
    {
      name: 'legacySlug',
      type: 'text',
      admin: {
        description: 'Original slug from exitwithella.io (used to generate 301 redirect)',
      },
    },
    {
      name: 'showNewsletterCTA',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show newsletter signup CTA at the end of this post',
      },
    },
    {
      name: 'content',
      type: 'richText',
    },
    metaField,
  ],
  slug: 'posts',
}
