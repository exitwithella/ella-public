# withella.io — Implementation Plan

## How to Use This Document

This plan covers every page shipping at launch, in build order. Each page section includes:

- **Structure**: The block-by-block layout with design pattern references
- **Content Status**: What exists, what needs writing, and what needs revision
- **Design Notes**: Which inspiration sites to reference and how to customize Oatmeal components

Content items are tagged with their status:

- ✅ **EXISTS** — Content is written in the architecture doc or manifesto. Needs editing for web, not writing from scratch.
- 🟡 **PARTIAL** — Directional content exists but needs significant development, rewriting, or net-new supporting material.
- 🔴 **NEEDS WRITING** — No usable draft exists. Requires original content creation.

---

## Foundational Decisions

These apply across every page and should be locked before any design work begins.

### ELLA Is Not a Compliance Product

The site architecture doc positions ELLA as a **practice systematization platform** — an AI-native contextual layer that helps advisors think better, work faster, and build durable systems around their methodology. The product pillars are Malleability, Fluidity, Collaboration, and Compounding Context.

Compliance and security are trust requirements, not the value proposition. They appear on the site the way a lock icon appears on a banking app — essential, visible, but not the headline. The thematic analysis's suggested "For Compliance" pillar card should be replaced with a trust-oriented framing that serves the same audience without repositioning the product.

### Primary Narrative

ELLA amplifies advisor judgment. It holds context, accelerates sensemaking, and turns insight into client-ready deliverables. The homepage story follows the manifesto's arc: advisors are feeling the squeeze → the current tools aren't built for this → here's what systematization actually looks like → which kind of advisor are you?

### Visual Identity

Calm trust aesthetic. Function Health is the primary visual reference.

- **Palette**: Warm cream/beige base with ELLA brand accent. No pure whites, no cold blues.
- **Typography**: Serif headings (authority, tradition) + sans-serif body (clarity, modernity). Select or customize an Oatmeal font pairing that follows this pattern.
- **Whitespace**: Increase Oatmeal default spacing by 20-30% across all components.
- **Motion**: Only where it serves comprehension. Before/after animations, scroll-triggered proof moments. No decorative motion.
- **Imagery**: Real advisor portraits in testimonials. No stock photography. Illustrations or visual metaphors over product screenshots where the UI is hard to capture.

### CTA Strategy

Dual-CTA throughout: a self-guided path ("See ELLA in Action" or "Start with ELLA") and a human path ("Talk to Our Team" or "Request a Demo"). Match the architecture doc's recognition that advisors split into experimenters and the cautious-but-curious.

---

## Build Order & Priority

| Priority | Page                                  | Estimated Content Effort                                         | Notes                                                        |
| -------- | ------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------ |
| 1        | Homepage                              | High — most content is directional, needs web-specific writing   | The flagship. Everything else depends on getting this right. |
| 2        | Platform                              | Medium — four pillars exist in the manifesto, need expansion     | The capabilities deep-dive.                                  |
| 3        | Exit Planning Solution                | High — richest source material but needs narrative shaping       | The beachhead proof point.                                   |
| 4        | Pricing                               | Medium — structure defined, copy needs writing                   | The conversion page.                                         |
| 5        | About                                 | Low-Medium — manifesto provides the origin story almost verbatim | The trust and thesis page.                                   |
| 6        | Blog (structure + 3-5 migrated posts) | Low (structural) / Ongoing (content)                             | Three-tier layout. Migrate existing posts.                   |
| 7        | Resources / Tools landing             | Low — directory page linking to standalone tools                 | Lightweight at launch.                                       |

---

## Page 1: Homepage — withella.io

### Block 1: Hero

**Oatmeal component**: Hero section
**Design reference**: Poolside AI (declarative headline energy), Interloom (warmth), Function Health (typography)

**Structure:**

- Single declarative headline — the practice systematization frame
- 1-2 sentence supporting copy connecting the problem to the solution
- Dual CTA: "See ELLA in Action" + "Talk to Our Team"
- Visual: Before/after transformation panel or short product demo loop (see Block 5 for details on the interactive proof approach)

**Content Status:**

| Element         | Status            | Source                                                                                                                       | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Headline        | 🔴 NEEDS WRITING  | Architecture doc has directional options ("Your methodology deserves a system," "The operating system for trusted advisors") | These are starting points, not final. The headline needs to reframe the category, not describe the product. Study Moonfire ("A technology company that does venture capital"), WithCoverage ("ambitious" doing the heavy lifting), Poolside ("Outcomes, not tokens"). Write 10-15 options across three frames: (1) practice systematization, (2) advisor competitive advantage, (3) what great advisory practices have in common. Test with 3-5 advisors. |
| Supporting copy | 🟡 PARTIAL        | Architecture doc has the manifesto's core tension as a draft                                                                 | The manifesto line about "trusted advisor started feeling less like a relationship and more like a race against the clock" is strong but long for a hero subhead. Compress to one sentence that names the tension without explaining it.                                                                                                                                                                                                                  |
| CTAs            | ✅ EXISTS         | Architecture doc specifies the dual-CTA pattern                                                                              | "See ELLA in Action" and "Talk to Our Team" or close variants. Final wording should match whatever the demo experience actually is.                                                                                                                                                                                                                                                                                                                       |
| Hero visual     | 🔴 NEEDS CREATION | Thematic analysis recommends before/after transformation panel                                                               | See Block 5. At minimum, a static before/after. Aspirational: animated or lightly interactive. Do not use an abstract graphic or stock image.                                                                                                                                                                                                                                                                                                             |

