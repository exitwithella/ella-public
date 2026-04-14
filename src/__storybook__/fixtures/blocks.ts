import type { Page } from '@/payload-types'

import { richText } from './richtext'

type Block<T extends string> = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: T }
>

// ─── CTA Section ──────────────────────────────────────────────

export const ctaSectionLight: Block<'cta-section'> = {
  blockType: 'cta-section',
  id: 'cta-1',
  headline: 'Your practice deserves better',
  body: 'Every day you spend on manual processes is a day you could spend building client relationships.\n\nELLA gives you the systems to scale — without losing the personal touch.',
  closingLine: 'The best time to systematize was yesterday. The second-best time is now.',
  primaryCta: { label: 'Get Started Free', href: '#' },
  secondaryCta: { label: 'Book a Demo', href: '#' },
  microcopy: 'No credit card required',
  bgStyle: 'sandstone',
}

export const ctaSectionDark: Block<'cta-section'> = {
  ...ctaSectionLight,
  id: 'cta-2',
  bgStyle: 'forest',
}

// ─── Card Grid ────────────────────────────────────────────────

export const cardGrid3Col: Block<'card-grid'> = {
  blockType: 'card-grid',
  id: 'cg-1',
  bgStyle: 'sandstone',
  sectionLabel: 'Platform',
  heading: 'Three pillars of practice systematization',
  subheading: 'ELLA brings together the tools, workflows, and intelligence that trusted advisors need.',
  columns: '3',
  cards: [
    {
      id: 'c1',
      heading: 'Coverage',
      iconName: 'Shield',
      icon: null as unknown as number,
      body: 'Comprehensive practice coverage that ensures nothing falls through the cracks — from client onboarding to ongoing service delivery.',
      capabilities: [
        { id: 'cap1', text: 'Automated onboarding workflows' },
        { id: 'cap2', text: 'Service calendar management' },
        { id: 'cap3', text: 'Task delegation and tracking' },
      ],
      anchorTarget: 'coverage',
      link: { href: '/platform#coverage', label: 'Learn more' },
    },
    {
      id: 'c2',
      heading: 'Intelligence',
      iconName: 'ChartLine',
      icon: null as unknown as number,
      body: 'Turn client data into actionable insights. ELLA surfaces opportunities and risks before they become problems.',
      capabilities: [
        { id: 'cap4', text: 'Client health scoring' },
        { id: 'cap5', text: 'Opportunity detection' },
        { id: 'cap6', text: 'Practice analytics dashboard' },
      ],
      anchorTarget: 'intelligence',
      link: { href: '/platform#intelligence', label: 'Learn more' },
    },
    {
      id: 'c3',
      heading: 'Continuity',
      iconName: 'Handshake',
      icon: null as unknown as number,
      body: 'Build a practice that runs without you. Document institutional knowledge and create seamless succession paths.',
      capabilities: [
        { id: 'cap7', text: 'Knowledge base automation' },
        { id: 'cap8', text: 'Succession planning tools' },
        { id: 'cap9', text: 'Client transition workflows' },
      ],
      anchorTarget: 'continuity',
      link: { href: '/platform#continuity', label: 'Learn more' },
    },
  ],
}

// ─── Comparison Table ────────────────────────────────────────

export const comparisonTable: Block<'comparison-table'> = {
  blockType: 'comparison-table',
  id: 'ct-1',
  bgStyle: 'sandstone',
  sectionLabel: 'How ELLA compares',
  heading: 'Built different, on purpose',
  subheading: 'Most tools treat advisory practices like any other SaaS user. ELLA was designed for how you actually work.',
  columns: [
    { id: 'col1', heading: 'Generic CRM', subheading: 'Salesforce, HubSpot', highlighted: false },
    { id: 'col2', heading: 'Legacy Tools', subheading: 'Redtail, Wealthbox', highlighted: false },
    { id: 'col3', heading: 'ELLA', subheading: 'Purpose-built', highlighted: true },
  ],
  rows: [
    { id: 'r1', label: 'Exit planning workflows', values: [{ text: '', indicator: 'cross' }, { text: '', indicator: 'partial' }, { text: '', indicator: 'check' }] },
    { id: 'r2', label: 'Practice valuation tools', values: [{ text: '', indicator: 'cross' }, { text: '', indicator: 'cross' }, { text: '', indicator: 'check' }] },
    { id: 'r3', label: 'Client relationship scoring', values: [{ text: '', indicator: 'partial' }, { text: '', indicator: 'cross' }, { text: '', indicator: 'check' }] },
    { id: 'r4', label: 'Knowledge base automation', values: [{ text: '', indicator: 'cross' }, { text: '', indicator: 'cross' }, { text: '', indicator: 'check' }] },
    { id: 'r5', label: 'Succession planning', values: [{ text: '', indicator: 'cross' }, { text: '', indicator: 'partial' }, { text: '', indicator: 'check' }] },
  ],
}

