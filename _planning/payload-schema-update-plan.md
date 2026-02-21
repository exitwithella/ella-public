# Payload CMS Schema Update Plan

## Context

The current Payload schema has 7 collections (Users, Media, Posts, Pages, LandingPages, Authors, Categories), 6 basic blocks, and no globals. The homepage and about page are hardcoded in `src/app/(frontend)/_lib/content.ts`, not driven by Payload.

The target schema needs to support the full withella.io marketing site: homepage, platform, solutions, pricing, about, blog, and resources pages. This plan defines the complete schema — all collections, blocks, and globals — with simplifications from the original schema doc where complexity didn't earn its keep.

**This plan covers schema design only, not frontend implementation.**

---

## Key Design Decisions (departures from schema doc)

1. **Solutions uses blocks, not structured sections.** The schema doc has 10+ structured field groups (problemSection, solutionSteps, personas, etc.) plus a layout blocks field. Every one of those maps to a block type we're already building. Simplified to: metadata + hero group + waitlist fields + layout blocks. Eliminates duplication, and the blocks library handles composition.

2. **Hero is a group field, not a block.** Every page needs exactly one hero at the top. Making it a dedicated group field on Pages and Solutions enforces this and removes it from the block selector.

3. **Navigation is a global only.** Dropped page-level nav fields (`showInNav`, `navLabel`, `navOrder`). The Navigation global handles the full nav structure including dropdowns and mixed URL sources. A 7-10 page marketing site doesn't need auto-generated navigation.

4. **Block consolidations:**
   - Stats Strip → merged into Credibility Strip (stats variant + animateOnScroll)
   - Origin Story → merged into Content Section (added optional `link` and `badge` groups)
   - Persona Cards → merged into Card Grid (added `variant` field and per-card CTA fields)

5. **Testimonials simplified.** Dropped `usedOn` (would go stale immediately). Dropped `hasQuantifiedOutcome` boolean gate — just use optional metric fields directly. Kept `approved` and `source` for internal tracking.

6. **Authors → Team Members.** Renamed and expanded. `isAuthor` boolean filters who appears in the blog author picker.

---

## Shared Field Patterns

Define as reusable field arrays in `src/fields/`:

### `heroFields` → `src/fields/hero.ts`
Used as a group field on Pages and Solutions.

| Field | Type | Notes |
|-------|------|-------|
| `headline` | text (required) | |
| `subheadline` | textarea | |
| `primaryCTA` | group | `label`, `url`, `microcopy` (optional) |
| `secondaryCTA` | group | `label`, `url` |
| `visual` | group | `type` (select: image / video-loop / none), `media` → Media |
| `style` | select: default / dark / warm | Background treatment |

### `metaFields` → `src/fields/meta.ts`
Used on Pages, Solutions, Posts, Case Studies.

| Field | Type | Notes |
|-------|------|-------|
| `title` | text | SEO title override |
| `description` | textarea | Meta description |
| `image` | relationship → Media | OG image |

### `bgStyleField`
Inline select used across many blocks: `default / warm / dark`

---

## Collections

### Modified Collections

#### 1. Media (`src/collections/Media.ts`)

Add fields:

| Field | Type | Notes |
|-------|------|-------|
| `caption` | text | Optional display caption |
| `credit` | text | Photographer or source |
| `category` | select | headshot / product-screenshot / icon / partner-logo / blog-image / event-photo / illustration |

Existing `alt` (required) stays.

#### 2. Authors → Team Members (`src/collections/TeamMembers.ts`)

Rename collection slug from `authors` to `team-members`. Replace `src/collections/Authors.ts`.

| Field | Type | Notes |
|-------|------|-------|
| `name` | text (required) | |
| `slug` | text (unique) | |
| `role` | text | Job title |
| `bio` | textarea | 3-4 sentences |
| `photo` | upload → Media | Replaces `avatar` |
| `linkedIn` | text | URL |
| `twitter` | text | URL |
| `email` | email | |
| `isAuthor` | boolean | Filters who shows in blog author picker |
| `sortOrder` | number | Display ordering on About page |

#### 3. Categories (`src/collections/Categories.ts`)

