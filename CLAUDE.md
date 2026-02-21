# withella.io — Marketing Site Development Context

## What This Project Is

This is the marketing website for ELLA, a practice systematization platform for trusted advisors. We're building `withella.io` as a full redesign, migrating from the previous `exitwithella.io`. The site is **not** the application — it's the public-facing marketing site that converts skeptical financial advisors into users.

The audience is professionals who stake their reputation on trust. The site must feel like a well-curated venture fund's website, not a SaaS landing page. Every design and code decision should pass one test: **would a skeptical financial advisor trust this in the first 3 seconds?**

## My Role: Ownership & Accountability

I operate as a capable collaborator, not just a code generator.

- I seek to understand _why_ before implementing. If requirements are unclear, I clarify rather than guess.
- Code I produce should be code I'd stand behind. PRs may ship without human review — I treat every commit as production-ready.
- When something breaks, I investigate root causes rather than surface fixes.
- Complexity is the enemy. I prefer straightforward solutions over impressive abstractions.
- When facing multiple concerns, I identify the highest-impact problem first.
- I flag risks and tradeoffs proactively. If a planning doc contradicts itself or a design decision seems off, I raise it rather than silently picking one path.

## Project Structure

```
withella.io/
├── _planning/                → Strategic planning documents (read-only reference)
│   ├── site-architecture.md        → Full site map, content structure, messaging
│   ├── homepage-spec.md         → Homepage block-by-block spec with copy options
│   ├── implementation-plan.md      → Build order, content status, timeline
│   ├── design-brief.md             → Visual identity, color, typography, components
│   ├── website-inspiration-thematic-analysis.md → Design patterns from 26 reference sites
│   └── payload-schema-update-plan.md        → CMS schema and content modeling
├── brand_colors.css          → Complete ELLA color system (oklch, Tailwind v4 @theme blocks)
├── oatmeal-olive/            → Oatmeal Kit template source (olive variant)
├── src/                      → Application source
├── public/                   → Static assets
└── ...                       → Standard Next.js / Payload project files
```

## Tech Stack

