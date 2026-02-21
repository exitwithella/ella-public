# withella.io — Website Design Brief

**Prepared for:** Designer / Front-end Developer
**Date:** February 2026
**Project:** Full website redesign, transitioning from exitwithella.io to withella.io
**Template Foundation:** Tailwind CSS Oatmeal Kit (50+ pre-built components)
**Primary Reference Sites:** Function Health, WithCoverage, Interloom, Canopy Servicing
**Scope:** 7 pages at launch (Homepage, Platform, Exit Planning, Pricing, About, Blog, Resources)

---

## 1. Brand Position & Design Philosophy

ELLA is a practice systematization platform for trusted advisors — professionals guiding business owners through consequential decisions like exits, wealth transitions, and succession planning. The audience is skeptical of hype, protective of their reputation, and making high-stakes decisions on behalf of their clients.

The visual language must communicate:

- **Authority without stuffiness** — This is a serious tool for serious professionals, but it shouldn't feel like a compliance portal
- **Warm technology** — AI-native product, but the aesthetic leans organic and natural, not cold and computational
- **Earned credibility** — The site should feel like a well-curated venture fund's website, not a SaaS landing page
- **Confident restraint** — Generous whitespace, deliberate simplicity, no visual clutter

**The single most important design principle:** The site should make a financial advisor trust it in the first 3 seconds. That trust comes from calm, premium warmth — not dark-mode tech aesthetics or aggressive animation.

---

## 2. Color System

ELLA's palette is derived from natural materials: moss, stone, leather, earth. This reflects the brand's positioning at the intersection of traditional advisory trust and modern AI capability.

### Primary Colors

| Token         | CSS Variable            | Role                   | Hex Approx | Usage                                           |
| ------------- | ----------------------- | ---------------------- | ---------- | ----------------------------------------------- |
| **Forest**    | `--color-moss-700`      | Core brand color       | `#5A6B4A`  | Primary buttons, headings accent, brand moments |
| **Mint**      | `--color-moss-400`      | Lighter brand accent   | `#8BAA6E`  | Secondary accents, hover states, highlights     |
| **Ash**       | `--color-ash-900`       | Text, dark backgrounds | `#2A2E26`  | Body text, dark sections, near-black            |
| **Cream**     | `--color-ash-50`        | Light backgrounds      | `#F5F5F0`  | Page backgrounds, card backgrounds              |
| **Goldenrod** | `--color-goldenrod-300` | Warm accent            | `#C5A240`  | Highlights, accent moments, "gold leaf" touches |

### Supporting Colors

| Token       | CSS Variable            | Role           | Hex Approx | Usage                                  |
| ----------- | ----------------------- | -------------- | ---------- | -------------------------------------- |
| **Tannery** | `--color-goldenrod-700` | Secondary warm | `#6B5A2E`  | Tertiary text, warm borders            |
| **Leather** | `--color-goldenrod-900` | Deep warm      | `#3E3520`  | Dark warm sections                     |
| **Ocean**   | `--color-ocean-600`     | Informational  | `#6B7FA0`  | Links, informational callouts          |
| **Coral**   | `--color-coral-500`     | Warning/energy | `#C06040`  | Sparingly — alerts, important callouts |
| **Emerald** | `--color-emerald-400`   | Success        | `#6BA060`  | Success states, positive indicators    |

### Color Rules

1. **Background default is Cream (`ash-50`), not white.** No pure whites anywhere. The warm off-white base is the single biggest differentiator from generic SaaS sites. Reference: Function Health's `#f5eee1`.

2. **Text is Ash (`ash-900`), not black.** The near-black with subtle green undertone maintains warmth throughout.

3. **Forest is the primary action color.** All primary CTAs, active states, and brand-forward moments use Forest.

4. **Goldenrod is accent, never dominant.** Think gold leaf, not gold paint. Use it for small moments of emphasis — a highlighted metric, a testimonial quote mark, an icon accent.

