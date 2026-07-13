'use client'

import { useCallback, useEffect, useRef } from 'react'

// Pixels of pull before it commits to full reveal. Below this, releasing snaps back.
// Lower = easier to trigger, higher = more intentional. Range: 30–120
const PULL_THRESHOLD = 100

// Multiplier on scroll delta. 0.35 = 100px scroll moves content 35px.
// Lower = heavier/slower feel, higher = lighter/more responsive. Range: 0.1–1.0
const RESISTANCE = 0.35

// Pixel tolerance for "at bottom" detection. Accounts for sub-pixel rounding.
const BOTTOM_BUFFER = 5

// Ms of no scroll input before a partial pull snaps back.
// Lower = snappier reset, higher = more forgiving for slow scrollers. Range: 100–300
const WHEEL_END_DELAY = 150

// Ms user must rest at the bottom before pull becomes available.
// Primary guard against accidental triggers from momentum scrolling.
// Lower = easier to discover, higher = more hidden. Range: 400–1500
const ARM_DWELL_MS = 1000

type Phase = 'idle' | 'armed' | 'pulling' | 'revealed'

export function PullToRevealWrapper({
  children,
  backgroundUrl,
  text,
  height = 400,
  enabled = false,
}: {
  children: React.ReactNode
  backgroundUrl?: string | null
  text: string
  height?: number
  enabled?: boolean
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const easterEggRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const phase = useRef<Phase>('idle')
  const pull = useRef(0)
  const startY = useRef(0)
  const animFrame = useRef(0)
  const wheelEndTimer = useRef<ReturnType<typeof setTimeout>>(null)
  const armTimer = useRef<ReturnType<typeof setTimeout>>(null)
  const imageLoaded = useRef(false)

  const isAtBottom = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    return scrollHeight - scrollTop - clientHeight < BOTTOM_BUFFER
  }, [])

  const applyPull = useCallback((value: number) => {
    pull.current = value
    if (contentRef.current) {
      contentRef.current.style.transform = value > 0 ? `translateY(-${value}px)` : ''
      contentRef.current.style.willChange = value > 0 ? 'transform' : ''
    }
  }, [])

  const cancelAnim = useCallback(() => {
    cancelAnimationFrame(animFrame.current)
    animFrame.current = 0
  }, [])

  const animateTo = useCallback(
    (target: number, duration: number, onDone?: () => void) => {
      cancelAnim()
      const start = pull.current
      const startTime = performance.now()

      function step(now: number) {
        // Bail if phase changed (user took manual control)
        if (animFrame.current === 0) return

        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - (1 - progress) ** 3
        const value = start + (target - start) * eased
        applyPull(value)
        if (progress < 1) {
          animFrame.current = requestAnimationFrame(step)
        } else {
          animFrame.current = 0
          onDone?.()
        }
      }
      animFrame.current = requestAnimationFrame(step)
    },
    [cancelAnim, applyPull],
  )

  const setOverscrollBehavior = useCallback((value: string) => {
    document.documentElement.style.overscrollBehaviorY = value
  }, [])

  const enterActivePhase = useCallback(() => {
    setOverscrollBehavior('none')
    if (easterEggRef.current) {
      easterEggRef.current.removeAttribute('aria-hidden')
    }
  }, [setOverscrollBehavior])

  const exitActivePhase = useCallback(() => {
    setOverscrollBehavior('')
    if (easterEggRef.current) {
      easterEggRef.current.setAttribute('aria-hidden', 'true')
    }
  }, [setOverscrollBehavior])

  const resetToIdle = useCallback(() => {
    cancelAnim()
    applyPull(0)
    phase.current = 'idle'
    exitActivePhase()
  }, [cancelAnim, applyPull, exitActivePhase])

  const snapBack = useCallback(() => {
    animateTo(0, 300, () => {
      phase.current = 'idle'
      exitActivePhase()
    })
  }, [animateTo, exitActivePhase])

  // Lazy-load the background image only when user nears the bottom
  const loadBgImage = useCallback(() => {
    if (imageLoaded.current || !backgroundUrl || !bgRef.current) return
    imageLoaded.current = true
    // Quote the URL so literal parens/spaces in Payload filenames don't
    // break the CSS url() syntax and silently drop the image.
    bgRef.current.style.backgroundImage = `url("${backgroundUrl}")`
  }, [backgroundUrl])

  // Defer all event listeners until after initial page load is complete
  useEffect(() => {
    if (!enabled) return

    let cleanupFn: (() => void) | undefined

    function attachListeners() {
      function clearArmTimer() {
        if (armTimer.current) {
          clearTimeout(armTimer.current)
          armTimer.current = null
        }
      }

      function onScroll() {
        // Preload background image when user is near the bottom
        if (!imageLoaded.current) {
          const { scrollTop, scrollHeight, clientHeight } = document.documentElement
          if (scrollHeight - scrollTop - clientHeight < clientHeight * 0.5) {
            loadBgImage()
          }
        }

        if (phase.current === 'idle' && isAtBottom()) {
          // Start dwell timer — only arm after user has rested at bottom
          if (!armTimer.current) {
            armTimer.current = setTimeout(() => {
              armTimer.current = null
              if (isAtBottom() && phase.current === 'idle') {
                phase.current = 'armed'
              }
            }, ARM_DWELL_MS)
          }
        }
        if (phase.current === 'idle' && !isAtBottom()) {
          // Scrolled away from bottom — cancel dwell timer
          clearArmTimer()
        }
        if (phase.current === 'armed' && !isAtBottom()) {
          phase.current = 'idle'
        }
      }

      function clearWheelEndTimer() {
        if (wheelEndTimer.current) {
          clearTimeout(wheelEndTimer.current)
          wheelEndTimer.current = null
        }
      }

      function startWheelEndTimer() {
        clearWheelEndTimer()
        wheelEndTimer.current = setTimeout(() => {
          if (phase.current === 'pulling' && pull.current < PULL_THRESHOLD) {
            snapBack()
          }
        }, WHEEL_END_DELAY)
      }

      function onWheel(e: WheelEvent) {
        const p = phase.current

        // Only start pulling from armed state (requires dwell at bottom)
        if (p === 'armed' && e.deltaY > 0 && isAtBottom()) {
          // Armed — start pulling
          e.preventDefault()
          cancelAnim()
          enterActivePhase()
          phase.current = 'pulling'
          const dist = Math.min(e.deltaY * RESISTANCE, height)
          applyPull(dist)
          startWheelEndTimer()
          return
        }

        if (p === 'pulling') {
          e.preventDefault()
          cancelAnim()
          if (e.deltaY > 0) {
            const dist = Math.min(pull.current + e.deltaY * RESISTANCE, height)
            applyPull(dist)
            if (dist >= PULL_THRESHOLD) {
              clearWheelEndTimer()
              phase.current = 'revealed'
              animateTo(height, 400)
            } else {
              startWheelEndTimer()
            }
          } else {
            const dist = Math.max(pull.current + e.deltaY * RESISTANCE, 0)
            applyPull(dist)
            if (dist <= 0) {
              clearWheelEndTimer()
              resetToIdle()
            } else {
              startWheelEndTimer()
            }
          }
          return
        }

        if (p === 'revealed' && e.deltaY < 0) {
          e.preventDefault()
          cancelAnim()
          const dist = Math.max(pull.current + e.deltaY * RESISTANCE, 0)
          applyPull(dist)
          if (dist <= 0) {
            resetToIdle()
          }
        }
      }

      function onTouchStart(e: TouchEvent) {
        startY.current = e.touches[0].clientY
      }

      function onTouchMove(e: TouchEvent) {
        const p = phase.current
        const currentY = e.touches[0].clientY
        const deltaY = startY.current - currentY
        startY.current = currentY

        if (p === 'armed' && deltaY > 5 && isAtBottom()) {
          e.preventDefault()
          cancelAnim()
          enterActivePhase()
          phase.current = 'pulling'
          applyPull(Math.min(deltaY * RESISTANCE, height))
          return
        }

        if (p === 'pulling' || p === 'revealed') {
          e.preventDefault()
          cancelAnim()
          if (deltaY > 0) {
            const dist = Math.min(pull.current + deltaY * RESISTANCE, height)
            applyPull(dist)
            if (p === 'pulling' && dist >= PULL_THRESHOLD) {
              phase.current = 'revealed'
              animateTo(height, 400)
            }
          } else {
            const dist = Math.max(pull.current + deltaY * RESISTANCE, 0)
            applyPull(dist)
            if (dist <= 0) {
              resetToIdle()
            }
          }
        }
      }

      function onTouchEnd() {
        const p = phase.current
        if (p === 'pulling') {
          if (pull.current < PULL_THRESHOLD) {
            snapBack()
          } else {
            phase.current = 'revealed'
            animateTo(height, 400)
          }
        }
        if (p === 'revealed' && pull.current < height * 0.5) {
          snapBack()
        }
      }

      function onKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape' && (phase.current === 'revealed' || phase.current === 'pulling')) {
          snapBack()
        }
      }

      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('wheel', onWheel, { passive: false })
      window.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: false })
      window.addEventListener('touchend', onTouchEnd, { passive: true })
      window.addEventListener('keydown', onKeyDown)

      // Run once synchronously — if the user has already scrolled into range
      // before listeners attached (e.g. deep-linked, or idle callback deferred
      // past the scroll), no scroll event will fire to trigger image preload.
      onScroll()

      return () => {
        cancelAnim()
        clearWheelEndTimer()
        clearArmTimer()
        setOverscrollBehavior('')
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('wheel', onWheel)
        window.removeEventListener('touchstart', onTouchStart)
        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('touchend', onTouchEnd)
        window.removeEventListener('keydown', onKeyDown)
      }
    }

    // Respect prefers-reduced-motion: this interaction hijacks native scrolling
    // and animates a transform, so when reduced motion is requested we attach
    // nothing and leave the page scrolling normally. Not motion/react-driven,
    // so the global MotionConfig can't cover it — guard it explicitly here.
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let idleId: number | undefined
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined

    function scheduleAttach() {
      if (reduceMotionQuery.matches) return
      // Wait for the page to be fully idle before attaching scroll listeners
      if ('requestIdleCallback' in window) {
        idleId = requestIdleCallback(() => {
          cleanupFn = attachListeners()
        })
      } else {
        // Fallback for Safari
        fallbackTimer = setTimeout(() => {
          cleanupFn = attachListeners()
        }, 2000)
      }
    }

    function teardownAttach() {
      if (idleId !== undefined) {
        cancelIdleCallback(idleId)
        idleId = undefined
      }
      if (fallbackTimer !== undefined) {
        clearTimeout(fallbackTimer)
        fallbackTimer = undefined
      }
      cleanupFn?.()
      cleanupFn = undefined
    }

    // Re-evaluate if the user toggles the OS preference mid-session.
    function onReduceMotionChange() {
      teardownAttach()
      scheduleAttach()
    }

    scheduleAttach()
    reduceMotionQuery.addEventListener('change', onReduceMotionChange)

    return () => {
      reduceMotionQuery.removeEventListener('change', onReduceMotionChange)
      teardownAttach()
    }
  }, [
    enabled,
    height,
    isAtBottom,
    applyPull,
    cancelAnim,
    animateTo,
    resetToIdle,
    snapBack,
    enterActivePhase,
    setOverscrollBehavior,
    loadBgImage,
  ])

  // oxlint-disable-next-line jsx-no-new-object-as-prop
  const easterEggStyle = { height: `${height}px` }

  return (
    <>
      {enabled ? (
        <div
          ref={easterEggRef}
          data-theme="brand-black"
          className="bg-theme-bg fixed inset-x-0 bottom-0 -z-10 flex items-center justify-center overflow-hidden"
          style={easterEggStyle}
          aria-hidden="true"
        >
          {/* Background: starts empty, image set lazily via loadBgImage */}
          <div ref={bgRef} className="absolute inset-0 bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/30" />
          <p className="text-sandstone-100 relative z-10 px-8 text-center font-serif text-4xl leading-tight italic sm:text-5xl md:text-6xl lg:text-7xl">
            {text}
          </p>
        </div>
      ) : null}

      <div ref={contentRef} className="bg-sandstone-50 relative z-0 min-h-screen">
        {children}
      </div>
    </>
  )
}
