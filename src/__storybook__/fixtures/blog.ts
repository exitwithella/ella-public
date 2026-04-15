import type { Post } from '@/payload-types'

import { richText } from './richtext'

export const mockPost: Post = {
  id: 1,
  title: 'Why Every Advisory Practice Needs a Succession Plan',
  slug: 'succession-plan-advisory-practice',
  excerpt: 'Most financial advisors build practices worth millions but have no plan for what happens when they step away. Here is why that needs to change — and how to start.',
  publishedDate: '2026-03-15',
  status: 'published',
  author: {
    id: 1,
    name: 'Drew Watkins',
    slug: 'drew-watkins',
    role: 'Co-founder & CEO',
    bio: richText('Co-founder and CEO of ELLA.') as Post['content'],
    photo: null,
    updatedAt: '',
    createdAt: '',
  },
  featuredImage: null,
  categories: [
    {
      id: 1,
      title: 'Practice Management',
      slug: 'practice-management',
      pathPrefix: 'practice-management',
      updatedAt: '',
      createdAt: '',
    },
  ],
  content: richText(
    'Every financial advisor builds a practice over decades of relationship-building, trust-earning, and expertise development.',
    'But surprisingly few have a plan for what happens to that practice when they are ready to step away.',
    'The result? Practices that are worth millions on paper but fragile in reality.',
  ) as Post['content'],
  updatedAt: '',
  createdAt: '',
}

export const mockPost2: Post = {
  ...mockPost,
  id: 2,
  title: 'The Hidden Cost of Manual Client Onboarding',
  slug: 'hidden-cost-manual-onboarding',
  excerpt: 'You are spending 15+ hours per new client on tasks that could be automated. Here is what that really costs your practice.',
  publishedDate: '2026-03-08',
  categories: [
    {
      id: 2,
      title: 'Efficiency',
      slug: 'efficiency',
      pathPrefix: 'efficiency',
      updatedAt: '',
      createdAt: '',
    },
  ],
}

export const mockPost3: Post = {
  ...mockPost,
  id: 3,
  title: 'AI in Financial Advisory: Threat or Opportunity?',
  slug: 'ai-financial-advisory',
  excerpt: 'Artificial intelligence is reshaping every industry. Here is how forward-thinking advisors are using it as a competitive advantage.',
  publishedDate: '2026-02-28',
  categories: [
    {
      id: 3,
      title: 'Industry Trends',
      slug: 'industry-trends',
      pathPrefix: 'industry-trends',
      updatedAt: '',
      createdAt: '',
    },
  ],
}