5. **Maximum 3 colors per section** (plus Cream/Ash as neutrals). Restraint is the design strategy.

6. **The Comparison Table** uses color to tell the story:
   - "The Old Way" column: muted gray (`ash-400` text, `ash-100` background)
   - "The Patchwork" column: warm amber warning (`goldenrod-100` background, `goldenrod-700` text)
   - "With ELLA" column: brand accent (`moss-50` background, `moss-700` text)

### Full CSS Custom Properties

The complete color system is defined in the attached `brand_colors.css` file using oklch color space for Tailwind v4 `@theme` blocks. All scales (moss, ash, goldenrod, coral, ocean, emerald) run from 50–950 with consistent lightness curves.

---

## 3. Typography

### Three-Font System: Display + Body + Serif Accent

ELLA uses a three-font system that creates intentional tonal shifts across the page. Each font has a distinct role and strict usage boundaries.

| Font                                | Role                                    | Where It Appears                                                                        |
| ----------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------- |
| **Termina** (display sans)          | Authority, confidence, product identity | Hero headlines, section headlines, sub-headlines, pillar card labels, navigation        |
| **DM Sans** (body sans)             | Clarity, readability, utility           | Body text, intro paragraphs, card descriptions, CTAs, labels, captions, all UI elements |
| **DM Serif Display** (serif accent) | Warmth, humanity, editorial voice       | Testimonial quotes, final CTA/closer headline, blog post titles, manifesto excerpts     |

### Why Three Fonts

The site needs more than one emotional register. Termina carries confident, modern authority — it's the product voice. But testimonials, the closer, and blog content are _human_ moments that need a different quality. DM Serif Display introduces warmth and intimacy in exactly those contexts, creating contrast that makes both fonts stronger.

The critical discipline: **the serif appears in 3-4 specific contexts only.** If it leaks into product sections or UI elements, it competes with Termina instead of complementing it.

### Termina — Display Headlines

Termina is a geometric display sans-serif with architectural weight. It signals precision and modernity. It does the heavy lifting for all product and structural content.

- **Hero headline:** 48-56px, Bold (700), -0.02em tracking
- **Section headline:** 32-36px, Bold (700), -0.01em tracking
- **Sub-headline:** 20-24px, Medium (500), normal tracking
- **Pillar card labels:** 18px, Bold (700), normal tracking
- **Nav items:** 15px, Medium (500), 0.01em tracking

### DM Sans — Body & UI

DM Sans is the workhorse. It handles all running text, interface elements, and supporting copy. Its geometric character pairs naturally with Termina without competing for attention.

- **Body large (intro paragraphs):** 20px, Normal (400), normal tracking
- **Body:** 17-18px, Normal (400), normal tracking
- **Card descriptions:** 15px, Normal (400), normal tracking
- **CTA buttons:** 15-16px, Semibold (600), 0.01em tracking
- **Labels / meta:** 11-14px, Medium-Semibold (500-600), 0.06-0.1em tracking (uppercase)
- **Captions:** 14px, Normal (400), 0.01em tracking

### DM Serif Display — Serif Accent

DM Serif Display appears _only_ where the content shifts from product voice to human voice. It signals: "this is a person talking" or "this is a reflective moment." Its usage is strictly limited:

- **Testimonial / advisor quotes:** 22-26px, Normal (400), normal tracking
- **Final CTA / closer headline:** 36-42px, Normal (400), -0.01em tracking
- **Blog post titles:** 28-32px, Normal (400), normal tracking
- **Manifesto excerpts** (About page, long-form content): 22-24px, Normal (400), normal tracking

**DM Serif Display does NOT appear in:** Hero headlines, section headlines, sub-headlines, pillar cards, navigation, buttons, labels, or any UI element. If you're unsure whether a moment is "product" or "human," default to Termina.

### Type Scale (Complete)