Add fields to existing collection (serves as blog categories):

| Field | Type | Notes |
|-------|------|-------|
| `title` | text (required) | Exists — display label |
| `slug` | text (unique) | Exists |
| `internalLabel` | text | Manifesto pillar name, internal reference |
| `description` | textarea | |
| `sortOrder` | number | |

#### 4. Posts (`src/collections/Posts.ts`)

Modify existing fields and add new ones:

| Field | Type | Notes |
|-------|------|-------|
| `title` | text (required) | Exists |
| `slug` | text (unique) | Exists |
| `publishedDate` | date (required) | Exists |
| `author` | relationship → Team Members | **Change** relationTo from `authors` to `team-members`. Use `filterOptions` where `isAuthor: true` |
| `featuredImage` | upload → Media | Exists |
| `categories` | relationship → Categories (hasMany) | Exists |
| `content` | richText | Exists |
| `excerpt` | textarea | **Add** — for cards, RSS, social sharing |
| `tier` | select: hero / editors-pick / standard | **Add** — Ramp Velocity 3-tier blog layout |
| `disciplines` | relationship → Disciplines (hasMany) | **Add** — cross-reference to advisory disciplines |
| `relatedPosts` | relationship → Posts (hasMany) | **Add** — manual curation |
| `legacySlug` | text | **Add** — old exitwithella.io path for 301 redirects |
| `showNewsletterCTA` | boolean (default: true) | **Add** — toggle mid-post email capture |
| `status` | select: draft / published | **Add** |
| `meta` | group (metaFields) | **Add** — replaces flat `metaDescription` |
| ~~`metaDescription`~~ | — | **Remove** — moved to `meta.description` |
| ~~`videoEmbed`~~ | — | **Remove** — unused |

#### 5. Pages (`src/collections/Pages.ts`)

Significant restructure. Hero moves from blocks to dedicated group field.

| Field | Type | Notes |
|-------|------|-------|
| `title` | text (required) | Exists |
| `slug` | text (unique) | Exists |
| `hero` | group (heroFields) | **Add** — dedicated hero, not a block |
| `layout` | blocks field | Exists — **update** block palette (see Blocks section) |
| `status` | select: draft / published | **Add** |
| `publishedDate` | date | **Add** |
| `parent` | relationship → Pages (self) | **Add** — for nested pages (e.g., Platform > Security & Trust) |
| `meta` | group (metaFields) | **Add** — replaces flat `metaDescription` |
| ~~`metaDescription`~~ | — | **Remove** — moved to `meta.description` |

#### 6. LandingPages (`src/collections/LandingPages.ts`)

Update to match Pages enhancements and use new block palette.

| Field | Type | Notes |
|-------|------|-------|
| `title` | text (required) | Exists |
| `slug` | text (unique) | Exists |
| `campaign` | text | Exists |
| `hero` | group (heroFields) | **Add** — dedicated hero, same as Pages |
| `layout` | blocks field | Exists — **update** block palette to match Pages |
| `status` | select: draft / published | **Add** |
| `meta` | group (metaFields) | **Add** — replaces flat `metaDescription` |
| ~~`metaDescription`~~ | — | **Remove** — moved to `meta.description` |

---

### New Collections

#### 7. Disciplines (`src/collections/Disciplines.ts`)

Core taxonomy connecting Solutions, Posts, Case Studies, Testimonials, Tools.

| Field | Type | Notes |
|-------|------|-------|
| `name` | text (required) | e.g., "Exit Planning" |
| `slug` | text (unique) | |
| `description` | textarea | One-sentence summary |
| `status` | select: active / coming-soon | |
| `sortOrder` | number | |

Seed: Exit Planning, Wealth Advisory, Accounting & Tax Advisory, Legal Advisory

#### 8. Solutions (`src/collections/Solutions.ts`)

Advisory discipline pages. Simplified from schema doc — uses blocks for page body instead of structured sections.

