'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Wraps an overflow image container and applies rounded top corners by default.
 * Only removes the top-right radius if the image is detected to reach or exceed
 * the nearest clipping ancestor (marked with data-clip-boundary).
 */
export function AdaptiveRadiusImage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [rounded, setRounded] = useState(true)

  const check = useCallback(() => {
    const el = ref.current
    if (!el) return

    const img = el.querySelector('img')
    if (!img) return

    const boundary = el.closest('[data-clip-boundary]')
    if (!boundary) return

    const boundaryRight = boundary.getBoundingClientRect().right

    // For fill images, the img stretches to the container (w-screen),
    // so check the container's right edge against the boundary
    const isFill = img.style.position === 'absolute' && img.style.width === '100%'
    if (isFill) {
      setRounded(el.getBoundingClientRect().right <= boundaryRight + 4)
      return
    }

    // For natural-dimension images, compute content width from aspect ratio
    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
      const elLeft = el.getBoundingClientRect().left
      const contentWidth = el.clientHeight * (img.naturalWidth / img.naturalHeight)
      const contentRight = elLeft + contentWidth
      setRounded(contentRight < boundaryRight - 4)
    }
  }, [])

  useEffect(() => {
    const frame = requestAnimationFrame(check)

    const img = ref.current?.querySelector('img')
    img?.addEventListener('load', check)

    const observer = new ResizeObserver(check)
    if (ref.current) observer.observe(ref.current)

    return () => {
      cancelAnimationFrame(frame)
      img?.removeEventListener('load', check)
      observer.disconnect()
    }
  }, [check])

  return (
    <div
      ref={ref}
      className={`absolute inset-y-0 left-0 flex w-screen overflow-hidden ${rounded ? '[&_img]:rounded-t-lg' : '[&_img]:rounded-tl-lg'}`}
    >
      {children}
    </div>
  )
}