| Element            | Size (desktop) | Weight                    | Font             | Tracking               |
| ------------------ | -------------- | ------------------------- | ---------------- | ---------------------- |
| Hero headline      | 48-56px        | Bold (700)                | Termina          | -0.02em                |
| Section headline   | 32-36px        | Bold (700)                | Termina          | -0.01em                |
| Sub-headline       | 20-24px        | Medium (500)              | Termina          | Normal                 |
| Testimonial quotes | 22-26px        | Normal (400)              | DM Serif Display | Normal                 |
| Closer headline    | 36-42px        | Normal (400)              | DM Serif Display | -0.01em                |
| Blog post titles   | 28-32px        | Normal (400)              | DM Serif Display | Normal                 |
| Body large         | 20px           | Normal (400)              | DM Sans          | Normal                 |
| Body               | 17-18px        | Normal (400)              | DM Sans          | Normal                 |
| Pillar card labels | 18px           | Bold (700)                | Termina          | Normal                 |
| Card descriptions  | 15px           | Normal (400)              | DM Sans          | Normal                 |
| CTA buttons        | 15-16px        | Semibold (600)            | DM Sans          | 0.01em                 |
| Labels / meta      | 11-14px        | Medium-Semibold (500-600) | DM Sans          | 0.06-0.1em (uppercase) |
| Captions           | 14px           | Normal (400)              | DM Sans          | 0.01em                 |

### Typography Rules

1. **Termina headlines should feel like declarations.** Large, confident, well-spaced. They carry architectural weight. Reference: Poolside AI's declarative energy at the type level.

2. **DM Serif Display should feel like a voice shift.** When it appears, the reader should sense "someone is speaking to me" rather than "the product is being described." It earns its impact through scarcity.

3. **Line height on body text: 1.6-1.7.** Generous leading reinforces the breathing-room aesthetic.

4. **Maximum line length: ~70 characters (measure).** Wide text blocks feel like legal documents. Narrower measure feels editorial and intentional.

5. **Paragraph spacing: 1.5em between paragraphs.** Let the content breathe.

6. **No all-caps except for very small labels** (card category tags, navigation items if appropriate). All-caps headings feel aggressive and SaaS-generic.

7. **Font loading:** Termina is a licensed font and must be self-hosted. DM Sans and DM Serif Display are available via Google Fonts. Use `font-display: swap` for all three with well-matched system fallbacks to prevent layout shift.

---

## 4. Spacing & Layout

### The Core Principle: Breathe

ELLA's whitespace strategy is the primary trust signal. The site should feel like it has nothing to prove — it gives you room to absorb information without pressure.

### Spacing Scale (Oatmeal Override)

**Increase all Oatmeal default spacing by 20-30%.** This is a global adjustment, not selective. Specific overrides:

| Element                                 | Oatmeal Default | ELLA Override |
| --------------------------------------- | --------------- | ------------- |
| Section vertical padding                | ~80px           | 100-120px     |
| Between content blocks within a section | ~40px           | 56-64px       |
| Card internal padding                   | ~24px           | 32-40px       |
| Grid gap (card grids)                   | ~24px           | 32-40px       |
| Hero top/bottom padding                 | ~100px          | 140-180px     |
| Nav height                              | ~64px           | 72-80px       |

### Layout Grid

- **Max content width: 1200px** (centered, with comfortable side margins at larger viewports)
- **Text column max-width: 680px** for long-form copy sections (problem statement, origin story, blog posts)
- **Full-width sections** for visual emphasis moments: hero, comparison table, final CTA
- **Card grids:** 3-column on desktop, 2-column on tablet, stacked on mobile

### Section Rhythm

Alternate between full-width warm-background sections and contained white/cream sections. This creates visual rhythm without needing decorative elements.

Pattern for the homepage:

```
[Cream bg]  Hero
[Cream bg]  Credibility Strip (subtle warm tint or border separation)
[Warm bg]   Bridge — "Messy Middle" problem statement
[Cream bg]  Pillar Cards (scannable overview)
[Cream bg]  Pillar Deep-Dives (alternating text+visual sides)
[Warm bg]   Trust & Security
[Cream bg]  Comparison Table
[Warm bg]   Builder Credibility — Origin Story
[Forest bg] Final CTA (dark section, light text)
```

