import type { CollectionConfig } from 'payload'

import { clerkStrategy } from '../auth/clerkStrategy'

export const Users: CollectionConfig = {
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    strategies: [clerkStrategy],
  },
  fields: [
    {
      name: 'clerkId',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
  slug: 'users',
}
