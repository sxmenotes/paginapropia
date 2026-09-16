const { test, expect } = require('@playwright/test');
const path = require('path');

const ARTIFACT_DIR = '/Users/samuelvalenzuela/.gemini/antigravity-ide/brain/1ad3c16e-1fd3-4cff-a934-b06f9be590f4';

test('Verificar sección Mis proyectos (Casos de Éxito) en desktop y mobile', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000');

  // Esperar a que el loader termine
  await page.waitForFunction(() => document.body.classList.contains('page-ready'), { timeout: 5000 });
  await page.waitForTimeout(500);

  // Verificar link en navbar
  const navProjectsLink = page.locator('#nav-links a[href="#projects"]');
  await expect(navProjectsLink).toBeVisible();
  await expect(navProjectsLink).toHaveText('Proyectos');

  // Hacer click en el link de navegación para verificar scroll
  await navProjectsLink.click();
  await page.waitForTimeout(800);

  const section = page.locator('#projects');
  await expect(section).toBeVisible();

  // Verificar que existen las 2 tarjetas
  const cards = page.locator('#projects .case-study-card');
  await expect(cards).toHaveCount(2);

  // Verificar Caso 1: Torrealba Joyas
  const card1 = cards.nth(0);
  await expect(card1.locator('.case-study-title')).toHaveText('Torrealba Joyas');
  await expect(card1.locator('.case-category-tag')).toContainText('Joyería de Autor');
  const img1 = card1.locator('.case-browser-screen img');
  await expect(img1).toBeVisible();
  const naturalWidth1 = await img1.evaluate(el => el.naturalWidth);
  expect(naturalWidth1).toBeGreaterThan(0);

  // Verificar Caso 2: Olimpo Centro de Eventos
  const card2 = cards.nth(1);
  await expect(card2.locator('.case-study-title')).toHaveText('Olimpo Centro de Eventos');
  await expect(card2.locator('.case-category-tag')).toContainText('Eventos Exclusivos');
  const img2 = card2.locator('.case-browser-screen img');
  await expect(img2).toBeVisible();
  const naturalWidth2 = await img2.evaluate(el => el.naturalWidth);
  expect(naturalWidth2).toBeGreaterThan(0);

  // Asegurar Dark Mode primero
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(300);

  // Capturar tarjeta 1 (Torrealba) en Dark Mode
  await card1.screenshot({ path: path.join(ARTIFACT_DIR, 'card1_torrealba_dark.png') });

  // Scroll a tarjeta 2 (Olimpo) y capturar en Dark Mode
  await card2.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await card2.screenshot({ path: path.join(ARTIFACT_DIR, 'card2_olimpo_dark.png') });

  // Cambiar a Light Mode
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await page.waitForTimeout(400);

  // Capturar tarjeta 1 y 2 en Light Mode
  await card1.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await card1.screenshot({ path: path.join(ARTIFACT_DIR, 'card1_torrealba_light.png') });

  await card2.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await card2.screenshot({ path: path.join(ARTIFACT_DIR, 'card2_olimpo_light.png') });

  // Test en Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await card1.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await card1.screenshot({ path: path.join(ARTIFACT_DIR, 'card1_mobile_dark.png') });
});