"Warm bg" = `ash-100` or `moss-50` — a barely-perceptible shift from cream that creates section distinction without hard borders.

---

## 5. Component Design Direction

### Buttons

| Type                 | Style                                                      | Color                      | Usage                               |
| -------------------- | ---------------------------------------------------------- | -------------------------- | ----------------------------------- |
| Primary CTA          | Solid, rounded corners (8px), generous padding (16px 32px) | Forest bg, Cream text      | "Get Started", "See ELLA in Action" |
| Secondary CTA        | Outlined, same border-radius                               | Forest border, Forest text | "Book a Demo", "Talk to Our Team"   |
| Tertiary / text link | Underline on hover, no background                          | Forest text                | In-line actions, "Learn more →"     |

**Button behavior:** Subtle scale transform on hover (1.02x). No aggressive color shifts or bouncing animations. The calm of the button matches the calm of the site.

**Micro-copy:** Below primary CTA: "Your first 3 clients are on us." in small, muted text. This is a proven conversion line — it removes risk.

### Cards (Pillar Cards, Feature Cards)

- **Background:** White or `ash-50` with 1px `ash-200` border
- **Border-radius:** 12-16px (warm, not sharp)
- **Shadow:** Very subtle, warm-toned (`0 2px 8px rgba(42, 46, 38, 0.06)`) — barely there
- **Hover:** Slight elevation shift (shadow deepens), border shifts to `moss-300`
- **Internal structure:** Icon top → Label (bold, small) → Benefit sentence → Optional link

**Reference:** WithCoverage's 3-pillar cards. Clean, scannable, generous internal padding, anchor-linked to deep-dive sections below.

### Navigation

- **Style:** Clean, horizontal, with generous spacing between items
- **Position:** Fixed/sticky on scroll with subtle background blur
- **Background:** Cream with slight transparency (backdrop-blur)
- **Active state:** Forest underline or text color
- **CTA in nav:** "Get Started" button (primary style) always visible. "Login" as text link.
- **Solutions and Resources:** Dropdown on hover/click with clean, card-based mega-menu

**Structure:**

```
[ELLA Logo]   Platform   Solutions ▾   Resources ▾   Pricing   About   [Login]  [Get Started]
```

**Mobile:** Hamburger with full-screen overlay. "Get Started" CTA remains visible outside the hamburger.

### Testimonial Blocks

Two variants needed:

1. **Inline bridge quote** (Block 3): Large quote text in serif italic, centered, with role descriptor below. Minimal — the quote is the design. Background color shift (warm tint) distinguishes it from surrounding content.

2. **Product section quotes** (embedded in Block 4): Smaller, right-aligned or card-format. Photo (if available), name, title, firm. Short quote. These feel integrated into the product story, not pulled out.

**Quote marks:** Use a subtle oversized `"` in Goldenrod as a decorative accent. Not a full graphical element — just enough to signal "someone said this."

### Comparison Table (Block 7)

This is a custom component — not a standard Oatmeal table.

- **3 columns, 5 rows + header row**
- Column 1 ("The Old Way"): Gray/muted treatment. Feels dated, faded
- Column 2 ("The Patchwork"): Amber/warm warning treatment. Conversational voice in cells — actual advisor language like "I asked ChatGPT" in italics
- Column 3 ("With ELLA"): Brand-accent treatment. Feels confident and concrete
- **Row labels** on the left as a subtle fixed column
- **Mobile:** Stacks to single-column, card-per-row format with the 3 options as a swipe or accordion

**Reference:** Function Health's comparison table vs. standard checkup. The visual contrast between columns does the persuasion — the words just confirm what the design already implies.

### Footer

