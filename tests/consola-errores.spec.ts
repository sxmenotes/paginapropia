import { test, expect } from '@playwright/test';

test('Sin errores en consola', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  
  const pageErrors: string[] = [];
  page.on('pageerror', exception => {
    pageErrors.push(exception.message);
  });

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});
