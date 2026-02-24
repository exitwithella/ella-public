/**
 * Idempotent seed script for ELLA reference collections.
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
 *   - Navigation global (initial structure)
 *   - SiteSettings global (initial values)
 */
import 'dotenv/config'
import config from './payload.config'
import { getPayload } from 'payload'

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
      await payload.create({
        collection: 'partners',
        data: partner,
      })
      console.log(`✓ Partner: ${partner.name} (logo needs upload)`)
    } else {
      console.log(`  Partner already exists: ${partner.name}`)
    }
  }

  // ─────────────────────────────────────────────────────────
  // Pricing Tiers
  // ─────────────────────────────────────────────────────────
  const pricingTiers = [
    {
      name: 'Free',
      tagline: 'Explore ELLA at no cost',
      price: { amount: 0, period: 'month' as const },
      features: [
        { feature: 'Up to 3 active clients', included: 'yes' as const },
        { feature: 'Core exit planning tools', included: 'yes' as const },
        { feature: 'Document templates', included: 'limited' as const },
        { feature: 'Team collaboration', included: 'no' as const },
        { feature: 'Priority support', included: 'no' as const },
      ],
      cta: { label: 'Start Free', href: '/get-started' },
      highlighted: false,
      sortOrder: 1,
    },
    {
      name: 'Practitioner',
      tagline: 'For the advisor building their practice',
      price: { amount: 9900, period: 'month' as const },
      features: [
        { feature: 'Unlimited active clients', included: 'yes' as const },
        { feature: 'Full tool library', included: 'yes' as const },
        { feature: 'Document templates', included: 'yes' as const },
        { feature: 'Team collaboration', included: 'yes' as const },
        { feature: 'Priority support', included: 'no' as const },
      ],
      cta: { label: 'Start Free Trial', href: '/get-started?plan=practitioner' },
      highlighted: true,
      sortOrder: 2,
    },
    {
      name: 'Team',
      tagline: 'For practices with multiple advisors',
      price: { amount: 24900, period: 'month' as const },
      features: [
        { feature: 'Everything in Practitioner', included: 'yes' as const },
        { feature: 'Up to 5 advisor seats', included: 'yes' as const },
        { feature: 'Shared client workspace', included: 'yes' as const },
        { feature: 'Admin dashboard', included: 'yes' as const },
        { feature: 'Priority support', included: 'yes' as const },
      ],
      cta: { label: 'Start Free Trial', href: '/get-started?plan=team' },
      highlighted: false,
      sortOrder: 3,
    },
    {
      name: 'Vanguard',
      tagline: 'For established practices and enterprise',
      price: { amount: 0, period: 'custom' as const, customLabel: 'Contact us' },
      features: [
        { feature: 'Everything in Team', included: 'yes' as const },
        { feature: 'Unlimited advisor seats', included: 'yes' as const },
        { feature: 'White-label options', included: 'yes' as const },
        { feature: 'Custom integrations', included: 'yes' as const },
        { feature: 'Dedicated success manager', included: 'yes' as const },
      ],
      cta: { label: 'Talk to Sales', href: '/demo' },
      highlighted: false,
      sortOrder: 4,
    },
    {
      name: 'Community',
      tagline: 'For associations and certification bodies',
      price: { amount: 0, period: 'custom' as const, customLabel: 'Contact us' },
      features: [
        { feature: 'Member access management', included: 'yes' as const },
        { feature: 'Branded portal', included: 'yes' as const },
        { feature: 'Education pathways', included: 'yes' as const },
        { feature: 'Bulk onboarding', included: 'yes' as const },
        { feature: 'Reporting & analytics', included: 'yes' as const },
      ],
      cta: { label: 'Learn More', href: '/demo?type=community' },
      highlighted: false,
      sortOrder: 5,
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
      console.log(`  Pricing Tier already exists: ${tier.name}`)
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
    // Hero and layout are populated via admin UI after seeding
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
  // Testimonials (placeholder — update via Payload admin or MCP)
  // ─────────────────────────────────────────────────────────
  const testimonialDefs = [
    {
      name: 'Advisor A',
      title: 'Certified Exit Planning Advisor',
      quote: '[Testimonial A placeholder — edit via Payload admin or MCP.]',
      approved: false,
    },
    {
      name: 'Advisor B',
      title: 'M&A Advisor',
      quote: '[Testimonial B placeholder — edit via Payload admin or MCP.]',
      approved: false,
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
      const created = await payload.create({ collection: 'testimonials', data: t })
      testimonialIds[t.name] = created.id
      console.log(`✓ Testimonial: ${t.name}`)
    } else {
      testimonialIds[t.name] = existing.docs[0].id
      console.log(`  Testimonial already exists: ${t.name}`)
    }
  }

  // ─────────────────────────────────────────────────────────
  // Homepage Page document (placeholder — update via Payload admin or MCP)
  // ─────────────────────────────────────────────────────────
  const homepageExists = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  if (homepageExists.docs.length > 0) {
    console.log('  Homepage already exists')
  } else {
    const placeholderRichText = {
      root: {
        type: 'root',
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
        children: [
          {
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
                text: '[Placeholder body content — edit via Payload admin or MCP.]',
                format: 0,
                detail: 0,
                mode: 'normal' as const,
                style: '',
              },
            ],
          },
        ],
      },
    }

    await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        status: 'published',
        hero: {
          headline: '[HOMEPAGE HEADLINE]\n[SECOND LINE]',
          subheadline: '[Subheadline placeholder — edit via Payload admin or MCP.]',
          primaryCta: { label: 'Get Started', href: 'https://app.exitwithella.io/sign-up' },
          secondaryCta: {
            label: 'Book a Demo',
            href: 'https://cal.com/team/ella/ella-intro?overlayCalendar=true',
          },
          style: 'default',
          highlightText: 'HEADLINE',
          highlightColor: 'goldenrod',
        },
        layout: [
          // Block 2: Credibility Strip
          {
            blockType: 'credibility-strip',
            variant: 'text',
            statement: '[Credibility strip — line one.]\n[Line two.]',
            bgStyle: 'cream',
          },
          // Block 3: Bridge
          {
            blockType: 'bridge-section',
            heading: '[Bridge section heading — edit via Payload admin or MCP.]',
            body: placeholderRichText,
            quotes: [
              {
                text: '[Quote A — edit via Payload admin or MCP.]',
                attribution: '[Attribution A]',
              },
              {
                text: '[Quote B — edit via Payload admin or MCP.]',
                attribution: '[Attribution B]',
              },
            ],
            closer: '[Bridge closer line — edit via Payload admin or MCP.]',
            bgStyle: 'ash-light',
          },
          // Block 4a: Pillar Cards
          {
            blockType: 'card-grid',
            sectionLabel: '[Section label]',
            heading: '[Card grid heading — edit via Payload admin or MCP.]',
            subheading: '[Subheading placeholder.]',
            variant: 'feature',
            columns: '3',
            bgStyle: 'cream',
            cards: [
              {
                heading: 'Fact Finding',
                body: '[Card 1 body — edit via Payload admin or MCP.]',
                capabilities: [
                  { text: '[Capability 1]' },
                  { text: '[Capability 2]' },
                  { text: '[Capability 3]' },
                ],
              },
              {
                heading: 'Sensemaking',
                body: '[Card 2 body — edit via Payload admin or MCP.]',
                capabilities: [
                  { text: '[Capability 1]' },
                  { text: '[Capability 2]' },
                  { text: '[Capability 3]' },
                ],
              },
              {
                heading: 'Deliverables',
                body: '[Card 3 body — edit via Payload admin or MCP.]',
                capabilities: [
                  { text: '[Capability 1]' },
                  { text: '[Capability 2]' },
                  { text: '[Capability 3]' },
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
                heading: '[Deep-dive heading — edit via Payload admin or MCP.]',
                body: placeholderRichText,
                testimonial: testimonialIds['Advisor A'] ?? null,
              },
            ],
          },
          // Block 5: Trust & Security
          {
            blockType: 'trust-security',
            heading: '[Trust & security heading — edit via Payload admin or MCP.]',
            intro: '[Trust & security intro — edit via Payload admin or MCP.]',
            items: [
              { title: '[Security item 1]' },
              { title: '[Security item 2]' },
              { title: '[Security item 3]' },
              { title: '[Security item 4]' },
              { title: '[Security item 5]' },
              { title: '[Security item 6]' },
              { title: '[Security item 7]' },
            ],
            closingLine: '[Trust closing line — edit via Payload admin or MCP.]',
            bgStyle: 'ash-light',
          },
          // Block 6: Before/After Panel
          {
            blockType: 'before-after-panel',
            sectionLabel: '[Section label]',
            heading: '[Before/after heading — edit via Payload admin or MCP.]',
            subheading: '[Subheading placeholder.]',
            before: {
              label: 'Without ELLA',
              points: [
                { text: '[Before point 1]' },
                { text: '[Before point 2]' },
                { text: '[Before point 3]' },
                { text: '[Before point 4]' },
                { text: '[Before point 5]' },
              ],
            },
            after: {
              label: 'With ELLA',
              points: [
                { text: '[After point 1]' },
                { text: '[After point 2]' },
                { text: '[After point 3]' },
                { text: '[After point 4]' },
                { text: '[After point 5]' },
              ],
            },
          },
          // Block 9: Closer CTA
          {
            blockType: 'cta-section',
            body: '[CTA body paragraph 1 — edit via Payload admin or MCP.]\n\n[Paragraph 2.]\n\n[Paragraph 3.]\n\n[Paragraph 4.]',
            closingLine: '[Closing line — edit via Payload admin or MCP.]',
            primaryCta: { label: 'Get Started', href: 'https://app.exitwithella.io/sign-up' },
            secondaryCta: {
              label: 'Book a Demo',
              href: 'https://cal.com/team/ella/ella-intro?overlayCalendar=true',
            },
            microcopy: '[Microcopy — edit via Payload admin or MCP.]',
            bgStyle: 'forest-dark',
          },
        ],
      },
    })
    console.log('✓ Homepage page document')
  }

  console.log('\nSeed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
