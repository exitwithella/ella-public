---
name: structural-design
description: >
  Design system for building premium, structurally-grounded UI sections with architectural
  line language, scroll-driven animations, and considered z-index layering. Use when building
  new page sections, feature showcases, content blocks, or interactive layouts that need to
  feel premium and trust-building rather than generic SaaS. Triggers: building new homepage
  sections, designing product pages, creating interactive scroll experiences, laying out
  split-column sticky sections, or when the user references "structural", "premium",
  "architectural", or "rail" design patterns.
---

# Structural Design System

A design vocabulary built around architectural lines, deliberate whitespace, and scroll-driven
motion. The goal: every section should feel like it was designed by someone who cares about
craft, not assembled from a component library.

## Core Design Vocabulary

### Lines as Structure, Not Decoration

Lines serve an architectural purpose — they frame, connect, and scaffold content. They are
never ornamental.

- **Throughlines** — Thin vertical lines (`w-px`) that connect related content vertically,
  creating a visual rail. Active segments thicken (`border-l-[3px]`) to show state.
- **Horizontal rails** — Full-width `h-px` dividers that frame content zones. They span
  across column boundaries to unify split layouts.
- **The rail metaphor** — Content "rides" along a throughline. The active item's border
  overlays the thin line (`-ml-[2px]` to center a 3px border over a 1px line). Inactive
  items show transparent borders, letting the throughline show through.

### Color Restraint

- Lines and structural elements use muted tones that match their adjacent surfaces
  (e.g., `bg-ash-200` lines on `bg-ash-50` backgrounds), not contrasting colors.
- Active accents (e.g., `border-moss-600`) are the only structural elements that
  use brand color — used sparingly to mark the current state.
- Background panels use one step darker than the base (e.g., `bg-ash-100` panel on
  `bg-ash-50` base) for subtle depth without contrast.

### Typography as Rhythm

- **Step counters** — Monospace `font-mono text-xs` numbers (`01`, `02`) above content
  items create an architectural cadence. They're muted (`text-ash-400`), not prominent.
- **Progress indicators** — `01 ─── ── ── 04` style: monospace counters flanking thin
  bar segments. Active segments are wider and use the accent color.
- **Blueprint tags** — Sharp rectangular badges (`border border-ash-300`, no border-radius,
  `font-mono text-xs`) instead of rounded pills. They read as specifications, not marketing.

## Layout Patterns

### Split Column with Sticky Panel

The primary pattern for feature showcases: scrolling content on the left, sticky visual on the right.

**Structure:**
- Left column: scrolling content with a vertical throughline
- Right column: sticky background panel with rounded left corners, bleeding to the viewport
  right edge via an overflow extension (`absolute left-full w-[50vw]`)
- Section uses `overflowX: 'clip'` (not `overflow-hidden`, which breaks sticky positioning)

**Background panel construction** (3 layers for z-index compatibility):
1. Outer `motion.div` — height animation only, no overflow clipping
2. Background fill — `absolute inset-0` with animated border-radius
3. Content wrapper — `absolute inset-0 overflow-hidden` for clipping during animations

The bleed extension is a sibling of the content wrapper (not inside it), so it isn't clipped.

### Sticky Header with Transparent Right

When a section header should stick but not cover an adjacent panel:

- Use the same grid columns as the content area in the header
- Apply cream background + gradient only to the left column
- Leave the right column as an empty transparent `<div>` so the panel shows through
- The header's `z-index` must be lower than the right column's to avoid rail-over-image issues

### Z-Index Layering Strategy

When sticky elements at different z-levels need to coexist:

- **Left column content**: `z-auto` — scrolls behind the header naturally
- **Sticky header**: `z-20` — covers left column content, includes rail line
- **Right column panel**: `z-30` — paints above header rail when they overlap

The grid container must NOT have its own z-index, or it creates a stacking context that traps
children. Each column sets its own z-index directly, participating in the section's stacking context.

## Scroll-Driven Motion

### Fade Through a Zone

Content fades in and out as it scrolls through a viewport "window":

```
useScroll({ target: ref, offset: ['start end', 'end start'] })

opacity: [0, 0.2, 0.35, 0.65, 0.8, 1] → [0, 0.1, 1, 1, 0.1, 0]
y:       [0, 0.35, 0.65, 1]            → [30, 0, 0, -30]
```

The subtle `translateY` makes items feel like they're physically sliding along the rail.
Use `scrollYProgress.on('change', callback)` in a `useEffect` (with cleanup) to trigger
state changes (e.g., switching the active image) when the panel is centered.

### Shrink-to-Close

Sticky panels collapse as their section exits the viewport:

```
useScroll({ target: sectionRef, offset: ['end 0.9', 'end start'] })

height:  [0, 0.5]  → ['100%', '0%']
opacity: [0, 0.25] → [1, 0]
radius:  [0, 0.5]  → [16, 24]
```

The image fades before the panel fully collapses. The panel shrinks faster than the scroll,
keeping its top edge visible during the animation. `overflow-hidden` on the content wrapper
(not the panel itself) clips content without affecting bleed extensions.

### Image Transitions

Crossfade between images with a subtle scale shift:

```
initial: { opacity: 0, scale: 1.02 }
animate: { opacity: 1, scale: 1 }
exit:    { opacity: 0, scale: 0.98 }
transition: { duration: 0.4, ease: 'easeInOut' }
```

## Anti-Patterns

- **Rounded pill badges** — Use sharp rectangular monospace tags instead
- **`overflow-hidden` on sticky containers** — Use `overflowX: 'clip'` on the section;
  `overflow-hidden` creates a scroll container that breaks sticky positioning
- **Old-school shadows** — `shadow-2xl`, `ring-1 ring-ash-200`, `rounded-xl` on images.
  Use `shadow-lg shadow-ash-900/[0.04]` for barely-there depth on panels.
- **Binary state transitions** — Don't snap between `opacity-100` and `opacity-40`.
  Use scroll-driven continuous values for smooth, physical-feeling transitions.
- **Z-index on grid containers** — Don't put `z-index` on the grid wrapper. Let columns
  set their own z-index to participate directly in the section's stacking context.
- **Decorative dots or nodes** — Don't add dots to throughlines. The line itself,
  with its bold/thin state changes, is the structural element.

## When to Apply

This vocabulary works best for:

- Feature showcases (sticky image + scrolling descriptions)
- Before/after comparisons
- Step-by-step walkthroughs
- Product deep-dives
- Any section that benefits from a "curated" rather than "templated" feel

Not every section needs the full vocabulary. A simple content block might only use the
horizontal rails and typography rhythm. The structural line language should be additive —
use what serves comprehension, skip what doesn't.
