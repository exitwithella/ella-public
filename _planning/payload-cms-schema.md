# withella.io — Payload CMS Content Inventory & Schema

A complete inventory of collections, globals, blocks, and taxonomies needed to build the withella.io marketing site on Payload CMS. Derived from the site architecture document, implementation plan, homepage spec v2, and thematic analysis.

---

## How This Document Works

Payload CMS organizes content into four structural concepts:

- **Collections** — Content types with multiple entries (blog posts, team members, case studies). Each gets its own admin panel listing view.
- **Globals** — Singleton content that exists once (site settings, navigation, footer). Edited directly, no listing view.
- **Blocks** — Reusable content modules that can be composed into pages via a page builder field. These are the Lego bricks.
- **Taxonomies** — Category and tag systems that create relationships between content. Implemented as collections with relationship fields.

The schema below is organized by these four concepts, with field-level detail for each.

---

## Part 1: Collections

### 1.1 Pages

The primary content collection. Every marketing page (Homepage, Platform, About, Community, Pricing) is a Page with a flexible block-based layout.

| Field              | Type                        | Notes                                                                                                                                    |
| ------------------ | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `title`            | text (required)             | Page title, used in nav and browser tab                                                                                                  |
| `slug`             | text (unique, required)     | URL path. Auto-generated from title, editable.                                                                                           |
| `meta.title`       | text                        | SEO title override (falls back to `title`)                                                                                               |
| `meta.description` | text                        | SEO meta description                                                                                                                     |
| `meta.image`       | relationship → Media        | OG image for social sharing                                                                                                              |
| `hero`             | group                       | Dedicated hero fields (see Hero Block below) — separated from layout blocks because every page needs one and the structure is consistent |
| `layout`           | blocks field                | Array of reusable content blocks (see Part 3). This is the page builder.                                                                 |
| `status`           | select: draft / published   | Content workflow                                                                                                                         |
| `publishedDate`    | date                        | Controls display ordering where relevant                                                                                                 |
| `parent`           | relationship → Pages (self) | For nested pages (e.g., Platform > Security & Trust)                                                                                     |
| `showInNav`        | boolean                     | Whether this page appears in the primary navigation                                                                                      |
| `navLabel`         | text                        | Optional override for how it displays in nav (shorter than full title)                                                                   |
| `navOrder`         | number                      | Sort position in navigation                                                                                                              |

**Seed pages at launch:** Homepage, Platform, Security & Trust, Pricing, About, Community, Resources (landing)

---

### 1.2 Solutions

Advisory discipline pages. Structurally similar to Pages but with discipline-specific fields that support the "Solutions as Verticals" architecture.

| Field                | Type                                 | Notes                                                                                            |
| -------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `title`              | text (required)                      | e.g., "Exit Planning"                                                                            |
| `slug`               | text (unique)                        | URL: `/solutions/{slug}`                                                                         |
| `discipline`         | relationship → Disciplines           | Links to the taxonomy                                                                            |
| `status`             | select: draft / published / waitlist | Waitlist status for future disciplines                                                           |
| `isBeachhead`        | boolean                              | Flags the primary solution (Exit Planning). Controls how prominently it appears site-wide.       |
| `hero`               | group                                | Headline, subhead, hero visual                                                                   |
| `problemSection`     | group                                | Header, body (rich text), embedded quote (relationship → Testimonials)                           |
| `solutionSteps`      | array                                | Numbered walkthrough. Each entry: `stepNumber` (auto), `title`, `description`, `icon` or `image` |
| `opportunitySection` | group                                | Header, body — the "engaging earlier" or aspirational framing                                    |
| `personas`           | array                                | Each: `personaLabel`, `personaDescription`, `icon`. For the "Who It's For" blocks.               |
| `macroContext`       | group                                | Header, body, stat callout — Silver Tsunami or equivalent macro framing                          |
| `socialProof`        | group                                | Testimonials (relationship → Testimonials[]), partnership badges (relationship → Partners[])     |
| `layout`             | blocks field                         | Additional flexible blocks below the structured sections                                         |
| `meta`               | group                                | SEO fields (title, description, image)                                                           |
| `painPoints`         | array of text                        | For lightweight/waitlist solution pages: 3-4 bullet pain points                                  |
| `waitlistCTA`        | group                                | Headline, description, button label, email capture toggle                                        |

