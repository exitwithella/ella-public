import type { GroupField } from 'payload'

export const heroField: GroupField = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'subheadline',
      type: 'textarea',
    },
    {
      name: 'primaryCta',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'href',
          type: 'text',
        },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'href',
          type: 'text',
        },
      ],
    },
    {
      name: 'visual',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Centered', value: 'centered' },
        { label: 'Split', value: 'split' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    {
      name: 'highlightText',
      type: 'text',
      admin: {
        description:
          'Substring of the headline to render in accent color. Leave empty for no highlight.',
      },
    },
    {
      name: 'highlightColor',
      type: 'select',
      defaultValue: 'goldenrod',
      admin: {
        description: 'Color applied to the highlighted headline substring.',
      },
      options: [
        { label: 'Goldenrod', value: 'goldenrod' },
        { label: 'Moss', value: 'moss' },
        { label: 'Coral', value: 'coral' },
        { label: 'Ocean', value: 'ocean' },
      ],
    },
  ],
}
