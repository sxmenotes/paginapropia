import { test, expect } from '@playwright/test';

test('Métricas de performance', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('/');
  await page.waitForLoadState('load');
  const loadTime = Date.now() - startTime;
  
  expect(loadTime).toBeLessThan(3000);

  const lcp = await page.evaluate(() => {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length > 0) {
          resolve(entries[entries.length - 1].startTime);
        } else {
          resolve(0);
        }
      });
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      setTimeout(() => resolve(0), 2000);
    });
  });

  expect(lcp as number).toBeLessThan(2500);
});
