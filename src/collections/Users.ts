import type { CollectionConfig } from 'payload'

import { clerkStrategy } from '../auth/clerkStrategy'

export const Users: CollectionConfig = {
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    strategies: [clerkStrategy],
    // MCP authenticates with a user API key. The v3 payload-mcp-api-keys
    // collection is gone; keys are recreated in admin after deploy.
    useAPIKey: true,
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
