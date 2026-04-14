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
        description: 'e.g. "Practitioner", "Agency", "Enterprise"',
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
            description:
              'Annual baseline price in cents per user per month (e.g. 8000 = $80). 0 = Free.',
          },
        },
        {
          name: 'period',
          type: 'select',
          defaultValue: 'year',
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
            description: 'Override price display (e.g. "Custom")',
            condition: (_, siblingData) => siblingData.period === 'custom',
          },
        },
      ],
    },
    {
      name: 'pricePer',
      type: 'select',
      defaultValue: 'user',
      options: [
        { label: 'Per user', value: 'user' },
        { label: 'Flat rate', value: 'flat' },
      ],
      admin: {
        description: 'Whether this tier charges per user/seat or a flat monthly rate',
      },
    },
    {
      name: 'monthSurchargePercent',
      type: 'number',
      admin: {
        description:
          'Surcharge for monthly billing as a percentage (e.g. 25 = +25%). Leave blank for tiers without a toggle.',
      },
    },
    {
      name: 'quarterSurchargePercent',
      type: 'number',
      admin: {
        description:
          'Surcharge for quarterly billing as a percentage (e.g. 10 = +10%). Leave blank for tiers without a toggle.',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      admin: {
        description: 'Short descriptor shown under the tier name',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: '1-2 sentence plan description shown on the pricing card',
      },
    },
    {
      name: 'badge',
      type: 'text',
      admin: {
        description: "Optional badge text (e.g. 'Recommended')",
      },
    },
    {
      name: 'maxAdvisors',
      type: 'text',
      admin: {
        description: 'Max advisors allowed (e.g. "3", "20", "Custom")',
      },
    },
    {
      name: 'maxClients',
      type: 'text',
      admin: {
        description: 'Max clients allowed (e.g. "30", "Unlimited")',
      },
    },
    {
      name: 'collaboratorsPerClient',
      type: 'text',
      admin: {
        description: 'Collaborators per client (e.g. "20/client", "50/client", "Custom")',
      },
    },
    {
      name: 'featuresHeader',
      type: 'text',
      admin: {
        description:
          'Header above the feature list (e.g. "KEY FEATURES INCLUDE:" or "EVERYTHING IN PRACTITIONER, PLUS:")',
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