**Copywriter brief — Hero headline:**
Write a headline that makes a financial advisor think "oh, that's what this category should be" rather than "oh, another tool." It should position ELLA as the inevitable next step for serious advisors — not by describing features, but by naming a future state that the advisor already wants. Avoid: "AI-powered," "platform for," "streamline your." Study: Moonfire, Poolside AI, Cloudflare Workers ("Region: Earth") for compression and confidence. The headline should work without a subhead but be strengthened by one.

---

### Block 2: Social Proof Strip

**Oatmeal component**: Testimonials section (logo variant)
**Design reference**: Hebbia (logos + stat pairing), Canopy (named firms)

**Structure:**

- Horizontal scrolling firm logos (if available) OR category descriptors
- Single stat line: "Used by X advisors at Y firms" or "Trusted by advisors managing $X in AUM"
- Appears immediately after hero, before any content

**Content Status:**

| Element            | Status              | Notes                                                                                                                                                                       |
| ------------------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Firm logos         | 🔴 NEEDS COLLECTION | Requires permission from existing users/partners. If logos aren't available at launch, use category descriptors ("Trusted by RIA firms, CPAs, and exit planning advisors"). |
| Stat line          | 🔴 NEEDS DATA       | Pull actual usage metrics. If hard numbers aren't launch-ready, use qualitative proof ("Built through 100+ advisor conversations").                                         |
| Partnership badges | 🟡 PARTIAL          | Architecture doc mentions EPI, CEPA community. Confirm which partnerships can be displayed.                                                                                 |

---

### Block 3: Bridge Testimonial

**Oatmeal component**: Testimonial section (single quote variant)
**Design reference**: Interloom (testimonial-before-features placement)

**Structure:**

- Single advisor quote describing the pain of the old workflow
- Name, title, firm (if attributable) or role descriptor
- Placed between the logo strip and pillar cards — this is the narrative bridge from "who uses this" to "here's what it solves"

**Content Status:**

| Element     | Status            | Source                                                              | Notes                                                                                                                                                                                                                                                                                       |
| ----------- | ----------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Quote       | 🟡 PARTIAL        | Architecture doc has several strong options from real conversations | Best candidates from the manifesto: "Sometimes when there are that many chess pieces, this is the kind of thing that can help keep that type of thing clear and concise" or the broker quote about owners at their wits' end. These need editing for web — tighter, punchier, pain-forward. |
| Attribution | 🔴 NEEDS DECISION | Architecture doc flags this as an open question                     | Decide: named advisors (stronger credibility) or anonymous with role descriptors (preserves the "we've been in the room" tone). Recommendation: name them if possible, with permission. The thematic analysis is clear that named + titled + firmed is the strongest credibility signal.    |

**Copywriter brief — Bridge testimonial:**
Select or compose a single quote (2 sentences max) from a real advisor conversation that captures the pain of the current workflow. It should make a visiting advisor think "that's exactly my problem." The quote must feel authentic — not polished marketing copy. If working from the manifesto's conversation excerpts, tighten without losing the conversational voice.

---

### Block 4: 3-Pillar Card Grid

**Oatmeal component**: Feature section (card grid)
**Design reference**: WithCoverage (3 anchor-linked cards)

**Structure:**

- 3-column card grid, each card anchor-linked to a deep-dive section below
- Each card: icon + short label (6 words max) + one-sentence benefit
- Generous padding, warm palette

**The Three Pillars (revised from thematic analysis to align with architecture doc):**

| Pillar | Label            | Benefit Sentence                                                                       | Audience                                                                    |
| ------ | ---------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 1      | For Advisors     | How ELLA changes the way you think, prepare, and engage with clients                   | Individual practitioners                                                    |
| 2      | For Firms        | How ELLA creates operational leverage and reduces key-person risk across your practice | Firm principals and leaders                                                 |
| 3      | Trust & Security | How ELLA protects your clients' data and your professional reputation                  | Anyone evaluating risk — especially firm leaders and the security-conscious |

Note: Pillar 3 is **not** "For Compliance." It's a trust signal that addresses the same audience concerns without positioning ELLA as a compliance product. The framing should be "here's why this is safe" not "here's your compliance solution."

**Content Status:**

| Element           | Status           | Notes                                                                                                                                                                                                                             |
| ----------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pillar labels     | 🔴 NEEDS WRITING | The labels above are directional. Final versions should be tested for clarity and scannability. Consider: "Your Practice, Amplified" / "Your Firm, Systematized" / "Your Clients, Protected" — but don't force clever over clear. |
| Benefit sentences | 🔴 NEEDS WRITING | One sentence each. Must be specific enough to differentiate the pillars but short enough to scan in 2 seconds.                                                                                                                    |
| Icons             | 🔴 NEEDS DESIGN  | Simple, warm, consistent style. Not generic SaaS icons.                                                                                                                                                                           |

---

### Block 5: Pillar Deep-Dives

**Oatmeal component**: Feature sections (alternating layout — text + visual, side by side)
**Design reference**: WithCoverage (section depth), Canopy (scroll-lock consideration)

**Structure:**
One section per pillar. Each section contains:

- 2-3 features described in that audience's language
- One embedded testimonial from someone in that role
- A visual element (product illustration, metaphor, or declarative statement with icon)

**Content Status — Pillar 1: For Advisors**

This pillar draws from the architecture doc's four product pillars, translated into advisor-facing language.

