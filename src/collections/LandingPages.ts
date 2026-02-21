import type { CollectionConfig } from 'payload'

import {
  HeroBlock,
  ContentBlock,
  FeatureGridBlock,
  TestimonialsBlock,
  CTABlock,
  FormEmbedBlock,
} from '../blocks'

export const LandingPages: CollectionConfig = {
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
      name: 'campaign',
      type: 'text',
      admin: {
        description:
          'Campaign or event this landing page is associated with (e.g., "EPI Summit 2025")',
      },
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
  slug: 'landing-pages',
}
