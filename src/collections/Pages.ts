import type { CollectionConfig } from 'payload'

import {
  AdvisorPersonasBlock,
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
  ProductFeaturesBlock,
  SqueezeSectionBlock,
  DilemmaSectionBlock,
  ValuesGridBlock,
  FeatureShowcaseBlock,
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
    {
      name: 'pageBackground',
      type: 'group',
      admin: {
        description: 'Optional decorative background image positioned absolutely on the page.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description:
              'Background image (SVG or raster). Rendered at low opacity as a watermark.',
          },
        },
        {
          name: 'opacity',
          type: 'number',
          defaultValue: 3,
          min: 1,
          max: 100,
          admin: {
            description: 'Opacity percentage (1–100). Default: 3.',
            width: '25%',
            condition: (_, siblingData) => Boolean(siblingData?.image),
          },
        },
        {
          name: 'top',
          type: 'text',
          admin: {
            description: 'CSS top value (e.g., "-5%", "100px", "0"). Default: "0".',
            width: '25%',
            condition: (_, siblingData) => Boolean(siblingData?.image),
          },
        },
        {
          name: 'right',
          type: 'text',
          admin: {
            description: 'CSS right value (e.g., "-10%", "2rem"). Default: "0".',
            width: '25%',
            condition: (_, siblingData) => Boolean(siblingData?.image),
          },
        },
        {
          name: 'width',
          type: 'text',
          admin: {
            description: 'CSS width (e.g., "800px", "50vw", "60%"). Default: auto.',
            width: '25%',
            condition: (_, siblingData) => Boolean(siblingData?.image),
          },
        },
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
        ProductFeaturesBlock,
        SqueezeSectionBlock,
        DilemmaSectionBlock,
        AdvisorPersonasBlock,
        ValuesGridBlock,
        FeatureShowcaseBlock,
      ],
    },
    metaField,
  ],
  slug: 'pages',
}
