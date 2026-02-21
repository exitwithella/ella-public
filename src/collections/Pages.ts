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
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
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
}
