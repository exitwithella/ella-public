import type { GlobalConfig } from 'payload'

import { iconField } from '@/fields/icon'

const indicatorOptions = [
  { label: 'Check', value: 'check' },
  { label: 'Cross', value: 'cross' },
  { label: 'Text', value: 'text' },
]

const tierColumnFields = () => [
  {
    name: 'indicator',
    type: 'select' as const,
    options: indicatorOptions,
    required: true,
    defaultValue: 'check',
    admin: { width: '50%' },
  },
  {
    name: 'displayText',
    type: 'text' as const,
    admin: {
      description: 'Shown when indicator is "Text" (e.g. "3", "Custom", "$25K annual min")',
      width: '50%',
      condition: (_: unknown, siblingData: Record<string, unknown>) =>
        siblingData.indicator === 'text',
    },
  },
]

const ctaFields = (label: string) => ({
  name: label,
  type: 'group' as const,
  fields: [
    { name: 'label', type: 'text' as const },
    { name: 'href', type: 'text' as const },
  ],
})

export const PricingPage: GlobalConfig = {
  access: {
    read: () => true,
  },
  slug: 'pricing-page',
  label: 'Pricing Page',
  admin: {
    group: 'Pages',
  },
  fields: [
    // ── Hero ──────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Hero Section',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'heroEyebrow',
          type: 'text',
          defaultValue: 'Pricing',
          admin: { description: 'Small label above the headline' },
        },
        {
          name: 'heroHeadline',
          type: 'text',
          defaultValue: 'Invest in your practice.',
          admin: { description: 'Main hero heading (H1)' },
        },
        {
          name: 'heroSubtitle',
          type: 'textarea',
          admin: { description: 'Paragraph below the headline' },
        },
        {
          name: 'trustBadges',
          type: 'array',
          label: 'Trust Badges',
          admin: { description: 'Small badges below the subtitle (e.g. "SOC 2 compliant")' },
          fields: [
            iconField({ name: 'icon', label: 'Icon' }),
            { name: 'text', type: 'text', required: true },
          ],
        },
      ],
    },

    // ── Shared Features ──────────────────────────────────
    {
      name: 'sharedFeatures',
      type: 'array',
      label: 'Shared Features (Included in Every Plan)',
      admin: {
        description: 'Features shown in the "Included in every plan" section above the tier cards',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },

    // ── Feature Comparison ───────────────────────────────
    {
      type: 'collapsible',
      label: 'Feature Comparison Table',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'comparisonEyebrow',
          type: 'text',
          defaultValue: 'Compare Plans',
        },
        {
          name: 'comparisonHeading',
          type: 'text',
          defaultValue: "Everything you need, nothing you don't.",
        },
        {
          name: 'categories',
          type: 'array',
          label: 'Categories',
          admin: {
            description: 'Categories and rows for the full feature comparison table',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                description: 'Category name (e.g. "Core Platform", "Security & Compliance")',
              },
            },
            {
              name: 'defaultOpen',
              type: 'checkbox',
              defaultValue: false,
              admin: { description: 'Whether this category is expanded by default' },
            },
            {
              name: 'rows',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: { description: 'Feature name shown in the left column' },
                },
                {
                  name: 'practitioner',
                  type: 'group',
                  label: 'Practitioner',
                  fields: tierColumnFields(),
                },
                {
                  name: 'enterprise',
                  type: 'group',
                  label: 'Enterprise',
                  fields: tierColumnFields(),
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Closer ───────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Closer Section',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'closerHeadline',
          type: 'text',
          defaultValue: 'Ready to systematize your practice?',
        },
        {
          name: 'closerSubtitle',
          type: 'text',
          defaultValue: 'Get started today. No credit card required.',
        },
        ctaFields('closerPrimaryCta'),
        ctaFields('closerSecondaryCta'),
        {
          name: 'closerFootnote',
          type: 'text',
          defaultValue: 'Annual billing saves the most. Cancel anytime.',
          admin: { description: 'Small text below the CTA buttons' },
        },
      ],
    },
  ],
}