| Field | Type | Notes |
|-------|------|-------|
| `title` | text (required) | e.g., "Exit Planning" |
| `slug` | text (unique) | URL: `/solutions/{slug}` |
| `discipline` | relationship → Disciplines | |
| `status` | select: draft / published / waitlist | |
| `isBeachhead` | boolean | Flags primary solution (Exit Planning) |
| `hero` | group (heroFields) | |
| `painPoints` | array of text | For waitlist pages: 3-4 bullet pain points |
| `waitlistCTA` | group | `headline`, `description`, `buttonLabel`, `emailCapture` (boolean). Conditional on `status=waitlist` |
| `layout` | blocks field | Same block palette as Pages. Full solution pages compose their body from blocks. |
| `meta` | group (metaFields) | |

Seed: Exit Planning (published, isBeachhead), Wealth Advisory (waitlist), Accounting & Tax Advisory (waitlist), Legal Advisory (waitlist)

#### 9. Testimonials (`src/collections/Testimonials.ts`)

Centralized testimonial management. Referenced by Testimonial Block across pages.

| Field | Type | Notes |
|-------|------|-------|
| `quote` | textarea (required) | |
| `attribution` | group | `name` (text), `title` (text), `firm` (text), `photo` → Media |
| `isAnonymous` | boolean | If true, show descriptor instead of name/firm |
| `anonymousDescriptor` | text | e.g., "Exit planning advisor, 20+ years experience" |
| `discipline` | relationship → Disciplines | |
| `persona` | select | advisor / firm-leader / cpa / attorney / wealth-manager / broker |
| `metricLabel` | text | e.g., "Time to first conversation" |
| `metricValue` | text | e.g., "3 days vs. 3 weeks" |
| `metricTimeframe` | text | e.g., "First 90 days" |
| `switchedFrom` | text | e.g., "Manual intake workflow" |
| `source` | select | conversation / interview / survey / existing-site |
| `approved` | boolean | Permission to use on site |
| `sortOrder` | number | |

#### 10. Partners (`src/collections/Partners.ts`)

Logos, badges, and organizational partnerships for social proof.

| Field | Type | Notes |
|-------|------|-------|
| `name` | text (required) | e.g., "Exit Planning Institute" |
| `type` | select | partnership / certification / backer / client-firm |
| `logo` | upload → Media | |
| `url` | text | Link to partner's site |
| `description` | text | Brief context (e.g., "Erie Insurance's venture studio") |
| `sortOrder` | number | |
| `showOnHomepage` | boolean | |

Seed: EPI, CEPA community, ei Innovations / Erie Insurance

#### 11. FAQ Items (`src/collections/FAQItems.ts`)

| Field | Type | Notes |
|-------|------|-------|
| `question` | text (required) | |
| `answer` | richText | |
| `category` | select | general / security / pricing / onboarding / product |
| `showOnPricing` | boolean | |
| `sortOrder` | number | |

#### 12. Pricing Tiers (`src/collections/PricingTiers.ts`)

| Field | Type | Notes |
|-------|------|-------|
| `name` | text (required) | e.g., "Workbench" |
| `slug` | text | Anchor ID on pricing page |
| `tagline` | text | e.g., "The accelerator" |
| `price` | text | Display string — text not number ("Free", "$5,000", "Contact Us") |
| `priceNote` | text | e.g., "per month", "one-time" |
| `description` | richText | What's included |
| `features` | array of text | Bullet list |
| `ctaLabel` | text | Button text |
| `ctaUrl` | text | Button destination |
| `highlighted` | boolean | Visual emphasis (recommended tier) |
| `sortOrder` | number | Journey sequence |
| `relatedTool` | relationship → Tools | If this tier maps to a free tool |

Seed: Start Free, Workbench, Vanguard, Community, Consulting

#### 13. Tools (`src/collections/Tools.ts`)

Directory entries for standalone tools.

| Field | Type | Notes |
|-------|------|-------|
| `title` | text (required) | e.g., "SOP Assessment" |
| `slug` | text | |
| `description` | textarea | |
| `toolUrl` | text | Link to the standalone app |
| `icon` | upload → Media | |
| `disciplines` | relationship → Disciplines (hasMany) | |
| `pricingTier` | select | free / paid / included-with-workbench |
| `capturesEmail` | boolean | |
| `sortOrder` | number | |
| `status` | select: active / coming-soon | |

Seed: SOP Assessment, Valuation Communication Tool