| Element                                                  | Status            | Source                                                                       | Notes                                                                                                                                                                                                                                             |
| -------------------------------------------------------- | ----------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Feature 1: Context that travels with the engagement      | 🟡 PARTIAL        | Architecture doc's "Compounding Context" pillar                              | Rewrite for an advisor audience: "Every document uploaded, every question answered, every insight generated becomes part of a growing knowledge layer. Context travels with the engagement — you show up to every conversation already informed." |
| Feature 2: From question to deliverable without friction | 🟡 PARTIAL        | Architecture doc's "Fluidity" pillar                                         | Rewrite: "Ask a question against the full context of a client engagement. Pull the insight directly into a deliverable. No 90-page templates — documents that reflect the actual owner and business."                                             |
| Feature 3: Your methodology, systematized                | 🟡 PARTIAL        | Architecture doc's "Malleability" pillar                                     | Rewrite: "Best-in-class defaults for fact-finding, sensemaking, and deliverables. Every layer extensible. The system adapts to your methodology, not the other way around."                                                                       |
| Testimonial                                              | 🔴 NEEDS SOURCING | Manifesto has several advisor quotes                                         | Need a quote from a practicing advisor about how ELLA changed their workflow. If not available, use the manifesto's "We get in the weeds and actually help with the value acceleration" quote with tightening.                                    |
| Visual                                                   | 🔴 NEEDS CREATION | Thematic analysis recommends declarative outcome statements over screenshots | Use the "describe without showing" pattern: "Every conversation. Contextualized." or "Intake to insight. Hours, not weeks." paired with a simple visual metaphor (timeline, flow diagram).                                                        |

**Content Status — Pillar 2: For Firms**

| Element                                                          | Status            | Source                                                 | Notes                                                                                                                                                                                                                                               |
| ---------------------------------------------------------------- | ----------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Feature 1: Standardize quality without standardizing methodology | 🟡 PARTIAL        | Architecture doc's firm-leader framing                 | The architecture doc has: "Standardize quality across your team. Reduce key-person risk. Onboard new advisors faster." These are good starting points but read as bullet points, not web copy. Expand each into a sentence with a specific outcome. |
| Feature 2: Collaboration without chaos                           | 🟡 PARTIAL        | Architecture doc's "Collaboration" pillar              | "Exit team in one place, advisor in the driver's seat. No more chasing documents through email." Needs firm-leader framing: this is about operational leverage, not individual productivity.                                                        |
| Feature 3: Onboard faster, scale consistently                    | 🔴 NEEDS WRITING  | Architecture doc mentions this but doesn't develop it  | Write copy about how ELLA reduces ramp time for new advisors by encoding the firm's methodology into the system.                                                                                                                                    |
| Testimonial                                                      | 🔴 NEEDS SOURCING | No firm-leader testimonial exists in current materials | This is a gap. If not available at launch, use an advisor quote that implies firm-level value.                                                                                                                                                      |
| Visual                                                           | 🔴 NEEDS CREATION | —                                                      | Consider: a simple diagram showing multiple advisor avatars working from the same client context.                                                                                                                                                   |

**Content Status — Pillar 3: Trust & Security**

| Element                                               | Status            | Source                                                                                               | Notes                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Feature 1: Sandboxed workspaces, no memory bleed      | ✅ EXISTS         | Architecture doc has strong copy on this                                                             | "Everything an advisor adds lives in a client sandbox with customizable permissions for all team members." The ChatGPT contrast is powerful: "Here's what ChatGPT can't do: guarantee that your last client's financials don't leak into your next client's analysis." Use it.                                      |
| Feature 2: Enterprise-grade data handling             | 🟡 PARTIAL        | Architecture doc mentions encryption and data governance                                             | Needs specifics: what encryption standard, where data lives, what certifications exist or are planned. Advisors evaluating this section need concrete answers, not vague reassurance.                                                                                                                               |
| Feature 3: Built for the advisor's regulatory reality | 🔴 NEEDS WRITING  | Architecture doc acknowledges the trust consideration but doesn't develop regulatory-aware messaging | Write 2-3 sentences that acknowledge advisors operate in a regulated environment without claiming ELLA is a compliance tool. Frame: "ELLA is built with the understanding that your work carries regulatory weight. Every interaction is documented. Every workspace is isolated. Every permission is intentional." |
| Testimonial                                           | 🔴 NEEDS SOURCING | —                                                                                                    | Ideal: an advisor or firm leader commenting on the peace of mind from sandboxed workspaces.                                                                                                                                                                                                                         |
| Visual                                                | 🔴 NEEDS CREATION | —                                                                                                    | Simple: a visual showing isolated client workspaces with a lock icon. Nothing elaborate.                                                                                                                                                                                                                            |

---

### Block 6: Interactive Proof Moment

**Oatmeal component**: Custom component (not standard Oatmeal)
**Design reference**: HelloPatient (live demo), Wispr Flow (before/after), Cloudflare Workers (describe without showing)

**Structure:**
This is the highest-impact element on the page and requires a build decision.

**Option A — Before/After Transformation Panel (recommended for launch)**
Two side-by-side panels. Left: the advisor's current workflow (scattered, manual, risky). Right: the same workflow with ELLA (contextual, fluid, systematized). Can be static or lightly animated (content appearing sequentially on scroll).

**Option B — Interactive Walkthrough (fast-follow)**
A guided, scripted sequence showing an ELLA-powered engagement: owner uploads documents → ELLA ingests and structures → advisor asks questions → insight flows into a deliverable. Not a full product demo — a narrated simulation.

