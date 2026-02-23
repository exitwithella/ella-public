import type { GroupField } from 'payload'

export const metaField: GroupField = {
  name: 'meta',
  type: 'group',
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Overrides page title in search results and browser tabs. 50–60 chars ideal.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Summary shown in search results. 150–160 chars ideal.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Open Graph image for social sharing. 1200×630px recommended.',
      },
    },
  ],
}
