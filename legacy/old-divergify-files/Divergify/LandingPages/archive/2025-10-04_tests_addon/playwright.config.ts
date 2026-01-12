import { defineConfig } from '@playwright/test';

const base = process.env.BASE_URL || 'http://localhost:4173';

export default defineConfig({
  use: {
    baseURL: base,
    headless: true,
  },
  retries: 1,
  reporter: [['list']],
  timeout: 20000,
});