// ─── Testimonial Block ───────────────────────────────────────

export const testimonialSingle: Block<'testimonial-block'> = {
  blockType: 'testimonial-block',
  id: 'tb-1',
  bgStyle: 'sandstone',
  layout: 'single',
  testimonials: [
    {
      id: 1,
      quote: 'ELLA changed how we think about practice continuity. It is not just a tool — it is a framework for building something that lasts.',
      name: 'Sarah Mitchell',
      title: 'Principal',
      company: 'Mitchell Wealth Advisory',
      photo: null,
      updatedAt: '',
      createdAt: '',
    },
  ],
}

export const testimonialGrid: Block<'testimonial-block'> = {
  blockType: 'testimonial-block',
  id: 'tb-2',
  bgStyle: 'sandstone',
  sectionLabel: 'What advisors say',
  heading: 'Trusted by professionals who stake their reputation on trust',
  layout: 'grid',
  testimonials: [
    {
      id: 1,
      quote: 'ELLA transformed our client onboarding. What used to take weeks now takes days.',
      name: 'Sarah Mitchell',
      title: 'RIA Principal',
      company: 'Mitchell Wealth',
      photo: null,
      updatedAt: '',
      createdAt: '',
    },
    {
      id: 2,
      quote: 'Finally, a platform that understands advisory relationships — not just transactions.',
      name: 'David Chen',
      title: 'Managing Partner',
      company: 'Pacific Advisory',
      photo: null,
      updatedAt: '',
      createdAt: '',
    },
    {
      id: 3,
      quote: 'We went from scattered spreadsheets to a single source of truth. Our team is more confident.',
      name: 'Rebecca Torres',
      title: 'Senior Advisor',
      company: 'Torres Financial',
      photo: null,
      updatedAt: '',
      createdAt: '',
    },
  ],
}

// ─── Credibility Strip ───────────────────────────────────────

export const credibilityStripText: Block<'credibility-strip'> = {
  blockType: 'credibility-strip',
  id: 'cs-1',
  bgStyle: 'sandstone',
  variant: 'text',
  statement: 'Built by advisors, for advisors — with 50+ years of combined industry experience.',
}

export const credibilityStripStats: Block<'credibility-strip'> = {
  blockType: 'credibility-strip',
  id: 'cs-2',
  bgStyle: 'sandstone',
  variant: 'stats',
  label: 'By the numbers',
  stats: [
    { id: 's1', value: '3x', label: 'Faster onboarding' },
    { id: 's2', value: '92%', label: 'Advisor satisfaction' },
    { id: 's3', value: '<2 min', label: 'Exit readiness report' },
  ],
}

// ─── Numbered Steps ──────────────────────────────────────────

export const numberedSteps: Block<'numbered-steps'> = {
  blockType: 'numbered-steps',
  id: 'ns-1',
  bgStyle: 'sandstone',
  sectionLabel: 'How it works',
  heading: 'Get started in three steps',
  subheading: 'ELLA is designed to fit into your existing workflow — not replace it.',
  steps: [
    { id: 'st1', heading: 'Connect your practice', body: 'Import your client data and connect your existing tools. ELLA integrates with the platforms you already use.' },
    { id: 'st2', heading: 'Build your workflows', body: 'Choose from pre-built templates or create custom workflows tailored to your practice. Every process becomes repeatable.' },
    { id: 'st3', heading: 'Scale with confidence', body: 'As your practice grows, ELLA grows with you. Add team members, delegate tasks, and maintain quality at every scale.' },
  ],
}