**Seed entries:** Exit Planning (full), Wealth Advisory (waitlist), Accounting & Tax Advisory (waitlist), Legal Advisory (waitlist)

---

### 1.3 Blog Posts

| Field               | Type                                   | Notes                                                                                            |
| ------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `title`             | text (required)                        |                                                                                                  |
| `slug`              | text (unique)                          | URL: `/resources/blog/{slug}`                                                                    |
| `author`            | relationship → Team Members            |                                                                                                  |
| `publishedDate`     | date (required)                        |                                                                                                  |
| `category`          | relationship → Blog Categories         | Primary category (one of five pillars)                                                           |
| `disciplines`       | relationship → Disciplines (hasMany)   | Cross-reference: which advisory disciplines does this post relate to?                            |
| `excerpt`           | textarea                               | Used in cards, RSS, social sharing                                                               |
| `featuredImage`     | relationship → Media                   |                                                                                                  |
| `content`           | rich text                              | Full post body. Payload's Lexical editor with custom blocks for callouts, embedded quotes, CTAs. |
| `tier`              | select: hero / editors-pick / standard | Controls placement in the Ramp Velocity 3-tier blog layout                                       |
| `status`            | select: draft / published              |                                                                                                  |
| `meta`              | group                                  | SEO fields                                                                                       |
| `relatedPosts`      | relationship → Blog Posts (hasMany)    | Manual curation of related content                                                               |
| `legacySlug`        | text                                   | For migrated posts: the old exitwithella.io path, used to generate 301 redirects                 |
| `showNewsletterCTA` | boolean (default: true)                | Toggle mid-post email capture                                                                    |

---

### 1.4 Case Studies

| Field           | Type                       | Notes                                                                                                               |
| --------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `title`         | text (required)            |                                                                                                                     |
| `slug`          | text (unique)              | URL: `/resources/case-studies/{slug}`                                                                               |
| `advisor`       | group                      | `name`, `title`, `firm`, `photo` (relationship → Media), `anonymous` (boolean — if true, show role descriptor only) |
| `discipline`    | relationship → Disciplines | Which advisory discipline                                                                                           |
| `challenge`     | rich text                  | What the advisor was dealing with                                                                                   |
| `approach`      | rich text                  | How ELLA was used                                                                                                   |
| `result`        | rich text                  | The outcome                                                                                                         |
| `metrics`       | array                      | Each: `label` (e.g., "Time to first conversation"), `before`, `after`. Quantified proof points.                     |
| `pullQuote`     | text                       | The single strongest quote from this advisor                                                                        |
| `featuredImage` | relationship → Media       |                                                                                                                     |
| `status`        | select: draft / published  |                                                                                                                     |
| `publishedDate` | date                       |                                                                                                                     |
| `meta`          | group                      | SEO fields                                                                                                          |

---

### 1.5 Team Members

| Field       | Type                 | Notes                                              |
| ----------- | -------------------- | -------------------------------------------------- |
| `name`      | text (required)      |                                                    |
| `role`      | text                 | Job title                                          |
| `bio`       | textarea             | 3-4 sentences per the implementation plan          |
| `photo`     | relationship → Media | Headshot                                           |
| `linkedIn`  | text                 | URL                                                |
| `twitter`   | text                 | URL                                                |
| `email`     | email                |                                                    |
| `isAuthor`  | boolean              | Can this person be assigned as a blog post author? |
| `sortOrder` | number               | Display ordering on About page                     |

---

### 1.6 Testimonials

A dedicated collection because testimonials are reused across multiple pages (homepage, solutions, platform, pricing). Centralizing them prevents duplication and makes it easy to manage attribution approvals.