- **Background:** Ash (`ash-900`) — the one dark section (besides the final CTA)
- **Text:** Cream and Mint
- **Structure:** 4-column grid (Sitemap links, Resources, Company, Newsletter signup)
- **Newsletter input:** Clean, simple. Cream input field on dark background
- **Bottom bar:** "Built by ei Innovations, Erie Insurance's venture studio." + legal links
- **Tone:** Confident and minimal. No clutter.

---

## 6. Imagery & Visual Assets

### Photography Direction

- **Real advisor portraits** for testimonials. Professional but not over-produced — the sense that these are real practitioners, not models. Warm color grading.
- **No stock photography.** Period. The site will use product screenshots, illustrations, or abstract visuals instead.
- **Product screenshots** carried from the existing exitwithella.io site. These show the actual workbench interface and provide concrete proof of what the product does.

### Illustration Style

For sections where product screenshots aren't available or appropriate, use:

- **Visual metaphors** over literal depictions. Flow diagrams showing the intake → sensemaking → deliverable pipeline. Timeline visualizations showing context building over an engagement.
- **Icons:** Simple, warm, consistent line-weight. Custom icon set preferred over generic icon libraries. Should feel hand-crafted, not clip-art. Forest or Ash color on light backgrounds, Cream or Mint on dark backgrounds.
- **Data-as-art abstraction** for decorative moments (hero backgrounds, section dividers): geometric forms suggesting data flows, network graphs, or bar charts — rendered in the ELLA palette with generous negative space.

### Motion & Animation

**Only where it serves comprehension.** This is a hard rule.

Approved animations:

- **Scroll-triggered reveals:** Content blocks fade-up gently as they enter the viewport. Subtle (200-300ms, ease-out). Nothing bounces.
- **Number counters:** If/when metrics become available. Animated count-up triggers on scroll into view.
- **Comparison table column highlighting:** Subtle color shift as columns become active/hovered
- **CTA hover states:** Gentle scale transform

Not approved:

- Decorative particle effects
- Auto-playing video backgrounds
- Parallax scrolling on text
- Bouncing or attention-grabbing animations
- Loading animations beyond a simple spinner

---

## 7. Page-by-Page Structure (Homepage Focus)

The homepage is the flagship. Everything else cascades from its design. Full content spec lives in the `withella-homepage-spec-v2.md` document. Below is the structural wireframe for the designer.

### Homepage Block Flow

