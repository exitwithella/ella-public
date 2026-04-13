import type { Page, Solution } from '@/payload-types'

import { AdvisorPersonasBlock } from './blocks/advisor-personas-block'
import { BeforeAfterPanelBlock } from './blocks/before-after-panel-block'
import { BridgeSectionBlock } from './blocks/bridge-section-block'
import { CardGridBlock } from './blocks/card-grid-block'
import { ComparisonTableBlock } from './blocks/comparison-table-block'
import { ContentSectionBlock } from './blocks/content-section-block'
import { CredibilityStripBlock } from './blocks/credibility-strip-block'
import { CTASectionBlock } from './blocks/cta-section-block'
import { DilemmaSectionBlock } from './blocks/dilemma-section-block'
import { FeatureDeepDiveBlock } from './blocks/feature-deep-dive-block'
import { FeatureShowcaseBlock } from './blocks/feature-showcase-block'
import { NumberedStepsBlock } from './blocks/numbered-steps-block'
import { ProductFeaturesBlock } from './blocks/product-features-block'
import { SqueezeSectionBlock } from './blocks/squeeze-section-block'
import { TestimonialBlockComponent } from './blocks/testimonial-block-component'
import { TrustSecurityBlock } from './blocks/trust-security-block'
import { ValuesGridBlock } from './blocks/values-grid-block'

type Block = NonNullable<Page['layout']>[number] | NonNullable<Solution['layout']>[number]

interface BlockRendererProps {
  block: Block
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.blockType) {
    case 'advisor-personas':
      return <AdvisorPersonasBlock block={block} />
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
    case 'product-features':
      return <ProductFeaturesBlock block={block} />
    case 'squeeze-section':
      return <SqueezeSectionBlock block={block} />
    case 'dilemma-section':
      return <DilemmaSectionBlock block={block} />
    case 'testimonial-block':
      return <TestimonialBlockComponent block={block} />
    default: {
      // Handle block types not yet in payload-types.ts (regenerated on dev server restart)
      const bt = (block as { blockType: string }).blockType
      if (bt === 'values-grid') {
        return (
          <ValuesGridBlock
            block={block as unknown as Parameters<typeof ValuesGridBlock>[0]['block']}
          />
        )
      }
      if (bt === 'feature-showcase') {
        return (
          <FeatureShowcaseBlock
            block={block as unknown as Parameters<typeof FeatureShowcaseBlock>[0]['block']}
          />
        )
      }
      return null
    }
  }
}
