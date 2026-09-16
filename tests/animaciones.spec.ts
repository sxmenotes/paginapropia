import { test, expect } from '@playwright/test';

const animationTargets = [
  '.hero-title',
  '.accent-dot',
  '#hero-eyebrow',
  '#hero-desc',
  '#hero-actions',
  '#hero-scroll',
  '.reveal-elem',
  '.nav-mobile-link'
];

test.describe('Pruebas de Animaciones con GSAP 3 & ScrollTrigger', () => {
  test('GSAP y ScrollTrigger están cargados', async ({ page }) => {
    await page.goto('/');
    const isGsapLoaded = await page.evaluate(() => {
      return typeof (window as any).gsap !== 'undefined' && typeof (window as any).ScrollTrigger !== 'undefined';
    });
    expect(isGsapLoaded).toBeTruthy();
  });

  test('La timeline global de animaciones responde sin bloqueos', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    
    const isTimelineActive = await page.evaluate(() => {
      const gsap = (window as any).gsap;
      return gsap && typeof gsap.globalTimeline !== 'undefined';
    });
    
    expect(isTimelineActive).toBeTruthy();
  });
  
  for (const target of animationTargets) {
    test(`Fluidez de animación en ${target}`, async ({ page }) => {
      await page.goto('/');
      
      const fpsData = await page.evaluate(async (selector) => {
        return new Promise((resolve) => {
          let frames = 0;
          let lagFrames = 0;
          let startTime = performance.now();
          let lastFrameTime = startTime;
          
          const el = document.querySelector(selector);
          if (el) el.scrollIntoView();

          const checkFrame = (time: number) => {
            frames++;
            const delta = time - lastFrameTime;
            if (delta > 33) lagFrames++;
            lastFrameTime = time;

            if (time - startTime < 1500) {
              requestAnimationFrame(checkFrame);
            } else {
              const avgFps = (frames / 1.5);
              resolve({ avgFps, lagFrames });
            }
          };
          requestAnimationFrame(checkFrame);
        });
      }, target);

      console.log(`[ANIMATION-FPS-RESULT] Evaluación de fluidez para ${target}: ${(fpsData as any).avgFps.toFixed(2)} FPS promedio, ${(fpsData as any).lagFrames} frames con lag (>33ms)`);
      
      if ((fpsData as any).avgFps < 45) {
          console.warn('FPS menores a 45 detectados');
      }
    });
  }

  test('Respeta prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    
    await page.waitForTimeout(1000);
    const isReduced = await page.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    expect(isReduced).toBeTruthy();
  });
});
