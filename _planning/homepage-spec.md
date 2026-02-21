# withella.io — Homepage Implementation Spec (v2)

**Purpose:** Implementation-ready content and structure for the withella.io homepage. Every block includes actual copy (not just direction), design references, and build notes. Grounded in the "With ELLA" manifesto, existing exitwithella.io content, the site architecture document, and the thematic analysis.

**Key constraint:** We don't have social proof to lean on yet. No quantified testimonials, no firm logos, no usage metrics, no "switched from" stories. The site needs to earn trust through specificity, voice, and the weight of 100+ real advisor conversations rather than proof-by-numbers.

---

## Visual Foundation (Unchanged from v1)

- **Palette:** Warm cream/beige base (#f5eee1 range) with ELLA brand accent. No pure whites, no cold blues.
- **Typography:** Serif headings + sans-serif body (authority + clarity pairing).
- **Spacing:** Oatmeal defaults increased 20-30%.
- **Motion:** Only where it serves comprehension. No decorative animation.
- **Imagery:** Product screenshots where possible. Real advisor portraits in testimonials. No stock photography.

---

## Block 1: Hero

**Oatmeal component:** Hero section  
**Design reference:** Poolside AI (declarative energy), Function Health (typography warmth)

### Headline Options

The headline should reframe the category, not describe the product. Two directions the user has flagged as strong:

**Option A — Outcome-forward:**
> **Go from intake to insight in a fraction of the time.**

Why it works: This is ELLA's most proven proof point from demos and conversations. It names a specific transformation advisors recognize. It's concrete, not abstract. The existing site uses this and it lands.

**Option B — Identity-forward:**
> **Your methodology deserves a system.**

Why it works: It speaks to the advisor's identity and craft. It implies ELLA is the system without saying so. It positions the advisor as the expert and ELLA as the infrastructure. Feels like a manifesto line, which matches the challenger voice.

**Option C — Tension-forward (new):**
> **Built for how exit planning actually works.**

Why it works: Directly challenges the legacy tools that force advisors into someone else's methodology. The word "actually" does a lot of work, implying that existing tools were built for how someone *imagined* it works. Practitioner-credible.

**Option D — Compression of the manifesto's core tension (new):**
> **The workbench for advisors who want their time back.**

Why it works: Names the core emotional pain (time) and frames ELLA as the answer. "Workbench" is concrete and carries the malleability positioning. Speaks to both the experimenters and the overwhelmed.

**Option E — Category-reframing (new):**
> **Stop stitching. Start advising.**

Why it works: Two-word contrast that names the specific daily frustration (stitching together six tools, cobbling deliverables from email and ChatGPT). The shortest option and the most "challenger." Risk: might feel too punchy without supporting copy doing the work.

**Recommendation:** Option A or B for launch. Option A has the advantage of proven resonance in conversations. Option B is the stronger brand statement. Consider A as the headline with B as the closing CTA framing.

### Supporting Copy

**Primary option (from existing site, lightly refined):**
> ELLA turns trust into action with tools built for advisor-led transitions. From document intake through sensemaking to client-ready deliverables, one workspace holds everything your engagement needs.

**Alternative — Manifesto compression:**
> Your client list is growing. The complexity of each engagement is increasing. You need tools that hold context, accelerate your thinking, and produce deliverables that reflect the actual owner and business you're working with.

**Alternative — Problem-first:**
> Exit planning advisors spend days on document intake, manual analysis, and report drafting before the first real conversation even happens. We built ELLA to compress that arc, so you show up already informed and ready to guide.

### CTA

- **Primary:** "Get Started" → links to app signup
- **Secondary:** "Book a Demo" → links to cal.com scheduling
- **Micro-copy under primary:** "Your first 3 clients are on us." (Carried from existing site. Strong. Removes risk.)

### Visual

Product screenshot of the ELLA workbench (carry from existing site). The current screenshot showing the workspace with fact finding and sensemaking is effective. Consider a short looping animation showing the intake → sensemaking → deliverable flow if technically feasible. Do not use abstract graphics or stock imagery.

---

## Block 2: Credibility Strip

**Oatmeal component:** Simple banner/strip  
**Design reference:** Hebbia (stat pairing), but adapted for pre-traction stage

### The Problem

We have no firm logos, no usage metrics, and no switching stories. A traditional logo wall would be empty. We need a credibility signal that's honest about where we are while still building trust.

### The Play: "Built Through Conversations" Strip

Instead of a logo wall, lead with the strongest credibility asset we have: depth of practitioner research.

**Option A — Single declarative line:**
> Built through 100+ conversations with CEPAs, CPAs, wealth managers, M&A brokers, and attorneys.

**Option B — With design principle framing (from existing site):**
> Crafted for trusted advisors. From the ground up.
>
> While others start with their own templates and playbooks, we started with conversations. Where do advisors get stuck? What overwhelms owners? We stripped everything back and approached the problem with one goal: make uncovering insights easier.

**Option C — Compressed with texture:**
> We spent a year talking to advisors before we wrote a line of code. 100+ conversations with CEPAs, CPAs, wealth managers, and M&A brokers shaped every decision in this product.

**Recommendation:** Option C as a strip, styled as a horizontal banner with warm background. It's honest, it's specific, and it signals practitioner credibility without faking proof-by-numbers. The list of roles (CEPAs, CPAs, wealth managers, M&A brokers) does the work that logos would do: it tells the visitor "people like you shaped this."

**Design note:** This strip should feel quiet and confident, not loud. Think Function Health's calm authority. Light serif text on the warm cream background, generous whitespace on both sides.

---

## Block 3: Bridge Section — "Advising Can Be Chaos"

**Oatmeal component:** Text section with optional testimonial  
**Design reference:** Interloom (testimonial-before-features placement)

### Purpose

Before we pitch the product, name the pain. This block earns the right to describe the solution by proving we understand the problem. It borrows the manifesto's strongest framing: "advisors are stuck in AI's messy middle."

### Copy

**Section header:**
> Advisors are stuck in AI's messy middle.

**Body (adapted from manifesto, compressed for web):**

Advisors are racing to prepare for client meetings, often pulling up ChatGPT to synthesize documents, draft agendas, or make sense of a fact pattern they haven't had time to fully digest. It's fast, it's convenient, and it's quietly creating regulatory and reputational risk.

When you open ChatGPT for one client and move to the next conversation, you're one careless prompt away from cross-pollinating confidential information. Most advisors we spoke with hadn't thought about this. The ones who had were worried but didn't have a better option.

Meanwhile, business owners are using the same tools. They're asking AI what their business is worth, what questions to ask their advisor, whether they even need an advisor at all. The information asymmetry that once justified advisory fees is eroding.

The squeeze is real. And the tools advisors have today weren't built for this reality.

### Embedded Quote (Optional)

The two real quotes we have are strong but may fit better on the exit planning page since they're discipline-specific. For the homepage, we could use the manifesto's strongest advisor line:

> "No one's been able to come up with the perfect one-size-fits-all solution. Everyone has pros and cons about all of them."
> — Exit planning advisor, 20+ years experience

**Or omit the quote entirely** and let the problem framing carry the weight. A fabricated or stretched testimonial here would trigger the authenticity gap anti-pattern. Better to have a strong problem statement with no quote than a weak quote that undermines the credibility we're building.

**Recommendation:** Include the "one-size-fits-all" quote if we can attribute it accurately (even anonymously with role descriptor). It directly sets up ELLA's malleability positioning in the next block.

---

## Block 4: Product Pillars — "What We Built"

**Oatmeal component:** Feature section (card grid → deep-dive sections)  
**Design reference:** WithCoverage (3 anchor-linked cards), existing exitwithella.io feature layout

### Architecture Decision: Advisor-Focused, With Firm-Level Aspiration

For this version, the three pillars are product-capability-oriented rather than audience-oriented. This is the right call because:

1. We don't have firm-level customers yet, so "For Firms" would trigger the authenticity gap
2. The product capabilities are the strongest story we can tell right now
3. Firm leaders who visit will see the operational leverage implied in the capabilities

The pillars map to ELLA's core capabilities with the four product principles woven through:

### Card Grid (Scannable Overview)

| Card | Label | One-Line Benefit |
|------|-------|-----------------|
| 1 | **Fact Finding** | Structured discovery that adapts to your process, your industry, and your client. |
| 2 | **Sensemaking** | Ask questions against the full context of an engagement. Surface what matters. |
| 3 | **Deliverables** | Client-ready documents that reflect the actual owner and business, not a template. |

**Design note:** Each card is anchor-linked to its deep-dive section below. Cards should have a warm accent icon (not generic SaaS icons), the short label, and the one-line benefit. Generous padding.

### Deep-Dive Sections

Each section expands on the card with 2-3 specific capabilities, written in advisor-facing language.

---

**Section 1: Fact Finding — "Structured discovery, your way."**

*Adapted from existing site + architecture doc*

ELLA's Fact Finder isn't one-size-fits-all. Use lightweight templates or deep-dive discovery. Customize to your process, your industry, or your client. Invite the entire exit team to participate in the discovery gate, so the CPA, attorney, and financial advisor are all contributing to the same fact base from day one.

**Key capabilities:**
- Malleable templates that adapt to your methodology, not the other way around
- Owner collaboration built in: clients upload financials, answer intake questions, and provide the context only they have
- Everything connected to sensemaking and deliverables, so nothing gets lost between steps

**Product principle highlight:** *Malleability at every layer.* As one advisor told us: "No one's been able to come up with the perfect one-size-fits-all solution." We stopped trying. Instead, we built a system that adapts to yours.

**Visual:** Screenshot of ELLA's fact finding interface showing a customized template. Carry existing product screenshots from exitwithella.io.

---

**Section 2: Sensemaking — "From data to direction."**

*Adapted from existing site + manifesto*

Sensemaking is our take on AI. Secure, private, and connected to all the context from fact finding. Ask a question against the full context of a client engagement and get insight that's grounded in the actual data, not a generic summary.

This is where ELLA changes the daily workflow: instead of spending days manually extracting data points, cross-referencing benchmarks, and synthesizing findings, the advisor asks questions and the system draws from everything that's been uploaded and discussed.

**Key capabilities:**
- AI that operates within a sandboxed client workspace: no memory bleed, no cross-contamination between clients
- Questions and answers that build on each other, creating a growing context layer across the engagement
- Connected to fact finding on one side and deliverables on the other, so insight flows in both directions

**Product principle highlight:** *Fluidity between thinking and doing.* Ask a question, get insight, pull that insight into a document, refine it, share it. No friction between thinking and producing.

**Visual:** Screenshot showing a sensemaking conversation with contextual citations from uploaded documents. Or the workflow diagram: question → insight → deliverable.

---

**Section 3: Deliverables — "Documents that earn trust."**

*Adapted from existing site + manifesto*

We don't offer a 90-page report template, and we don't plan to. We built deliverables so that the documents you produce actually reflect the owner you're working with and the business they've built. Not a generic output that confuses both of you.

Deliverables pull directly from fact finding and sensemaking. The value acceleration plan references the actual financials. The gap analysis cites the actual assessment responses. Every document is grounded in the client's reality, which means the advisor walks into the room with materials that demonstrate real preparation and specific knowledge.

**Key capabilities:**
- Deliverables that incorporate context from across the engagement, not standalone templates
- Modular structure: build the output that serves this specific conversation, not the output a process demands
- Collaborate with exit team members on shared deliverables in one workspace

**Embedded quote (Lisa, Small Business Alternatives):**
> "Typically our deliverable would just be a standard EBITDA. ELLA is a value add and we can show that we aren't just pulling these numbers out of a hat."

**Product principle highlight:** *Context that compounds.* Every document uploaded, every question answered, and every insight generated becomes part of a growing knowledge layer. The more you build in ELLA, the smarter each interaction becomes.

**Visual:** Screenshot of a deliverable being created with contextual references visible. Or: the valuation delivery interface from the existing site.

---

### Cross-Cutting Capability: Exit Team Collaboration

This isn't a standalone pillar but appears as a thread across all three sections:

> When you're quarterbacking an exit team, everyone needs to work from the same facts. ELLA puts the team in one place, with the advisor in the driver's seat. Assign tasks, upload docs, track deliverables, and control what each team member can see and do.

**Visual:** The existing exit team workspace screenshot from exitwithella.io.

---

### Closing Line for Block 4

> **The goal is to free advisors to spend more time preparing, researching, and being the trusted voice in the room.**

**Embedded quote (Kevin, VFM):**
> "ELLA allows me to create more revenue opportunities. I'm able to create more of a consulting relationship where it leads to more business."

This pair, the philosophical line followed by a real advisor confirming it, closes the product section with both aspiration and proof.

---

## Block 5: Trust & Security

**Oatmeal component:** Feature section with icon list  
**Design reference:** Existing exitwithella.io security section (already strong)

### Purpose

This block answers the question that every advisor and firm leader silently asks: "Is this safe for my clients' data?" It appears after the product section because trust is earned through demonstrated capability, then reinforced with structural assurances.

### Section Header

> **Secure, because both of our reputations are on the line.**

*(Carried directly from existing site. This is a strong line that frames security as a shared concern, not a compliance checkbox.)*

### Copy

We know trust is earned, and essential when you're the steward of your clients' most valuable asset. ELLA is built with a security-first architecture that solves a problem most advisors haven't fully considered yet.

Here's what ChatGPT can't do: guarantee that your last client's financials don't leak into your next client's analysis. We solve this at the architectural level. Every client engagement lives in a sandboxed workspace with customizable permissions for all team members. When you move from one client to the next, there's no cross-contamination.

**Capability list (icon-driven):**
- Full data encryption in transit and at rest
- Modern U.S.-based infrastructure (SOC2/II compliant providers)
- Granular role-based access control (RBAC)
- Multi-factor authentication by default
- Enterprise SSO / SAML
- GDPR and CCPA adherence
- Your data exportable and deletable at any time

**Closing line:**
> Only those you explicitly invite can access your workspace. We don't share your business information without your permission. ELLA never sells your data.

**Design note:** This section should feel clean and confident. The existing exitwithella.io security section is well-designed. Carry the structure and refine the copy rather than rebuilding from scratch.

---

## Block 6: Interactive Proof Moment — Before/After

**Status: Deferred — future release. Strong concept worth investing in.**

**Oatmeal component:** Custom component  
**Design reference:** Wispr Flow (before/after), HelloPatient (live demo)

### Concept

A visual before/after transformation panel showing the advisor's workflow with and without ELLA. Static or lightly animated on scroll.

### Content (for when this block ships)

**Left Panel — "The Current Workflow"**
1. Receive documents via email from client, CPA, attorney
2. Manually extract key data points into spreadsheets
3. Cross-reference against industry benchmarks
4. Draft deliverable in Word from a generic template
5. Weeks pass before the first real conversation

**Right Panel — "With ELLA"**
1. Owner uploads directly; exit team contributes in one workspace
2. ELLA ingests, structures, and cross-references
3. Advisor asks questions against the full context
4. Insight flows directly into client-ready deliverables
5. Hours to the first real conversation, not weeks

**Design note:** The left panel should feel cluttered, fragmented (icons for email, spreadsheet, Word, calendar). The right panel should feel clean, connected, unified. The visual contrast does the persuasion work, not just the words.

### Build Recommendation

Defer to a fast-follow. The homepage can launch strong without this block, and doing it well requires custom design work beyond Oatmeal defaults. When it ships, place it between the product pillars (Block 4) and the comparison table (Block 7).

---

## Block 7: Comparison Table — "A Better Way to Work"

**Oatmeal component:** Pricing table (repurposed as comparison table)  
**Design reference:** Function Health (side-by-side comparison), Dope Security (generation framing)

### Structure

Three-column comparison: The Old Way → The Current Patchwork → With ELLA. The three-column "generation" framing is stronger than two columns because it makes ELLA feel like the inevitable next step rather than just a different option.

### Column Copy — Option Set A (Clean and Scannable, ~8 words per cell)

| Dimension | The Old Way | The Patchwork | With ELLA |
|-----------|-------------|---------------|-----------|
| **Client intake** | Paper forms and email back-and-forth | Scattered across CRM, email, shared drives | Owner uploads directly into a shared workspace |
| **Analysis** | Manual extraction, advisor's memory | ChatGPT with no guardrails or context | AI grounded in the full engagement context |
| **Deliverables** | 90-page template reports, generic jargon | Cobbled from Word docs, inconsistent quality | Documents that reflect the actual owner and business |
| **Team coordination** | Email chains, version confusion | Shared drives, still no single source of truth | One workspace, role-based access, advisor in the driver's seat |
| **Knowledge** | Lives in the advisor's head | Fragmented across tools, lost when people leave | Context compounds across every engagement |

### Column Copy — Option Set B (Compressed, ~5 words per cell)

| Dimension | The Old Way | The Patchwork | With ELLA |
|-----------|-------------|---------------|-----------|
| **Intake** | Paper. Email. Weeks. | Six tools, no connection | One workspace, day one |
| **Analysis** | Manual and memory-based | ChatGPT without guardrails | Contextual and sandboxed |
| **Deliverables** | 90-page templates | Cut-and-paste from Word | Built from the actual data |
| **Coordination** | "Did you see my email?" | Shared drive chaos | Exit team, one workspace |
| **Knowledge** | Walks out the door | Scattered and siloed | Compounds over time |

### Column Copy — Option Set C (Advisor-voice, conversational)

| Dimension | The Old Way | The Patchwork | With ELLA |
|-----------|-------------|---------------|-----------|
| **Getting started** | "Just send me everything via email" | Docs in the CRM, notes in a spreadsheet, financials somewhere else | Owner uploads once; everyone works from the same facts |
| **Making sense of it** | Days of reading, cross-referencing, synthesizing | "I asked ChatGPT to summarize it" (and hoped nothing leaked) | Ask questions against the full context, get grounded answers |
| **Producing the work** | Standard EBITDA report, 90 pages, mostly jargon | Paste from three sources, hope the formatting holds | Deliverables pull directly from intake and sensemaking |
| **Working with the team** | "Reply all" and hope everyone's current | A shared Google Drive that nobody organizes | Sandboxed workspace, advisor at the helm |
| **What stays after** | The advisor remembers (until they don't) | It's in a folder somewhere, probably | Every engagement builds a knowledge layer for the next |

### Column Copy — Option Set D (Hybrid: Clean Structure, Conversational Patchwork)

| Dimension | The Old Way | The Patchwork | With ELLA |
|-----------|-------------|---------------|-----------|
| **Client intake** | Paper forms, email back-and-forth | "It's in the CRM. Or the email. Or the shared drive." | Owner uploads directly; exit team contributes in one workspace |
| **Analysis** | Manual extraction, memory-based | "I asked ChatGPT" (one prompt away from leaking client data) | Contextual AI within a sandboxed client workspace |
| **Deliverables** | 90-page template reports | Cobbled from Word, inconsistent, "good enough" | Built from the actual financials, assessments, and conversation |
| **Team coordination** | Email chains, version confusion | Shared drives that nobody maintains | One workspace, role-based access, advisor in the driver's seat |
| **Knowledge retention** | Walks out the door when the advisor does | Scattered across six tools, never connected | Compounds over the lifecycle of every engagement |

### Recommendation

Option D balances scannability with voice. The conversational Patchwork column ("I asked ChatGPT," "good enough") creates the recognition moment that drives the comparison home, while the ELLA column stays specific and concrete. The Old Way column is matter-of-fact rather than condescending: many advisors reading this table are still doing it this way, and the tone should name the limitation without insulting the person.

### Visual Treatment

- "Old Way" column: muted gray text, faded
- "Patchwork" column: amber/warm warning tone
- "With ELLA" column: brand accent color, confident
- Subtle row icons or visual indicators (not just text)

---

## Block 8: Builder Credibility — "We Started With Conversations"

**The honest situation:** Zero public users, zero quantified metrics, zero switches, zero case studies. Traditional social proof would be an empty section or a dishonest one.

**What we do have:**
- 100+ real advisor conversations
- A handful of early access users with qualitative feedback
- Two real first-party quotes (Kevin and Lisa, now embedded in Block 4)
- The manifesto's depth as implied credibility
- A venture studio backing (ei Innovations / Erie Insurance)

### Strategy: Replace Social Proof With Origin Story

Instead of faking a testimonial carousel or leaving a visible gap, use this block to tell a compressed version of the origin story. This positions the depth of research as the proof that traditional metrics would provide. The existing site's "Crafted for trusted advisors, from the ground up" framing is the right instinct, refined here with more specificity.

### Section Header

> **We started with conversations, not code.**

### Copy

Before we built anything, we spent a year in conversation with the advisors who would use it. CEPAs running solo practices. CPAs doing exit work alongside their tax practice. Wealth managers thinking ten years ahead. M&A brokers who've been through hundreds of deals.

We asked the same question every time: where do you get stuck?

The answer shifted. Twice.

First, we learned advisors didn't need another monolithic platform. They needed a system that could hold context across their entire practice while letting them work the way they already work.

Second, we learned "exit planning" was the starting point, not the ceiling. The advisors we kept meeting were guiding business owners through consequential decisions across every stage of building a significant business. The common thread was trust as the foundation.

We built ELLA around both of those lessons.

### Link

> Read the full story → [With ELLA](/blog/with-ella)

### Backing Badge

> Built by ei Innovations, Erie Insurance's venture studio.

This provides institutional credibility without overstating it. One line, placed subtly at the bottom of this block or in the footer. Startup speed, institutional backing.

---

## Block 9: The Closer — Final CTA

**Oatmeal component:** CTA section  
**Design reference:** Function Health (warm, confident closer)

### Copy

We've noticed a divide forming among advisors.

Some are actively experimenting with how to adapt their practice for the age of AI. They want to build durable systems around what makes them unique.

Many more are stuck in the crunch. Running so hard to keep up with each engagement that they haven't had the bandwidth to step back and think about their practice as a system.

The advisors who figure out how to systematize without sacrificing the relationship are the ones who will thrive as AI reshapes the landscape.

### Closing Line Options

> **Option 1:** ELLA is how advisors are building that future.

> **Option 2:** Your methodology is your moat. Build the system around it.

> **Option 3:** We're building for the advisors who want to systematize what makes them unique. We're giving them a leg up to take their practice into the new era.

### CTA

- **Primary:** "Get Started" → app signup
  - Micro-copy: "Your first 3 clients are on us."
- **Secondary:** "Book a Demo" → cal.com scheduling

### Design Note

Warm background (slightly different from page default for visual separation). Generous whitespace. No urgency indicators or countdown timers. The confidence of the framing is the conversion mechanism.

---

## Full Page Flow (Launch Version)

| # | Block | Primary Content | Key Decision |
|---|-------|----------------|--------------|
| 1 | Hero | Headline + subhead + dual CTA + product screenshot | Pick headline A or B |
| 2 | Credibility Strip | "100+ conversations" declarative line | Pick strip option |
| 3 | Bridge | "Messy middle" problem framing + optional quote | Include/exclude advisor quote |
| 4 | Product Pillars | Fact Finding → Sensemaking → Deliverables (cards + deep-dives) + Kevin/Lisa quotes embedded | Approve screenshots |
| 5 | Trust & Security | Sandboxed workspaces, encryption, permissions | Carried from existing site |
| 6 | ~~Before/After~~ | ~~Visual transformation panel~~ | **Deferred** |
| 7 | Comparison Table | Old Way → Patchwork → With ELLA | Pick column copy option |
| 8 | Builder Credibility | Origin story: "We started with conversations" | Approve copy |
| 9 | Closer | "Divide forming" framing + dual CTA | Pick closing line |

---

## What's Intentionally Absent

**No Vanguard teaser.** No event date exists. Dead weight until one does.

**No solutions selector.** Exit planning is the entire story right now. Other disciplines can live in the nav as lightweight landing pages, but the homepage shouldn't fragment attention toward solutions without product behind them.

**No firm-leader pillar.** Firm-level value is implied in the product capabilities (collaboration, role-based access, compounding context). A dedicated "For Firms" section triggers the authenticity gap until we have a firm-level customer.

**No pricing table on homepage.** The CTAs cover both paths: free tier ("first 3 clients on us") and human path ("Book a Demo"). Pricing page is a separate destination.

**No "Ask AI about us" section.** The existing site's Grok/ChatGPT/Claude block is clever but risky with limited public presence. Revisit when ELLA has enough web content to reliably inform model responses.

---

## Content Assets Required for Launch

| Asset | Block(s) | Status | Action |
|-------|----------|--------|--------|
| Headline selection | 1 | 5 options provided | Pick one, test with advisors |
| Supporting copy selection | 1 | 3 options provided | Pick one |
| Product screenshots (current) | 1, 4 | Existing on exitwithella.io | Carry forward |
| Kevin quote approval | 4 | Quote exists on current site | Confirm for new site |
| Lisa quote approval | 4 | Quote exists on current site | Confirm for new site |
| "One-size-fits-all" attribution | 3 | Quote from manifesto | Confirm anonymous descriptor |
| Comparison table copy | 7 | 4 option sets provided | Pick one |
| Closing line | 9 | 3 options provided | Pick one |
| Team bios + headshots | 8 (or About page) | Not yet written | Write for About, reference in footer |
| Before/after visual | 6 | Concept documented | Deferred to fast-follow |
