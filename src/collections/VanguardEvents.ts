import type { CollectionConfig } from 'payload'

export const VanguardEvents: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['title', 'date', 'status', 'capacity'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'select',
          defaultValue: 'virtual',
          options: [
            { label: 'Virtual', value: 'virtual' },
            { label: 'In-Person', value: 'in-person' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
        },
        {
          name: 'address',
          type: 'text',
          admin: {
            description: 'Physical address for in-person or hybrid events',
            condition: (_, siblingData) => siblingData?.type !== 'virtual',
          },
        },
        {
          name: 'city',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type !== 'virtual',
          },
        },
        {
          name: 'platform',
          type: 'text',
          admin: {
            description: 'e.g. "Zoom" or "Hopin" for virtual events',
            condition: (_, siblingData) => siblingData?.type !== 'in-person',
          },
        },
      ],
    },
    {
      name: 'registrationUrl',
      type: 'text',
      admin: {
        description: 'External registration link',
      },
    },
    {
      name: 'capacity',
      type: 'number',
      admin: {
        description: 'Maximum attendees (leave blank for unlimited)',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'upcoming',
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Registration Open', value: 'registration-open' },
        { label: 'Sold Out', value: 'sold-out' },
        { label: 'Completed', value: 'completed' },
        { label: 'Canceled', value: 'canceled' },
      ],
    },
    {
      name: 'vanguardOnly',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Restrict registration to Vanguard tier members',
      },
    },
  ],
  slug: 'vanguard-events',
}