- **Framework:** Next.js (App Router, Server Components by default)
- **CMS:** Payload CMS — content modeling, collections, globals, and admin UI
- **Styling:** Tailwind CSS v4 with custom `@theme` configuration
- **Template Foundation:** Oatmeal Kit (see below)
- **Fonts:** Termina (self-hosted, display), DM Sans (Google, body), DM Serif Display (Google, serif accent)
- **Package Manager:** `pnpm`
- **Deployment:** Cloudflare Pages + D1 + R2 (Payload's recommended stack)

### Cloudflare Deployment

We deploy on Cloudflare's stack following Payload's recommended architecture:

- **Cloudflare Pages:** Hosts the Next.js application (SSR via Pages Functions / Workers runtime).
- **Cloudflare D1:** SQLite-based database for Payload CMS data. Payload has native D1 adapter support.
- **Cloudflare R2:** S3-compatible object storage for media uploads (images, documents).

**What this means in practice:**

- No Vercel-specific APIs or patterns. Don't use `@vercel/*` packages, Vercel-specific edge middleware, or Vercel caching primitives.
- Be mindful of Workers runtime constraints (CPU time limits, no Node.js-specific APIs unless polyfilled). When uncertain, check Cloudflare Workers docs for compatibility.
- D1 is SQLite, not Postgres. Payload abstracts most of this, but if writing raw queries or migrations, use SQLite syntax.
- Environment variables are configured in Cloudflare Pages settings, not `.env` files in production. Local dev still uses `.env`.

### Oatmeal Kit (Frontend Foundation)

Oatmeal is a Tailwind CSS component kit with 50+ pre-built, responsive components. It's the scaffolding layer — we build fast by starting from Oatmeal components, then customize per the design brief. The olive variant of the kit is available at `oatmeal-olive/` in the project root as reference source. Pull components, patterns, and structural conventions from there.

**How to use Oatmeal:**

- Start with the nearest Oatmeal component for any new section. Don't build from scratch when a component exists that's 70%+ of what we need.
- Customization is expected and encouraged. Oatmeal provides structure and responsive behavior; our design brief overrides its defaults on color, typography, spacing, and visual treatment.
- The design brief's 20-30% spacing increase is a **global override** on top of Oatmeal defaults. Apply it consistently, not selectively.
- Some blocks require custom components beyond Oatmeal's library (comparison table, before/after panel, blog 3-tier layout). For these, use Oatmeal's patterns as structural reference but build purpose-built components.

**Oatmeal → ELLA mapping for common components:**

| Oatmeal Component              | ELLA Usage                             | Customization Notes                                                     |
| ------------------------------ | -------------------------------------- | ----------------------------------------------------------------------- |
| Hero section                   | Homepage Block 1                       | Override type to Termina, increase padding to 140-180px, warm palette   |
| Feature cards (grid)           | 3-pillar cards (Block 4a)              | 3-column, anchor-linked, generous internal padding (32-40px)            |
| Feature sections (alternating) | Pillar deep-dives (Block 4b)           | Alternating text+visual sides, embedded testimonials                    |
| Testimonial (single quote)     | Bridge quote (Block 3)                 | DM Serif Display, centered, warm background tint                        |
| Testimonial (carousel)         | Expanded social proof (when available) | Named + titled + photo format                                           |
| CTA section                    | Closer (Block 9)                       | Forest dark background, Cream text, dual CTA                            |
| Blog/content layout            | Blog page                              | Heavily customized — 3-tier editorial hierarchy, not standard blog grid |
| Pricing table                  | Comparison table (Block 7)             | Repurposed as 3-column generation comparison, not pricing               |

**When Oatmeal falls short:** If a design brief requirement can't be met by customizing an Oatmeal component, build a custom component that follows Oatmeal's structural conventions (responsive breakpoints, spacing scale, class naming). This keeps the codebase consistent even when individual components are bespoke.

### Payload CMS Patterns

- Schema and content modeling decisions are documented in `_planning/payload-schema-update-plan.md`. Read it before modifying collections, globals, or field schemas.
- Payload collections map to page types and reusable content (testimonials, team members, blog posts, etc.).
- Globals handle site-wide configuration (navigation, footer, SEO defaults).
- Use Payload's built-in access control for draft/publish workflows. The admin UI is for the content team — keep it clean and intuitive.
- When adding fields, prefer Payload's native field types over custom components. Only build custom field UI when the native types genuinely can't express the content model.

### Tailwind & Design System

The design brief (`_planning/design-brief.md`) defines the complete visual system. Key rules enforced in code:

- **No pure whites.** Background default is Cream (`ash-50` / `#F5F5F0`), not `#ffffff`.
- **Text is Ash (`ash-900` / `#2A2E26`), not black.** Near-black with subtle green undertone.
- **Forest (`moss-700` / `#5A6B4A`)** is the primary action color for all CTAs and brand moments.
- **Goldenrod is accent, never dominant.** Small emphasis moments only.
- **Maximum 3 colors per section** (plus Cream/Ash as neutrals).
- **Spacing: Oatmeal defaults increased 20-30%.** This is a global adjustment — generous whitespace is the primary trust signal.

The full color system is defined as CSS custom properties using oklch color space. All scales (moss, ash, goldenrod, coral, ocean, emerald) run 50–950. The complete system lives in `brand_colors.css` at project root — import or reference this as the single source of truth for color values when configuring Tailwind's `@theme` blocks.

### Typography Rules

Three-font system with strict usage boundaries:

| Font                 | Role                  | Where It Appears                                                                    |
| -------------------- | --------------------- | ----------------------------------------------------------------------------------- |
| **Termina**          | Authority, confidence | Hero headlines, section headlines, sub-headlines, pillar card labels, navigation    |
| **DM Sans**          | Clarity, readability  | Body text, descriptions, CTAs, labels, captions, all UI elements                    |
| **DM Serif Display** | Warmth, human voice   | Testimonial quotes, final CTA/closer headline, blog post titles, manifesto excerpts |

**DM Serif Display appears in 3-4 specific contexts only.** If it leaks into product sections or UI elements, it competes with Termina instead of complementing it. When unsure whether a moment is "product" or "human," default to Termina.

## Planning Documents

The `_planning/` folder contains the strategic source of truth for this build. These documents are living references — they inform implementation but shouldn't be treated as immutable specs. When a planning doc contradicts what makes sense during implementation, flag it and make the better choice.

**Read order for a new task:**

1. **Design brief** (`design-brief.md`) — Visual system, color, type, spacing, anti-patterns. Read the anti-patterns section (§9) before writing any CSS.
2. **Homepage spec** (`homepage-spec.md`) — Block-by-block content and structure for the homepage. Contains actual copy options, not just direction.
3. **Site architecture** (`site-architecture.md`) — Full site map, page-by-page content, messaging framework, the "With ELLA" manifesto mapping.
4. **Implementation plan** (`implementation-plan.md`) — Build order, content status tags (✅/🟡/🔴), timeline, cross-page content gaps.
5. **Thematic analysis** (`website-inspiration-thematic-analysis.md`) — Design patterns extracted from 26 reference sites. Use for specific component decisions.
6. **Payload schema plan** (`payload-schema-update-plan.md`) — CMS content modeling. Read before any schema work.

**Key planning decisions already made:**

- ELLA is NOT a compliance product. Security is a trust requirement, not the value proposition.
- Calm trust aesthetic (Function Health is the primary visual reference). No dark-mode default.
- 3-pillar card architecture (WithCoverage model) as the homepage backbone.
- Dual-CTA strategy throughout: self-guided path + human/demo path.
- No social proof at launch (no logos, no metrics). Builder credibility via origin story instead.
- Before/after interactive panel is deferred to fast-follow. Don't build it for launch.
- Blog uses 3-tier editorial hierarchy (Ramp Velocity pattern), not a standard blog template.

## Build Priority

Pages ship in this order. Don't start page N+1 until page N is solid:

1. **Homepage** — The flagship. Everything cascades from here.
2. **Platform** — Four product pillars deep-dive.
3. **Exit Planning** (`/solutions/exit-planning`) — Beachhead proof point. Deepest page.
4. **Pricing** — Journey framing (Free → SaaS → Vanguard → Community → Consulting).
5. **About** — Origin story, thesis, team.
6. **Blog** — 3-tier layout + migrated posts with 301 redirects.
7. **Resources** — Lightweight 3-card directory.

## Code Quality Standards

### General

- **Server Components by default.** Add `"use client"` only when you need browser APIs, event handlers, or hooks.
- **Semantic HTML.** The site must be accessible. Use proper heading hierarchy, landmark elements, alt text, and ARIA attributes where needed.
- **Progressive enhancement.** All text content should be readable with JavaScript disabled. JS enhances, it doesn't gate.
- **No stock photography.** No handshakes, no people pointing at screens. Product screenshots, real portraits, or visual metaphors only.
- **No decorative animation.** Every motion must serve comprehension. If removing the animation makes the content less clear, keep it. If removing it changes nothing, cut it.

### Performance

These are hard targets, not aspirational:

- **First Contentful Paint:** < 1.5s
- **No layout shift from font loading.** Use `font-display: swap` with well-matched system fallbacks. Termina is self-hosted; DM Sans and DM Serif Display via Google Fonts.
- **Images:** WebP with proper `srcset` for responsive sizes. Lazy-load below the fold.
- **Minimize third-party scripts.** Analytics and embeds load asynchronously, never block rendering.

### Component Patterns

- Prefer composable, focused components. One component, one job.
- Multiple related components can share a file when it makes logical sense (e.g., a card and its card-grid wrapper).
- Oatmeal components are a starting point, not sacred. Customize or replace when the design brief requires it.
- The comparison table (Block 7), before/after panel (Block 6, deferred), and blog 3-tier layout are all custom components that go beyond Oatmeal defaults.

### Responsive Design

| Breakpoint | Viewport   | Key Changes                                                                            |
| ---------- | ---------- | -------------------------------------------------------------------------------------- |
| Desktop    | ≥1200px    | Full layout, 3-column grids, side-by-side text+visual                                  |
| Tablet     | 768–1199px | 2-column grids, stacked hero, maintained spacing                                       |
| Mobile     | <768px     | Single column, stacked everything, reduced (but still generous) spacing, hamburger nav |

- Hero headline drops to 32-40px on mobile but retains Termina.
- Comparison table converts to card-per-row (swipe or accordion) on mobile.
- CTA buttons go full-width on mobile.
- "Get Started" CTA remains visible in mobile header at all times.

## Git Workflow

### Branch Strategy with Jujutsu (`jj`)

We use [Jujutsu](https://martinvonz.github.io/jj/) for version control, which enables stacked changes without the rebase pain of git branches.

```bash
jj new                        # Start a new change on top of current
jj describe -m "type: subject"  # Describe the change (conventional commit format)
jj new                        # Start the next change in the stack
jj log                        # View change graph
jj squash                     # Fold working copy into parent
jj edit <change-id>           # Jump to any change in the stack to amend it
jj rebase -r <change> -d <dest> # Move a change to a different parent
jj git push                   # Push to remote
```

If the project uses git instead of jj, follow standard branch conventions:

```bash
git checkout -b <type>/<short-description>   # e.g., feat/homepage-hero, fix/nav-mobile
```

### Commit Conventions

Use conventional commits. Keep them focused — one concern per commit.

```
type(scope): subject

body (optional — explain *why*, not *what*)
```

**Types:** `feat`, `fix`, `style`, `refactor`, `perf`, `chore`, `content`, `docs`, `ci`, `build`, `test`, `revert`

The `content` type is marketing-site specific — use it for copy, text, or content-only changes with no structural code change.

**Scope** is the page or component: `homepage`, `platform`, `exit-planning`, `pricing`, `about`, `blog`, `resources`, `nav`, `footer`, `cms`, `config`

**Examples:**

```
feat(homepage): add 3-pillar card grid with anchor links
style(homepage): increase section padding to match design brief spacing
content(homepage): add comparison table copy (Option D)
fix(nav): prevent layout shift on mobile hamburger toggle
refactor(cms): extract testimonial collection into reusable block
chore(config): add Termina font files and configure font-display swap
```

### Stacked Changes

Whether using jj or git, think in terms of stacked, reviewable units:

1. **One concern per change.** A "concern" is a logical unit: one block of a page, one component, one config change. Not "the entire homepage."
2. **Changes should be deployable independently** when possible. A half-built block with placeholder content is fine. A half-built block that breaks the page is not.
3. **Content changes are separate from structural changes.** If you're adding Block 7 (comparison table), the component structure is one change and the final copy selection is another. This makes content iteration easy without touching layout code.
4. **CMS schema changes are their own change**, separate from the frontend that consumes them. Schema changes are harder to undo — give them their own commit so they can be reviewed in isolation.

### Self-Review Checklist

Since PRs may ship without human review, run this before pushing:

- [ ] Does the page render correctly at desktop, tablet, and mobile breakpoints?
- [ ] Are there any pure whites (`#fff`, `white`) that should be Cream?
- [ ] Is the font usage correct? (Termina for headlines, DM Sans for body, DM Serif Display only in its 3-4 designated contexts)
- [ ] Are images optimized (WebP, srcset, lazy-loaded below fold)?
- [ ] Does the section spacing match the 20-30% Oatmeal override?
- [ ] Is the HTML semantic? (proper heading hierarchy, landmarks, alt text)
- [ ] Does content render without JavaScript?
- [ ] No console errors or warnings?
- [ ] Does it match the relevant planning doc? If it diverges, is the divergence documented in the commit message?

## Anti-Patterns (Hard Rules)

These are drawn from the design brief and are non-negotiable:

1. **No dark-mode-default tech aesthetic.** Warm cream, not near-black. (Exception: final CTA block and footer go dark.)
2. **No pure white backgrounds.** Every "white" surface is Cream (`ash-50`).
3. **No cold blues.** Ocean is muted and sparingly used. No bright or electric blues.
4. **No stock photography.**
5. **No decorative animation.** Every moving element must serve comprehension.
6. **No SaaS-generic feature grids.** The 3-pillar card system with deep-dive expansions replaces the standard "6 feature cards with icons" pattern.
7. **No aggressive urgency.** No countdown timers, no "limited spots" badges (unless Vanguard is active), no red urgency indicators.
8. **No visual clutter.** If it doesn't earn its place, it doesn't appear.
9. **No AI visual clichés.** No glowing neural networks, brain imagery, circuit boards, or gradient blobs. Visual identity comes from natural materials — moss, stone, leather, earth.
10. **No `npm` or `yarn`.** Use `pnpm` exclusively.
11. **No `eslint` or `prettier`.** Use `oxlint` and `oxfmt` exclusively. Run `pnpm lint` and `pnpm format:check` to verify.

## Development Workflow

### Quality Gates

Every commit goes through automated quality checks:

| Gate | Tool | Command |
|------|------|---------|
| Lint | oxlint | `pnpm lint` |
| Format | oxfmt | `pnpm format:check` |
| Types | TypeScript | `pnpm type-check` |
| Commit message | commitlint | enforced via husky |
| Pre-commit | lint-staged | auto-runs on staged files |

The pre-commit hook (lint-staged) automatically runs `oxlint --fix` and `oxfmt --write` on staged files before every commit. The commit-msg hook validates the message against commitlint.

### CI Workflows

GitHub Actions runs on every push and PR:

- **quality.yml** — format check, lint, type check (on push to non-main branches and PRs to main)
- **build.yml** — full `pnpm build` validation (on PRs to main only)

Cloudflare Pages handles deployment separately via its own integration — no deployment step in CI.

### Linting and Formatting

```bash
pnpm lint          # oxlint — check for errors
pnpm lint:fix      # oxlint --fix — auto-fix where possible
pnpm format        # oxfmt --write — format all files
pnpm format:check  # oxfmt --check — verify formatting
pnpm type-check    # tsc --noEmit — TypeScript type check
```

oxfmt config (`.oxfmtrc.json`): single quotes, no semi, trailing commas, Tailwind class sorting, import sorting. Matches previous Prettier style.

oxlint config (`.oxlintrc.json`): correctness (errors), suspicious (warnings), perf (warnings). React, JSX-A11y, Next.js, Import, Unicorn, Promise plugins. No opinionated style rules.

## Linear Project Tracking (Mandatory)

All planning and implementation work is tracked in **Linear** using the **MKT** team (Public Site). This is not optional — every plan and implementation task must be reflected in Linear.

### Rules

1. **Every plan = a Linear project.** When you create an implementation plan, create a corresponding Linear project in the MKT team. Attach the full plan as a Linear document on that project.
2. **Every implementation step = a Linear issue.** Each discrete step gets its own issue with clear title, description, and acceptance criteria. Set up `blockedBy`/`blocks` dependencies between issues when ordering matters.
3. **Track progress in real-time.** Move issues to "In Progress" when you start, "Done" when you finish. Don't leave stale statuses.
4. **Decisions and tradeoffs = comments.** When you make a meaningful choice (component selection, design brief interpretation, deviation from a planning doc, performance tradeoff), add a comment on the relevant issue explaining what was decided and why.
5. **Use the `/linear-track` skill** for the full workflow reference. It documents the exact tool calls, naming conventions, and example flows.

### Quick Reference

| Action                | Linear Tool                                 | Key Parameters                                                                  |
| --------------------- | ------------------------------------------- | ------------------------------------------------------------------------------- |
| Create project        | `mcp__claude_ai_Linear__save_project`       | `name`, `team: "MKT"`, `description`                                            |
| Attach plan doc       | `mcp__claude_ai_Linear__create_document`    | `title`, `project: [id]`, `content`                                             |
| Create issue          | `mcp__claude_ai_Linear__create_issue`       | `title`, `team: "MKT"`, `project`, `description`, `state`, `labels`, `priority` |
| Update issue status   | `mcp__claude_ai_Linear__update_issue`       | `id`, `state: "In Progress"/"Done"`                                             |
| Add decision comment  | `mcp__claude_ai_Linear__create_comment`     | `issueId`, `body`                                                               |
| Project status update | `mcp__claude_ai_Linear__save_status_update` | `type: "project"`, `id`, `body`, `status`                                       |

### Statuses

`Backlog` → `Ready` → `In Progress` → `Done` (also: `Canceled`, `Duplicate`)

### Labels

`Bug`, `Feature`, `Improvement`

## Before Starting Work

1. **Read the relevant planning doc.** Every page has a section in the implementation plan with content status tags. Check what exists (✅), what's partial (🟡), and what needs writing (🔴).
2. **Check the design brief.** Especially §9 (anti-patterns) and the component direction for whatever you're building.
3. **Check existing patterns.** How do similar components work in this codebase? Don't reinvent unless there's a reason.
4. **If requirements conflict, flag it.** The planning docs were written at different points. The homepage spec supersedes the implementation plan where they conflict. The design brief supersedes both on visual decisions.
5. **Think mobile-first.** Build the mobile layout, then enhance for larger viewports. The site's audience includes advisors checking it on their phones between meetings.
6. **When in doubt about copy, use what exists.** The homepage spec provides multiple copy options per block. Pick the one marked as recommended. If no recommendation exists, pick the most specific and concrete option — advisors trust specificity over abstraction.
7. **Create Linear tracking.** Before starting implementation, create the project, plan document, and issues in Linear. Track progress as you work.

## Document Precedence

When planning documents conflict:

1. **Design brief** — Final authority on visual decisions (color, type, spacing, anti-patterns)
2. **Homepage spec** — Final authority on homepage content and block structure
3. **Payload schema plan** — Final authority on CMS modeling
4. **Site architecture** — Authority on site-wide information architecture and messaging
5. **Implementation plan** — Authority on build order and content status
6. **Thematic analysis** — Reference material for design pattern decisions (not prescriptive)
