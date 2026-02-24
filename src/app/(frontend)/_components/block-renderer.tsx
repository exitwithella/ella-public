import type { Page } from '@/payload-types'

import { BridgeSectionBlock } from './blocks/bridge-section-block'
import { CardGridBlock } from './blocks/card-grid-block'
import { CredibilityStripBlock } from './blocks/credibility-strip-block'
import { FeatureDeepDiveBlock } from './blocks/feature-deep-dive-block'
import { TrustSecurityBlock } from './blocks/trust-security-block'

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
      return <CardGridBlock block={block} />
    case 'feature-deep-dive':
      return <FeatureDeepDiveBlock block={block} />
    case 'trust-security':
      return <TrustSecurityBlock block={block} />
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