#### 14. Redirects (`src/collections/Redirects.ts`)

For the exitwithella.io → withella.io migration and future URL changes.

| Field | Type | Notes |
|-------|------|-------|
| `from` | text (required) | Source path |
| `to` | text (required) | Destination path or full URL |
| `type` | select: 301 / 302 | |
| `sourceDomain` | select | exitwithella.io / withella.io |
| `active` | boolean | |

---

### Fast-Follow Collections (schema defined, built within 30 days)

#### 15. Case Studies (`src/collections/CaseStudies.ts`)

| Field | Type | Notes |
|-------|------|-------|
| `title` | text (required) | |
| `slug` | text (unique) | URL: `/resources/case-studies/{slug}` |
| `advisor` | group | `name`, `title`, `firm`, `photo` → Media, `anonymous` (boolean) |
| `discipline` | relationship → Disciplines | |
| `challenge` | richText | |
| `approach` | richText | |
| `result` | richText | |
| `metrics` | array | Each: `label`, `before`, `after` |
| `pullQuote` | text | |
| `featuredImage` | upload → Media | |
| `status` | select: draft / published | |
| `publishedDate` | date | |
| `meta` | group (metaFields) | |

#### 16. Vanguard Events (`src/collections/VanguardEvents.ts`)

| Field | Type | Notes |
|-------|------|-------|
| `title` | text (required) | |
| `slug` | text | |
| `dates` | group | `startDate`, `endDate` |
| `location` | group | `venue`, `city`, `state` |
| `price` | number | |
| `capacity` | number | |
| `status` | select | upcoming / applications-open / sold-out / completed |
| `applicationUrl` | text | |
| `description` | richText | |
| `whatYouLeaveWith` | array of text | |
| `whoItsFor` | array of text | |
| `photos` | relationship → Media (hasMany) | |
| `testimonials` | relationship → Testimonials (hasMany) | |

---

## Blocks

All blocks go in `src/blocks/`. Pages, Solutions, and LandingPages share the same block palette via their `layout` field.

### Modified Blocks

#### 1. Content Block → Content Section (`src/blocks/ContentSection.ts`)

General-purpose rich text section. Absorbs Origin Story use case via optional link + badge.

| Field | Type | Notes |
|-------|------|-------|
| `sectionLabel` | text | Optional small-caps label above headline |
| `headline` | text | |
| `body` | richText | |
| `media` | group | `type` (select: image / illustration / none), `image` → Media, `position` (select: right / left / below) |
| `link` | group (collapsible) | `label`, `url` — for CTA links like "Read the full story" |
| `badge` | group (collapsible) | `text`, `logo` → Partners — for backing badges like "Built by ei Innovations" |
| `bgStyle` | select | default / warm / dark |

Replaces `src/blocks/Content.ts`.

#### 2. FeatureGrid → Card Grid (`src/blocks/CardGrid.ts`)

Cards with anchor linking and flexible display. Absorbs Persona Cards use case via variant field.

| Field | Type | Notes |
|-------|------|-------|
| `variant` | select: default / persona | Controls visual treatment |
| `sectionLabel` | text | Optional small-caps label |
| `headline` | text | |
| `columns` | select: 2 / 3 / 4 | |
| `cards` | array | See card fields below |

**Card fields:**

| Field | Type | Notes |
|-------|------|-------|
| `icon` | upload → Media | |
| `label` | text (required) | |
| `description` | textarea | |
| `anchorTarget` | text | ID of section this card links to (default variant) |
| `linkUrl` | text | For cards that link to a page |
| `ctaLabel` | text | Button text (persona variant) |

Replaces `src/blocks/FeatureGrid.ts`.

#### 3. Testimonials → Testimonial Block (`src/blocks/TestimonialBlock.ts`)

Changes from inline array to collection-backed.

| Field | Type | Notes |
|-------|------|-------|
| `variant` | select: single / carousel | |
| `testimonials` | relationship → Testimonials (hasMany) | |
| `showPhoto` | boolean | |
| `showMetric` | boolean | Show quantified outcome if available |
| `showSwitchedFrom` | boolean | Show "switched from" badge |
| `bgStyle` | select | default / warm / dark |