| Field                  | Type                                                                     | Notes                                                                                           |
| ---------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `quote`                | textarea (required)                                                      | The testimonial text                                                                            |
| `attribution`          | group                                                                    | `name`, `title`, `firm`, `photo` (relationship → Media)                                         |
| `isAnonymous`          | boolean                                                                  | If true, show role descriptor instead of name/firm                                              |
| `anonymousDescriptor`  | text                                                                     | e.g., "Exit planning advisor, 20+ years experience"                                             |
| `discipline`           | relationship → Disciplines                                               | Which advisory discipline this person represents                                                |
| `persona`              | select: advisor / firm-leader / cpa / attorney / wealth-manager / broker | Rough categorization for filtering                                                              |
| `hasQuantifiedOutcome` | boolean                                                                  | Flag for testimonials that include a specific metric                                            |
| `metric`               | group (conditional on hasQuantifiedOutcome)                              | `label`, `value`, `timeframe`                                                                   |
| `switchedFrom`         | text                                                                     | What they migrated from, if applicable (e.g., "Manual intake workflow," "Spreadsheet tracking") |
| `source`               | select: conversation / interview / survey / existing-site                | Where the quote originated — for internal tracking                                              |
| `approved`             | boolean                                                                  | Has the person given permission to use this on the site?                                        |
| `usedOn`               | relationship → Pages + Solutions (hasMany, read-only/informational)      | Track where this testimonial appears                                                            |

**Seed entries:** Kevin (VFM) quote, Lisa (Small Business Alternatives) quote, "one-size-fits-all" anonymous advisor quote

---

### 1.7 Partners

Logos, badges, and organizational partnerships displayed as social proof.

| Field             | Type                                                       | Notes                                                        |
| ----------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| `name`            | text (required)                                            | e.g., "Exit Planning Institute"                              |
| `type`            | select: partnership / certification / backer / client-firm |                                                              |
| `logo`            | relationship → Media                                       |                                                              |
| `url`             | text                                                       | Link to partner's site                                       |
| `description`     | text                                                       | Brief context line (e.g., "Erie Insurance's venture studio") |
| `sortOrder`       | number                                                     | Display ordering                                             |
| `showOnHomepage`  | boolean                                                    |                                                              |
| `showOnSolutions` | relationship → Solutions (hasMany)                         | Which solution pages should display this partner             |

**Seed entries:** EPI, CEPA community, ei Innovations / Erie Insurance

---

### 1.8 Vanguard Events

| Field              | Type                                                        | Notes                                                          |
| ------------------ | ----------------------------------------------------------- | -------------------------------------------------------------- |
| `title`            | text (required)                                             | e.g., "Vanguard Spring 2026"                                   |
| `slug`             | text                                                        | URL: `/vanguard/{slug}` or displayed on the main Vanguard page |
| `dates`            | group                                                       | `startDate`, `endDate`                                         |
| `location`         | group                                                       | `venue`, `city`, `state`                                       |
| `price`            | number                                                      |                                                                |
| `capacity`         | number                                                      | e.g., 15-20                                                    |
| `status`           | select: upcoming / applications-open / sold-out / completed |                                                                |
| `applicationUrl`   | text                                                        | Link to application form                                       |
| `description`      | rich text                                                   | Event-specific copy                                            |
| `whatYouLeaveWith` | array of text                                               | Bullet list of outcomes                                        |
| `whoItsFor`        | array of text                                               | Audience descriptors                                           |
| `photos`           | relationship → Media (hasMany)                              | Post-event gallery                                             |
| `testimonials`     | relationship → Testimonials (hasMany)                       | Participant feedback                                           |

---

### 1.9 Tools

Directory entries for standalone tools (SOP Assessment, Valuation Communication Tool, future tools).

| Field           | Type                                          | Notes                                         |
| --------------- | --------------------------------------------- | --------------------------------------------- |
| `title`         | text (required)                               | e.g., "SOP Assessment"                        |
| `slug`          | text                                          | URL: `/resources/tools/{slug}` (landing page) |
| `description`   | textarea                                      | What the tool does and who it's for           |
| `toolUrl`       | text                                          | Link to the standalone app experience         |
| `icon`          | relationship → Media                          |                                               |
| `discipline`    | relationship → Disciplines (hasMany)          | Which disciplines benefit                     |
| `pricingTier`   | select: free / paid / included-with-workbench | How it relates to the pricing journey         |
| `capturesEmail` | boolean                                       | Whether the tool has an email gate            |
| `sortOrder`     | number                                        |                                               |
| `status`        | select: active / coming-soon                  |                                               |

**Seed entries:** SOP Assessment, Valuation Communication Tool

