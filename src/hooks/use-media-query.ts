'use client'

import { useCallback, useSyncExternalStore } from 'react'

/**
 * Subscribe to a CSS media query. State updates only when the query result
 * flips (not on every resize pixel), and `useSyncExternalStore` keeps SSR +
 * hydration consistent: the server snapshot renders first, then React
 * re-renders once with the real value after hydration.
 *
 * @param serverFallback - value rendered on the server and during hydration
 */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverFallback,
  )
}

/**
 * True below the given breakpoint (default 768px). Defaults to desktop during
 * SSR/hydration — mobile devices flash the desktop layout for one frame at
 * most, while desktop (the common crawl/first-paint case) is stable.
 */
export function useIsMobile(breakpoint = 768): boolean {
  return !useMediaQuery(`(min-width: ${breakpoint}px)`, true)
}
