import { test, expect } from '@playwright/test';

test.describe('Pruebas funcionales', () => {
  test('Todos los links responden y no hay imágenes rotas', async ({ page }) => {
    const responses: any[] = [];
    page.on('response', response => responses.push(response));
    
    await page.goto('/');
    await page.waitForLoadState('load');

    // Check images
    const images = await page.locator('img').all();
    for (const img of images) {
      const isVisible = await img.isVisible();
      if (isVisible) {
        expect(await img.evaluate((node: HTMLImageElement) => node.complete && node.naturalHeight !== 0)).toBeTruthy();
      }
    }

    const failedResponses = responses.filter(r => r.status() >= 400 && r.url().includes(new URL(page.url()).hostname));
    expect(failedResponses.length).toBe(0);
  });

  test('Formularios y botones de contacto/WhatsApp', async ({ page }) => {
    await page.goto('/');
    
    const wpLink = page.locator('a[href*="wa.me"], a[href*="whatsapp"]');
    if (await wpLink.count() > 0) {
      expect(await wpLink.first().getAttribute('href')).not.toBe('');
    }

    const form = page.locator('form');
    if (await form.count() > 0) {
      const submitBtn = form.locator('button[type="submit"]');
      if (await submitBtn.count() > 0) {
         await expect(submitBtn).toBeEnabled();
      }
    }
  });
});