---

### 1.10 Pricing Tiers

| Field          | Type                           | Notes                                                                                                  |
| -------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `name`         | text (required)                | e.g., "Workbench"                                                                                      |
| `slug`         | text                           | Anchor ID on pricing page                                                                              |
| `tagline`      | text                           | Short descriptor (e.g., "The accelerator")                                                             |
| `price`        | text                           | Display string — text not number, because "Free," "$5,000," "$1,000/mo," "Contact Us" all need to work |
| `priceNote`    | text                           | e.g., "per month," "one-time," "custom"                                                                |
| `description`  | rich text                      | What's included                                                                                        |
| `features`     | array of text                  | Bullet list of included capabilities                                                                   |
| `ctaLabel`     | text                           | Button text (e.g., "Try It Free," "Apply," "Contact Us")                                               |
| `ctaUrl`       | text                           | Button destination                                                                                     |
| `highlighted`  | boolean                        | Visual emphasis (the recommended tier)                                                                 |
| `sortOrder`    | number                         | Journey sequence: Free → Workbench → Vanguard → Community → Consulting                                 |
| `relatedTool`  | relationship → Tools           | If this tier maps to a free tool                                                                       |
| `relatedEvent` | relationship → Vanguard Events | If this tier maps to an event                                                                          |

**Seed entries:** Start Free, Workbench, Vanguard, Community, Consulting

---

### 1.11 FAQ Items

| Field           | Type                                                        | Notes                                                 |
| --------------- | ----------------------------------------------------------- | ----------------------------------------------------- |
| `question`      | text (required)                                             |                                                       |
| `answer`        | rich text                                                   |                                                       |
| `category`      | select: general / security / pricing / onboarding / product | For grouping on the pricing page or a future FAQ page |
| `showOnPricing` | boolean                                                     |                                                       |
| `sortOrder`     | number                                                      |                                                       |

---

### 1.12 Redirects

For managing the exitwithella.io → withella.io migration and future URL changes.

| Field          | Type                                  | Notes                                     |
| -------------- | ------------------------------------- | ----------------------------------------- |
| `from`         | text (required)                       | Source path (e.g., `/blog/old-post-slug`) |
| `to`           | text (required)                       | Destination path or full URL              |
| `type`         | select: 301 / 302                     | Permanent vs. temporary                   |
| `sourceDomain` | select: exitwithella.io / withella.io | Which domain this redirect applies to     |
| `active`       | boolean                               |                                           |

---

### 1.13 Media

Payload's built-in media collection, extended with custom fields.

| Field      | Type                                                                                                  | Notes                                    |
| ---------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `alt`      | text (required)                                                                                       | Accessibility text                       |
| `caption`  | text                                                                                                  | Optional display caption                 |
| `credit`   | text                                                                                                  | Photographer or source                   |
| `category` | select: headshot / product-screenshot / icon / partner-logo / blog-image / event-photo / illustration | For filtering in the admin media library |

---

## Part 2: Globals

### 2.1 Site Settings

| Field             | Type                 | Notes                                                                                                                          |
| ----------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `siteName`        | text                 | "ELLA"                                                                                                                         |
| `siteDescription` | textarea             | Default meta description                                                                                                       |
| `logo`            | relationship → Media | Primary logo                                                                                                                   |
| `logoLight`       | relationship → Media | Light variant for dark backgrounds                                                                                             |
| `favicon`         | relationship → Media |                                                                                                                                |
| `ogImage`         | relationship → Media | Default social sharing image                                                                                                   |
| `socialLinks`     | array                | Each: `platform` (select: twitter / linkedin / other), `url`                                                                   |
| `announcementBar` | group                | `enabled` (boolean), `text`, `linkLabel`, `linkUrl`, `bgColor`. For site-wide banners (e.g., "Vanguard applications now open") |
| `analyticsId`     | text                 | GA4 or analytics tracking ID                                                                                                   |

---

### 2.2 Navigation

