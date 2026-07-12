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

### Database & Migration Rules

- **Never delete the local D1 SQLite file.** It contains persistent state beyond schema data — MCP agent keys, user logins, and other records that `pnpm seed` cannot regenerate. If schema conflicts arise (e.g. "index already exists" during `pushDevSchema`), resolve them by dropping only the specific conflicting tables via `sqlite3` or `wrangler d1 execute --local`. Never wipe the whole file.
- **Local dev uses `pushDevSchema` (automatic).** The dev server (`pnpm dev`) automatically pushes schema changes to local D1 — most changes are picked up without a restart. A restart is only needed if you encounter type errors on brand-new block types (the types file regenerates on restart). No manual migration step needed for local dev.
- **Production deploys require migration files.** Before deploying, generate a migration to capture schema changes: `NODE_OPTIONS=--no-deprecation npx payload migrate:create`. This creates a timestamped migration file in `src/migrations/`. The `pnpm run deploy` command runs `payload migrate` against the remote D1 before deploying the app. Do not run `pnpm payload migrate` locally — it targets the local D1 which already has the schema via `pushDevSchema`.
- **`pnpm seed` provides generic, complete baseline data.** The seed script establishes a working dev environment — reference collections (disciplines, categories, pricing tiers, partners) and a structurally complete homepage document with representative copy. It is not the source of final content.
- **Real content is created and edited via the Payload MCP server or admin UI.** Use `mcp__Payload__*` tools or `localhost:3000/admin` for all actual content work. Do not encode production copy in `seed.ts` — the seed is for developers bootstrapping a local environment, not for content management.

### Local ↔ Production content sync

Payload's D1/R2 access flows through a single binding switch in `src/payload.config.ts` (`remoteBindings`, gated by the `REMOTE_BINDINGS` env var). Setting `REMOTE_BINDINGS=true` points the dev server, `dump`, and `seed` at the **remote production** D1 + R2 instead of local miniflare. All of this requires Cloudflare auth first: `wrangler login` (or export `CLOUDFLARE_API_TOKEN`).

**Bindings default to LOCAL everywhere** — including `next build` (CI validation builds run unauthenticated against a fresh local D1). Remote is strictly opt-in via `REMOTE_BINDINGS=true`; the deploy scripts (`cf:build`, `deploy:app`, `deploy:database`) pass it explicitly because the production build bakes SSG pages from prod content and migrations must land in remote D1. The explicit flag also overrides wrangler's default of honoring the `"remote": true` binding markers in `wrangler.jsonc` whenever auth happens to exist.

- **`pnpm content:pull`** — dump prod → `src/seed-data/*.json`, seed into **local** D1, pull prod media blobs into local R2. Refreshes your local environment with real production content. (Overwrites uncommitted `src/seed-data/` working content.)
- **`pnpm content:push`** — dump **local** content, then (after a typed confirmation) seed into **production** D1 and push media blobs to prod R2. Pull a backup first if unsure.
- **`pnpm dev:remote`** — run the local dev server/admin directly against **production** (after confirmation). Every save in the admin writes to live prod D1, and it's slower (per-query network round-trips). Use for inspection/occasional edits, not day-to-day dev.
- **`pnpm dump:remote` / `pnpm seed:remote`** — low-level remote-targeted variants of dump/seed (seed is confirmation-gated).
- **Every production write is guarded** by `scripts/confirm-remote.ts` — a typed confirmation prompt. Bypass in CI with `CONFIRM_REMOTE=yes`. Reads (pull/dump:remote) are not gated.
- Plain `pnpm dev` / `pnpm seed` / `pnpm dump` are unchanged — they always target local D1.

### Tailwind & Design System

The design brief (`_planning/design-brief.md`) defines the complete visual system. Key rules enforced in code:

- **No pure whites.** Background default is Cream (`sandstone-100` / `#F5F5F0`), not `#ffffff`.
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
jj commit -m "type: subject"    # Describe current change + start a clean working copy (preferred)
jj describe -m "type: subject"  # Describe a change without starting a new one
jj new                          # Start a new empty change on top of current
jj log                          # View change graph
jj squash                       # Fold working copy into parent
jj edit <change-id>             # Jump to any change in the stack to amend it
jj rebase -r <change> -d <dest> # Move a change to a different parent
jj git push                     # Push to remote
```

If the project uses git instead of jj, follow standard branch conventions:

```bash
git checkout -b <type>/<short-description>   # e.g., feat/homepage-hero, fix/nav-mobile
```

### Git Worktrees (Conductor Workspaces) ↔ jj

Conductor workspaces are **linked git worktrees** sharing the main repo's `.git`. jj does not operate inside them (no `.jj` there — jj commands simply fail), so **work in a worktree uses plain git**: sequential conventional commits on the workspace branch, one concern per commit, same stacking discipline as jj.

**Bringing worktree commits back to the jj workspace — there is nothing to export.** The commits and branch ref already live in the shared object store. In the main workspace:

```bash
jj git import    # or any jj command — colocated repos auto-import git refs
jj log -r 'main..<branch-name>'          # the stack appears as jj changes
jj rebase -b <branch-name> -d main       # only if main moved in the meantime
```

**Integrating (prefer the PR flow** — `build.yml` full-build CI only runs on PRs to main**):**

```bash
jj git push --bookmark <branch-name>
gh pr create --base main --head <branch-name>   # --head is REQUIRED (see below)
```

Gotchas, learned the hard way:

- **`gh pr create` cannot infer the branch in a jj workspace** — jj keeps git's HEAD permanently detached, so `gh` reports "not on any branch". Always pass `--head <branch-name>`, or run `gh` from the worktree where the branch is checked out.
- **Never force `jj bookmark set main -r @` past a refusal.** "Refusing to move bookmark backwards or sideways" means `@` is not actually on the stack you want to land — do **not** reach for `--allow-backwards`. The explicit fast-forward form is `jj bookmark set main -r <branch-name>` (only when intentionally skipping the PR flow).
- **After the PR merges:** `jj git fetch` in the main workspace advances `main`; archive/remove the Conductor worktree **before** deleting the branch — git refuses to delete a branch checked out in a live worktree.

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

These are drawn from the design brief and are non-negotiable. Rules #10–#13 are **hook-enforced** — the shared command guard (`scripts/agent-hooks/classify-command.sh`, wired into Claude's `PreToolUse` and Cursor's `beforeShellExecution`) blocks the corresponding commands outright.

1. **No dark-mode-default tech aesthetic.** Warm cream, not near-black. (Exception: final CTA block and footer go dark.)
2. **No pure white backgrounds.** Every "white" surface is Cream (`sandstone-100`).
3. **No cold blues.** Ocean is muted and sparingly used. No bright or electric blues.
4. **No stock photography.**
5. **No decorative animation.** Every moving element must serve comprehension.
6. **No SaaS-generic feature grids.** The 3-pillar card system with deep-dive expansions replaces the standard "6 feature cards with icons" pattern.
7. **No aggressive urgency.** No countdown timers, no "limited spots" badges (unless Vanguard is active), no red urgency indicators.
8. **No visual clutter.** If it doesn't earn its place, it doesn't appear.
9. **No AI visual clichés.** No glowing neural networks, brain imagery, circuit boards, or gradient blobs. Visual identity comes from natural materials — moss, stone, leather, earth.
10. **No `npm` or `yarn`.** Use `pnpm` exclusively.
11. **No `eslint` or `prettier`.** Use `oxlint` and `oxfmt` exclusively. Run `pnpm lint` and `pnpm format:check` to verify.
12. **Never delete the local D1 SQLite file.** Drop specific conflicting tables instead. See Database & Migration Rules above.
13. **Generate migrations before deploying.** Most schema changes are picked up by the running dev server automatically. Before deploying, run `NODE_OPTIONS=--no-deprecation npx payload migrate:create` to generate a migration file for production. The deploy command applies it to the remote D1.

## Development Workflow

### Agent Browser (Visual Testing & Interaction)

`agent-browser` is a Chromium automation CLI for AI agents and developers. It provides persistent browser sessions for visual review, interaction testing, and screenshots.

**Setup:** Run `bash scripts/setup-browser-profile.sh` to install and create the profile. Then `agent-browser --headed open http://localhost:3000/admin` to log into Payload and save the session.

**Config:** `agent-browser.json` at project root sets the profile path (`.browser-profile/`) and defaults. No flags needed per-command.

