import type { CollectionConfig } from 'payload'

import {
  CardGridBlock,
  ContentSectionBlock,
  CredibilityStripBlock,
  CTASectionBlock,
  FAQAccordionBlock,
  FeatureDeepDiveBlock,
  FormEmbedBlock,
  NewsletterCaptureBlock,
  NumberedStepsBlock,
  SolutionsSelectorBlock,
  TestimonialBlock,
  TrustSecurityBlock,
} from '../blocks'
import { heroField } from '../fields/hero'
import { metaField } from '../fields/meta'

export const LandingPages: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'campaign', 'status'],
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
      name: 'campaign',
      type: 'text',
      admin: {
        description:
          'Campaign or event this landing page is associated with (e.g., "EPI Summit 2025")',
      },
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
    heroField,
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        ContentSectionBlock,
        CardGridBlock,
        TestimonialBlock,
        CTASectionBlock,
        CredibilityStripBlock,
        FeatureDeepDiveBlock,
        TrustSecurityBlock,
        NumberedStepsBlock,
        SolutionsSelectorBlock,
        FAQAccordionBlock,
        NewsletterCaptureBlock,
        FormEmbedBlock,
      ],
    },
    metaField,
  ],
  slug: 'landing-pages',
}