| Field          | Type  | Notes                                                                                                                                                                                                    |
| -------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `primaryNav`   | array | Each: `label`, `type` (select: link / dropdown), `url` (conditional), `children` (array of `label` + `url` + `badge` text, conditional on dropdown). Supports the Solutions ▾ and Resources ▾ dropdowns. |
| `primaryCTA`   | group | `label` (e.g., "Get Started"), `url`, `style` (select: primary / secondary)                                                                                                                              |
| `secondaryCTA` | group | `label` (e.g., "Login"), `url`, `style`                                                                                                                                                                  |
| `mobileNav`    | group | `showCTAInHeader` (boolean), same structure as primaryNav                                                                                                                                                |

---

### 2.3 Footer

| Field               | Type    | Notes                                                                             |
| ------------------- | ------- | --------------------------------------------------------------------------------- |
| `columns`           | array   | Each column: `heading`, `links` array (`label`, `url`)                            |
| `newsletterSection` | group   | `heading`, `description`, `placeholderText`, `buttonLabel`, `integrationEndpoint` |
| `legalLinks`        | array   | `label`, `url` (Privacy, Terms)                                                   |
| `copyrightText`     | text    | e.g., "Built by ei Innovations"                                                   |
| `socialLinks`       | boolean | Whether to pull from Site Settings socialLinks (avoids duplication)               |

---

### 2.4 CTA Defaults

Global defaults that individual blocks can override. Keeps CTA language consistent without hardcoding.

| Field              | Type | Notes                                   |
| ------------------ | ---- | --------------------------------------- |
| `primaryLabel`     | text | e.g., "Get Started"                     |
| `primaryUrl`       | text | e.g., app signup URL                    |
| `primaryMicrocopy` | text | e.g., "Your first 3 clients are on us." |
| `secondaryLabel`   | text | e.g., "Book a Demo"                     |
| `secondaryUrl`     | text | e.g., cal.com scheduling URL            |
| `waitlistLabel`    | text | e.g., "Join the Waitlist"               |

---

## Part 3: Blocks (Page Builder)

These are the composable content blocks available in the `layout` field on Pages and Solutions. Each block maps to an Oatmeal template component (or custom component) from the implementation plan.

### 3.1 Hero Block

Used as the dedicated `hero` field on Pages and Solutions, not as a layout block (every page gets exactly one).

| Field          | Type                          | Notes                                                                          |
| -------------- | ----------------------------- | ------------------------------------------------------------------------------ |
| `headline`     | text (required)               |                                                                                |
| `subheadline`  | textarea                      | 1-2 sentences                                                                  |
| `primaryCTA`   | group                         | `label`, `url`, `microcopy` (optional, e.g., "Your first 3 clients are on us") |
| `secondaryCTA` | group                         | `label`, `url`                                                                 |
| `visual`       | group                         | `type` (select: image / video-loop / none), `media` (relationship → Media)     |
| `style`        | select: default / dark / warm | Background treatment                                                           |

---

### 3.2 Credibility Strip

Horizontal banner for social proof or builder credibility statement.

| Field       | Type                                                            | Notes                                                                       |
| ----------- | --------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `variant`   | select: logos / statement / stats                               |                                                                             |
| `statement` | textarea (conditional on variant=statement)                     | e.g., "We spent a year talking to advisors before we wrote a line of code." |
| `logos`     | relationship → Partners (hasMany, conditional on variant=logos) |                                                                             |
| `stats`     | array (conditional on variant=stats)                            | Each: `value`, `label`                                                      |
| `bgStyle`   | select: warm / neutral / brand                                  |                                                                             |

---

### 3.3 Content Section

General-purpose rich text section with optional header and visual.

| Field          | Type                          | Notes                                                                                                                   |
| -------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `sectionLabel` | text                          | Optional small-caps label above the headline                                                                            |
| `headline`     | text                          |                                                                                                                         |
| `body`         | rich text                     |                                                                                                                         |
| `media`        | group                         | `type` (select: image / illustration / none), `image` (relationship → Media), `position` (select: right / left / below) |
| `bgStyle`      | select: default / warm / dark |                                                                                                                         |

---

### 3.4 Card Grid

The 3-pillar pattern from WithCoverage. Cards can anchor-link to deeper sections below.

