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
      name: 'headlineAnimation',
      type: 'select',
      defaultValue: 'word-by-word',
      options: [
        { label: 'Word by Word', value: 'word-by-word' },
        { label: 'Blur Fade', value: 'blur-fade' },
      ],
      admin: {
        description: 'Animation style for the main headline.',
        width: '50%',
      },
    },
    {
      name: 'headlineLine2',
      type: 'text',
      admin: {
        description:
          'Optional second headline line. Renders below the main headline with its own animation.',
      },
    },
    {
      name: 'headlineAnimation2',
      type: 'select',
      defaultValue: 'blur-fade',
      options: [
        { label: 'Word by Word', value: 'word-by-word' },
        { label: 'Blur Fade', value: 'blur-fade' },
      ],
      admin: {
        description: 'Animation style for the second headline line.',
        width: '50%',
        condition: (_, siblingData) => Boolean(siblingData?.headlineLine2),
      },
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
