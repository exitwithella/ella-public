import type { Field } from 'payload'

/**
 * Reusable link field group that supports both internal page references
 * and external URLs. Use `resolveLink()` to get the href at render time.
 */
export const linkFields: Field[] = [
  {
    name: 'linkType',
    type: 'select',
    defaultValue: 'external',
    options: [
      { label: 'Internal page', value: 'internal' },
      { label: 'External URL', value: 'external' },
    ],
    admin: { width: '50%' },
  },
  {
    name: 'page',
    type: 'relationship',
    relationTo: ['pages', 'landing-pages', 'solutions'],
    admin: {
      condition: (_, siblingData) => siblingData?.linkType === 'internal',
      width: '50%',
    },
  },
  {
    name: 'href',
    type: 'text',
    admin: {
      condition: (_, siblingData) => siblingData?.linkType !== 'internal',
      width: '50%',
    },
  },
]