Replaces `src/blocks/Testimonials.ts`.

#### 4. CTA → CTA Section (`src/blocks/CTASection.ts`)

Enhanced with body text, closing line, and microcopy.

| Field | Type | Notes |
|-------|------|-------|
| `headline` | text | |
| `body` | richText | The narrative framing (e.g., "divide forming") |
| `closingLine` | text | Punchy closer (e.g., "Your methodology is your moat.") |
| `primaryCTA` | group | `label`, `url`, `microcopy` |
| `secondaryCTA` | group | `label`, `url` |
| `bgStyle` | select | warm / dark / default |

Replaces `src/blocks/CTA.ts`.

### Kept Block

#### 5. FormEmbed (`src/blocks/FormEmbed.ts`)

No changes. Keep as-is for Typeform/Loops/custom embeds.

### New Blocks

#### 6. Credibility Strip (`src/blocks/CredibilityStrip.ts`)

Horizontal banner for social proof. Absorbs Stats Strip via stats variant.

| Field | Type | Notes |
|-------|------|-------|
| `variant` | select: logos / statement / stats | |
| `statement` | textarea | Conditional on variant=statement |
| `logos` | relationship → Partners (hasMany) | Conditional on variant=logos |
| `stats` | array | Conditional on variant=stats. Each: `value` (text), `label` (text) |
| `animateOnScroll` | boolean | Conditional on variant=stats |
| `bgStyle` | select | warm / neutral / brand / dark |

#### 7. Feature Deep-Dive (`src/blocks/FeatureDeepDive.ts`)

Alternating text + visual sections for pillar expansions.

| Field | Type | Notes |
|-------|------|-------|
| `sectionId` | text | Anchor ID (for card grid linking) |
| `sectionLabel` | text | Small-caps label (e.g., "Fact Finding") |
| `headline` | text | |
| `body` | richText | |
| `capabilities` | array of text | Each: one capability sentence |
| `principleHighlight` | group | `label`, `description` (textarea) |
| `testimonial` | relationship → Testimonials | Optional embedded quote |
| `media` | group | `type` (select: screenshot / illustration / declarative-statement), `image` → Media, `declarativeText` (text, conditional on type=declarative-statement) |
| `layout` | select: text-left / text-right | Alternating direction |

#### 8. Comparison Table (`src/blocks/ComparisonTable.ts`)

Three-column "Old Way → Patchwork → With ELLA" generational framing.

| Field | Type | Notes |
|-------|------|-------|
| `headline` | text | |
| `subheadline` | textarea | |
| `columnLabels` | group | `col1`, `col2`, `col3` (all text) |
| `columnStyles` | group | `col1Color`, `col2Color`, `col3Color` (all text — hex or token) |
| `rows` | array | Each: `dimension` (text), `col1` (text), `col2` (text), `col3` (text), `icon` → Media (optional) |

#### 9. Trust & Security (`src/blocks/TrustSecurity.ts`)

Dedicated security messaging block. Kept as standalone for editorial clarity.

| Field | Type | Notes |
|-------|------|-------|
| `headline` | text | |
| `body` | richText | |
| `capabilities` | array | Each: `icon` → Media, `text` (text) |
| `closingLine` | text | |
| `detailPageLink` | group | `label`, `url` |

#### 10. Numbered Steps (`src/blocks/NumberedSteps.ts`)

7Analytics-style numbered walkthrough.

| Field | Type | Notes |
|-------|------|-------|
| `headline` | text | |
| `subheadline` | textarea | |
| `steps` | array | Each: `title` (text), `description` (textarea), `image` → Media (optional). Number is auto-incremented by frontend. |

#### 11. Solutions Selector (`src/blocks/SolutionsSelector.ts`)

Card-based layout for choosing an advisory discipline.

| Field | Type | Notes |
|-------|------|-------|
| `headline` | text | |
| `solutions` | relationship → Solutions (hasMany) | Pulls title, discipline, status |
| `showWaitlistBadge` | boolean | Show "Coming Soon" on waitlist solutions |

#### 12. FAQ Accordion (`src/blocks/FAQAccordion.ts`)

