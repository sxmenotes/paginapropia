import { test, expect } from '@playwright/test';

test('Captura visual full page', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.1 });
});
