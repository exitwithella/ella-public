import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import type { Block } from 'payload'
import { describe, expect, it } from 'vitest'

import { Pages } from '../../src/collections/Pages'
import { Solutions } from '../../src/collections/Solutions'

/**
 * Extracts all block slugs from a Payload collection's `layout` field.
 */
function getBlockSlugs(collection: { fields: Array<Record<string, unknown>> }): string[] {
  const layoutField = collection.fields.find((f) => f.name === 'layout' && f.type === 'blocks') as
    | { blocks: Block[] }
    | undefined

  if (!layoutField) return []
  return layoutField.blocks.map((b) => b.slug)
}

/**
 * Extracts all block type strings handled in the BlockRenderer switch statement
 * by reading the source file and parsing `case '...'` patterns + fallback checks.
 */
function getRendererBlockTypes(): string[] {
  const rendererPath = resolve(__dirname, '../../src/app/(frontend)/_components/block-renderer.tsx')
  const source = readFileSync(rendererPath, 'utf-8')

  const types: string[] = []

  // Match `case 'block-type':` in switch statement
  const caseRegex = /case\s+'([^']+)':/g
  let match
  while ((match = caseRegex.exec(source)) !== null) {
    types.push(match[1])
  }

  // Match fallback checks like `if (bt === 'block-type')`
  const fallbackRegex = /bt\s*===\s*'([^']+)'/g
  while ((match = fallbackRegex.exec(source)) !== null) {
    types.push(match[1])
  }

  return types
}

describe('BlockRenderer registry completeness', () => {
  const renderedTypes = getRendererBlockTypes()

  it('handles all block types registered in Pages collection', () => {
    const pageSlugs = getBlockSlugs(Pages)
    const missing = pageSlugs.filter((slug) => !renderedTypes.includes(slug))

    // These block types are registered in the CMS but intentionally not rendered
    // (they are CMS-only config blocks or server-side only). If a new block is
    // added to Pages but not to BlockRenderer, this test will catch it.
    if (missing.length > 0) {
      // Report exactly which blocks are missing so it's actionable
      expect(missing, `Block types registered in Pages but missing from BlockRenderer`).toEqual([])
    }
  })

  it('handles all block types registered in Solutions collection', () => {
    const solutionSlugs = getBlockSlugs(Solutions)
    const missing = solutionSlugs.filter((slug) => !renderedTypes.includes(slug))

    if (missing.length > 0) {
      expect(missing, `Block types registered in Solutions but missing from BlockRenderer`).toEqual(
        [],
      )
    }
  })

  it('has at least 15 block type cases (sanity check)', () => {
    // If the parser breaks and finds 0 cases, this catches it
    expect(renderedTypes.length).toBeGreaterThanOrEqual(15)
  })
})
