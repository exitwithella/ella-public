import type { Block } from 'payload'

export const FormEmbedBlock: Block = {
  slug: 'formEmbed',
  fields: [
    {
      name: 'embedType',
      type: 'select',
      options: [
        { label: 'Typeform', value: 'typeform' },
        { label: 'Loops', value: 'loops' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    {
      name: 'formId',
      type: 'text',
    },
    {
      name: 'embedCode',
      type: 'code',
    },
  ],
}
