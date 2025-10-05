// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

/**
 * Global Playwright configuration for Wizard Bank E2E tests.
 * Learn more: https://playwright.dev/docs/test-configuration
 */

export default defineConfig({
  testDir: './tests',                  // All tests are located under /tests
  fullyParallel: false,                // Run tests sequentially for stability
  workers: 1,                          // Prevent flaky parallel behavior in UI tests

  /* Test reporting */
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

  /* Shared configuration for all tests */
  use: {
    baseURL: 'https://www.globalsqa.com', // ✅ baseURL used with relative `goto()` calls
    testIdAttribute: 'id',                // Allows `page.getByTestId()` lookups by 'id'
    headless: true,                       // Run headless by default (set false for debugging)
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',        // Capture screenshots on failures
    video: 'retain-on-failure',           // Keep video recordings only when tests fail
    trace: 'retain-on-failure',           // Collect trace when a test fails
  },

  /* Define browsers/environments */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Optional: global retries for flakiness */
  retries: 1,

  /* Optional: set default timeout */
  timeout: 30 * 1000, // 30 seconds
});