**Option C — Embedded Tool (aspirational)**
The Valuation Communication Tool or a sandboxed SOP Assessment running live on the page. Visitor interacts, gets output, has experienced ELLA without signing up.

**Content Status:**

| Element                         | Status                    | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Before/after content (Option A) | 🔴 NEEDS WRITING + DESIGN | Write the specific before/after comparison points. Left panel: "Receive docs via email → manually extract data → cross-reference in spreadsheets → draft in Word → weeks before a real conversation." Right panel: "Owner uploads directly → ELLA ingests and structures → advisor asks questions against full context → insight flows into deliverable → hours to first real conversation." Design needs to make this visual, not just text. |
| Walkthrough script (Option B)   | 🔴 NEEDS WRITING          | If pursuing this, write a 60-second narrated script of a realistic ELLA engagement. Should feel like watching over an advisor's shoulder, not watching a product demo.                                                                                                                                                                                                                                                                        |
| Embedded tool (Option C)        | 🔴 NEEDS ENGINEERING      | Requires product/engineering decision on feasibility and scope.                                                                                                                                                                                                                                                                                                                                                                               |

**Build recommendation:** Ship Option A at launch. It's achievable within the Oatmeal framework with custom styling. Plan Option B as a fast-follow (within 30 days). Evaluate Option C based on how the standalone tools develop.

---

### Block 7: Positioning Section — "The Old Way vs. The ELLA Way"

**Oatmeal component**: Pricing table (repurposed as comparison table)
**Design reference**: Function Health (side-by-side comparison), Dope Security (generation framing)

**Structure:**
A comparison table with two or three columns. The thematic analysis's generation framing (old way → current way → ELLA way) is stronger than a simple two-column comparison because it makes ELLA feel like the inevitable next step rather than just a different option.

| Dimension           | The Old Way                       | The Current Patchwork                            | With ELLA                                                          |
| ------------------- | --------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------ |
| Client intake       | Paper forms, email back-and-forth | Scattered across CRM, email, shared drives       | Owner uploads directly; ELLA ingests, structures, cross-references |
| Sensemaking         | Manual analysis, advisor's memory | ChatGPT with no guardrails, risk of memory bleed | Contextual AI within sandboxed client workspaces                   |
| Deliverables        | 90-page template reports, generic | Cobbled from multiple tools, inconsistent        | Client-ready documents reflecting the actual owner and business    |
| Team coordination   | Email chains, version confusion   | Shared drives, still no single source of truth   | Sandboxed workspaces with the advisor in the driver's seat         |
| Knowledge retention | Lives in the advisor's head       | Fragmented across tools, lost when people leave  | Context compounds over the lifecycle of every engagement           |

**Content Status:**

| Element               | Status           | Notes                                                                                                                                                                                                                           |
| --------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Comparison dimensions | 🟡 PARTIAL       | The table above is a working draft drawn from both documents. Needs refinement to ensure each row lands with the target advisor. Test: does each row name a pain the advisor feels weekly?                                      |
| Column copy           | 🔴 NEEDS WRITING | Each cell needs to be compressed to ~10 words max for scannability. The table above is too verbose for a visual comparison — it's the brief, not the final copy.                                                                |
| Visual treatment      | 🔴 NEEDS DESIGN  | Function Health uses checkmarks and X marks. For a 3-column version, consider: red/muted for "old way," yellow/amber for "current patchwork," green/brand color for "With ELLA." Use icons or visual indicators, not just text. |

**Copywriter brief — Comparison table:**
Compress each cell to a short, scannable phrase (10 words or fewer). The "Old Way" column should feel dated but not insulting — many advisors reading this are still doing it this way. The "Current Patchwork" column should name the specific tools (ChatGPT, shared drives, email) to create recognition. The "With ELLA" column should feel specific and concrete, not aspirational. Every claim in the ELLA column must be something the product actually does today.

---

### Block 8: Expanded Social Proof

**Oatmeal component**: Testimonials section (carousel with photos)
**Design reference**: Amplemarket (named + titled + quantified), Function Health (video testimonials)

**Structure:**

- Carousel of 3-5 testimonials
- Each: photo, name, title, firm, quote with quantified outcome
- Consider "switched from" badges if applicable (Amplemarket pattern)

**Content Status:**

| Element                               | Status                         | Notes                                                                                                                                                                                                                                               |
| ------------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Testimonials with quantified outcomes | 🔴 NEEDS COLLECTION            | This is the single highest-leverage content gap. Run a survey of existing users to collect 3-5 before/after metrics. Formula: [Named person] + [title and firm] + [specific outcome] + [timeframe].                                                 |
| Advisor photos                        | 🔴 NEEDS COLLECTION            | Request headshots from participating advisors. Professional quality preferred but not required — authentic > polished.                                                                                                                              |
| "Switched from" badges                | 🔴 NEEDS DECISION              | If advisors previously used manual processes, spreadsheets, or generic CRMs, call it out: "Replaced manual intake workflow" or "Switched from spreadsheet-based tracking." Requires advisor permission and specific knowledge of their prior setup. |
| Video testimonials                    | 🔴 NEEDS PRODUCTION (optional) | Even 60-second selfie-style recordings work. Not required for launch but high-impact for a fast-follow.                                                                                                                                             |

---

### Block 9: The Divide — Final CTA

**Oatmeal component**: CTA section
**Design reference**: Function Health (warm, confident closer)

**Structure:**

