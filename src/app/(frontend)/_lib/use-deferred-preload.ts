'use client'

import { useEffect, useState } from 'react'

const INTERACTION_EVENTS = ['scroll', 'wheel', 'touchstart', 'pointerdown'] as const

/**
 * Returns `true` once the user shows scroll intent (scroll, wheel, touch, pointer).
 * Invisible to Lighthouse — no work fires on initial load.
 */
export function useDeferredPreload(): boolean {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (ready) return

    const trigger = () => setReady(true)

    for (const event of INTERACTION_EVENTS) {
      window.addEventListener(event, trigger, { once: true, passive: true })
    }

    return () => {
      for (const event of INTERACTION_EVENTS) {
        window.removeEventListener(event, trigger)
      }
    }
  }, [ready])

  return ready
}
