/* Site-wide config */

export const siteConfig = {
  appUrl: 'https://app.exitwithella.io',
  name: 'ELLA',
  url: process.env.SITE_URL ?? 'https://withella.io',
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
  headline: 'Secure, because *both* of our reputations are on the line.',
  description:
    "We know trust is earned\u2014and essential when you're the steward of your clients' most valuable asset. That's why ELLA is built with a security-first mindset, grounded in transparency and respect for your data *and* your clients' data.",
  sections: [
    {
      title: 'Secure by Design',
      body: 'We design our systems and processes in alignment with leading security frameworks. Our practices are informed by these standards to ensure robust security, access control, and data protection.\n\nAll data on ELLA is encrypted in transit and at rest. We use modern SOC2/II compliant infrastructure providers like Vercel and Cloudflare. Strict access controls, internal policies, and multi-factor authentication (MFA) safeguard your information within our company.',
      bulletHeading: "You're in Good Hands",
      bulletItems: [
        'Full data encryption',
        'Modern U.S.-based Infrastructure',
        'GDPR & CCPA Adherence',
        'Granular Access Control (RBAC)',
        'Multi-factor Auth by Default',
        'Enterprise SSO / SAML',
      ],
      column: 'left' as const,
    },
    {
      title: 'Your data, always',
      body: "When advisors use ELLA to support their clients, they remain in control. Only those you explicitly invite can access your organization or client workbenches. We don't share your business information without your permission.",
      column: 'right' as const,
    },
    {
      title: 'Privacy Built-In',
      body: "We follow U.S. state privacy laws and align with international standards like GDPR. Users can export or delete their data at any time. ELLA never sells your data, and only processes it to provide the services you've signed up for.",
      column: 'right' as const,
    },
  ],
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
