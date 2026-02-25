/* Site-wide config */

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

export const footer = {
  copyright: `© ELLA ${new Date().getFullYear()}`,
  links: [
    { href: '/platform', label: 'Platform' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/pricing', label: 'Pricing' },
  ],
}

/* Homepage content */

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