- The manifesto's "divide forming among advisors" framing
- Two-path CTA: "Start with ELLA" (experimenters) + "See a Demo" (cautious-but-curious)
- A closing statement that reframes the value — confident, not aggressive

**Content Status:**

| Element             | Status     | Source                                                                 | Notes                                                                                                                                                                                                                                                                                                            |
| ------------------- | ---------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Divide framing copy | ✅ EXISTS  | Architecture doc / manifesto                                           | "The advisors who figure out how to systematize their practice without sacrificing the relationship are the ones who will thrive as AI reshapes the landscape." This is strong and should be used nearly verbatim. Compress to 2-3 sentences for the homepage.                                                   |
| Closing statement   | 🟡 PARTIAL | Architecture doc has "ELLA is how advisors are betting on that future" | Good but could be sharper. Consider testing: something that names what the advisor gains (not what they avoid). The Function Health model: "Life is short. We disagree." — a compressed, confident reframe. ELLA's version might be something like: "Your methodology is your moat. Build the system around it." |
| Dual CTA            | ✅ EXISTS  | Architecture doc specifies both paths                                  | "Start with ELLA" + "See a Demo" or close variants.                                                                                                                                                                                                                                                              |

---

## Page 2: Platform — withella.io/platform

### Overall Structure

**Design reference**: Canopy (scroll-lock feature walkthrough, modular naming), WithCoverage (section depth)

The platform page unpacks the four product pillars that the homepage summarizes. This is where someone who's already interested goes to understand how the product actually works.

**Page flow:**

1. Hero — positioning ELLA as a category
2. Pillar 1: Malleability at Every Layer
3. Pillar 2: Fluidity Between Thinking and Doing
4. Pillar 3: Collaboration Without Chaos
5. Pillar 4: Context That Compounds
6. Security & Trust deep-dive
7. Philosophical closer — "The Advisor Stays in the Center"
8. CTA

**Design decision — Scroll-lock vs. static:**
The Canopy scroll-lock pattern (viewport locks, content transitions within it) would be the strongest treatment for the four pillars. However, it requires custom development beyond Oatmeal and introduces performance risk. **Recommendation:** Build as static alternating sections for launch. If the homepage before/after panel proves the team can deliver custom interactive elements, retrofit scroll-lock as an enhancement.

### Content Status by Section

| Section                       | Status            | Source                                                                                                                                                                        | Content Needed                                                                                                                                                                                                                                                  |
| ----------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero headline                 | 🔴 NEEDS WRITING  | Architecture doc has "From intake to insight in a fraction of the time" as a direction                                                                                        | This is too feature-descriptive for a hero. Needs a category-level statement. Brief: position ELLA as a new kind of tool for advisory work, not an incremental improvement to existing tools.                                                                   |
| Hero supporting copy          | 🟡 PARTIAL        | Architecture doc: "ELLA is an AI-native contextual layer for advisory work"                                                                                                   | Usable as a starting point. Expand to 2 sentences that explain what "contextual layer" means in plain language.                                                                                                                                                 |
| Pillar 1: Malleability        | ✅ EXISTS         | Architecture doc has full copy                                                                                                                                                | Needs editing for web (shorter paragraphs, scannable structure) but the substance is there. Key quote to preserve: "Advisors told us no one's been able to come up with the perfect one-size-fits-all solution. We stopped trying."                             |
| Pillar 2: Fluidity            | ✅ EXISTS         | Architecture doc has full copy                                                                                                                                                | This is where the three core capabilities (Fact Finding → Sensemaking → Deliverables) live mechanically. Show the flow as a visual. The copy exists — it needs a visual/interaction layer.                                                                      |
| Pillar 3: Collaboration       | ✅ EXISTS         | Architecture doc has full copy                                                                                                                                                | Solid. Needs a visual showing multi-advisor workspace with the advisor in the driver's seat.                                                                                                                                                                    |
| Pillar 4: Compounding Context | ✅ EXISTS         | Architecture doc has full copy                                                                                                                                                | The moat argument: "the more you build in ELLA, the more irreplaceable it becomes." This is strong positioning copy that should be preserved closely. Needs a visual — timeline or layered knowledge visualization.                                             |
| Security & Trust              | 🟡 PARTIAL        | Architecture doc has the ChatGPT contrast and sandboxing messaging                                                                                                            | Strong conceptual copy exists. Needs technical specifics: encryption standards, data residency, certifications planned. Write a brief "what we do" list that a firm's IT or risk person can scan. Link to a future dedicated Security sub-page.                 |
| Philosophical closer          | ✅ EXISTS         | Architecture doc: "ChatGPT can't replicate what advisors know — which questions to ask, which stones to look under, the intuition built through years of pattern recognition" | Nearly web-ready. Light editing for flow and compression. This is the emotional anchor of the page.                                                                                                                                                             |
| Visuals (all pillars)         | 🔴 NEEDS CREATION | Thematic analysis recommends declarative outcome statements + visual metaphors over screenshots                                                                               | Each pillar needs a visual element. Options: product illustration, flow diagram, icon-driven metaphor, or short animation. Prioritize Pillar 2 (Fluidity) for the richest visual treatment since it maps to the Fact Finding → Sensemaking → Deliverables flow. |

---

## Page 3: Exit Planning Solution — withella.io/solutions/exit-planning

### Overall Structure

This is the deepest page on the site and should feel like it was written by someone who's been in 100+ conversations with exit planning advisors. The architecture doc provides the richest source material here.