| Field          | Type              | Notes                                                                                                                                                                                                   |
| -------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sectionLabel` | text              | Optional small-caps label                                                                                                                                                                               |
| `headline`     | text              | Optional section headline                                                                                                                                                                               |
| `columns`      | select: 2 / 3 / 4 |                                                                                                                                                                                                         |
| `cards`        | array             | Each: `icon` (relationship → Media), `label` (text), `description` (textarea), `anchorTarget` (text — ID of the section this card links to), `linkUrl` (text — for cards that link to a different page) |

---

### 3.5 Feature Deep-Dive

Alternating text + visual sections used for pillar expansions. Maps to the Oatmeal alternating layout component.

| Field                | Type                           | Notes                                                                                                                                                                                    |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sectionId`          | text                           | Anchor ID (for card grid linking)                                                                                                                                                        |
| `sectionLabel`       | text                           | Small-caps label (e.g., "Fact Finding")                                                                                                                                                  |
| `headline`           | text                           |                                                                                                                                                                                          |
| `body`               | rich text                      |                                                                                                                                                                                          |
| `capabilities`       | array                          | Each: `text` (the capability described in one sentence)                                                                                                                                  |
| `principleHighlight` | group                          | `label` (e.g., "Malleability at every layer"), `description` (textarea)                                                                                                                  |
| `testimonial`        | relationship → Testimonials    | Embedded quote for this section                                                                                                                                                          |
| `media`              | group                          | `type` (select: screenshot / illustration / declarative-statement), `image` (relationship → Media), `declarativeText` (text, conditional — e.g., "Intake to insight. Hours, not weeks.") |
| `layout`             | select: text-left / text-right | Alternating direction                                                                                                                                                                    |

---

### 3.6 Comparison Table

The three-column "Old Way → Patchwork → With ELLA" generational framing.

| Field          | Type     | Notes                                                                                                                                 |
| -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `headline`     | text     | e.g., "A Better Way to Work"                                                                                                          |
| `subheadline`  | textarea |                                                                                                                                       |
| `columnLabels` | group    | `col1` (text, e.g., "The Old Way"), `col2` (text), `col3` (text)                                                                      |
| `columnStyles` | group    | `col1Color` (text — hex or token), `col2Color`, `col3Color`                                                                           |
| `rows`         | array    | Each: `dimension` (text, e.g., "Client intake"), `col1` (text), `col2` (text), `col3` (text), `icon` (relationship → Media, optional) |

---

### 3.7 Testimonial Block

Single featured testimonial, or carousel of multiple.

| Field              | Type                                  | Notes                                    |
| ------------------ | ------------------------------------- | ---------------------------------------- |
| `variant`          | select: single / carousel             |                                          |
| `testimonials`     | relationship → Testimonials (hasMany) |                                          |
| `showPhoto`        | boolean                               |                                          |
| `showMetric`       | boolean                               | Show the quantified outcome if available |
| `showSwitchedFrom` | boolean                               | Show the "switched from" badge           |
| `bgStyle`          | select: default / warm / dark         |                                          |

---

### 3.8 CTA Section

Final conversion block. Used as page closers.

| Field          | Type                          | Notes                                                             |
| -------------- | ----------------------------- | ----------------------------------------------------------------- |
| `headline`     | text                          |                                                                   |
| `body`         | rich text                     | The "divide forming" narrative or similar framing                 |
| `closingLine`  | text                          | The single punchy closer (e.g., "Your methodology is your moat.") |
| `primaryCTA`   | group                         | `label`, `url`, `microcopy`                                       |
| `secondaryCTA` | group                         | `label`, `url`                                                    |
| `bgStyle`      | select: warm / dark / default |                                                                   |

---

### 3.9 Trust & Security Block

Dedicated block for the security messaging that appears on Homepage and Platform.

| Field            | Type      | Notes                                                                                             |
| ---------------- | --------- | ------------------------------------------------------------------------------------------------- |
| `headline`       | text      | e.g., "Secure, because both of our reputations are on the line."                                  |
| `body`           | rich text | The ChatGPT contrast narrative + architectural explanation                                        |
| `capabilities`   | array     | Each: `icon` (relationship → Media), `text` (e.g., "Full data encryption in transit and at rest") |
| `closingLine`    | text      |                                                                                                   |
| `detailPageLink` | group     | `label`, `url` — link to the full Security & Trust page                                           |

---

### 3.10 Before / After Panel