| Field | Type | Notes |
|-------|------|-------|
| `headline` | text | |
| `items` | relationship → FAQ Items (hasMany) | |
| `filterByCategory` | select | Optional: general / security / pricing / onboarding / product |

#### 13. Pricing Journey (`src/blocks/PricingJourney.ts`)

Journey visualization rather than tier comparison grid.

| Field | Type | Notes |
|-------|------|-------|
| `headline` | text | |
| `introBody` | richText | "Here's the path" framing |
| `tiers` | relationship → Pricing Tiers (hasMany, ordered) | |

#### 14. Newsletter Capture (`src/blocks/NewsletterCapture.ts`)

Standalone email capture block.

| Field | Type | Notes |
|-------|------|-------|
| `headline` | text | |
| `description` | textarea | |
| `placeholderText` | text | |
| `buttonLabel` | text | |
| `bgStyle` | select | default / warm / dark |

### Deferred Block (schema defined, built in fast-follow)

#### 15. Before/After Panel (`src/blocks/BeforeAfterPanel.ts`)

Interactive proof moment. Deferred from launch.

| Field | Type | Notes |
|-------|------|-------|
| `headline` | text | |
| `beforeLabel` | text | e.g., "The Current Workflow" |
| `afterLabel` | text | e.g., "With ELLA" |
| `steps` | array | Each: `beforeText`, `afterText`, `icon` → Media (optional) |
| `animation` | select: static / scroll-triggered / interactive | |

---

## Globals

### 1. Site Settings (`src/globals/SiteSettings.ts`)

| Field | Type | Notes |
|-------|------|-------|
| `siteName` | text | "ELLA" |
| `siteDescription` | textarea | Default meta description |
| `logo` | upload → Media | Primary logo |
| `logoLight` | upload → Media | Light variant for dark backgrounds |
| `favicon` | upload → Media | |
| `ogImage` | upload → Media | Default social sharing image |
| `socialLinks` | array | Each: `platform` (select: twitter / linkedin / other), `url` |
| `announcementBar` | group | `enabled` (boolean), `text`, `linkLabel`, `linkUrl`, `bgColor` |
| `analyticsId` | text | GA4 or analytics tracking ID |

### 2. Navigation (`src/globals/Navigation.ts`)

| Field | Type | Notes |
|-------|------|-------|
| `primaryNav` | array | Each: `label`, `type` (select: link / dropdown), `url` (conditional on type=link), `children` (array of `label` + `url` + `badge`, conditional on type=dropdown) |
| `primaryCTA` | group | `label`, `url`, `style` (select: primary / secondary) |
| `secondaryCTA` | group | `label`, `url`, `style` |

### 3. Footer (`src/globals/Footer.ts`)

| Field | Type | Notes |
|-------|------|-------|
| `columns` | array | Each: `heading`, `links` array (`label`, `url`) |
| `newsletterSection` | group | `heading`, `description`, `placeholderText`, `buttonLabel` |
| `legalLinks` | array | Each: `label`, `url` |
| `copyrightText` | text | |
| `showSocialLinks` | boolean | Pull from Site Settings socialLinks |

### 4. CTA Defaults (`src/globals/CTADefaults.ts`) — lower priority

Centralizes default CTA copy. Can be deferred if editors don't mind duplicating CTA text across blocks.

| Field | Type | Notes |
|-------|------|-------|
| `primaryLabel` | text | e.g., "Get Started" |
| `primaryUrl` | text | |
| `primaryMicrocopy` | text | e.g., "Your first 3 clients are on us." |
| `secondaryLabel` | text | e.g., "Book a Demo" |
| `secondaryUrl` | text | |

---

## Layout Block Palette

The `layout` blocks field on Pages, Solutions, and LandingPages accepts these blocks:

Content Section, Card Grid, Feature Deep-Dive, Credibility Strip, Comparison Table, Testimonial Block, CTA Section, Trust & Security, Numbered Steps, Solutions Selector, FAQ Accordion, Pricing Journey, Newsletter Capture, FormEmbed, Before/After Panel (when built)

**Not in the palette:** Hero (group field, not a block).

---

## Implementation Phases

