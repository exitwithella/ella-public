import type { Block } from 'payload'

import { bgStyleField } from '../fields/bgStyle'

export const SolutionsSelectorBlock: Block = {
  slug: 'solutions-selector',
  labels: {
    singular: 'Solutions Selector',
    plural: 'Solutions Selectors',
  },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
    },
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'solutions',
      type: 'relationship',
      relationTo: 'solutions',
      hasMany: true,
    },
    bgStyleField,
  ],
}
