/**
 * Idempotent seed script for ELLA.
 *
 * Run after migration: pnpm seed
 *
 * Seeds:
 *   - 4 Disciplines
 *   - 5 Categories
 *   - 3 Partners
 *   - 5 PricingTiers
 *   - 2 Tools
 *   - 4 Solutions (1 published / 3 waitlist)
 *   - Navigation global
 *   - SiteSettings global
 *   - 2 Testimonials (Kevin, Lisa)
 *   - Homepage page document (full real content, upsert)
 */
import 'dotenv/config'
import { getPayload } from 'payload'

import config from './payload.config'

/** Build a Lexical rich-text document from plain paragraph strings. */
function makeRichText(...paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
        textFormat: 0,
        textStyle: '',
        children: [
          {
            type: 'text',
            version: 1,
            text,
            format: 0,
            detail: 0,
            mode: 'normal' as const,
            style: '',
          },
        ],
      })),
    },
  }
}

async function seed() {
  const payload = await getPayload({ config })

  // ─────────────────────────────────────────────────────────
  // Disciplines
  // ─────────────────────────────────────────────────────────
  const disciplines = [
    {
      name: 'Exit Planning',
      slug: 'exit-planning',
      description:
        'Comprehensive exit strategy development for business owners and their advisors.',
      sortOrder: 1,
    },
    {
      name: 'Wealth Management',
      slug: 'wealth-management',
      description: 'Integrated wealth planning for high-net-worth individuals and families.',
      sortOrder: 2,
    },
    {
      name: 'Business Advisory',
      slug: 'business-advisory',
      description: 'Strategic advisory services for closely held business owners.',
      sortOrder: 3,
    },
    {
      name: 'Tax & Estate Planning',
      slug: 'tax-estate-planning',
      description: 'Coordinated tax and estate planning to preserve and transfer wealth.',
      sortOrder: 4,
    },
  ]

  for (const discipline of disciplines) {
    const existing = await payload.find({
      collection: 'disciplines',
      where: { slug: { equals: discipline.slug } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      await payload.create({ collection: 'disciplines', data: discipline })
      console.log(`✓ Discipline: ${discipline.name}`)
    } else {
      console.log(`  Discipline already exists: ${discipline.name}`)
    }
  }

  // ─────────────────────────────────────────────────────────
  // Categories (blog)
  // ─────────────────────────────────────────────────────────
  const categories = [
    { title: 'Exit Planning', slug: 'exit-planning', sortOrder: 1 },
    { title: 'Practice Management', slug: 'practice-management', sortOrder: 2 },
    { title: 'Wealth Strategy', slug: 'wealth-strategy', sortOrder: 3 },
    { title: 'Client Experience', slug: 'client-experience', sortOrder: 4 },
    { title: 'Industry Trends', slug: 'industry-trends', sortOrder: 5 },
  ]

  for (const category of categories) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: category.slug } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      await payload.create({ collection: 'categories', data: category })
      console.log(`✓ Category: ${category.title}`)
    } else {
      console.log(`  Category already exists: ${category.title}`)
    }
  }

  // ─────────────────────────────────────────────────────────
  // Partners
  // ─────────────────────────────────────────────────────────
  const partnerDefs = [
    {
      name: 'Exit Planning Institute',
      type: 'association' as const,
      url: 'https://exit-planning-institute.org',
      showOnHomepage: true,
      sortOrder: 1,
    },
    {
      name: 'ei Innovations',
      type: 'technology' as const,
      url: 'https://einnovations.com',
      showOnHomepage: true,
      sortOrder: 2,
    },
    {
      name: 'CEPA Foundation',
      type: 'certification' as const,
      url: 'https://cepafoundation.org',
      showOnHomepage: true,
      sortOrder: 3,
    },
  ]

  for (const partner of partnerDefs) {
    const existing = await payload.find({
      collection: 'partners',
      where: { name: { equals: partner.name } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      await payload.create({ collection: 'partners', data: partner })
      console.log(`✓ Partner: ${partner.name} (logo needs upload)`)
    } else {
      console.log(`  Partner already exists: ${partner.name}`)
    }
  }

  // ─────────────────────────────────────────────────────────
  // Pricing Tiers (2-tier: Practitioner + Enterprise)
  // ─────────────────────────────────────────────────────────
  const pricingTiers = [
    {
      name: 'Practitioner',
      tagline: 'For the solo advisor building a scalable practice',
      description:
        'Full access to the ELLA platform — Fact Finding, Sensemaking, and Deliverables — for the advisor ready to systematize their practice.',
      badge: 'Most Popular',
      price: { amount: 9900, period: 'month' as const },
      features: [
        {
          feature: 'Unlimited active client engagements',
          included: 'yes' as const,
        },
        {
          feature: 'Full Fact Finding, Sensemaking & Deliverables',
          included: 'yes' as const,
        },
        {
          feature: 'Custom templates and document generation',
          included: 'yes' as const,
        },
        { feature: 'Client portal access', included: 'yes' as const },
        { feature: 'Email support', included: 'yes' as const },
        {
          feature: 'SOC 2 compliant — data never used to train AI',
          included: 'yes' as const,
        },
      ],
      cta: {
        label: 'Get Started',
        href: 'https://app.exitwithella.io/sign-up',
      },
      highlighted: true,
      sortOrder: 1,
    },
    {
      name: 'Enterprise',
      tagline: 'For multi-advisor practices and firms',
      description:
        'Everything in Practitioner, plus unlimited advisor seats, an admin dashboard, SSO, and a dedicated success manager.',
      price: {
        amount: 0,
        period: 'custom' as const,
        customLabel: 'Contact us',
      },
      features: [
        { feature: 'Everything in Practitioner', included: 'yes' as const },
        { feature: 'Unlimited advisor seats', included: 'yes' as const },
        {
          feature: 'Team workspace and admin dashboard',
          included: 'yes' as const,
        },
        {
          feature: 'SSO / SAML and custom data retention',
          included: 'yes' as const,
        },
        {
          feature: 'Priority support and dedicated success manager',
          included: 'yes' as const,
        },
        {
          feature: 'Custom onboarding and integrations',
          included: 'yes' as const,
        },
      ],
      cta: {
        label: 'Talk to Our Team',
        href: 'https://cal.com/team/ella/ella-intro?overlayCalendar=true',
      },
      highlighted: false,
      sortOrder: 2,
    },
  ]

  for (const tier of pricingTiers) {
    const existing = await payload.find({
      collection: 'pricing-tiers',
      where: { name: { equals: tier.name } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      await payload.create({ collection: 'pricing-tiers', data: tier })
      console.log(`✓ Pricing Tier: ${tier.name}`)
    } else {
      await payload.update({
        collection: 'pricing-tiers',
        id: existing.docs[0].id,
        data: tier,
      })
      console.log(`  Pricing Tier updated: ${tier.name}`)
    }
  }

  // ─────────────────────────────────────────────────────────
  // FAQ Items (pricing page)
  // ─────────────────────────────────────────────────────────
  const faqItems = [
    {
      question: 'What happens to my client data?',
      answer: makeRichText(
        'Your client data is encrypted in transit and at rest. Every client engagement lives in a sandboxed workspace — there is no memory bleed between clients. ELLA never uses your data to train AI models, and you can export or delete your data at any time.',
        'We run on SOC 2 compliant infrastructure with granular role-based access control. Only the people you explicitly invite can access your workspace.',
      ),
      category: 'security' as const,
      showOnPricing: true,
      sortOrder: 1,
    },
    {
      question: 'Can I use ELLA with my existing methodology?',
      answer: makeRichText(
        "ELLA is methodology-agnostic. It's designed to systematize your approach, not replace it. You customize the intake templates, discovery questions, and deliverable structures to match how you already work.",
        "Whether you follow the Value Acceleration Methodology, a proprietary framework, or something you've developed over decades — ELLA holds your process and makes it repeatable.",
      ),
      category: 'platform' as const,
      showOnPricing: true,
      sortOrder: 2,
    },
    {
      question: 'How long does it take to get started?',
      answer: makeRichText(
        "Most advisors are productive within their first client engagement. There's no lengthy onboarding or implementation project — you configure your templates, invite your first client, and start working.",
        "If you'd like a guided walkthrough, our team is happy to walk you through the platform and help you map your methodology into ELLA.",
      ),
      category: 'onboarding' as const,
      showOnPricing: true,
      sortOrder: 3,
    },
    {
      question: "What's included in the Practitioner plan?",
      answer: makeRichText(
        'The Practitioner plan gives you full access to the ELLA platform: Fact Finding (structured discovery and client intake), Sensemaking (context-aware AI analysis sandboxed to each client), and Deliverables (client-ready documents built from your actual engagement data).',
        'You get unlimited active client engagements, custom templates, a client portal, and email support — everything you need to systematize a solo practice.',
      ),
      category: 'pricing' as const,
      showOnPricing: true,
      sortOrder: 4,
    },
    {
      question: 'Do I need to commit to an annual plan?',
      answer: makeRichText(
        'No. ELLA is month-to-month with no long-term contracts. You can cancel at any time.',
        'Annual pricing is available for those who prefer it. Contact us to learn more.',
      ),
      category: 'pricing' as const,
      showOnPricing: true,
      sortOrder: 5,
    },
    {
      question: 'What kind of support is included?',
      answer: makeRichText(
        'Practitioner includes email support with a response commitment of one business day.',
        'Enterprise includes priority support, a dedicated customer success manager, and custom onboarding. Your success manager will help you map your methodology into ELLA, train your team, and be available as your practice scales.',
      ),
      category: 'pricing' as const,
      showOnPricing: true,
      sortOrder: 6,
    },
    {
      question: 'Can I upgrade to Enterprise later?',
      answer: makeRichText(
        "Yes. When you're ready to scale beyond a solo practice, upgrading to Enterprise is seamless — your data, templates, and client history all carry over. Contact our team and we'll handle the transition.",
      ),
      category: 'pricing' as const,
      showOnPricing: true,
      sortOrder: 7,
    },
    {
      question: 'Is ELLA only for exit planning?',
      answer: makeRichText(
        "Exit planning is our beachhead — it's where ELLA is deepest and most proven. But the platform is built for the full advisory lifecycle. Advisors use ELLA for wealth management, business advisory, tax and estate planning, and any engagement that involves structured discovery and client-ready deliverables.",
        "We started with exit planning because that's where the workflow complexity is highest. Every other discipline benefits from the same systematized approach.",
      ),
      category: 'platform' as const,
      showOnPricing: true,
      sortOrder: 8,
    },
    {
      question: 'Who built ELLA?',
      answer: makeRichText(
        "ELLA is built by ei Innovations, Erie Insurance's venture studio. We spent over a year in conversation with CEPAs, CPAs, wealth managers, and M&A advisors before writing a single line of code.",
        'The product is shaped by the real workflow problems advisors described — not assumptions. That foundation is reflected in every design decision.',
      ),
      category: 'general' as const,
      showOnPricing: true,
      sortOrder: 9,
    },
    {
      question: 'What if I have multiple advisors in my practice?',
      answer: makeRichText(
        'The Enterprise plan is built for multi-advisor practices. It includes unlimited advisor seats, a shared team workspace with role-based access control, and an admin dashboard for managing your practice.',
        'Contact our team and we can scope the right setup for your practice size and structure.',
      ),
      category: 'pricing' as const,
      showOnPricing: true,
      sortOrder: 10,
    },
  ]

  for (const faq of faqItems) {
    const existing = await payload.find({
      collection: 'faq-items',
      where: { question: { equals: faq.question } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      await payload.create({ collection: 'faq-items', data: faq })
      console.log(`✓ FAQ: ${faq.question.slice(0, 60)}`)
    } else {
      await payload.update({
        collection: 'faq-items',
        id: existing.docs[0].id,
        data: faq,
      })
      console.log(`  FAQ updated: ${faq.question.slice(0, 60)}`)
    }
  }

  // ─────────────────────────────────────────────────────────
  // Tools
  // ─────────────────────────────────────────────────────────
  const exitPlanningDiscipline = await payload.find({
    collection: 'disciplines',
    where: { slug: { equals: 'exit-planning' } },
    limit: 1,
  })

  if (exitPlanningDiscipline.docs.length > 0) {
    const epDisciplineId = exitPlanningDiscipline.docs[0].id

    const tools = [
      {
        title: 'Business Readiness Assessment',
        slug: 'business-readiness-assessment',
        description:
          'Structured assessment that benchmarks a business against exit readiness criteria across 8 dimensions.',
        disciplines: [epDisciplineId],
        status: 'available' as const,
      },
      {
        title: 'Value Gap Calculator',
        slug: 'value-gap-calculator',
        description:
          "Quantifies the gap between current business value and the owner's financial independence number.",
        disciplines: [epDisciplineId],
        status: 'available' as const,
      },
    ]

    for (const tool of tools) {
      const existing = await payload.find({
        collection: 'tools',
        where: { slug: { equals: tool.slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        await payload.create({ collection: 'tools', data: tool })
        console.log(`✓ Tool: ${tool.title}`)
      } else {
        console.log(`  Tool already exists: ${tool.title}`)
      }
    }
  }

  // ─────────────────────────────────────────────────────────
  // Solutions
  // ─────────────────────────────────────────────────────────
  const solutionDefs = [
    {
      title: 'Exit Planning',
      slug: 'exit-planning',
      tagline: 'From discovery to close — systematized.',
      disciplineSlug: 'exit-planning',
      status: 'published' as const,
      isBeachhead: true,
    },
    {
      title: 'Wealth Management',
      slug: 'wealth-management',
      tagline: 'Integrated planning for business wealth.',
      disciplineSlug: 'wealth-management',
      status: 'waitlist' as const,
      isBeachhead: false,
    },
    {
      title: 'Business Advisory',
      slug: 'business-advisory',
      tagline: 'Strategic counsel, systematically delivered.',
      disciplineSlug: 'business-advisory',
      status: 'waitlist' as const,
      isBeachhead: false,
    },
    {
      title: 'Tax & Estate Planning',
      slug: 'tax-estate-planning',
      tagline: 'Coordinated planning across generations.',
      disciplineSlug: 'tax-estate-planning',
      status: 'waitlist' as const,
      isBeachhead: false,
    },
  ]

  for (const sol of solutionDefs) {
    const existing = await payload.find({
      collection: 'solutions',
      where: { slug: { equals: sol.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  Solution already exists: ${sol.title}`)
      continue
    }

    const disciplineResult = await payload.find({
      collection: 'disciplines',
      where: { slug: { equals: sol.disciplineSlug } },
      limit: 1,
    })

    if (disciplineResult.docs.length === 0) {
      console.log(`  ⚠ Discipline not found for solution: ${sol.title}`)
      continue
    }

    const { disciplineSlug: _, ...solutionData } = sol
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await payload.create({
      collection: 'solutions',
      data: {
        title: solutionData.title,
        slug: solutionData.slug,
        tagline: solutionData.tagline,
        status: solutionData.status,
        isBeachhead: solutionData.isBeachhead,
        discipline: disciplineResult.docs[0].id,
        hero: { headline: solutionData.title },
      } as any,
    })
    console.log(`✓ Solution: ${sol.title}`)
  }

  // ─────────────────────────────────────────────────────────
  // Navigation global
  // ─────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      primaryNav: [
        { label: 'Platform', href: '/platform', type: 'link' },
        {
          label: 'Solutions',
          type: 'dropdown',
          dropdownItems: [
            {
              label: 'Exit Planning',
              href: '/solutions/exit-planning',
              description: 'From discovery to close',
            },
            {
              label: 'Wealth Management',
              href: '/solutions/wealth-management',
              description: 'Integrated planning',
            },
            {
              label: 'Business Advisory',
              href: '/solutions/business-advisory',
              description: 'Strategic counsel',
            },
          ],
        },
        { label: 'Pricing', href: '/pricing', type: 'link' },
        { label: 'About', href: '/about', type: 'link' },
        { label: 'Blog', href: '/blog', type: 'link' },
      ],
      primaryCta: { label: 'Get Started', href: '/get-started' },
      secondaryCta: { label: 'Book a Demo', href: '/demo' },
    },
  })
  console.log('✓ Navigation global')

  // ─────────────────────────────────────────────────────────
  // SiteSettings global
  // ─────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'ELLA',
      socialLinks: {
        linkedIn: 'https://linkedin.com/company/withella',
      },
      announcementBar: {
        enabled: false,
      },
    },
  })
  console.log('✓ SiteSettings global')

  // ─────────────────────────────────────────────────────────
  // Testimonials
  // ─────────────────────────────────────────────────────────
  const testimonialDefs = [
    {
      name: 'Kevin',
      title: 'Certified Exit Planning Advisor',
      quote:
        'ELLA allows me to create more revenue opportunities. I\u2019m able to create more of a consulting relationship where it leads to more business.',
      approved: true,
    },
    {
      name: 'Lisa',
      title: 'M&A Advisor, Small Business Alternatives',
      quote:
        'Typically our deliverable would just be a standard EBITDA. ELLA is a value add and we can show that we aren\u2019t just pulling these numbers out of a hat.',
      approved: true,
    },
  ]

  const testimonialIds: Record<string, number> = {}

  for (const t of testimonialDefs) {
    const existing = await payload.find({
      collection: 'testimonials',
      where: { name: { equals: t.name } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      const created = await payload.create({
        collection: 'testimonials',
        data: t,
      })
      testimonialIds[t.name] = created.id
      console.log(`✓ Testimonial: ${t.name}`)
    } else {
      // Update with real content in case a placeholder was previously seeded
      await payload.update({
        collection: 'testimonials',
        id: existing.docs[0].id,
        data: t,
      })
      testimonialIds[t.name] = existing.docs[0].id
      console.log(`  Testimonial updated: ${t.name}`)
    }
  }

  // ─────────────────────────────────────────────────────────
  // Homepage (upsert — create or update with full real content)
  // ─────────────────────────────────────────────────────────
  const homepageLayout = [
    // Block 2: Credibility Strip
    {
      blockType: 'credibility-strip',
      variant: 'text',
      statement:
        'We spent a year talking to advisors before we wrote a line of code. 100+ conversations with CEPAs, CPAs, wealth managers, and M&A brokers shaped every decision in this product.',
      bgStyle: 'cream',
    },
    // Block 3: Squeeze — "Advisors are stuck in AI's messy middle"
    {
      blockType: 'squeeze-section',
      label: 'The Problem',
      heading: 'Advisors are stuck in AI\u2019s messy middle.',
      body: makeRichText(
        'Advisors are racing to prepare for client meetings, often pulling up ChatGPT to synthesize documents, draft agendas, or make sense of a fact pattern they haven\u2019t had time to fully digest. It\u2019s fast, it\u2019s convenient, and it\u2019s quietly creating regulatory and reputational risk.',
        'When you open ChatGPT for one client and move to the next conversation, you\u2019re one careless prompt away from cross-pollinating confidential information. Most advisors we spoke with hadn\u2019t thought about this. The ones who had were worried but didn\u2019t have a better option.',
        'Meanwhile, business owners are using the same tools. They\u2019re asking AI what their business is worth, what questions to ask their advisor, whether they even need an advisor at all. The information asymmetry that once justified advisory fees is eroding.',
      ),
      quotes: [
        {
          text: 'No one\u2019s been able to come up with the perfect one-size-fits-all solution. Everyone has pros and cons about all of them.',
          attribution: 'Exit planning advisor, 20+ years experience',
        },
        {
          text: 'The minute they feel like they\u2019re in a box, they\u2019re like, \u2018wait, I was unique to you two minutes ago, and now I\u2019m in a box?\u2019',
          attribution: 'CEPA, on client expectations',
        },
      ],
      closer:
        'The squeeze is real. And the tools advisors have today weren\u2019t built for this reality.',
      pressureItems: [
        { text: 'More clients' },
        { text: 'Deeper engagements' },
        { text: 'Shorter timelines' },
        { text: 'Higher stakes' },
        { text: 'Regulatory scrutiny' },
        { text: 'Key-person risk' },
      ],
      erosionItems: [
        { text: 'Owners Googling valuations' },
        { text: 'ChatGPT drafting exit plans' },
        { text: 'AI leveling the field' },
        { text: 'Clients questioning fees' },
        { text: 'Information parity' },
        { text: 'Commoditized insights' },
      ],
    },
    // Block 4a: Pillar Cards
    {
      blockType: 'card-grid',
      sectionLabel: 'What We Built',
      heading: 'Three pillars. One workbench.',
      subheading:
        'ELLA organizes the entire advisory workflow into three connected pillars \u2014 so nothing falls through the cracks.',
      variant: 'feature',
      columns: '3',
      bgStyle: 'cream',
      cards: [
        {
          heading: 'Fact Finding',
          body: 'Structured discovery that adapts to your process, your industry, and your client.',
          capabilities: [
            { text: 'Lightweight or deep-dive templates' },
            { text: 'Collaborative client workspace' },
            { text: 'Customizable to your process' },
          ],
        },
        {
          heading: 'Sensemaking',
          body: 'Ask questions against the full context of an engagement. Surface what matters.',
          capabilities: [
            { text: 'Sandboxed per client \u2014 no memory bleed' },
            { text: 'Connected to fact finding data' },
            { text: 'Builds context across the engagement' },
          ],
        },
        {
          heading: 'Deliverables',
          body: 'Client-ready documents that reflect the actual owner and business, not a template.',
          capabilities: [
            { text: 'Insight flows directly from sensemaking' },
            { text: 'Collaborative and contextual' },
            { text: 'Branded and export-ready' },
          ],
        },
      ],
    },
    // Block 4b: Sensemaking Deep-Dive
    {
      blockType: 'feature-deep-dive',
      sectionLabel: 'Sensemaking',
      sectionId: 'sensemaking',
      bgStyle: 'ash-light',
      sections: [
        {
          heading: 'From data to direction.',
          body: makeRichText(
            'Sensemaking is our take on AI. Secure, private, and connected to all the context from fact finding. Ask a question against the full context of a client engagement and get insight that\u2019s grounded in the actual data, not a generic summary.',
            'This is where ELLA changes the daily workflow: instead of spending days manually extracting data points, cross-referencing benchmarks, and synthesizing findings, the advisor asks questions and the system draws from everything that\u2019s been uploaded and discussed.',
          ),
          testimonial: testimonialIds['Kevin'] ?? null,
        },
      ],
    },
    // Block 5: Trust & Security
    {
      blockType: 'trust-security',
      heading: 'Secure, because *both* of our reputations are on the line.',
      intro:
        'We know trust is earned\u2014and essential when you\u2019re the steward of your clients\u2019 most valuable asset. That\u2019s why ELLA is built with a security-first mindset, grounded in transparency and respect for your data *and* your clients\u2019 data.',
      sections: [
        {
          title: 'Secure by Design',
          body: 'We design our systems and processes in alignment with leading security frameworks. Our practices are informed by these standards to ensure robust security, access control, and data protection.\n\nAll data on ELLA is encrypted in transit and at rest. We use modern SOC2/II compliant infrastructure providers like Vercel and Cloudflare. Strict access controls, internal policies, and multi-factor authentication (MFA) safeguard your information within our company.',
          bulletHeading: "You're in Good Hands",
          bulletItems: [
            { label: 'Full data encryption' },
            { label: 'Modern U.S.-based Infrastructure' },
            { label: 'GDPR & CCPA Adherence' },
            { label: 'Granular Access Control (RBAC)' },
            { label: 'Multi-factor Auth by Default' },
            { label: 'Enterprise SSO / SAML' },
          ],
          column: 'left',
        },
        {
          title: 'Your data, always',
          body: 'When advisors use ELLA to support their clients, they remain in control. Only those you explicitly invite can access your organization or client workbenches. We don\u2019t share your business information without your permission.',
          column: 'right',
        },
        {
          title: 'Privacy Built-In',
          body: 'We follow U.S. state privacy laws and align with international standards like GDPR. Users can export or delete their data at any time. ELLA never sells your data, and only processes it to provide the services you\u2019ve signed up for.',
          column: 'right',
        },
      ],
      bgStyle: 'ash-light',
    },
    // Block 6: Before/After Panel
    {
      blockType: 'before-after-panel',
      sectionLabel: 'The ELLA Difference',
      heading: 'Hours, not weeks.',
      subheading:
        'See how ELLA transforms the advisory workflow from first contact to final deliverable.',
      before: {
        label: 'The Current Workflow',
        points: [
          { text: 'Receive documents via email from client, CPA, attorney' },
          { text: 'Manually extract key data points into spreadsheets' },
          { text: 'Cross-reference against industry benchmarks' },
          { text: 'Draft deliverable in Word from a generic template' },
          { text: 'Weeks pass before the first real conversation' },
        ],
      },
      after: {
        label: 'With ELLA',
        points: [
          {
            text: 'Owner uploads directly; exit team contributes in one workspace',
          },
          { text: 'ELLA ingests, structures, and cross-references' },
          { text: 'Advisor asks questions against the full context' },
          { text: 'Insight flows directly into client-ready deliverables' },
          { text: 'Hours to the first real conversation, not weeks' },
        ],
      },
    },
    // Block 7: Comparison Table — Old Way / Patchwork / With ELLA (Option D)
    {
      blockType: 'comparison-table',
      sectionLabel: 'A Better Way to Work',
      heading: 'The old way isn\u2019t working. Neither is the patchwork.',
      subheading: 'See how ELLA compares to the workflows advisors are trying to leave behind.',
      bgStyle: 'cream',
      columns: [
        {
          heading: 'The Old Way',
          subheading: 'Manual, memory-based',
          highlighted: false,
        },
        {
          heading: 'The Patchwork',
          subheading: 'Stitched together, leaky',
          highlighted: false,
        },
        {
          heading: 'With ELLA',
          subheading: 'Purpose-built for advisors',
          highlighted: true,
        },
      ],
      rows: [
        {
          label: 'Client intake',
          values: [
            { text: 'Paper forms, email back-and-forth', indicator: 'cross' },
            {
              text: '\u201cIt\u2019s in the CRM. Or the email. Or the shared drive.\u201d',
              indicator: 'partial',
            },
            {
              text: 'Owner uploads directly; exit team contributes in one workspace',
              indicator: 'check',
            },
          ],
        },
        {
          label: 'Analysis',
          values: [
            { text: 'Manual extraction, memory-based', indicator: 'cross' },
            {
              text: '\u201cI asked ChatGPT\u201d (one prompt away from leaking client data)',
              indicator: 'partial',
            },
            {
              text: 'Contextual AI within a sandboxed client workspace',
              indicator: 'check',
            },
          ],
        },
        {
          label: 'Deliverables',
          values: [
            { text: '90-page template reports', indicator: 'cross' },
            {
              text: 'Cobbled from Word, inconsistent, \u201cgood enough\u201d',
              indicator: 'partial',
            },
            {
              text: 'Built from the actual financials, assessments, and conversation',
              indicator: 'check',
            },
          ],
        },
        {
          label: 'Team coordination',
          values: [
            { text: 'Email chains, version confusion', indicator: 'cross' },
            {
              text: 'Shared drives that nobody maintains',
              indicator: 'partial',
            },
            {
              text: 'One workspace, role-based access, advisor in the driver\u2019s seat',
              indicator: 'check',
            },
          ],
        },
        {
          label: 'Knowledge retention',
          values: [
            {
              text: 'Walks out the door when the advisor does',
              indicator: 'cross',
            },
            {
              text: 'Scattered across six tools, never connected',
              indicator: 'partial',
            },
            {
              text: 'Compounds over the lifecycle of every engagement',
              indicator: 'check',
            },
          ],
        },
      ],
    },
    // Block 9: Closer CTA
    {
      blockType: 'cta-section',
      body: 'We\u2019ve noticed a divide forming among advisors.\n\nSome are actively experimenting with how to adapt their practice for the age of AI. They want to build durable systems around what makes them unique.\n\nMany more are stuck in the crunch. Running so hard to keep up with each engagement that they haven\u2019t had the bandwidth to step back and think about their practice as a system.\n\nThe advisors who figure out how to systematize without sacrificing the relationship are the ones who will thrive as AI reshapes the landscape.',
      closingLine: 'Your methodology is your moat. Build the system around it.',
      primaryCta: {
        label: 'Get Started',
        href: 'https://app.exitwithella.io/sign-up',
      },
      secondaryCta: {
        label: 'Book a Demo',
        href: 'https://cal.com/team/ella/ella-intro?overlayCalendar=true',
      },
      microcopy: 'Your first 3 clients are on us.',
      bgStyle: 'forest-dark',
    },
  ]

  const homepageHero = {
    headline: 'GO FROM INTAKE TO INSIGHT',
    headlineAnimation: 'word-by-word' as const,
    headlineLine2: 'IN A FRACTION OF THE TIME',
    headlineAnimation2: 'blur-fade' as const,
    subheadline: 'ELLA turns trust into action with tools built for advisor-led transitions.',
    primaryCta: {
      label: 'Get Started',
      href: 'https://app.exitwithella.io/sign-up',
    },
    secondaryCta: {
      label: 'Book a Demo',
      href: 'https://cal.com/team/ella/ella-intro?overlayCalendar=true',
    },
    style: 'default' as const,
    highlightText: 'INTAKE TO INSIGHT',
    highlightColor: 'goldenrod' as const,
  }

  const homepageExists = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  if (homepageExists.docs.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await payload.update({
      collection: 'pages',
      id: homepageExists.docs[0].id,
      data: { hero: homepageHero, layout: homepageLayout } as any,
    })
    console.log('✓ Homepage updated')
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        status: 'published',
        hero: homepageHero,
        layout: homepageLayout,
      } as any,
    })
    console.log('✓ Homepage created')
  }

  // ─────────────────────────────────────────────────────────
  // Blog author (TeamMember with isAuthor: true)
  // ─────────────────────────────────────────────────────────
  const authorDef = {
    name: 'Drew Thomas',
    slug: 'drew-thomas',
    role: 'Co-Founder & CEO',
    isAuthor: true as const,
    sortOrder: 1,
  }

  let authorId: number | null = null

  const existingAuthor = await payload.find({
    collection: 'team-members',
    where: { slug: { equals: authorDef.slug } },
    limit: 1,
  })

  if (existingAuthor.docs.length === 0) {
    const created = await payload.create({
      collection: 'team-members',
      data: authorDef,
    })
    authorId = created.id
    console.log(`✓ Team member (author): ${authorDef.name}`)
  } else {
    authorId = existingAuthor.docs[0].id
    console.log(`  Team member already exists: ${authorDef.name}`)
  }

  // ─────────────────────────────────────────────────────────
  // Blog posts (5 posts covering all tiers)
  // ─────────────────────────────────────────────────────────
  const exitPlanningCat = await payload.find({
    collection: 'categories',
    where: { slug: { equals: 'exit-planning' } },
    limit: 1,
  })
  const practiceManagementCat = await payload.find({
    collection: 'categories',
    where: { slug: { equals: 'practice-management' } },
    limit: 1,
  })
  const industryTrendsCat = await payload.find({
    collection: 'categories',
    where: { slug: { equals: 'industry-trends' } },
    limit: 1,
  })

  const epCatId = exitPlanningCat.docs[0]?.id ?? null
  const pmCatId = practiceManagementCat.docs[0]?.id ?? null
  const itCatId = industryTrendsCat.docs[0]?.id ?? null

  const blogPosts = [
    {
      title: 'Your Methodology Is Your Moat',
      slug: 'your-methodology-is-your-moat',
      tier: 'hero' as const,
      status: 'published' as const,
      publishedDate: '2025-10-01',
      excerpt:
        'The advisors who will thrive as AI reshapes the profession are the ones building durable systems around what makes them unique \u2014 not the ones chasing the next tool.',
      categories: [pmCatId, itCatId].filter(Boolean),
      showNewsletterCTA: true,
      content: makeRichText(
        'There\u2019s a divide forming among advisors. On one side: those who are actively experimenting with how to systematize their practice for the age of AI. On the other: those running so hard to keep up with each engagement that they haven\u2019t had the bandwidth to step back and think about their practice as a system.',
        'The divide will matter more than most advisors realize.',
        'AI is compressing time. Work that once took days \u2014 synthesizing documents, drafting deliverables, researching benchmarks \u2014 now takes hours. This is not a threat to the advisor who has built a methodology. It\u2019s an amplifier. The advisor\u2019s judgment, experience, and client relationship remain irreplaceable. The administrative burden that once crowded out those things gets removed.',
        'For the advisor without a methodology, AI compression does something different: it exposes the gap. When the market starts comparing advisors not on price, but on demonstrable process, having a consistent and differentiated approach isn\u2019t optional anymore.',
        'Your methodology is your moat. Build the system around it.',
      ),
    },
    {
      title: 'Why the \u201cPatchwork\u201d Is More Dangerous Than the Old Way',
      slug: 'why-the-patchwork-is-more-dangerous',
      tier: 'featured' as const,
      status: 'published' as const,
      publishedDate: '2025-09-15',
      excerpt:
        'Stitching together ChatGPT, a shared drive, and your CRM creates a leaky workflow that exposes client data and erodes the trust you\u2019ve spent years building.',
      categories: [pmCatId].filter(Boolean),
      showNewsletterCTA: true,
      content: makeRichText(
        'When advisors talk about their current workflow, a pattern emerges: most have moved beyond the old manual approach \u2014 the spreadsheets, the Word templates, the email back-and-forth. They\u2019ve patched something together. ChatGPT for synthesis. A shared drive for documents. Maybe a CRM that nobody\u2019s fully maintaining.',
        'The patchwork feels like progress. It\u2019s faster than the old way. But it has a structural problem the old way didn\u2019t: it\u2019s leaky.',
        'When you open ChatGPT to help with Client A\u2019s fact pattern and then start a new conversation for Client B, you\u2019re relying on your own memory to prevent cross-contamination. Most of the time, you succeed. But the risk is always there \u2014 and when it surfaces, it\u2019s not just an embarrassing mistake. It\u2019s a regulatory and reputational event.',
        'The old way, for all its inefficiency, kept client data siloed by default. Paper files don\u2019t leak into each other. Email threads stay with their recipient. The new patchwork has no such guarantee.',
        'This is the problem ELLA was built to solve: a purpose-built workspace where every client engagement is sandboxed, every collaborator has defined access, and the AI operates within the bounds of what you\u2019ve explicitly provided. Not a tool you route sensitive data through. A system you trust with it.',
      ),
    },
    {
      title: 'The Exit Planning Engagement Has a Sequencing Problem',
      slug: 'exit-planning-engagement-sequencing-problem',
      tier: 'featured' as const,
      status: 'published' as const,
      publishedDate: '2025-08-20',
      excerpt:
        'Most exit planning engagements fail not because of bad advice, but because discovery, analysis, and deliverables happen in the wrong order \u2014 or in parallel when they shouldn\u2019t.',
      categories: [epCatId].filter(Boolean),
      showNewsletterCTA: false,
      content: makeRichText(
        'Ask a CEPA what the hardest part of an exit planning engagement is and you\u2019ll get a surprisingly consistent answer: not the technical content. The sequencing.',
        'Discovery runs too late, analysis starts before the picture is complete, and the deliverable ends up as a patchwork of what could be synthesized given the time available. The result is a document that\u2019s technically defensible but doesn\u2019t reflect the full texture of the client\u2019s situation.',
        'The problem isn\u2019t effort. CEPAs work hard. The problem is that the tools don\u2019t enforce sequence. There\u2019s no system that says: here\u2019s what you need to know before you can analyze, and here\u2019s what you need to have analyzed before you can produce a deliverable worth presenting.',
        'ELLA is designed around this insight. Fact finding, sensemaking, and deliverables aren\u2019t tabs in a dashboard \u2014 they\u2019re a sequence. You move through them in order, with each stage drawing on the output of the last. The result is an engagement that actually reflects the advisor\u2019s methodology rather than the constraints of their toolset.',
      ),
    },
    {
      title: 'One Conversation Changed How We Think About AI in Advisory',
      slug: 'one-conversation-changed-how-we-think-about-ai',
      tier: 'standard' as const,
      status: 'published' as const,
      publishedDate: '2025-07-10',
      excerpt:
        'An offhand comment from a CEPA during a user interview revealed the core tension we\u2019d been circling around for months.',
      categories: [itCatId].filter(Boolean),
      showNewsletterCTA: true,
      content: makeRichText(
        'We were about sixty interviews in \u2014 CEPAs, M&A advisors, CPAs, wealth managers \u2014 when a CEPA said something that stopped the conversation.',
        '\u201cThe minute they feel like they\u2019re in a box, they\u2019re like, wait, I was unique to you two minutes ago, and now I\u2019m in a box?\u201d',
        'He wasn\u2019t talking about AI. He was talking about templates. But the observation applied to both.',
        'The tension at the center of AI in advisory is this: the technology is powerful because it patterns. It finds structure, draws on precedent, applies frameworks. But the value of a trusted advisor is, in part, the opposite: the ability to see past the pattern, to recognize when the client is unique, and to counsel from that recognition.',
        'The advisors who will use AI well are the ones who understand this tension. They don\u2019t outsource judgment. They use AI to clear the work that crowds out judgment \u2014 so when the moment matters, they\u2019re fully present for it.',
      ),
    },
    {
      title: 'A Year of Conversations Before a Line of Code',
      slug: 'a-year-of-conversations-before-a-line-of-code',
      tier: 'standard' as const,
      status: 'published' as const,
      publishedDate: '2025-06-01',
      excerpt:
        'We spent twelve months listening to advisors before we wrote the first component. Here\u2019s what we heard that shaped every decision in ELLA.',
      categories: [pmCatId, itCatId].filter(Boolean),
      showNewsletterCTA: true,
      content: makeRichText(
        'ELLA didn\u2019t start with a product hypothesis. It started with a question: what does it actually feel like to be an exit planning advisor in 2024?',
        'Over twelve months, we conducted more than 100 conversations \u2014 CEPAs, CPAs, wealth managers, M&A brokers, business owners who had recently exited. We didn\u2019t have a product to demo. We had a set of questions and a lot of listening to do.',
        'The conversations surfaced three consistent tensions. First: advisors are drowning in synthesis work that crowds out the relationship time that justifies their fees. Second: the tools advisors are reaching for (primarily ChatGPT) create regulatory and reputational risk they haven\u2019t fully considered. Third: the \u201cold way\u201d \u2014 manual, memory-based \u2014 is slow, but the new patchwork approach creates risks the old way didn\u2019t have.',
        'These tensions became the design constraints for ELLA. Not features \u2014 constraints. Every decision in the product traces back to something an advisor said in those early conversations.',
        'We think that\u2019s the right way to build for professionals who stake their reputation on trust. Start by understanding the work. Then build what the work requires.',
      ),
    },
  ]

  for (const postDef of blogPosts) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: postDef.slug } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await payload.create({
        collection: 'posts',
        data: {
          ...postDef,
          author: authorId ?? undefined,
        } as any,
      })
      console.log(`✓ Post: ${postDef.title}`)
    } else {
      console.log(`  Post already exists: ${postDef.title}`)
    }
  }

  console.log('\nSeed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
