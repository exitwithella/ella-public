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

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      isMobileRef.current = rect.width < 768
      if (threadsRef.current.length === 0) {
        initThreads(rect.height)
      }
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = (timestamp: number) => {
      // Calculate actual delta time, clamped to prevent large jumps
      const lastTime = lastFrameTimeRef.current ?? timestamp
      const rawDelta = (timestamp - lastTime) / 1000
      const delta = Math.min(rawDelta, 0.05) // Cap at 50ms to prevent spazzing
      lastFrameTimeRef.current = timestamp

      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      timeRef.current += delta

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

          // Snapped halves — sandstone-700 warm tone
          // Left half
          ctx.beginPath()
          ctx.strokeStyle = `rgba(190, 176, 156, ${thread.opacity * (1 - thread.snapProgress * 0.6)})`
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
          ctx.strokeStyle = `rgba(190, 176, 156, ${thread.opacity * (1 - thread.snapProgress * 0.6)})`
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
          // Intact threads: sandstone-300 (light warm) -> goldenrod-500 under tension
          ctx.beginPath()

          const r = Math.round(210 + tension * -30)
          const g = Math.round(196 + tension * -34)
          const b = Math.round(178 + tension * -38)
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

      animFrameRef.current = requestAnimationFrame(draw)
    }

    animFrameRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
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