The interactive proof moment. Deferred from launch but schema should exist.

| Field         | Type                                            | Notes                                                                    |
| ------------- | ----------------------------------------------- | ------------------------------------------------------------------------ |
| `headline`    | text                                            |                                                                          |
| `beforeLabel` | text                                            | e.g., "The Current Workflow"                                             |
| `afterLabel`  | text                                            | e.g., "With ELLA"                                                        |
| `steps`       | array                                           | Each: `beforeText`, `afterText`, `icon` (relationship → Media, optional) |
| `animation`   | select: static / scroll-triggered / interactive | Build complexity toggle                                                  |

---

### 3.11 Numbered Steps

The 7Analytics-style numbered walkthrough used on the Exit Planning solution page.

| Field         | Type     | Notes                                                                                                                      |
| ------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| `headline`    | text     |                                                                                                                            |
| `subheadline` | textarea |                                                                                                                            |
| `steps`       | array    | Each: `number` (auto-incremented for display), `title`, `description` (textarea), `icon` or `image` (relationship → Media) |

---

### 3.12 Persona Cards

The "Who It's For" blocks on solution pages and potentially the homepage.

| Field      | Type  | Notes                                                                                                                                                                               |
| ---------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `headline` | text  |                                                                                                                                                                                     |
| `personas` | array | Each: `label` (e.g., "CEPAs and dedicated exit planning advisors"), `description` (textarea), `icon` (relationship → Media), `ctaLabel` (text, optional), `ctaUrl` (text, optional) |

---

### 3.13 Origin Story Block

The "We started with conversations" narrative. Could be a Content Section, but giving it its own block type provides structured fields for the specific pattern.

| Field           | Type      | Notes                                                                                                        |
| --------------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| `headline`      | text      |                                                                                                              |
| `body`          | rich text | The origin narrative                                                                                         |
| `manifestoLink` | group     | `label`, `url`                                                                                               |
| `backingBadge`  | group     | `text` (e.g., "Built by ei Innovations, Erie Insurance's venture studio."), `logo` (relationship → Partners) |

---

### 3.14 Solutions Selector

Card-based layout for choosing an advisory discipline. Used on homepage (future) and Resources landing.

| Field               | Type                               | Notes                                                                        |
| ------------------- | ---------------------------------- | ---------------------------------------------------------------------------- |
| `headline`          | text                               |                                                                              |
| `solutions`         | relationship → Solutions (hasMany) | Pulls title, discipline, status, and short description from Solution entries |
| `showWaitlistBadge` | boolean                            | Show "Coming Soon" on waitlist-status solutions                              |

---

### 3.15 Stats Strip

Horizontal row of key metrics.

| Field     | Type                          | Notes                                                                                                          |
| --------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `stats`   | array                         | Each: `value` (text, e.g., "100+"), `label` (text, e.g., "advisor conversations"), `animateOnScroll` (boolean) |
| `bgStyle` | select: default / warm / dark |                                                                                                                |

---

### 3.16 FAQ Accordion

| Field              | Type                               | Notes                                                         |
| ------------------ | ---------------------------------- | ------------------------------------------------------------- |
| `headline`         | text                               |                                                               |
| `items`            | relationship → FAQ Items (hasMany) | Or inline array if you prefer: each with `question`, `answer` |
| `filterByCategory` | select (from FAQ category options) | Optional: only show FAQs from one category                    |

---

### 3.17 Pricing Journey

The non-standard pricing layout — a journey visualization rather than a tier comparison grid.

| Field       | Type                                            | Notes                                                    |
| ----------- | ----------------------------------------------- | -------------------------------------------------------- |
| `headline`  | text                                            |                                                          |
| `introBody` | rich text                                       | The "here's the path" framing                            |
| `tiers`     | relationship → Pricing Tiers (hasMany, ordered) | Pulls from the Pricing Tiers collection in journey order |

---

### 3.18 Newsletter Capture

Standalone email capture block for mid-page or end-of-page placement.

| Field             | Type                          | Notes |
| ----------------- | ----------------------------- | ----- |
| `headline`        | text                          |       |
| `description`     | textarea                      |       |
| `placeholderText` | text                          |       |
| `buttonLabel`     | text                          |       |
| `bgStyle`         | select: default / warm / dark |       |

