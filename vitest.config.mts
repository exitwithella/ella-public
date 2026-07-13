import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

// `tests/` is excluded from tsconfig.json, so vite-tsconfig-paths won't resolve
// the `@/` and `@payload-config` aliases inside test files. Declare them here.
const srcDir = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      '@payload-config': fileURLToPath(new URL('./src/payload.config.ts', import.meta.url)),
      '@': srcDir,
    },
  },
  test: {
    environment: 'node',
    include: ['tests/int/**/*.int.spec.ts', 'tests/unit/**/*.unit.spec.ts'],
    setupFiles: ['./vitest.setup.ts'],
    // Integration specs each boot Payload on a Miniflare/D1 runtime; two of
    // those runtimes cannot start concurrently, so run test files serially.
    fileParallelism: false,
  },
})
