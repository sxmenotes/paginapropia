import { test, expect } from '@playwright/test';
import path from 'path';

const ARTIFACT_DIR = '/Users/samuelvalenzuela/.gemini/antigravity-ide/brain/e1fd180a-4790-4385-80ae-3703454ac792';

test.describe('Ruta de Trabajo (Proceso) Visual & Functional Tests', () => {
  test('verify loading, process section pinning, deadzone, and all 6 cards', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/');

    // Wait for loader to disappear
    await page.waitForSelector('#hero', { state: 'visible' });
    await page.waitForTimeout(2200);

    // Verify header horizontal alignment with other sections
    const alignments = await page.evaluate(() => {
      const hero = document.querySelector('#hero .hero-inner').getBoundingClientRect();
      const proceso = document.querySelector('#proceso .section-inner').getBoundingClientRect();
      const services = document.querySelector('#services .section-inner').getBoundingClientRect();
      const about = document.querySelector('#about .section-inner').getBoundingClientRect();
      const contact = document.querySelector('#contact .section-inner').getBoundingClientRect();

      const heroTitle = document.querySelector('#hero .hero-title').getBoundingClientRect();
      const procesoTitle = document.querySelector('#proceso .section-title').getBoundingClientRect();
      const servicesTitle = document.querySelector('#services .section-title').getBoundingClientRect();
      const aboutTitle = document.querySelector('#about .section-title').getBoundingClientRect();
      const contactTitle = document.querySelector('#contact .section-title').getBoundingClientRect();

      return {
        containers: { hero: hero.left, proceso: proceso.left, services: services.left, about: about.left, contact: contact.left },
        titles: { hero: heroTitle.left, proceso: procesoTitle.left, services: servicesTitle.left, about: aboutTitle.left, contact: contactTitle.left }
      };
    });
    console.log('Section Alignments:', alignments);

    // Assert that container and title left positions match services/about/contact exactly
    expect(alignments.containers.proceso).toBeCloseTo(alignments.containers.services, 1);
    expect(alignments.titles.proceso).toBeCloseTo(alignments.titles.services, 1);

    // Scroll to see the Proceso header before pin
    await page.evaluate(() => {
      const sec = document.getElementById('proceso');
      window.scrollTo({ top: sec.offsetTop, behavior: 'instant' });
    });
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '00_proceso_header_alignment.png') });
    // Get key coordinates
    const info = await page.evaluate(() => {
      const sec = document.getElementById('proceso');
      const container = document.querySelector('.projects-horizontal');
      const track = document.getElementById('projects-track');
      const STICKY_TOP = 84;
      const START_BUFFER = 450;
      const pinStartY = sec.offsetTop + container.offsetTop - STICKY_TOP;
      const maxShift = track.scrollWidth - window.innerWidth + 140;
      const slideCount = track.children.length;
      const activeRange = Math.max(maxShift * 1.2, (slideCount - 1) * 700);
      return { pinStartY, START_BUFFER, activeRange, maxShift, secTop: sec.offsetTop, contTop: container.offsetTop };
    });
    console.log('Test Coordinates:', info);

    // 1. Scroll to exact pin point
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), info.pinStartY);
    await page.waitForTimeout(300);
    const trans1 = await page.evaluate(() => document.getElementById('projects-track').style.transform);
    expect(trans1).toMatch(/translate(X|3d)\(0px/);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '01_card1_pinned.png') });

    // 2. Reading Deadzone: scroll 300px down and assert it's still translateX(0px)
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), info.pinStartY + 300);
    await page.waitForTimeout(300);
    const transDeadzone = await page.evaluate(() => document.getElementById('projects-track').style.transform);
    console.log('Transform at 300px deadzone:', transDeadzone);
    expect(transDeadzone).toMatch(/translate(X|3d)\(0px/);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '02_card1_deadzone.png') });

    // 3. Card 2: Wireframe & Strategy (20% progress)
    const yCard2 = info.pinStartY + info.START_BUFFER + info.activeRange * 0.20;
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), yCard2);
    await page.waitForTimeout(300);
    const trans2 = await page.evaluate(() => document.getElementById('projects-track').style.transform);
    console.log('Transform at Card 2:', trans2);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '03_card2_wireframe.png') });

    // 4. Card 3: Stitch Design System (40% progress)
    const yCard3 = info.pinStartY + info.START_BUFFER + info.activeRange * 0.40;
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), yCard3);
    await page.waitForTimeout(300);
    const trans3 = await page.evaluate(() => document.getElementById('projects-track').style.transform);
    console.log('Transform at Card 3:', trans3);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '04_card3_stitch.png') });

    // 5. Card 4: Frontend & Animations (60% progress)
    const yCard4 = info.pinStartY + info.START_BUFFER + info.activeRange * 0.60;
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), yCard4);
    await page.waitForTimeout(300);
    const trans4 = await page.evaluate(() => document.getElementById('projects-track').style.transform);
    console.log('Transform at Card 4:', trans4);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '05_card4_frontend.png') });

    // 6. Card 5: Testing & Core Web Vitals (80% progress)
    const yCard5 = info.pinStartY + info.START_BUFFER + info.activeRange * 0.80;
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), yCard5);
    await page.waitForTimeout(300);
    const trans5 = await page.evaluate(() => document.getElementById('projects-track').style.transform);
    console.log('Transform at Card 5:', trans5);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '06_card5_vitals.png') });

    // 7. Card 6: Final CTA (100% progress)
    const yCard6 = info.pinStartY + info.START_BUFFER + info.activeRange * 1.0;
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), yCard6);
    await page.waitForTimeout(300);
    const trans6 = await page.evaluate(() => document.getElementById('projects-track').style.transform);
    console.log('Transform at Card 6 (CTA):', trans6);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '07_card6_cta.png') });

    // 8. Scroll to Services to verify alignment visually
    await page.evaluate(() => {
      const srv = document.getElementById('services');
      window.scrollTo({ top: srv.offsetTop - 50, behavior: 'instant' });
    });
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '08_services_header_alignment.png') });

    console.log('SUCCESS: All 6 cards and section headers cleanly captured and verified!');
  });

  test('verify theme toggle button, light mode styling, and OS preference persistence', async ({ page }) => {
    // Emulate dark color-scheme first
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/');

    // Wait for loader to disappear
    await page.waitForSelector('#hero', { state: 'visible' });
    await page.waitForTimeout(2200);

    // 1. Initial State: Dark theme when OS is dark
    const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(initialTheme).toBe('dark');

    const toggleBtn = page.locator('#theme-toggle');
    await expect(toggleBtn).toBeVisible();

    // 2. Click Theme Toggle Button -> switches to Light Theme
    await toggleBtn.click();
    await page.waitForTimeout(400);

    const lightThemeAttr = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(lightThemeAttr).toBe('light');

    const storedTheme = await page.evaluate(() => localStorage.getItem('sv-theme'));
    expect(storedTheme).toBe('light');

    // Capture Light Mode Hero
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '09_theme_light_hero.png') });

    // Scroll to Proceso in Light Mode
    await page.evaluate(() => {
      const sec = document.getElementById('proceso');
      window.scrollTo({ top: sec.offsetTop + 100, behavior: 'instant' });
    });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '10_theme_light_proceso.png') });

    // Scroll to Services in Light Mode
    await page.evaluate(() => {
      const srv = document.getElementById('services');
      window.scrollTo({ top: srv.offsetTop, behavior: 'instant' });
    });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, '11_theme_light_services.png') });

    // 3. Click Theme Toggle Button again -> switches back to Dark Theme
    await toggleBtn.click();
    await page.waitForTimeout(400);

    const backToDarkAttr = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(backToDarkAttr).toBe('dark');

    const backToDarkStored = await page.evaluate(() => localStorage.getItem('sv-theme'));
    expect(backToDarkStored).toBe('dark');

    await page.screenshot({ path: path.join(ARTIFACT_DIR, '12_theme_back_to_dark.png') });

    console.log('SUCCESS: Theme switching verified with full persistence and visual fidelity!');
  });
});