// ─── Before/After Panel ──────────────────────────────────────

export const beforeAfterPanel: Block<'before-after-panel'> = {
  blockType: 'before-after-panel',
  id: 'ba-1',
  sectionLabel: 'The difference',
  heading: 'What changes with ELLA',
  subheading: 'See how ELLA transforms the day-to-day reality of running an advisory practice.',
  before: {
    label: 'Without ELLA',
    points: [
      { id: 'b1', text: 'Client data scattered across spreadsheets and email' },
      { id: 'b2', text: 'Onboarding takes 2-3 weeks per client' },
      { id: 'b3', text: 'No succession plan — practice value at risk' },
      { id: 'b4', text: 'Manual compliance tracking and reporting' },
    ],
  },
  after: {
    label: 'With ELLA',
    points: [
      { id: 'a1', text: 'Single source of truth for every client relationship' },
      { id: 'a2', text: 'Automated onboarding in under 48 hours' },
      { id: 'a3', text: 'Built-in continuity planning and knowledge capture' },
      { id: 'a4', text: 'Real-time compliance dashboards and alerts' },
    ],
  },
}

// ─── Values Grid ─────────────────────────────────────────────

export const valuesGrid: Block<'values-grid'> = {
  blockType: 'values-grid',
  id: 'vg-1',
  bgStyle: 'sandstone',
  heading: 'What we believe',
  description: 'The principles that guide every decision we make at ELLA.',
  items: [
    { id: 'v1', title: 'Trust is earned', description: 'We build technology that helps advisors earn and maintain the trust their clients place in them.' },
    { id: 'v2', title: 'Simplicity scales', description: 'Complex problems deserve simple solutions. We eliminate friction, not add features.' },
    { id: 'v3', title: 'Advisors know best', description: 'Technology should amplify human judgment, not replace it. ELLA supports the advisor.' },
    { id: 'v4', title: 'Legacy matters', description: 'Every practice tells a story. We help advisors write endings worth reading.' },
  ],
} as Block<'values-grid'>

// ─── Bridge Section ──────────────────────────────────────────

export const bridgeSection: Block<'bridge-section'> = {
  blockType: 'bridge-section',
  id: 'bs-1',
  bgStyle: 'sandstone',
  label: 'The reality',
  heading: 'Most practices are built on relationships. Few are built to last.',
  body: richText(
    'You have spent years cultivating trust. Your clients rely on you for guidance through the most important financial decisions of their lives.',
    'But what happens when you are not there? What happens to the relationships you have built, the knowledge you have accumulated, the processes that exist only in your head?',
  ) as Block<'bridge-section'>['body'],
  bodyStyle: 'body',
  quotes: [
    { id: 'q1', text: 'I realized my practice was worth millions on paper but fragile in reality.', attribution: 'RIA Principal, 25 years in practice' },
  ],
  closer: 'This is the gap ELLA was built to close.',
}

// ─── Content Section ─────────────────────────────────────────

export const contentSection: Block<'content-section'> = {
  blockType: 'content-section',
  id: 'cs-3',
  bgStyle: 'sandstone',
  sectionLabel: 'Our approach',
  heading: 'Technology that respects the relationship',
  body: richText(
    'ELLA was not built in a vacuum. It was designed in partnership with experienced financial advisors who understand that the most valuable asset in any practice is the trust between advisor and client.',
    'Every feature, every workflow, every interface decision passes one test: does this help the advisor serve their clients better?',
  ) as Block<'content-section'>['body'],
  mediaPosition: 'none',
  layout: 'default',
}

// ─── Feature Deep Dive ───────────────────────────────────────

export const featureDeepDive: Block<'feature-deep-dive'> = {
  blockType: 'feature-deep-dive',
  id: 'fdd-1',
  bgStyle: 'sandstone',
  sectionId: 'coverage',
  sectionLabel: 'Coverage',
  sections: [
    {
      id: 's1',
      heading: 'Nothing falls through the cracks',
      body: richText(
        'ELLA tracks every client touchpoint, deadline, and deliverable — so you never miss a follow-up or forget a commitment.',
      ) as NonNullable<Block<'feature-deep-dive'>['sections']>[number]['body'],
      testimonial: null,
      link: { href: '#', label: 'See how it works' },
    },
    {
      id: 's2',
      heading: 'Workflows that match how you actually work',
      body: richText(
        'Pre-built templates for common advisory workflows — client onboarding, annual reviews, estate planning — that you can customize to fit your practice.',
      ) as NonNullable<Block<'feature-deep-dive'>['sections']>[number]['body'],
      testimonial: null,
      link: { href: '#', label: 'Explore workflows' },
    },
  ],
}

