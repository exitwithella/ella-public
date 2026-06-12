import { defineConfig, devices } from '@playwright/test'
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import 'dotenv/config'

const SMOKE_BASE_URL = process.env.SMOKE_BASE_URL
const isSmokeRun = Boolean(SMOKE_BASE_URL)

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // `open: 'never'` prevents the html reporter from spawning a server at the
  // end of a run — important on CI and for scripted local runs.
  reporter: [['list'], ['html', { open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' },
      testIgnore: ['**/smoke.spec.ts'],
    },
    {
      name: 'smoke',
      testMatch: ['**/smoke.spec.ts'],
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chromium',
        baseURL: SMOKE_BASE_URL ?? 'https://withella.io',
      },
    },
  ],
  // Only spin up the local dev server for non-smoke runs. Smoke tests hit a
  // deployed URL and must not depend on (or start) a local server.
  webServer: isSmokeRun
    ? undefined
    : {
        command: 'pnpm dev',
        reuseExistingServer: true,
        url: 'http://localhost:3000',
      },
})