```
┌─────────────────────────────────────────────────────┐
│  BLOCK 1: HERO                                      │
│  ├── Serif headline (48-64px, Ash text)             │
│  ├── Supporting copy (20px, Ash-700 text)           │
│  ├── Dual CTA: [Get Started] [Book a Demo]          │
│  ├── Micro-copy: "Your first 3 clients are on us."  │
│  └── Product screenshot (right or below on mobile)  │
│  Background: Cream                                  │
├─────────────────────────────────────────────────────┤
│  BLOCK 2: CREDIBILITY STRIP                         │
│  ├── Single line: "We spent a year talking to       │
│  │   advisors before we wrote a line of code.       │
│  │   100+ conversations with CEPAs, CPAs, wealth    │
│  │   managers, and M&A brokers shaped every          │
│  │   decision in this product."                     │
│  Background: Subtle warm tint (ash-100)             │
├─────────────────────────────────────────────────────┤
│  BLOCK 3: BRIDGE — "MESSY MIDDLE"                   │
│  ├── Section header (serif): "Advisors are stuck    │
│  │   in AI's messy middle."                         │
│  ├── 3-4 paragraphs describing the pain             │
│  ├── Optional: single embedded quote (serif italic) │
│  Background: Warm tint (moss-50 or ash-100)         │
├─────────────────────────────────────────────────────┤
│  BLOCK 4a: PILLAR CARDS (Scannable Overview)        │
│  ├── 3-column card grid:                            │
│  │   [Fact Finding] [Sensemaking] [Deliverables]    │
│  │   Each: icon + label + one-line benefit          │
│  │   Each: anchor-linked to deep-dive below         │
│  Background: Cream                                  │
├─────────────────────────────────────────────────────┤
│  BLOCK 4b: PILLAR DEEP-DIVES                        │
│  ├── Section 1: Fact Finding                        │
│  │   Text left, visual right (alternating)          │
│  │   2-3 capability bullets + principle highlight   │
│  │   + product screenshot                           │
│  ├── Section 2: Sensemaking                         │
│  │   Visual left, text right                        │
│  │   + embedded Lisa quote                          │
│  ├── Section 3: Deliverables                        │
│  │   Text left, visual right                        │
│  │   + embedded Kevin quote                         │
│  ├── Cross-cutting: Collaboration callout           │
│  ├── Closing line + Kevin revenue quote             │
│  Background: Cream, with light alternation          │
├─────────────────────────────────────────────────────┤
│  BLOCK 5: TRUST & SECURITY                          │
│  ├── Header: "Secure, because both of our           │
│  │   reputations are on the line."                  │
│  ├── ChatGPT contrast paragraph                     │
│  ├── Icon-driven capability list (7 items)          │
│  ├── Closing promise statement                      │
│  Background: Warm tint (ash-100)                    │
├─────────────────────────────────────────────────────┤
│  BLOCK 6: BEFORE/AFTER — DEFERRED                   │
│  (Ship in fast-follow. Placeholder not needed.)     │
├─────────────────────────────────────────────────────┤
│  BLOCK 7: COMPARISON TABLE                          │
│  ├── 3-column: Old Way / Patchwork / With ELLA      │
│  ├── 5 rows: Intake, Analysis, Deliverables,        │
│  │   Coordination, Knowledge                        │
│  ├── Visual color treatment per column              │
│  Background: Cream                                  │
├─────────────────────────────────────────────────────┤
│  BLOCK 8: BUILDER CREDIBILITY                       │
│  ├── Header: "We started with conversations,        │
│  │   not code."                                     │
│  ├── Compressed origin story (4 short paragraphs)   │
│  ├── Link to full manifesto                         │
│  ├── Backing badge: ei Innovations / Erie Insurance │
│  Background: Warm tint (moss-50)                    │
├─────────────────────────────────────────────────────┤
│  BLOCK 9: FINAL CTA — THE CLOSER                    │
│  ├── "Divide forming" narrative (3 short paragraphs)│
│  ├── Closing line (serif, large)                    │
│  ├── Dual CTA: [Get Started] [Book a Demo]          │
│  ├── Micro-copy repeated                            │
│  Background: Forest (dark section) with Cream text  │
└─────────────────────────────────────────────────────┘
```

### Supporting Pages (Brief Direction)

**Platform (`/platform`):** Four product pillars in depth. Consider scroll-lock (Canopy Servicing pattern) for the pillar sections if technically feasible, otherwise alternating text+visual layout. Hero → 4 pillars → Security deep-dive → Philosophical closer → CTA.

**Exit Planning (`/solutions/exit-planning`):** The deepest page on the site. Numbered workflow steps (01-05 per 7Analytics pattern). Persona-specific blocks (Canopy modular breakdown). Rich with real advisor quotes.

**Pricing (`/pricing`):** Journey framing, not tier comparison. Five stages laid out as a path: Free → Workbench → Vanguard → Community → Consulting. Each stage is a card with clear deliverable and CTA.

**About (`/about`):** Story-first (Moonfire model). Origin story as the hero, not team photos. Team section below. Backed-by badge. Link to full manifesto.

**Blog (`/resources/blog`):** Three-tier hierarchy (Ramp Velocity pattern). Hero article with 2-3x visual prominence → 4 editor's picks in a grid → chronological feed with category filters. Categories: Industry Insights, Practice Management, Trust & Security, Product Updates, Perspectives.

**Resources (`/resources`):** Lightweight 3-card directory linking to Blog, Case Studies, and Tools.

