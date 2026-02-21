import type { Block } from 'payload'

export const ContentBlock: Block = {
  fields: [
    {
      name: 'content',
      type: 'richText',
    },
  ],
  slug: 'content',
}