---

## Part 4: Taxonomies

### 4.1 Disciplines (Advisory Disciplines)

The core taxonomy that connects Solutions, Blog Posts, Case Studies, Testimonials, Tools, and Partners.

| Field         | Type                         | Notes                                  |
| ------------- | ---------------------------- | -------------------------------------- |
| `name`        | text (required)              | e.g., "Exit Planning"                  |
| `slug`        | text (unique)                |                                        |
| `description` | textarea                     | One-sentence summary of the discipline |
| `status`      | select: active / coming-soon |                                        |
| `sortOrder`   | number                       |                                        |

**Seed entries:** Exit Planning, Wealth Advisory, Accounting & Tax Advisory, Legal Advisory

---

### 4.2 Blog Categories

The five content pillars from the architecture doc, mapped to user-friendly display labels from the implementation plan.

| Field           | Type            | Notes                                             |
| --------------- | --------------- | ------------------------------------------------- |
| `name`          | text (required) | Display label                                     |
| `slug`          | text (unique)   |                                                   |
| `internalLabel` | text            | The manifesto pillar name, for internal reference |
| `description`   | textarea        |                                                   |
| `sortOrder`     | number          |                                                   |

**Seed entries:**

| Display Name        | Internal Pillar               |
| ------------------- | ----------------------------- |
| Product Updates     | Building ELLA in Public       |
| Trust & Security    | Trust Infrastructure          |
| Practice Management | Advisor Patterns / Frameworks |
| Industry Insights   | Silver Tsunami Thesis         |
| Perspectives        | Challenger Takes              |

---

## Part 5: Relationships Map

How the collections connect to each other.

```
Pages
  └── layout blocks → Testimonials, Partners, Media, FAQ Items, Pricing Tiers, Solutions

Solutions
  ├── discipline → Disciplines
  ├── socialProof.testimonials → Testimonials[]
  ├── socialProof.partners → Partners[]
  └── layout blocks → (same as Pages)

Blog Posts
  ├── author → Team Members
  ├── category → Blog Categories
  ├── disciplines → Disciplines[]
  ├── featuredImage → Media
  └── relatedPosts → Blog Posts[]

Case Studies
  ├── discipline → Disciplines
  ├── advisor.photo → Media
  └── featuredImage → Media

Testimonials
  ├── attribution.photo → Media
  └── discipline → Disciplines

Partners
  ├── logo → Media
  └── showOnSolutions → Solutions[]

Vanguard Events
  ├── photos → Media[]
  └── testimonials → Testimonials[]

Tools
  └── discipline → Disciplines[]

Pricing Tiers
  ├── relatedTool → Tools
  └── relatedEvent → Vanguard Events
```

---

## Part 6: Access Control Considerations

Payload supports role-based access. Recommended roles for launch:

| Role            | Can Do                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------ |
| **Admin**       | Full access to everything. Drew + engineering.                                                   |
| **Editor**      | Create/edit/publish Pages, Solutions, Blog Posts, Case Studies. Cannot modify Globals or schema. |
| **Contributor** | Create/edit Blog Posts (draft only). Cannot publish. For guest authors or future team members.   |

---

## Part 7: What Ships When

### Launch (Pages 1-7 in build order)

**Collections needed:**
Pages, Solutions, Blog Posts, Team Members, Testimonials, Partners, Pricing Tiers, FAQ Items, Tools, Redirects, Media

**Globals needed:**
Site Settings, Navigation, Footer, CTA Defaults

**Taxonomies needed:**
Disciplines, Blog Categories

**Blocks needed:**
Hero, Credibility Strip, Content Section, Card Grid, Feature Deep-Dive, Comparison Table, Testimonial Block, CTA Section, Trust & Security, Persona Cards, Origin Story, Numbered Steps, FAQ Accordion, Pricing Journey, Newsletter Capture, Solutions Selector

### Fast-Follow (within 30 days)

**Collections added:**
Vanguard Events, Case Studies

**Blocks added:**
Before/After Panel, Stats Strip

### Build Over Time

- Integrations collection (when Integrations page ships)
- Community membership fields
- Event registration / waitlist management (may live outside Payload)