---

## 8. Reference Site Mood Board

### Tier 1: Primary References (Study Closely)

| Site                | What to Study                                                                                                                                                                                                                                                                             | URL                |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **Function Health** | Overall aesthetic, cream background warmth, comparison table pattern, calm confidence, generous spacing. Note: Function Health uses PT Serif + Open Sans; ELLA adapts this principle with Termina + DM Serif Display + DM Sans for a more modern/confident take on the same trust signal. | functionhealth.com |
| **WithCoverage**    | 3-pillar card architecture, information hierarchy (scan → dive deeper), anchor-linked sections, clean grid layouts                                                                                                                                                                        | withcoverage.com   |
| **Interloom**       | Problem-first storytelling flow, testimonial placement before features, earth-tone warmth, topographic visual metaphors, clean enterprise feel                                                                                                                                            | interloom.com/en   |

### Tier 2: Pattern References (Study Specific Elements)

| Site                 | What to Study                                                                                                | URL                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------- |
| **Canopy Servicing** | Modular platform breakdown, scroll-lock animated sections, sticky sidebar navigation, named case studies     | canopyservicing.com |
| **Poolside AI**      | Hero headline energy, declarative confidence at scale, typography as a design element                        | poolside.ai         |
| **Dope Security**    | Generation framing (Gen 1 → 2 → 3), competitor comparison carousel, visual storytelling for complex products | dope.security       |
| **Ramp Velocity**    | Blog layout (3-tier content hierarchy), content-as-conversion editorial approach                             | ramp.com/velocity   |
| **7Analytics**       | Numbered sequential sections (01-03), parallel structure, scannable product breakdown                        | 7analytics.ai       |

### Tier 3: Selective Inspiration

| Site             | What to Study                                                                          | URL              |
| ---------------- | -------------------------------------------------------------------------------------- | ---------------- |
| **Hebbia**       | Logo wall + stat pairing, use-case matrix table, two-column interactive scroll         | hebbia.com       |
| **Wispr Flow**   | Before/after transformation in hero, scroll-triggered animations, persona tabs         | wisprflow.ai     |
| **HelloPatient** | Live demo as CTA, state-aware buttons, animated waveforms as visual identity           | hellopatient.com |
| **Moonfire**     | Story-first About page, "build together" relationship CTA, category-reframing headline | moonfire.com     |

---

## 9. Anti-Patterns — What This Site Must NOT Look Like

1. **No dark-mode-default tech aesthetic.** ELLA targets financial advisors, not developers. The site uses warm cream, not near-black. (Exception: the final CTA block and footer can go dark for contrast.)

2. **No pure white backgrounds.** Every "white" surface should be cream (`ash-50`) or warmer.

3. **No cold blues.** The Ocean color is muted and used sparingly for informational elements. No bright blues, no electric accents.

4. **No stock photography.** No handshakes, no people pointing at screens, no generic office scenes.

5. **No decorative animation.** Every moving element must serve comprehension. If removing the animation makes the content less clear, keep it. If removing it changes nothing, cut it.

6. **No SaaS-generic "feature grid."** The 3-pillar card system (WithCoverage model) with deep-dive expansions replaces the standard "6 feature cards with icons" pattern that every competitor uses.

7. **No aggressive urgency.** No countdown timers, no "limited spots" badges (unless Vanguard is active), no red urgency indicators. The confidence of the design is the conversion mechanism.

8. **No clutter.** If it doesn't earn its place, it doesn't appear. Every element should pass the test: "Does this build trust with a skeptical financial advisor?"

9. **No "AI-powered" visual clichés.** No glowing neural networks, no brain imagery, no circuit-board patterns, no gradient blobs. ELLA's visual identity comes from natural materials — moss, stone, leather, earth — not from tech-startup visual tropes.

---

## 10. Responsive Breakpoints

