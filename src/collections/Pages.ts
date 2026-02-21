import type { CollectionConfig } from 'payload'

import {
  HeroBlock,
  ContentBlock,
  FeatureGridBlock,
  TestimonialsBlock,
  CTABlock,
  FormEmbedBlock,
} from '../blocks'

export const Pages: CollectionConfig = {
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
      name: 'metaDescription',
      type: 'textarea',
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        ContentBlock,
        FeatureGridBlock,
        TestimonialsBlock,
        CTABlock,
        FormEmbedBlock,
      ],
    },
  ],
  slug: 'pages',
}
