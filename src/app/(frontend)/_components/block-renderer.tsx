import type { Page, Solution } from '@/payload-types'

import { BeforeAfterPanelBlock } from './blocks/before-after-panel-block'
import { BridgeSectionBlock } from './blocks/bridge-section-block'
import { CardGridBlock } from './blocks/card-grid-block'
import { ComparisonTableBlock } from './blocks/comparison-table-block'
import { ContentSectionBlock } from './blocks/content-section-block'
import { CredibilityStripBlock } from './blocks/credibility-strip-block'
import { CTASectionBlock } from './blocks/cta-section-block'
import { FeatureDeepDiveBlock } from './blocks/feature-deep-dive-block'
import { NumberedStepsBlock } from './blocks/numbered-steps-block'
import { TestimonialBlockComponent } from './blocks/testimonial-block-component'
import { TrustSecurityBlock } from './blocks/trust-security-block'

type Block = NonNullable<Page['layout']>[number] | NonNullable<Solution['layout']>[number]

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
      return <BeforeAfterPanelBlock block={block} />
    case 'cta-section':
      return <CTASectionBlock block={block} />
    case 'comparison-table':
      return <ComparisonTableBlock block={block} />
    case 'content-section':
      return <ContentSectionBlock block={block} />
    case 'numbered-steps':
      return <NumberedStepsBlock block={block} />
    case 'testimonial-block':
      return <TestimonialBlockComponent block={block} />
    case 'solutions-selector':
    case 'faq-accordion':
    case 'pricing-journey':
    case 'newsletter-capture':
    case 'formEmbed':
    default:
      return null
  }
}
