import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Análisis de accesibilidad', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
