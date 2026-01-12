import { test, expect } from '@playwright/test';

test.describe('Divergify smoke', () => {
  test('home loads and has hero', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveText(/brains that zig/i);
    await expect(page.locator('form[name="notify"]')).toBeVisible();
  });

  test('divergipedia renders entries', async ({ page }) => {
    await page.goto('/divergipedia.html');
    await expect(page.locator('h1')).toHaveText(/Divergipedia/i);
    await expect(page.locator('#entries .card').first()).toBeVisible();
  });

  test('store page exists', async ({ page }) => {
    await page.goto('/store.html');
    await expect(page.locator('h1')).toHaveText(/Store/i);
  });

  test('thanks page shows challenge text', async ({ page }) => {
    await page.goto('/thanks.html');
    await expect(page.locator('h1')).toHaveText(/Done!/i);
    await expect(page.locator('p.sub')).toContainText(/NTL DEPLOY/i);
  });
});