### Phase 1: Shared fields + taxonomies
- Create `src/fields/hero.ts`, `src/fields/meta.ts`
- Create Disciplines collection
- Enhance Categories (add internalLabel, description, sortOrder)

### Phase 2: Reference collections
- Create Team Members (replace Authors)
- Create Testimonials, Partners, FAQ Items
- Create Pricing Tiers, Tools, Redirects

### Phase 3: Blocks
- Modify: Content Section, Card Grid, Testimonial Block, CTA Section
- Create: Credibility Strip, Feature Deep-Dive, Comparison Table, Trust & Security, Numbered Steps, Solutions Selector, FAQ Accordion, Pricing Journey, Newsletter Capture
- Remove: HeroBlock from block palette

### Phase 4: Primary collections
- Enhance Pages (hero group, meta group, status, parent, updated blocks)
- Enhance LandingPages (hero group, meta group, status, updated blocks)
- Enhance Posts (excerpt, tier, disciplines, relatedPosts, etc.)
- Create Solutions
- Enhance Media (caption, credit, category)

### Phase 5: Globals
- Create Site Settings, Navigation, Footer
- Optionally create CTA Defaults

### Phase 6: Fast-follow
- Create Case Studies, Vanguard Events collections
- Create Before/After Panel block

---

## Verification

- `pnpm payload generate:types` succeeds with no errors
- Admin panel loads showing all collections and globals
- Can create a Page with hero group + layout blocks composed from the full palette
- Can create a Solution with hero + waitlist fields + layout blocks
- Relationships work: Post → Team Members, Post → Disciplines, Testimonial Block → Testimonials collection, Credibility Strip → Partners
- Seed data: Disciplines (4), Categories (5), initial Partners (3), at least 1 Testimonial
- Generate and run migration against D1 database

---

## Files to Create

```
src/fields/hero.ts
src/fields/meta.ts
src/collections/Disciplines.ts
src/collections/TeamMembers.ts      (replaces Authors.ts)
src/collections/Testimonials.ts
src/collections/Partners.ts
src/collections/FAQItems.ts
src/collections/PricingTiers.ts
src/collections/Tools.ts
src/collections/Redirects.ts
src/collections/Solutions.ts
src/collections/CaseStudies.ts      (fast-follow)
src/collections/VanguardEvents.ts   (fast-follow)
src/blocks/ContentSection.ts        (replaces Content.ts)
src/blocks/CardGrid.ts              (replaces FeatureGrid.ts)
src/blocks/TestimonialBlock.ts      (replaces Testimonials.ts)
src/blocks/CTASection.ts            (replaces CTA.ts)
src/blocks/CredibilityStrip.ts
src/blocks/FeatureDeepDive.ts
src/blocks/ComparisonTable.ts
src/blocks/TrustSecurity.ts
src/blocks/NumberedSteps.ts
src/blocks/SolutionsSelector.ts
src/blocks/FAQAccordion.ts
src/blocks/PricingJourney.ts
src/blocks/NewsletterCapture.ts
src/blocks/BeforeAfterPanel.ts      (fast-follow)
src/globals/SiteSettings.ts
src/globals/Navigation.ts
src/globals/Footer.ts
src/globals/CTADefaults.ts          (lower priority)
```

## Files to Modify

```
src/payload.config.ts               (register all collections, globals, updated block palette)
src/collections/Media.ts            (add caption, credit, category)
src/collections/Pages.ts            (hero group, meta group, status, parent, updated blocks)
src/collections/LandingPages.ts     (hero group, meta group, status, updated blocks)
src/collections/Posts.ts             (excerpt, tier, disciplines, relatedPosts, meta group, etc.)
src/collections/Categories.ts       (add internalLabel, description, sortOrder)
```

## Files to Delete

```
src/collections/Authors.ts          (replaced by TeamMembers)
src/blocks/Hero.ts                  (hero becomes group field)
src/blocks/Content.ts               (replaced by ContentSection)
src/blocks/FeatureGrid.ts           (replaced by CardGrid)
src/blocks/Testimonials.ts          (replaced by TestimonialBlock)
src/blocks/CTA.ts                   (replaced by CTASection)
```