// ─── Advisor Personas ────────────────────────────────────────

export const advisorPersonas: Block<'advisor-personas'> = {
  blockType: 'advisor-personas',
  id: 'ap-1',
  bgStyle: 'sandstone',
  sectionLabel: 'Who ELLA serves',
  heading: 'Built for every stage of your advisory career',
  subheading: 'Whether you are growing, scaling, or transitioning — ELLA adapts to your needs.',
  image: null as unknown as number,
  personas: [
    {
      id: 'p1',
      icon: null as unknown as number,
      iconName: 'Briefcase',
      label: 'Solo Practitioner',
      title: 'Building the foundation',
      description: 'You are running every aspect of your practice yourself. ELLA helps you systematize early so you can scale later.',
      withElla: 'Automated workflows free up 10+ hours per week for client-facing work.',
      accentColor: 'forest',
    },
    {
      id: 'p2',
      icon: null as unknown as number,
      iconName: 'Users',
      label: 'Growing Team',
      title: 'Scaling with consistency',
      description: 'Your team is expanding but processes are still in your head. ELLA captures institutional knowledge.',
      withElla: 'Onboard new team members in days instead of months.',
      accentColor: 'moss',
    },
    {
      id: 'p3',
      icon: null as unknown as number,
      iconName: 'Handshake',
      label: 'Succession Planning',
      title: 'Building lasting value',
      description: 'You are thinking about the next chapter. ELLA ensures your practice value transfers with you.',
      withElla: 'Complete succession readiness assessment in under 30 minutes.',
      accentColor: 'goldenrod',
    },
  ],
}

// ─── Product Features ────────────────────────────────────────

export const productFeatures: Block<'product-features'> = {
  blockType: 'product-features',
  id: 'pf-1',
  bgStyle: 'sandstone',
  sectionLabel: 'Features',
  heading: 'Everything you need, nothing you don\'t',
  subheading: 'Purpose-built tools for the modern advisory practice.',
  showBottomBorder: true,
  items: [
    {
      id: 'pf-i1',
      title: 'Client Relationship Hub',
      description: 'A single dashboard for every client interaction, document, and milestone. Never lose context again.',
      screenshot: null as unknown as number,
      screenshotFit: 'contain',
      screenshotPosition: 'center',
      badges: [{ id: 'b1', text: 'Core' }],
    },
    {
      id: 'pf-i2',
      title: 'Workflow Automation',
      description: 'Turn your best processes into repeatable templates. Delegate with confidence.',
      screenshot: null as unknown as number,
      screenshotFit: 'contain',
      screenshotPosition: 'center',
      badges: [{ id: 'b2', text: 'Productivity' }],
    },
  ],
}

// ─── Trust & Security ────────────────────────────────────────

export const trustSecurity: Block<'trust-security'> = {
  blockType: 'trust-security',
  id: 'ts-1',
  bgStyle: 'sandstone',
  heading: 'Security you can trust',
  intro: richText(
    'Your clients trust you with their most sensitive information. We take that responsibility seriously.',
  ) as Block<'trust-security'>['intro'],
  link: { href: '#', label: 'Read our security whitepaper' },
  sections: [
    { id: 'ts-s1', title: 'SOC 2 Type II', body: 'Independently audited and certified. Your data is protected by enterprise-grade controls.' },
    { id: 'ts-s2', title: 'End-to-end encryption', body: 'All data encrypted in transit and at rest. Zero-knowledge architecture for sensitive fields.' },
    { id: 'ts-s3', title: 'Role-based access', body: 'Granular permissions ensure team members only see what they need.' },
    { id: 'ts-s4', title: 'Audit logging', body: 'Complete audit trail for every action. Meet compliance requirements effortlessly.' },
  ],
}