**Page flow:**

1. Hero — exit planning specific
2. The Problem (exit-specific pain)
3. How ELLA Solves It (step-by-step walkthrough)
4. The Opportunity: Engaging Earlier
5. Who It's For (persona blocks)
6. Silver Tsunami context
7. Social proof (exit-planning specific)
8. CTA

**Design reference**: Number the "How ELLA Solves It" steps 01-05 (7Analytics pattern). Use the Canopy modular breakdown for persona blocks.

### Content Status

| Section                                       | Status              | Source                                                                                                                              | Content Needed                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero headline                                 | 🟡 PARTIAL          | Architecture doc has options: "Exit planning is complex. Your tools shouldn't make it worse."                                       | Good starting points. The second option from the doc ("From document stack to client conversation — in hours, not weeks") is more specific and outcome-oriented. Recommend testing both.                                                                                                                             |
| The Problem — readiness gap                   | ✅ EXISTS           | Architecture doc has the full narrative including the broker quote                                                                  | This is some of the strongest copy in either document. The broker quote ("I haven't come across enough people that really are banging down the door to find someone to build value. Usually, they're just at their wits' end, ready to sell.") is gold. Edit for web length but preserve the voice.                  |
| The Problem — unsafe AI angle                 | ✅ EXISTS           | Architecture doc + manifesto                                                                                                        | "One prompt away from mixing confidential data" — use this nearly verbatim.                                                                                                                                                                                                                                          |
| The Problem — workflow friction               | ✅ EXISTS           | Architecture doc: "receive docs → manually extract data → cross-reference benchmarks → synthesize → draft deliverable → weeks pass" | This is the before/after setup. Consider presenting it as a numbered timeline to make the pain feel sequential and cumulative.                                                                                                                                                                                       |
| How ELLA Solves It (5 steps)                  | ✅ EXISTS           | Architecture doc has all 5 steps written out                                                                                        | Needs visual treatment (numbered 01-05 per 7Analytics pattern) and compression for scannability, but the substance is complete. Each step should be 1-2 sentences max with a supporting visual or icon.                                                                                                              |
| The Opportunity: Engaging Earlier             | 🟡 PARTIAL          | Architecture doc has the framing but it's brief                                                                                     | Expand: this is ELLA's long-term positioning play for exit planning. The idea that context compounds over the lifecycle of a relationship (not just a transaction) deserves 2-3 paragraphs. Connect it to the advisor who wants to approach exit planning differently — engage earlier, build value over time.       |
| Who It's For — CEPAs                          | ✅ EXISTS           | Architecture doc has persona copy                                                                                                   | "Systematize your methodology. Stop reinventing the wheel." Ready for web with light editing.                                                                                                                                                                                                                        |
| Who It's For — CPAs/attorneys/wealth managers | ✅ EXISTS           | Architecture doc has persona copy                                                                                                   | "Exit planning is one of several things on your plate. ELLA makes it manageable." Ready with light editing.                                                                                                                                                                                                          |
| Who It's For — Firm leaders                   | ✅ EXISTS           | Architecture doc has persona copy                                                                                                   | "Standardize quality across your team." Ready with light editing.                                                                                                                                                                                                                                                    |
| Silver Tsunami context                        | 🟡 PARTIAL          | Architecture doc has the framing                                                                                                    | The macro thesis exists but reads as an aside. For this page, it should feel like the stakes — why this work matters beyond any individual engagement. Expand to 1 short paragraph + a compelling stat about the number of businesses approaching transition without succession plans. Source or cite a real number. |
| Social proof (exit-specific)                  | 🔴 NEEDS COLLECTION | Architecture doc mentions EPI/CEPA partnerships                                                                                     | Need exit-planning-specific testimonials, partnership badges, and ideally one case study (even lightweight).                                                                                                                                                                                                         |

---

## Page 4: Pricing — withella.io/pricing

### Overall Structure

**Key framing decision from the architecture doc:** Don't present pricing as tiers of the same thing. Present it as a journey: Free → SaaS → Vanguard → Community → Consulting.

**Design reference**: Function Health (clear, confident pricing with comparison), WithCoverage (single CTA confidence)

**Page flow:**

1. Hero — brief positioning statement about the journey, not a tier comparison
2. Journey visualization — 5 stages, each with clear deliverable and CTA
3. FAQ section
4. Final CTA

### Content Status

| Section              | Status           | Notes                                                                                                                                                                                                                                                                                                    |
| -------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Journey framing copy | 🔴 NEEDS WRITING | The architecture doc defines the tiers but doesn't have web copy. Write an intro paragraph that frames the pricing page as "here's the path" not "here's what you can buy." Something like: "Start by understanding where your practice stands. Then build the system. ELLA meets you wherever you are." |
| Tier 1: Start Free   | 🟡 PARTIAL       | Architecture doc: SOP Assessment + Valuation Tool                                                                                                                                                                                                                                                        | Need a description of what the free tier includes and what the user gets. Emphasize: no credit card, real value, not a feature-gated trial.                                          |
| Tier 2: Workbench    | 🔴 NEEDS WRITING | Architecture doc says "Monthly SaaS subscription (core platform)"                                                                                                                                                                                                                                        | Need: price (or "request pricing"), what's included, who it's for.                                                                                                                   |
| Tier 3: Vanguard     | ✅ EXISTS        | Architecture doc: $5,000 intensive                                                                                                                                                                                                                                                                       | Copy exists in the Vanguard page section. Pull the key details here.                                                                                                                 |
| Tier 4: Community    | 🟡 PARTIAL       | Architecture doc: $1,000/mo                                                                                                                                                                                                                                                                              | Needs a brief description of what membership includes.                                                                                                                               |
| Tier 5: Consulting   | 🔴 NEEDS WRITING | Architecture doc: $2-5K custom SOP builds                                                                                                                                                                                                                                                                | Needs a brief description and "Contact Us" CTA.                                                                                                                                      |
| FAQ                  | 🔴 NEEDS WRITING | —                                                                                                                                                                                                                                                                                                        | Write 5-8 questions a skeptical advisor would ask: "Is my client data secure?" "Can I customize templates?" "What if I already have a methodology?" "How long does onboarding take?" |

