'use client'

import type { Page } from '@/payload-types'

type Block = NonNullable<Page['layout']>[number]

interface BlockRendererProps {
  block: Block
}

export function BlockRenderer({ block }: BlockRendererProps): null {
  switch (block.blockType) {
    case 'content-section':
    case 'card-grid':
    case 'testimonial-block':
    case 'cta-section':
    case 'credibility-strip':
    case 'feature-deep-dive':
    case 'comparison-table':
    case 'trust-security':
    case 'numbered-steps':
    case 'solutions-selector':
    case 'faq-accordion':
    case 'pricing-journey':
    case 'newsletter-capture':
    case 'formEmbed':
    default: {
      return null
    }
  }
}
