import { existsSync } from 'node:fs';
import { defineConfig } from '@playwright/test';

const port = 5178;
const replitChromium = '/repl/tools/bin/chromium';

export default defineConfig({
  testDir: './tests',
  outputDir: './node_modules/.cache/playwright-results',
  retries: 0,
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    browserName: 'chromium',
    launchOptions: {
      executablePath: process.env.CHROMIUM_PATH || (existsSync(replitChromium) ? replitChromium : undefined),
    },
  },
  webServer: {
    command: `PORT=${port} BASE_PATH=/ pnpm run dev`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 60_000,
  },
});