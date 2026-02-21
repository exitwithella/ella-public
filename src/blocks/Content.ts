import type { Block } from 'payload'

export const ContentBlock: Block = {
  slug: 'content',
  fields: [
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
