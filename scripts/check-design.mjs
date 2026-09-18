import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';

await mkdir('design-checks', { recursive: true });
const browser = await chromium.launch();
try {
  for (const [name, width, height, reducedMotion] of [
    ['desktop', 1440, 1000, 'no-preference'],
    ['mobile', 390, 844, 'no-preference'],
    ['reduced-motion', 390, 844, 'reduce'],
  ]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.body.style.overflow !== 'hidden');
    await page.locator('h1').waitFor({ state: 'visible' });
    assert.equal(await page.locator('main > section').count(), 9);
    assert.equal(await page.locator('.project-card').count(), 4);
    assert(await page.locator('.portrait-frame img').evaluate((img) => img.complete && img.naturalWidth > 0));
    await page.screenshot({ path: `design-checks/${name}-hero.png` });
    const dimensions = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth }));
    console.log(name, dimensions);
    assert(dimensions.scrollWidth <= dimensions.width, `${name}: horizontal overflow`);
    await page.getByRole('button', { name: 'Explore Projects', exact: true }).click();
    await page.waitForFunction(() => Math.abs(document.getElementById('projects').getBoundingClientRect().top - 100) < 15);
    await page.waitForTimeout(800);
    await page.screenshot({ path: `design-checks/${name}-projects.png` });
    await page.locator('#stack').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'AI / ML' }).click();
    await page.getByText('Teaching software to learn — from data pipelines to models.', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Open command palette' }).click();
    await page.locator('input').waitFor({ state: 'visible' });
    await page.keyboard.press('Escape');
    if (reducedMotion === 'reduce') {
      assert.equal(await page.locator('.orbital-axis').first().evaluate((el) => getComputedStyle(el).animationName), 'none');
    }
    assert.deepEqual(errors, [], `${name}: browser errors`);
    console.log(`PASS ${name}: sections, portrait, project navigation, skills, command palette, viewport, and runtime errors`);
    await page.close();
  }
} finally {
  await browser.close();
}
