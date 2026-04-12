/**
 * Generates icon-manifest.json from @phosphor-icons/core metadata.
 * Run via: pnpm generate:icons
 *
 * The manifest is committed to the repo so editors get fast icon search
 * without needing to import all ~1500 Phosphor components at build time.
 * Re-run this script if @phosphor-icons/core is updated.
 */
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

import { icons } from '@phosphor-icons/core'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const manifest = icons.map((icon) => ({
  name: icon.name,
  pascalName: icon.pascal_name,
  tags: icon.tags,
  categories: icon.categories,
}))

const outputPath = resolve(__dirname, '../src/components/admin/IconPickerField/icon-manifest.json')

writeFileSync(outputPath, JSON.stringify(manifest, null, 2) + '\n')

console.log(`Generated icon manifest: ${manifest.length} icons → ${outputPath}`)