**Permissions:** Add `"Bash(agent-browser:*)"` to `.claude/settings.local.json` → `permissions.allow` array to allow Claude Code to run agent-browser without prompting.

**Key commands:**

- `agent-browser open <url>` — navigate
- `agent-browser snapshot -i` — accessibility tree with interactive element refs (`@e1`, `@e2`)
- `agent-browser click @e1` — click a ref from snapshot
- `agent-browser screenshot [path]` — capture the page
- `agent-browser set device "iPhone 14"` — mobile viewport
- `agent-browser --headed open <url>` — visible browser window

**Profile:** `.browser-profile/` stores persistent browser state (cookies, localStorage, auth sessions). Gitignored. Recreate via the setup script + re-authenticating.

**Skills:** Two Claude Code skills are installed:

- `.claude/skills/agent-browser/` — official command reference (installed via `npx skills add vercel-labs/agent-browser`)
- `.claude/skills/agent-browser-ella.md` — ELLA-specific workflows and URLs

### Quality Gates

Every commit goes through automated quality checks:

| Gate           | Tool        | Command                   |
| -------------- | ----------- | ------------------------- |
| Lint           | oxlint      | `pnpm lint`               |
| Format         | oxfmt       | `pnpm format:check`       |
| Types          | TypeScript  | `pnpm type-check`         |
| Commit message | commitlint  | enforced via husky        |
| Pre-commit     | lint-staged | auto-runs on staged files |

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

## Linear Project Tracking

Linear tracking for the **MKT** team (Public Site) is available and should be used when explicitly requested or for larger multi-session initiatives. Don't create Linear projects, documents, or issues unless asked.

### When to use Linear

- User asks to track something in Linear
- A large feature spans multiple sessions and needs structured tracking
- You're working from an existing Linear issue (`MKT-NNN` in the prompt or commit message)

### Rules (when Linear tracking is active)

1. **For large initiatives: project + issues.** When asked to set up tracking for a significant piece of work, create a Linear project in the MKT team, attach the plan as a document, and create issues for each implementation step with `blockedBy`/`blocks` dependencies where ordering matters.
2. **For smaller tasks: issues only.** When tracking individual work items, create issues without a project unless one already exists.
3. **Track progress in real-time.** Don't leave stale statuses.
   - **Starting work:** Move referenced issues to "In Progress" before writing code.
   - **Committing:** When a jj/git commit message references MKT issue(s) (`MKT-\d+` in subject or body), move those issues to "In Review" immediately after the commit succeeds. This is a hard rule — never leave referenced issues in a pre-review state after a successful commit.
4. **Decisions and tradeoffs = comments.** When you make a meaningful choice (component selection, design brief interpretation, deviation from a planning doc, performance tradeoff), add a comment on the relevant issue explaining what was decided and why.

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

`Backlog` → `Ready` → `In Progress` → `In Review` → `Done` (also: `Canceled`, `Duplicate`)

### Labels

`Bug`, `Feature`, `Improvement`

## Claude Code Skills

The following skills are available and should be actively invoked when relevant. Use the `/skill-name` shorthand or `Skill` tool.

### Frontend & Next.js Skills (use proactively)

| Skill                           | Invoke                         | When to Use                                                                                                                                                          |
| ------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **vercel-react-best-practices** | `/vercel-react-best-practices` | When writing or reviewing any React component, Next.js page, data fetching pattern, or bundle optimization. Invoke before shipping any server/client component work. |
| **frontend-design**             | `/frontend-design`             | When building new UI sections, components, or page layouts. Provides production-grade design quality guidance and avoids generic AI-aesthetic patterns.              |
| **rams**                        | `/rams`                        | Before marking any page "done" — runs accessibility and visual design review. Required for every page ship per the self-review checklist.                            |

### Project Management Skills

| Skill                  | Invoke                | When to Use                                                         |
| ---------------------- | --------------------- | ------------------------------------------------------------------- |
| **Notion:tasks:plan**  | `/Notion:tasks:plan`  | When given a Notion page URL with feature/task description to plan. |
| **Notion:tasks:build** | `/Notion:tasks:build` | When given a Notion page URL to start implementation.               |

### Commit & Review Skills

