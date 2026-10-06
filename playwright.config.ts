import { defineConfig, devices } from '@playwright/test';

// All files live in the repository root (no tests/ folder):
//   *.api.spec.ts  → project "api"      (HTTP tests against server.js, no browser)
//   *.spec.ts      → project "chromium" (browser tests against demo.playwright.dev)
//   *.test.js      → Jest (unit tests), ignored by Playwright
export default defineConfig({
  testDir: '.',
  testMatch: /.*\.spec\.ts/,
  reporter: [
    ['list'],                                                   // terminal
    ['html', { open: 'never' }],                                // playwright-report/index.html
    ['junit', { outputFile: 'test-results/junit.xml' }],        // CI / Jira / Xray
    ['json', { outputFile: 'test-results/results.json' }],      // scripts, dashboards
  ],
  use: { trace: 'on' },
  projects: [
    {
      name: 'api',
      testMatch: /.*\.api\.spec\.ts/,
      use: { baseURL: 'http://localhost:3000' },
    },
    {
      name: 'chromium',
      testIgnore: /.*\.api\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: 'https://demo.playwright.dev', screenshot: 'only-on-failure' },
    },
  ],
  // Playwright starts the API itself before the tests and stops it afterwards.
  webServer: {
    command: 'node server.js',
    url: 'http://localhost:3000/health',
    reuseExistingServer: true,
  },
});