---

## Page 5: About — withella.io/about

### Overall Structure

**Design reference**: Moonfire (story-first), Function Health (calm authority)

The manifesto is the backbone of this page. Most of the content exists — it needs compression and web formatting, not writing from scratch.

**Page flow:**

1. Origin story — "The Answer Shifted. Twice."
2. The Thesis — Silver Tsunami + AI + systematization
3. The Team
4. Backed By
5. Link to the full manifesto

### Content Status

| Section        | Status                    | Source                                                                              | Notes                                                                                                                                                                                                                                                                |
| -------------- | ------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Origin story   | ✅ EXISTS                 | Architecture doc has the full narrative                                             | "Started with a question at the EPI Summit... the answer shifted twice." This is well-told and authentic. Edit for web length (target ~300 words) but preserve the narrative arc and voice. This also explains the domain shift from exitwithella.io to withella.io. |
| The Thesis     | ✅ EXISTS                 | Architecture doc: Silver Tsunami + advisor divide                                   | "AI is the tool. Systematization is the outcome. The advisor is the irreplaceable center." Strong. Needs light editing and a visual element (the divide framing could be a simple two-column contrast).                                                              |
| The Team       | 🔴 NEEDS WRITING + PHOTOS | Architecture doc specifies photos, short bios, emphasis on practitioner credibility | Write bios for each team member (3-4 sentences). Emphasize: these people have talked to the advisors, not just read about them. Professional but warm headshots.                                                                                                     |
| Backed By      | 🟡 PARTIAL                | Architecture doc mentions ei Innovations / Erie Insurance                           | Need a brief description of the venture studio model and why it matters (startup speed + institutional backing). 2-3 sentences.                                                                                                                                      |
| Manifesto link | ✅ EXISTS                 | —                                                                                   | Link prominently to the "With ELLA" blog post. Consider a callout box: "Read the full story: With ELLA — a 15-minute read on why we're building this."                                                                                                               |

---

## Page 6: Blog — withella.io/resources/blog

### Overall Structure

**Design reference**: Ramp Velocity (three-tier content hierarchy)

**Structure:**

1. Tier 1 — Hero article: full-width, dominant visual weight. Changes weekly or biweekly.
2. Tier 2 — Editor's picks: 4 curated articles in a grid. Represents range and quality, not recency.
3. Tier 3 — Latest stories: chronological feed with category filters.

**Oatmeal component**: Blog/content layout

### Content Status

| Element                            | Status                    | Notes                                                                                                                                                                                                                                                         |
| ---------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Blog layout (3-tier)               | 🔴 NEEDS DESIGN + BUILD   | The Oatmeal blog component will need customization to support the hero/picks/feed hierarchy. This is not a standard blog template — it's an editorial layout. Reference Ramp Velocity directly.                                                               |
| Category filters                   | 🔴 NEEDS IMPLEMENTATION   | Categories mapped from architecture doc's five pillars: "Industry Insights" (Silver Tsunami), "Practice Management" (Advisor Patterns), "Trust & Security" (Trust Infrastructure), "Product Updates" (Building in Public), "Perspectives" (Challenger Takes). |
| Migrated posts                     | 🟡 PARTIAL                | Architecture doc specifies migration from exitwithella.io with 301 redirects                                                                                                                                                                                  | Identify which existing posts migrate. Each needs a review pass for consistency with the new brand voice and positioning.                                                                                          |
| Author attribution                 | 🔴 NEEDS DECISION + SETUP | Thematic analysis: every piece should have a named author with title and photo                                                                                                                                                                                | Decide author naming convention. "Drew Watkins, Founder at ELLA" or similar. Set up author profiles with headshots.                                                                                                |
| Launch content (3-5 posts minimum) | 🟡 PARTIAL                | Manifesto is the cornerstone piece. What else ships at launch?                                                                                                                                                                                                | Recommend: (1) the manifesto as the hero article, (2) a product-focused "How ELLA Works" post, (3) a Silver Tsunami thesis piece, (4) one advisor-pattern or practice-management post. Items 2-4 may need writing. |
| Email capture / newsletter         | 🔴 NEEDS IMPLEMENTATION   | Architecture doc mentions email capture                                                                                                                                                                                                                       | Build into the blog layout. Consider a mid-feed CTA and a footer signup.                                                                                                                                           |

---

## Page 7: Resources Landing — withella.io/resources

### Overall Structure

Lightweight directory page linking to Blog, Case Studies, and Tools.

### Content Status

