const { test, expect } = require('@playwright/test');

test('diagnostico visual logos', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Forzar que el loader se estabilice quitando animaciones para screenshot
  await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
  
  await page.waitForSelector('.loader-svg-logo', { state: 'visible' });
  await page.locator('.loader-svg-logo').screenshot({ path: 'diagnostico_loader.png', animations: 'disabled' });
  
  // Recargar sin el styletag para seguir el flujo normal
  await page.goto('http://localhost:3000');
  await page.waitForFunction(() => document.body.classList.contains('page-ready'));
  
  // Logo header
  await page.locator('.nav-logo').screenshot({ path: 'diagnostico_header.png', animations: 'disabled' });
  
  // Hacer scroll al final
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  
  // Logo footer
  await page.locator('.footer-left').screenshot({ path: 'diagnostico_footer.png', animations: 'disabled' });
});

test('diagnostico seccion ruta de trabajo', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForFunction(() => document.body.classList.contains('page-ready'));
  
  const section = await page.locator('#proceso');
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'diagnostico_proceso_entrada.png' });
  
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'diagnostico_proceso_scroll1.png' });
  
  await page.mouse.wheel(0, 1000);
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'diagnostico_proceso_scroll2.png' });
});
