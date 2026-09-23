import { test, expect } from '@playwright/test';

test.describe('Promo Modal & Cupón WEB2026', () => {
  test('Apertura de modal, canje de cupón, indexación en formulario y envío a WhatsApp', async ({ page }) => {
    // Escuchar window.open
    await page.addInitScript(() => {
      (window as any).openedUrls = [];
      window.open = (url: string) => {
        (window as any).openedUrls.push(url);
        return null;
      };
    });

    await page.goto('/');

    // Verificar que el modal de promoción se abre
    const promoModal = page.locator('#promo-modal');
    await expect(promoModal).toHaveClass(/open/, { timeout: 6000 });

    // Verificar texto del cupón
    const couponCode = page.locator('#promo-code-text');
    await expect(couponCode).toHaveText('WEB2026');

    // Click en "Canjear 10% y Cotizar"
    const redeemBtn = page.locator('#promo-redeem-btn');
    await redeemBtn.click();

    // El modal debe cerrarse
    await expect(promoModal).not.toHaveClass(/open/);

    // Verificar que el badge de cupón en el formulario esté visible y contenga WEB2026
    const couponBadge = page.locator('#form-coupon-badge');
    await expect(couponBadge).toBeVisible();
    await expect(couponBadge).toContainText('WEB2026');
    await expect(couponBadge).toContainText('10%');

    // Verificar que el input oculto tenga el valor WEB2026
    const couponInput = page.locator('#contact-coupon');
    await expect(couponInput).toHaveValue('WEB2026');

    // Llenar el formulario de contacto
    await page.fill('#contact-name', 'Ignacio Alvear');
    await page.fill('#contact-email', 'ignacio@empresa.com');
    await page.fill('#contact-message', 'Necesitamos rediseñar nuestra plataforma de comercio.');

    // Presionar el botón de enviar
    const submitBtn = page.locator('#submit-btn');
    await submitBtn.click();

    // Esperar a que se procese el window.open
    await page.waitForTimeout(1000);

    const openedUrls: string[] = await page.evaluate(() => (window as any).openedUrls);
    expect(openedUrls.length).toBeGreaterThan(0);
    const targetUrl = openedUrls[0];

    // Verificar número de teléfono (+54 11 7828 1814)
    expect(targetUrl).toContain('5491178281814');

    // Verificar contenido del mensaje predeterminado
    const decodedUrl = decodeURIComponent(targetUrl);
    expect(decodedUrl).toContain('Ignacio Alvear');
    expect(decodedUrl).toContain('ignacio@empresa.com');
    expect(decodedUrl).toContain('WEB2026');
    expect(decodedUrl).toContain('10% de descuento');
    expect(decodedUrl).toContain('Necesitamos rediseñar nuestra plataforma de comercio.');
  });

  test('Cierre de modal y reapertura con píldora flotante', async ({ page }) => {
    await page.goto('/');

    const promoModal = page.locator('#promo-modal');
    await expect(promoModal).toHaveClass(/open/, { timeout: 6000 });

    // Cerrar modal con el botón de cerrar
    const closeBtn = page.locator('#promo-close-btn');
    await closeBtn.click();
    await expect(promoModal).not.toHaveClass(/open/);

    // La píldora flotante debe mostrarse
    const floatingTrigger = page.locator('#promo-floating-trigger');
    await expect(floatingTrigger).toHaveClass(/visible/);

    // Al hacer click en la píldora, el modal se vuelve a abrir
    await floatingTrigger.click();
    await expect(promoModal).toHaveClass(/open/);
  });
});