| Element           | Status          | Notes                                                                                                                                                     |
| ----------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page structure    | 🔴 NEEDS DESIGN | 3-card layout: Blog, Case Studies, Tools. Each with a brief description and link.                                                                         |
| Blog card         | ✅ EXISTS       | Links to /resources/blog                                                                                                                                  |
| Case Studies card | 🟡 PARTIAL      | Architecture doc defines the structure but no case studies exist yet. At launch, this card can say "Coming soon" or link to testimonials on the homepage. |
| Tools card        | 🟡 PARTIAL      | Architecture doc describes SOP Assessment and Valuation Communication Tool as standalone experiences. At launch, link to whichever tool is ready.         |

---

## Fast-Follow Pages (Within 30 Days of Launch)

### Future Solution Pages — Wealth, Accounting, Legal

**Content Status**: 🔴 NEEDS WRITING (but lightweight)

Each page follows the same template:

- Short hero with discipline-specific headline
- 3-4 bullet pain points specific to that discipline
- Brief explanation of how ELLA's platform capabilities translate
- Waitlist CTA with email capture
- Link back to the platform page

**Copywriter brief:** Write each page in 30 minutes, not 30 hours. These are intentional placeholders, not full solution pages. The goal is to signal that ELLA spans disciplines without overpromising. Total copy per page: ~200 words.

### Vanguard — withella.io/vanguard

**Content Status**: ✅ EXISTS in architecture doc — needs web formatting only once an event date is set. Do not publish until there's a date and application window.

### Case Studies

**Content Status**: 🔴 NEEDS PRODUCTION as real advisor stories develop. Structure from architecture doc: the advisor, the challenge, how ELLA helped, the result. Target: 1-2 case studies within 60 days of launch.

---

## Cross-Page Content Gaps Summary

These are the content items that need to be created or collected regardless of which page they appear on. They're listed here because they're reusable across multiple pages.

| Content Asset                                                     | Used On                              | Status                                             | Priority                                                           |
| ----------------------------------------------------------------- | ------------------------------------ | -------------------------------------------------- | ------------------------------------------------------------------ |
| 3-5 quantified testimonials (named, titled, firmed, with metrics) | Homepage, Exit Planning, Platform    | 🔴 NEEDS COLLECTION                                | **Critical** — highest-leverage content gap across the entire site |
| Advisor headshot photos                                           | Homepage, Exit Planning, About, Blog | 🔴 NEEDS COLLECTION                                | High — every testimonial and case study needs one                  |
| Firm logos (with permission)                                      | Homepage (logo strip)                | 🔴 NEEDS COLLECTION                                | High — the gatekeeping function described in the thematic analysis |
| Partnership badges (EPI, CEPA, etc.)                              | Homepage, Exit Planning              | 🟡 NEEDS CONFIRMATION                              | Medium — confirm which can be displayed                            |
| Team bios + headshots                                             | About                                | 🔴 NEEDS WRITING + PHOTOS                          | Medium — required for launch                                       |
| Security specifics (encryption, data residency, certifications)   | Platform, Homepage trust section     | 🔴 NEEDS DOCUMENTATION                             | Medium — firm leaders and risk-conscious buyers need this          |
| 10-15 headline options (tested)                                   | Homepage                             | 🔴 NEEDS WRITING + TESTING                         | **Critical** — the single most visible piece of copy on the site   |
| Before/after visual asset                                         | Homepage (Block 6)                   | 🔴 NEEDS DESIGN                                    | High — the primary proof moment                                    |
| Comparison table final copy                                       | Homepage (Block 7)                   | 🔴 NEEDS WRITING                                   | High — needs compression from the working draft in this document   |
| FAQ content (5-8 questions)                                       | Pricing                              | 🔴 NEEDS WRITING                                   | Medium                                                             |
| Blog launch content (3-5 posts)                                   | Blog                                 | 🟡 PARTIAL (manifesto exists, others need writing) | Medium — blog should have content at launch, not just structure    |
| "Switched from" badges                                            | Homepage testimonials                | 🔴 NEEDS DECISION + COLLECTION                     | Low-Medium — powerful but requires specific advisor data           |

---

## Implementation Sequence

### Week 1-2: Foundations

- Lock visual identity decisions (palette, typography, spacing) with designer
- Lock homepage headline direction (write 10-15 options, test with advisors)
- Begin collecting testimonials, logos, headshots
- Set up Oatmeal template with custom styling

### Week 3-4: Homepage Build

- Build homepage structure (Blocks 1-9)
- Write all homepage copy (hero, pillar cards, pillar deep-dives, comparison table, CTAs)
- Create before/after visual (Block 6)
- Integrate collected social proof

### Week 5-6: Supporting Pages

- Build Platform page (four pillars, security section, closer)
- Build Exit Planning solution page (adapt architecture doc content for web)
- Build Pricing page (journey framing, tier descriptions, FAQ)
- Build About page (compress manifesto, team bios)

### Week 7-8: Content & Polish

- Build blog layout (3-tier Ramp Velocity pattern)
- Migrate existing blog posts with 301 redirects
- Write 2-3 new blog posts for launch
- Build Resources landing page
- Cross-page QA: CTA consistency, testimonial placement, mobile responsiveness
- Performance testing: ensure the page loads fast without JS-dependent elements

### Week 9: Launch Prep

- Final copy review across all pages
- SEO setup (meta descriptions, structured data, sitemap)
- Analytics implementation
- Redirect configuration (exitwithella.io → withella.io)
- Soft launch to existing advisor network for feedback

### Week 10+: Fast-Follows

- Lightweight solution pages (Wealth, Accounting, Legal)
- Vanguard page (when event is scheduled)
- Interactive walkthrough (Option B from Block 6)
- Case studies as they develop
- Community page when membership is active