| Skill              | Invoke            | When to Use                                                                      |
| ------------------ | ----------------- | -------------------------------------------------------------------------------- |
| **clean-comments** | `/clean-comments` | Before committing — removes redundant comments while preserving meaningful ones. |

### Usage Rules

- **`vercel-react-best-practices`** is mandatory context for any component work. If you're about to write a new server or client component, invoke it first. The site targets Cloudflare Workers runtime — this skill's async/bundle guidance is directly applicable.
- **`frontend-design`** replaces "build from scratch with generic patterns." When a new block or section is needed, invoke this skill alongside checking the Oatmeal kit.
- **`rams`** is part of the self-review checklist — run it before pushing any page-level work.

## Compound Engineering

Every unit of work should make the next one cheaper. The loop is **plan → work → review → compound**: after solving something, capture the lesson so it's searchable instead of re-debugged. Because PRs here can ship without human review, the compounding step is enforced by hooks, not discipline.

- **Where lessons live:** `docs/solutions/` — one file per solved problem, YAML frontmatter following `.agents/skills/ce-compound/references/schema.yaml`. `docs/solutions/README.md` has the format contract. `INDEX.md` and `.cursor/rules/compound-lessons.mdc` are **generated** from frontmatter (`scripts/agent-hooks/gen-lessons-index.sh`) — never hand-edit them.
- **When to run `/ce-compound`:** after fixing a non-obvious bug, discovering a toolchain/CMS/deploy gotcha, or making a tradeoff worth remembering. Not for routine feature work or copy.
- **The nudge:** the Stop hook reminds you to run `/ce-compound` when a branch has a `fix:`/`perf:`/`refactor:` commit but no new solution doc. `feat:`/`content:`/`style:`/`docs:`/`chore:` never trigger it. If nothing's worth capturing, just stop again — it won't repeat.
- **Surfacing:** the solutions index is injected at session start (Claude) and always-applied (Cursor), so prior art is available from turn one. Search `docs/solutions/` before debugging.
- **Precedence:** the `superpowers:*` skills remain the primary process workflow (brainstorming, TDD, systematic-debugging). The `ce-*` skills add persistent capture (`ce-compound`, `ce-compound-refresh`), compound-tuned entry points (`ce-plan`, `ce-work`), and PR care (`ce-babysit-pr`, `ce-resolve-pr-feedback`) on top — they don't replace superpowers.

## Before Starting Work

0. **Search `docs/solutions/` for prior art before debugging.** If this problem (or one like it) was solved before, the fix is already written down.
1. **Read the relevant planning doc.** Every page has a section in the implementation plan with content status tags. Check what exists (✅), what's partial (🟡), and what needs writing (🔴).
2. **Check the design brief.** Especially §9 (anti-patterns) and the component direction for whatever you're building.
3. **Check existing patterns.** How do similar components work in this codebase? Don't reinvent unless there's a reason.
4. **Invoke the `vercel-react-best-practices` skill** for any component or page work before writing code.
5. **Invoke the `frontend-design` skill** when building new sections or layouts.
6. **If requirements conflict, flag it.** The planning docs were written at different points. The homepage spec supersedes the implementation plan where they conflict. The design brief supersedes both on visual decisions.
7. **Think mobile-first.** Build the mobile layout, then enhance for larger viewports. The site's audience includes advisors checking it on their phones between meetings.
8. **When in doubt about copy, use what exists.** The homepage spec provides multiple copy options per block. Pick the one marked as recommended. If no recommendation exists, pick the most specific and concrete option — advisors trust specificity over abstraction.
9. **Create Linear tracking if requested.** When asked, create a project, plan document, and/or issues in the MKT team. Don't create tracking unless explicitly requested.
10. **Run `/rams`** before marking any page complete.

## Document Precedence

When planning documents conflict:

1. **Design brief** — Final authority on visual decisions (color, type, spacing, anti-patterns)
2. **Homepage spec** — Final authority on homepage content and block structure
3. **Payload schema plan** — Final authority on CMS modeling
4. **Site architecture** — Authority on site-wide information architecture and messaging
5. **Implementation plan** — Authority on build order and content status
6. **Thematic analysis** — Reference material for design pattern decisions (not prescriptive)
