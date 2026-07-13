---
title: Canvas fillStyle keeps a CSS var's oklch() string, so hex-parsing yields NaN RGB
date: 2026-07-12
category: runtime-errors
module: squeeze section (canvas rendering)
problem_type: runtime_error
component: frontend_stimulus
symptoms:
  - Canvas strokes/fills silently do not paint (fully transparent output) after theming colors from CSS custom properties
  - 'strokeStyle/fillStyle ends up as rgba(NaN, NaN, NaN, a) with no error thrown'
root_cause: wrong_api
resolution_type: code_fix
severity: medium
tags: [canvas, oklch, css-custom-properties, getimagedata, fillstyle, theme-tokens, color-mix]
---

# Canvas fillStyle keeps a CSS var's oklch() string, so hex-parsing yields NaN RGB

## Problem

When resolving a theme token (`var(--color-sandstone-*)`, defined as `oklch(...)` in the `@theme` block) to numeric RGB for a `<canvas>` draw loop, the common trick "assign to `ctx.fillStyle`, read it back as `#rrggbb`, parse the hex" does not work: modern Chrome preserves the `oklch()` string on read-back. Parsing that as hex produces `NaN` channels and the canvas draws nothing — with no thrown error.

## Symptoms

- Canvas threads (or any canvas strokes) render as fully transparent / invisible after switching from hardcoded `rgba()` literals to theme-derived colors.
- Inspecting the built style shows `rgba(NaN, NaN, NaN, <alpha>)`.
- `getComputedStyle(el).color` and `ctx.fillStyle` both return `oklch(0.72 0.022 65)` (the source color space), not a hex string.

## What Didn't Work

```ts
// Assumed the canvas normalizes any assigned color to "#rrggbb" on read-back.
ctx.fillStyle = '#000000'
ctx.fillStyle = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-sandstone-500')
  .trim() // "oklch(0.72 0.022 65)"
const hex = ctx.fillStyle // STILL "oklch(0.72 0.022 65)" in Chrome — not hex!
const r = parseInt(hex.slice(1, 3), 16) // parseInt("kl", 16) => NaN
```

The read-back returns the oklch string unchanged. Per CSS Color 4, canvas serializes a color in its own color space; it only falls back to `#rrggbb` for legacy sRGB inputs. `slice(1,3)` on `oklch(...)` is `"kl"`, so every channel is `NaN`.

## Solution

Paint the color into a 1×1 probe canvas and read the actual pixel back with `getImageData` — this always yields sRGB bytes regardless of the source color space, and it's done once at init (not per frame):

```ts
const rootStyle = getComputedStyle(document.documentElement)
const probe = document.createElement('canvas')
probe.width = 1
probe.height = 1
const probeCtx = probe.getContext('2d', { willReadFrequently: true })

const resolveRgb = (varName: string): [number, number, number] => {
  if (!probeCtx) return [0, 0, 0]
  probeCtx.clearRect(0, 0, 1, 1)
  probeCtx.fillStyle = rootStyle.getPropertyValue(varName).trim() // "oklch(...)"
  probeCtx.fillRect(0, 0, 1, 1)
  const [r, g, b] = probeCtx.getImageData(0, 0, 1, 1).data // real sRGB bytes
  return [r, g, b]
}

const threadLight = resolveRgb('--color-sandstone-400') // e.g. [175, 162, 151]
```

Implemented in `src/components/squeeze/tension-threads.tsx` (PR #11, MKT-209): the thread colors lerp between resolved `--color-sandstone-400/500/600` per frame, with the tokens resolved once at effect start.

## Why This Works

`fillStyle` read-back is a _serialization_ of the assigned CSS color and preserves its color space (`oklch(...)`). `getImageData`, by contrast, returns the rasterized pixel — the browser has already converted it to sRGB bytes to store in the bitmap. Reading the pixel is the only path guaranteed to give numeric RGB no matter what color syntax (hex, `rgb()`, `oklch()`, `color()`) was assigned.

## Prevention

- To get numeric RGB from any CSS color at runtime, rasterize + `getImageData`; never assume `ctx.fillStyle`/`getComputedStyle().color` return hex or `rgb()`.
- If the canvas can render the color _directly_ (single fill/stroke, no per-channel math or interpolation), skip resolution and assign the `oklch()` var straight to `fillStyle`/`strokeStyle` — canvas accepts CSS Color 4 syntax. Only resolve to numbers when you must interpolate channels (as the thread color lerp does).
- Verify canvas visuals in a browser, not just via type-check/lint: this failure throws nothing and passes every static gate. It surfaced only when the rendered canvas was inspected in Storybook (`getImageData` painted-pixel count).
- Colors in this repo come from the `@theme` block in `src/app/(frontend)/styles.css` as `oklch()`; the `ca()` helper in `src/lib/color.ts` handles alpha via `color-mix` for DOM styles. Canvas is the one surface that needs numeric resolution. (auto memory [claude])

## Related Issues

- MKT-209 / PR #11 — squeeze color theming that surfaced this.
- `src/lib/color.ts` `ca()` — the DOM-side counterpart (alpha-composited theme colors via `color-mix`, no numeric resolution needed).
