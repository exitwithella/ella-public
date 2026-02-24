import type { CollectionConfig } from 'payload'

import {
  BeforeAfterPanelBlock,
  BridgeSectionBlock,
  CardGridBlock,
  ComparisonTableBlock,
  ContentSectionBlock,
  CredibilityStripBlock,
  CTASectionBlock,
  FAQAccordionBlock,
  FeatureDeepDiveBlock,
  FormEmbedBlock,
  NewsletterCaptureBlock,
  NumberedStepsBlock,
  PricingJourneyBlock,
  SolutionsSelectorBlock,
  TestimonialBlock,
  TrustSecurityBlock,
} from '../blocks'
import { heroField } from '../fields/hero'
import { metaField } from '../fields/meta'

export const Pages: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'status', 'publishedDate'],
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
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'publishedDate',
      type: 'date',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        description: 'Parent page for breadcrumb and URL nesting',
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
        CredibilityStripBlock,
        FeatureDeepDiveBlock,
        ComparisonTableBlock,
        TrustSecurityBlock,
        NumberedStepsBlock,
        SolutionsSelectorBlock,
        FAQAccordionBlock,
        PricingJourneyBlock,
        NewsletterCaptureBlock,
        FormEmbedBlock,
        BeforeAfterPanelBlock,
        BridgeSectionBlock,
      ],
    },
    metaField,
  ],
  slug: 'pages',
}
