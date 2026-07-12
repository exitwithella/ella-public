import type { CollectionConfig } from 'payload'

import { createDeleteRevalidateHook, createRevalidateHook } from '../hooks/revalidate-cache'

export const Testimonials: CollectionConfig = {
  access: {
    read: () => true,
  },
  hooks: {
    // Embedded via TestimonialBlock / FeatureDeepDive into pages and solutions.
    afterChange: [createRevalidateHook('pages', 'solutions')],
    afterDelete: [createDeleteRevalidateHook('pages', 'solutions')],
  },
  admin: {
    defaultColumns: ['name', 'title', 'approved'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: "Advisor's full name",
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Job title, e.g. "Certified Exit Planning Advisor"',
      },
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'metrics',
      type: 'group',
      admin: {
        description: 'Optional quantitative result to highlight alongside the quote',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          admin: {
            description: 'e.g. "3x" or "40%"',
          },
        },
        {
          name: 'label',
          type: 'text',
          admin: {
            description: 'e.g. "more clients served"',
          },
        },
      ],
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Only approved testimonials appear on the site',
      },
    },
    {
      name: 'disciplines',
      type: 'relationship',
      relationTo: 'disciplines',
      hasMany: true,
      admin: {
        description: 'Tag by discipline to allow targeted display',
      },
    },
  ],
  slug: 'testimonials',
}
