import type { CollectionConfig } from 'payload'

import { FAQ_CATEGORY_OPTIONS } from '../fields/options'
import { createDeleteRevalidateHook, createRevalidateHook } from '../hooks/revalidate-cache'

export const FAQItems: CollectionConfig = {
  access: {
    read: () => true,
  },
  hooks: {
    // Embedded via FAQAccordion into pages, and (showOnPricing) into the
    // pricing page's cached data.
    afterChange: [createRevalidateHook('pages', 'pricing')],
    afterDelete: [createDeleteRevalidateHook('pages', 'pricing')],
  },
  admin: {
    defaultColumns: ['question', 'category', 'showOnPricing'],
    useAsTitle: 'question',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: FAQ_CATEGORY_OPTIONS,
    },
    {
      name: 'showOnPricing',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Include in the FAQ section on the Pricing page',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
  ],
  slug: 'faq-items',
}
