'use client'

import type { MotionValue } from 'motion/react'
import { useRef, useEffect, useCallback } from 'react'

interface Thread {
  y: number
  baseAmplitude: number
  frequency: number
  phase: number
  thickness: number
  opacity: number
  snapProgress: number
  snapPoint: number
  hasSnapped: boolean
  snapThreshold: number
  recoilOffset: number
}

export function TensionThreads({ squeeze }: { squeeze: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const threadsRef = useRef<Thread[]>([])
  const animFrameRef = useRef<number>(0)
  const timeRef = useRef(0)
  const lastFrameTimeRef = useRef<number | null>(null)
  const isMobileRef = useRef(false)

  const initThreads = useCallback((height: number) => {
    const threads: Thread[] = []
    const count = 28
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1)
      threads.push({
        y: t * height,
        baseAmplitude: 2 + Math.random() * 6,
        frequency: 0.003 + Math.random() * 0.004,
        phase: Math.random() * Math.PI * 2,
        thickness: 0.5 + Math.random() * 1.5,
        opacity: 0.12 + Math.random() * 0.3,
        snapProgress: 0,
        snapPoint: 0.3 + Math.random() * 0.4,
        hasSnapped: false,
        snapThreshold: 0.35 + Math.random() * 0.5,
        recoilOffset: 0,
      })
    }
    threadsRef.current = threads
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Resolve theme tokens to RGB once (a palette change propagates; no per-frame
    // getComputedStyle). Paint each var into a 1px probe and read the pixel back —
    // canvas fillStyle keeps the oklch string, so getImageData is what yields RGB.
    const rootStyle = getComputedStyle(document.documentElement)
    const probe = document.createElement('canvas')
    probe.width = 1
    probe.height = 1
    const probeCtx = probe.getContext('2d', { willReadFrequently: true })
    const resolveRgb = (varName: string): [number, number, number] => {
      if (!probeCtx) return [0, 0, 0]
      probeCtx.clearRect(0, 0, 1, 1)
      probeCtx.fillStyle = rootStyle.getPropertyValue(varName).trim()
      probeCtx.fillRect(0, 0, 1, 1)
      const [r, g, b] = probeCtx.getImageData(0, 0, 1, 1).data
      return [r, g, b]
    }
    // Intact threads lerp from light → dark as tension rises; snapped ends sit between.
    const threadLight = resolveRgb('--color-sandstone-400')
    const threadDark = resolveRgb('--color-sandstone-600')
    const threadSnapped = resolveRgb('--color-sandstone-500')

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let running = false
    let visible = false

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      // Set (not accumulate) the DPR transform each resize
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      isMobileRef.current = rect.width < 768
      const threads = threadsRef.current
      if (threads.length === 0) {
        initThreads(rect.height)
      } else {
        // Redistribute existing threads across the new height so the canvas
        // bottom isn't left empty (or threads clipped) after a resize
        const count = threads.length
        for (let i = 0; i < count; i++) {
          threads[i].y = (i / (count - 1)) * rect.height
        }
      }
      // Repaint immediately so a resize while paused/reduced-motion isn't stale
      if (!running) renderThreads()
    }

    // Render the current thread state once at the current time (no advance).
    // Shared by the animation loop and the static reduced-motion/off-screen frame.
    const renderThreads = () => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      ctx.clearRect(0, 0, w, h)

      const currentSqueeze = squeeze.get()
      const threads = threadsRef.current

      for (const thread of threads) {
        const tension = Math.min(currentSqueeze * 1.5, 1)

        // Check if thread should snap
        if (!thread.hasSnapped && currentSqueeze > thread.snapThreshold) {
          thread.hasSnapped = true
          thread.snapProgress = 0
        }

        // Unsnap when squeeze decreases
        if (thread.hasSnapped && currentSqueeze < thread.snapThreshold * 0.7) {
          thread.hasSnapped = false
          thread.snapProgress = 0
          thread.recoilOffset = 0
        }

        if (thread.hasSnapped) {
          thread.snapProgress = Math.min(thread.snapProgress + 0.03, 1)
          thread.recoilOffset = Math.sin(thread.snapProgress * Math.PI) * 30

          const snapX = thread.snapPoint * w
          const snapAlpha = thread.opacity * (1 - thread.snapProgress * 0.6)
          const snapStroke = `rgba(${threadSnapped[0]}, ${threadSnapped[1]}, ${threadSnapped[2]}, ${snapAlpha})`

          // Snapped halves — warm gray (sandstone-500)
          // Left half
          ctx.beginPath()
          ctx.strokeStyle = snapStroke
          ctx.lineWidth = thread.thickness
          for (let x = 0; x <= snapX; x += 2) {
            const normalX = x / w
            const distFromSnap = 1 - normalX / thread.snapPoint
            const recoil = thread.recoilOffset * distFromSnap * distFromSnap
            const wave =
              Math.sin(x * thread.frequency + thread.phase + timeRef.current * 1.4) *
              thread.baseAmplitude *
              (1 + tension * 3) *
              distFromSnap
            const y = thread.y + wave - recoil
            if (x === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.stroke()

          // Right half
          ctx.beginPath()
          ctx.strokeStyle = snapStroke
          for (let x = snapX; x <= w; x += 2) {
            const normalX = (x - snapX) / (w - snapX)
            const distFromSnap = normalX
            const recoil = thread.recoilOffset * distFromSnap * distFromSnap
            const wave =
              Math.sin(x * thread.frequency + thread.phase + timeRef.current * 1.4) *
              thread.baseAmplitude *
              (1 + tension * 3) *
              distFromSnap
            const y = thread.y + wave + recoil
            if (x <= snapX) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.stroke()
        } else {
          // Intact threads: sandstone-400 (light warm) → sandstone-600 under tension
          ctx.beginPath()

          const r = Math.round(threadLight[0] + (threadDark[0] - threadLight[0]) * tension)
          const g = Math.round(threadLight[1] + (threadDark[1] - threadLight[1]) * tension)
          const b = Math.round(threadLight[2] + (threadDark[2] - threadLight[2]) * tension)
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${thread.opacity * (0.25 + tension * 0.75)})`
          ctx.lineWidth = thread.thickness * (1 - tension * 0.4)

          // Reduced multipliers on mobile for calmer animation
          // Base speed reduced by 30% across the board
          const isMobile = isMobileRef.current
          const squeezeMult = isMobile ? 2 : 8
          const freqMult = isMobile ? 0.5 : 3
          const timeMult = isMobile ? 0.7 : 2.8
          const harmonicMult = isMobile ? 0.5 : 2

          for (let x = 0; x <= w; x += 2) {
            const squeezeFactor = 1 + tension * squeezeMult
            const freqFactor = 1 + tension * freqMult
            const timeScale = 1 + tension * timeMult

            const wave =
              Math.sin(
                x * thread.frequency * freqFactor + thread.phase + timeRef.current * timeScale,
              ) *
              thread.baseAmplitude *
              squeezeFactor

            const harmonic =
              tension > 0.3
                ? Math.sin(
                    x * thread.frequency * freqFactor * 3 +
                      thread.phase * 2 +
                      timeRef.current * timeScale * 1.5,
                  ) *
                  thread.baseAmplitude *
                  tension *
                  harmonicMult
                : 0

            const y = thread.y + wave + harmonic

            if (x === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.stroke()
        }
      }
    }

    const draw = (timestamp: number) => {
      // Actual delta time, clamped to prevent large jumps after a pause
      const lastTime = lastFrameTimeRef.current ?? timestamp
      const rawDelta = (timestamp - lastTime) / 1000
      const delta = Math.min(rawDelta, 0.05) // Cap at 50ms to prevent spazzing
      lastFrameTimeRef.current = timestamp
      timeRef.current += delta

      renderThreads()
      animFrameRef.current = requestAnimationFrame(draw)
    }

    const start = () => {
      if (running) return
      running = true
      lastFrameTimeRef.current = null // Fresh delta baseline on resume
      animFrameRef.current = requestAnimationFrame(draw)
    }

    const stop = () => {
      if (!running) return
      running = false
      cancelAnimationFrame(animFrameRef.current)
    }

    // Animate only while on-screen AND motion is allowed; otherwise paint a
    // single static resting frame so the section is never blank.
    const update = () => {
      if (visible && !reduceMotionQuery.matches) {
        start()
      } else {
        stop()
        renderThreads()
      }
    }

    resize()
    window.addEventListener('resize', resize)

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false
        update()
      },
      { rootMargin: '200px' },
    )
    observer.observe(canvas)

    reduceMotionQuery.addEventListener('change', update)

    return () => {
      window.removeEventListener('resize', resize)
      observer.disconnect()
      reduceMotionQuery.removeEventListener('change', update)
      cancelAnimationFrame(animFrameRef.current)
      lastFrameTimeRef.current = null // Reset so next mount doesn't have stale time
    }
  }, [initThreads, squeeze])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity: 0.85 }}
    />
  )
}
