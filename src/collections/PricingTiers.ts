import type { CollectionConfig } from 'payload'

export const PricingTiers: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['name', 'price', 'highlighted', 'sortOrder'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Free", "Practitioner", "Vanguard"',
      },
    },
    {
      name: 'price',
      type: 'group',
      fields: [
        {
          name: 'amount',
          type: 'number',
          admin: {
            description: 'Monthly price in cents (e.g. 9900 = $99). 0 = Free.',
          },
        },
        {
          name: 'period',
          type: 'select',
          defaultValue: 'month',
          options: [
            { label: 'Per month', value: 'month' },
            { label: 'Per year', value: 'year' },
            { label: 'One-time', value: 'one-time' },
            { label: 'Custom', value: 'custom' },
          ],
        },
        {
          name: 'customLabel',
          type: 'text',
          admin: {
            description: 'Override price display (e.g. "Contact us")',
            condition: (_, siblingData) => siblingData.period === 'custom',
          },
        },
      ],
    },
    {
      name: 'tagline',
      type: 'text',
      admin: {
        description: 'Short descriptor shown under the tier name',
      },
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
        {
          name: 'included',
          type: 'select',
          defaultValue: 'yes',
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
            { label: 'Limited', value: 'limited' },
            { label: 'Add-on', value: 'addon' },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Get Started',
        },
        {
          name: 'href',
          type: 'text',
        },
      ],
    },
    {
      name: 'highlighted',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this tier as the recommended/featured option',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
  ],
  slug: 'pricing-tiers',
}
