'use client'

import { ClerkProvider } from '@clerk/nextjs'
import type { ReactNode } from 'react'

export default function ClerkProviderWrapper({ children }: { children: ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>
}
