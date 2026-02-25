export const siteConfig = {
  appUrl: 'https://app.exitwithella.io',
  description: 'ELLA turns trust into action with tools built for advisor-led transitions.',
  name: 'ELLA',
  url: 'https://withella.io',
}

export const navigation = {
  actions: {
    bookDemo: {
      label: 'Book a Demo',
      href: 'https://cal.com/team/ella/ella-intro?overlayCalendar=true',
    },
    login: {
      label: 'Log In',
      href: 'https://app.exitwithella.io/sign-in',
    },
    signUp: {
      label: 'Get Started',
      href: 'https://app.exitwithella.io/sign-up',
    },
  },
  links: [
    { label: 'Platform', href: '/platform' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
  ],
}

export const hero = {
  badge: {
    text: "Why we're building ELLA",
    href: '/blog/why-we-re-building-ella',
    cta: 'Read more',
  },
  cta: {
    label: 'Get Started Free',
    href: 'https://app.exitwithella.io/sign-up',
  },
  demoCta: {
    label: 'Book a Demo',
    href: 'https://cal.com/team/ella/ella-intro?overlayCalendar=true',
  },
  footnote: 'Your first 3 clients are on us.',
  headline: ['GO FROM INTAKE TO INSIGHT', 'IN A FRACTION OF THE TIME'],
  image: {
    src: '/images/ella-dashboard.avif',
    alt: 'ELLA product screenshot',
  },
  subheadline: 'ELLA turns trust into action with tools built for advisor-led transitions.',
}

export const credibilityStrip = {
  text: 'Built hand-in-hand with Certified Exit Planning Advisors. Trusted by advisors who stake their reputation on trust.',
}

export const pillarCards = {
  description:
    'ELLA organizes the entire advisory workflow into three connected pillars — so nothing falls through the cracks.',
  eyebrow: "Advising can be chaos. We've lived it.",
  headline: 'Three pillars. One workbench.',
  pillars: [
    {
      tag: 'Fact Finding',
      headline: 'Structured discovery, your way.',
      description:
        "ELLA's Fact Finder provides a collaborative space to capture notes, documents, and discovery questions — all connected to the rest of ELLA. Use lightweight or deep-dive templates. Customize to your process.",
    },
    {
      tag: 'Sensemaking',
      headline: 'Surface insights that matter.',
      description:
        "Sensemaking is our take on AI. Secure, private, and connected to all the context from Fact Finding. Turn your clients' data into quality, actionable insights in a fraction of the time.",
    },
    {
      tag: 'Deliverables',
      headline: 'Deliverables that tell the story.',
      description:
        'Create simple, compelling deliverables that effortlessly incorporate Fact Finding and Sensemaking data. Collaborative, contextual, and connected.',
    },
  ],
}

export const trustSecurity = {
  badges: [
    'Full data encryption',
    'Modern U.S.-based infrastructure',
    'GDPR & CCPA adherence',
    'Granular access control (RBAC)',
    'Multi-factor auth by default',
    'Enterprise SSO / SAML',
  ],
  description:
    "We know trust is earned — and essential when you're the steward of your clients' most valuable asset.",
  features: [
    {
      title: 'Secure by Design',
      description:
        'Built on SOC2-compliant infrastructure with encryption in transit and at rest. Strict access controls and MFA safeguard your information.',
    },
    {
      title: 'Your Data, Always',
      description:
        "Only those you explicitly invite can access your workspace. We don't share your business information without your permission.",
    },
    {
      title: 'Privacy Built-In',
      description:
        'We follow U.S. state privacy laws and align with GDPR. Export or delete your data at any time. ELLA never sells your data.',
    },
  ],
  headline: 'Secure, because both of our reputations are on the line.',
}

export const closerCta = {
  description:
    'From onboarding to final deliverables, ELLA provides a place for all the moving parts and the tools to put them together.',
  headline: 'Simple. Flexible. Made for impact.',
  primaryCta: {
    label: 'Get Started Free',
    href: 'https://app.exitwithella.io/sign-up',
  },
  secondaryCta: {
    label: 'Book a Demo',
    href: 'https://cal.com/team/ella/ella-intro?overlayCalendar=true',
  },
}

export const principles = {
  description:
    "We're different for many reasons, but the biggest reason are the principles that serve as the bedrock of our experience.",
  headline: "The Principles We're Built On",
  items: [
    {
      title: 'Actionable Illumination',
      description:
        "Inspire confidence by proactively surfacing education that promotes business owners' understanding of and ability to navigate the end-to-end process.",
    },
    {
      title: 'Effortless Orchestration',
      description:
        'Facilitate collaboration and coordination among all parties involved; giving everyone visibility into their progress, goals, and responsibilities at all times.',
    },
    {
      title: 'Malleable Guidance',
      description:
        "Embrace the idiosyncrasies that are inherent in the uniqueness of each party's situation and adapt the expert guidance delivered by our service to these unique needs.",
    },
    {
      title: 'Do Right',
      description:
        'Err on the side of transparency in goals, intentions, and processes every step of the way.',
    },
  ],
}

export const aboutHero = {
  headline: "We're building for advisors who believe practice is more than process.",
  subheadline:
    'ELLA was built from conversations, not assumptions. Over a year of listening before a line of code was written.',
}

export const originStory = {
  headline: 'We started with conversations, not code.',
  paragraphs: [
    {
      text: "Before we built anything, we spent a year in conversation with the advisors who would use it. CEPAs running solo practices. CPAs doing exit work alongside their tax practice. Wealth managers thinking ten years ahead. M&A brokers who've been through hundreds of deals.",
      serif: false,
    },
    {
      text: 'We asked the same question every time: where do you get stuck?',
      serif: true,
    },
    {
      text: 'The answer shifted. Twice.',
      serif: false,
    },
    {
      text: "First, we learned advisors didn't need another monolithic platform. They needed a system that could hold context across their entire practice while letting them work the way they already work.",
      serif: false,
    },
    {
      text: 'Second, we learned \u201cexit planning\u201d was the starting point, not the ceiling. The advisors we kept meeting were guiding business owners through consequential decisions across every stage of building a significant business. The common thread was trust as the foundation.',
      serif: false,
    },
    {
      text: 'We built ELLA around both of those lessons.',
      serif: true,
    },
  ],
  link: {
    label: 'Read the full story',
    href: '/blog/with-ella',
  },
}

export const aboutCloser = {
  headline: 'Believe what we believe?',
  body: 'ELLA is for advisors who want to systematize what makes them unique — without sacrificing the relationships that make their practice worth building.',
  primaryCta: {
    label: 'Get Started',
    href: 'https://app.exitwithella.io/sign-up',
  },
  secondaryCta: {
    label: 'Book a Demo',
    href: 'https://cal.com/team/ella/ella-intro?overlayCalendar=true',
  },
  microcopy: 'Your first 3 clients are on us.',
}

export const footer = {
  copyright: `© ELLA ${new Date().getFullYear()}`,
  links: [
    { href: '/platform', label: 'Platform' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/pricing', label: 'Pricing' },
  ],
}

export const platformHero = {
  headline: 'From intake to insight. All in one place.',
  subheadline:
    'Fact Finding, Sensemaking, and Deliverables — three connected pillars that hold your entire advisory workflow.',
}

export const platformPillars = [
  {
    id: 'fact-finding',
    tag: 'Fact Finding',
    headline: 'Structured discovery, your way.',
    description:
      "Your discovery process is one of the most valuable things you've built. ELLA's Fact Finder gives it structure that holds as your practice scales — without stripping away the flexibility that makes it yours. Templates, notes, documents, and questions all in one connected space.",
    capabilities: [
      'Customizable intake and discovery templates',
      'Collaborative client workspaces',
      'Document and file organization',
      'Notes linked directly to discovery questions',
    ],
  },
  {
    id: 'sensemaking',
    tag: 'Sensemaking',
    headline: 'Insight grounded in context.',
    description:
      'Sensemaking is our take on AI — secure, private, and connected to the actual data from your discovery work. Instead of generic prompts and generic output, you get analysis that reflects what you know about each client. Designed to sharpen your judgment, not replace it.',
    capabilities: [
      'Context-aware analysis from Fact Finding data',
      'Client-specific insights — not generic summaries',
      'Pattern recognition across engagements',
      'Export insights directly into Deliverables',
    ],
  },
  {
    id: 'deliverables',
    tag: 'Deliverables',
    headline: 'Deliverables that tell the story.',
    description:
      "A deliverable is your reputation on paper. ELLA draws from Fact Finding and Sensemaking so you're never starting from scratch. Collaborate with your team, share with clients, and iterate — all in one place, with a complete history of what changed and when.",
    capabilities: [
      'Auto-populated from discovery data',
      'Real-time collaborative editing',
      'Client-ready presentation formats',
      'Version history and change tracking',
    ],
  },
]

export const connectedWorkflow = {
  headline: 'How It All Connects',
  description: "The three pillars aren't separate tools — they're one system.",
  items: [
    {
      title: 'Context flows automatically',
      description:
        "Your Fact Finding data doesn't sit in a silo. Sensemaking analyzes it; Deliverables surface it. Information moves where it's needed without copy-pasting.",
    },
    {
      title: 'Collaborate without chaos',
      description:
        'Invite team members, share specific workspaces with clients, and keep everyone oriented. Granular access control means you decide who sees what.',
    },
    {
      title: 'Your practice compounds over time',
      description:
        'Each engagement adds context. As you work more in ELLA, pattern recognition across clients helps you see what working — and what to watch for.',
    },
  ],
}

export const platformCloser = {
  headline: 'Ready to see it in practice?',
  body: 'Get hands-on with the workflow your way — or let us show you how ELLA fits your practice.',
  primaryCta: {
    label: 'Get Started Free',
    href: 'https://app.exitwithella.io/sign-up',
  },
  secondaryCta: {
    label: 'Book a Demo',
    href: 'https://cal.com/team/ella/ella-intro?overlayCalendar=true',
  },
  microcopy: 'Your first 3 clients are on us.',
}
