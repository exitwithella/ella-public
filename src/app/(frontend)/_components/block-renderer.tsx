import type { Page } from '@/payload-types'

import { BridgeSectionBlock } from './blocks/bridge-section-block'
import { CredibilityStripBlock } from './blocks/credibility-strip-block'

type Block = NonNullable<Page['layout']>[number]

interface BlockRendererProps {
  block: Block
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.blockType) {
    case 'credibility-strip':
      return <CredibilityStripBlock block={block} />
    case 'bridge-section':
      return <BridgeSectionBlock block={block} />
    case 'card-grid':
    case 'feature-deep-dive':
    case 'trust-security':
    case 'before-after-panel':
    case 'cta-section':
    case 'content-section':
    case 'testimonial-block':
    case 'comparison-table':
    case 'numbered-steps':
    case 'solutions-selector':
    case 'faq-accordion':
    case 'pricing-journey':
    case 'newsletter-capture':
    case 'formEmbed':
    default:
      return null
  }
}
