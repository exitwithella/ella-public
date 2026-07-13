'use client'

import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Applies `reducedMotion="user"` globally so every motion/react animation
 * honors the OS "reduce motion" preference — transitions collapse to instant
 * for users who request it. Raw-canvas and raw-scroll interactions (e.g.
 * tension-threads, pull-to-reveal) are outside motion/react and guard
 * themselves separately.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
