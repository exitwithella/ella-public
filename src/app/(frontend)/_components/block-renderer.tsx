import dynamic from 'next/dynamic'

import type { Page, Solution } from '@/payload-types'

import { AdvisorPersonasBlock } from './blocks/advisor-personas-block'
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

// Heavy below-fold blocks — code-split to reduce initial JS bundle
const DilemmaSectionBlock = dynamic(
  () => import('./blocks/dilemma-section-block').then((m) => ({ default: m.DilemmaSectionBlock })),
  { ssr: true },
)

const SqueezeSectionBlock = dynamic(
  () => import('./blocks/squeeze-section-block').then((m) => ({ default: m.SqueezeSectionBlock })),
  { ssr: true },
)

const ProductFeaturesBlock = dynamic(
  () => import('./blocks/product-features-block').then((m) => ({ default: m.ProductFeaturesBlock })),
  { ssr: true },
)

const PromptAnatomyBlock = dynamic(
  () => import('./blocks/prompt-anatomy-block').then((m) => ({ default: m.PromptAnatomyBlock })),
  { ssr: true },
)

const FeatureShowcaseBlock = dynamic(
  () => import('./blocks/feature-showcase-block').then((m) => ({ default: m.FeatureShowcaseBlock })),
  { ssr: true },
)

const ValuesGridBlock = dynamic(
  () => import('./blocks/values-grid-block').then((m) => ({ default: m.ValuesGridBlock })),
  { ssr: true },
)

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
        return <ValuesGridBlock block={block as any} />
      }
      if (bt === 'prompt-anatomy') {
        return <PromptAnatomyBlock block={block as any} />
      }
      if (bt === 'feature-showcase') {
        return <FeatureShowcaseBlock block={block as any} />
      }
      return null
    }
  }
}
