import type { CollectionConfig } from 'payload'

import {
  CardGridBlock,
  ContentSectionBlock,
  CTASectionBlock,
  FeatureDeepDiveBlock,
  FormEmbedBlock,
  NumberedStepsBlock,
  TestimonialBlock,
} from '../blocks'
import { heroField } from '../fields/hero'
import { metaField } from '../fields/meta'
import { createIndexNowHook } from '../hooks/notify-indexnow'
import { createRevalidateHook } from '../hooks/revalidate-cache'

export const Solutions: CollectionConfig = {
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      createRevalidateHook('solutions'),
      createIndexNowHook((doc) => {
        if (doc.status !== 'published') return null
        return `/solutions/${doc.slug}`
      }),
    ],
  },
  admin: {
    defaultColumns: ['title', 'discipline', 'status', 'isBeachhead'],
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
      name: 'discipline',
      type: 'relationship',
      relationTo: 'disciplines',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      admin: {
        description: 'Short descriptor shown in solution cards',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'waitlist',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Waitlist', value: 'waitlist' },
        { label: 'Coming Soon', value: 'coming-soon' },
      ],
    },
    {
      name: 'isBeachhead',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark as the primary beachhead use case (Exit Planning)',
      },
    },
    heroField,
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        ContentSectionBlock,
        CardGridBlock,
        TestimonialBlock,
        CTASectionBlock,
        FeatureDeepDiveBlock,
        NumberedStepsBlock,
        FormEmbedBlock,
      ],
    },
    metaField,
  ],
  slug: 'solutions',
}