| Breakpoint | Viewport   | Layout Changes                                                                         |
| ---------- | ---------- | -------------------------------------------------------------------------------------- |
| Desktop    | ≥1200px    | Full layout, 3-column grids, side-by-side text+visual                                  |
| Tablet     | 768-1199px | 2-column grids, stacked hero, maintained spacing                                       |
| Mobile     | <768px     | Single column, stacked everything, reduced spacing (but still generous), hamburger nav |

**Mobile-specific notes:**

- Hero headline drops to 32-40px but retains Termina
- Product screenshots scale to full-width with rounded corners
- Comparison table converts to card-per-row (swipe or accordion)
- CTA buttons go full-width
- "Get Started" CTA remains visible in mobile header at all times
- Spacing reduced by ~20% from desktop but still exceeds typical SaaS defaults

---

## 11. Performance Requirements

- **First Contentful Paint:** < 1.5s
- **No layout shift** from font loading. Use `font-display: swap` with well-matched fallbacks.
- **Images:** WebP with proper srcset for responsive sizes. Lazy-load below the fold.
- **No JS-dependent content rendering.** All text content should be readable with JavaScript disabled (progressive enhancement).
- **Minimize third-party scripts.** Analytics, chat widgets, and CRM embeds should load asynchronously and not block rendering.

---

## 12. Deliverables Requested

1. **Typography rendering test:** Render the locked three-font system (Termina + DM Sans + DM Serif Display) at hero headline scale, body text scale, testimonial quote scale, and card label scale. On cream background. Confirm font loading, fallback behavior, and the tonal contrast between Termina headlines and DM Serif Display quotes.

2. **Color application mockup:** One section (the 3-pillar card grid) rendered with the full ELLA palette on cream background. Demonstrate card styling, button treatment, and icon style.

3. **Homepage wireframe:** Full-page wireframe with block structure from Section 7 above. Desktop and mobile.

4. **Component library starter:** Navigation, button variants (primary, secondary, tertiary), card component, testimonial block (both variants), comparison table, footer. All styled to this brief's specs.

5. **Hero section comp:** High-fidelity mock of Block 1 with actual headline copy options (provided in the homepage spec doc), product screenshot, and dual CTA. This is the approval gate — if the hero feels right, the rest follows.

---

## 13. Attached Assets & Reference Documents

| Document                                     | Purpose                                                                                                   |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `brand_colors.css`                           | Complete color system in oklch for Tailwind v4                                                            |
| `ella-brand-visual SKILL.md`                 | Brand visual identity system — compositional principles, palette rules, mood language, subject guidelines |
| `withella-homepage-spec-v2.md`               | Implementation-ready homepage spec with all copy options and block-by-block content                       |
| `withella-site-architecture.md`              | Full site map, page-by-page content structure, messaging framework                                        |
| `withella-implementation-plan.md`            | Build order, content status, timeline, cross-page content gaps                                            |
| `Website Inspiration — Thematic Analysis.md` | Cross-site analysis of 26 inspiration sites with ELLA-specific principles                                 |
| Notion: "Inspiring Websites" database        | Per-site notes on visual style, CTA strategy, tone, ELLA relevance                                        |

---

## Summary: The Three Things That Matter Most

If this brief is long and the designer needs the essence:

1. **Cream + Termina + DM Serif Display accents + Generous space = Trust.** Function Health is the north star for spacing and warmth. The three-font system (Termina for authority, DM Serif Display for human moments, DM Sans for everything else) creates tonal shifts that keep the page alive. The warm cream background with generous whitespace is what separates ELLA from every SaaS landing page an advisor has ever bounced from.

2. **3-pillar cards → deep-dive sections = Information architecture.** WithCoverage is the model. Let people scan, then dive. The card grid at the top is the navigational backbone of the homepage.

3. **Voice carries the design.** The copy is the design. The site has no logo wall, no metric carousel, no switching stories yet. What it has is 100+ real advisor conversations and a specific, practitioner-credible voice. The design's job is to let that voice breathe — not to compensate for its absence with visual tricks.
