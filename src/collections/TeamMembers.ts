import type { CollectionConfig } from 'payload'

import { createDeleteRevalidateHook, createRevalidateHook } from '../hooks/revalidate-cache'

export const TeamMembers: CollectionConfig = {
  access: {
    read: () => true,
  },
  hooks: {
    // Embedded as post authors, and surfaced on team/about pages.
    afterChange: [createRevalidateHook('pages', 'posts')],
    afterDelete: [createDeleteRevalidateHook('pages', 'posts')],
  },
  admin: {
    defaultColumns: ['name', 'role', 'isAuthor'],
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
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        description: 'Job title or role, e.g. "Co-Founder & CEO"',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio',
      type: 'richText',
    },
    {
      name: 'isAuthor',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check to allow this team member to be assigned as a blog post author',
      },
    },
    {
      name: 'linkedIn',
      type: 'text',
    },
    {
      name: 'twitter',
      type: 'text',
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
  ],
  slug: 'team-members',
}
