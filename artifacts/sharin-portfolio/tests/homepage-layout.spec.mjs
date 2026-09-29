import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'narrow mobile', width: 375, height: 812 },
];

for (const viewport of viewports) {
  test(`homepage layout at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    const name = page.getByTestId('text-work-name');
    const metrics = page.locator('.work-proof');
    const selectedWork = page.getByRole('heading', { name: "Things I've Built in 2026" });

    await expect(name).toContainText('Sharin');
    await expect(name).toContainText('Khander');
    await expect(page.getByTestId('text-products-count')).toHaveText('7');
    await expect(page.getByTestId('text-experiments-count')).toHaveText('40');
    await expect(page.getByTestId('text-gmv-impact')).toHaveText('$180M');
    await expect(page.getByTestId('text-work-tagline')).toHaveText('I build better ways to shop.');
    await expect(page.getByText('2026 YTD')).toBeVisible();
    await expect(page.getByText('36 WINS')).toBeVisible();
    await expect(selectedWork).toBeVisible();
    await expect(page.getByText('Product builder and former engineer.')).toHaveCount(0);
    const personalTab = page.getByRole('tab', { name: 'Personal' });
    const realRealTab = page.getByRole('tab', { name: 'The RealReal' });
    await expect(page.getByRole('tab')).toHaveText(['The RealReal', 'Personal']);
    await expect(realRealTab).toHaveAttribute('aria-selected', 'true');
    await expect(personalTab).toHaveAttribute('aria-selected', 'false');
    await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'work-tab-0');
    await expect(page.getByTestId('link-project-curation')).toBeVisible();
    await expect(page.locator('.personal-project')).toHaveCount(0);
    await personalTab.click();
    await expect(personalTab).toHaveAttribute('aria-selected', 'true');
    await expect(realRealTab).toHaveAttribute('aria-selected', 'false');
    await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'work-tab-1');
    await expect(page.getByRole('tabpanel')).toBeVisible();
    await expect(page.locator('.personal-project h3')).toHaveText(['Virtual Try-On', 'AI Advent Calendar', 'Medigo']);
    await expect(page.getByTestId('personal-project-ai-advent-calendar').locator('.editorial-project-kicker')).toHaveText('02');
    await expect(page.getByTestId('personal-project-medigo').locator('.editorial-project-kicker')).toHaveText('03');
    await expect(page.getByLabel('AI Advent Calendar demo recording')).toBeVisible();
    await expect(page.locator('.editorial-project-visual figcaption, .personal-recording-label')).toHaveCount(0);
    await expect(page.locator('[data-project="dream-catcher"]')).toHaveCount(0);
    await expect(page.locator('.work-filters')).toHaveCount(0);
    await expect(page.locator('.work-list-content > div')).toHaveCount(0);
    await expect(page.locator('.personal-unavailable-status')).toHaveCount(1);
    await expect(page.locator('.personal-recording-play')).toHaveCount(1);
    await expect(page.locator('.personal-project [src*="virtual-try-on-pdp"]')).toHaveCount(0);
    await expect(page.locator('.work-list a.editorial-project')).toHaveCount(0);
    await page.getByRole('button', { name: 'Play Virtual Try-On — Browse grid recording' }).click();
    await expect(page.getByLabel('Virtual Try-On — Browse grid recording')).toHaveAttribute('controls', '');
    await expect(page.getByLabel('Virtual Try-On — Browse grid recording')).toHaveJSProperty('networkState', 1);

    // Measure after the entrance animation; don't let it make the geometry flaky.
    await page.locator('.page-reveal').evaluate((element) =>
      Promise.all(element.getAnimations().map((animation) => animation.finished)),
    );

    const layout = await page.evaluate(() => {
      const rect = (element) => {
        const { left, right, top, bottom } = element.getBoundingClientRect();
        return { left, right, top, bottom };
      };
      const hero = document.querySelector('.work-hero');
      const foilStyle = getComputedStyle(hero, '::before');
      const heroRect = hero.getBoundingClientRect();
      const foilWidth = parseFloat(foilStyle.width);
      const foilHeight = parseFloat(foilStyle.height);
      const foilTop = heroRect.top + parseFloat(foilStyle.top);
      const foilLeft = heroRect.right - parseFloat(foilStyle.right) - foilWidth;
      const foilPolygon = [...foilStyle.clipPath.matchAll(/([\d.]+)%\s+([\d.]+)%/g)]
        .map(([, x, y]) => ({
          x: foilLeft + foilWidth * Number(x) / 100,
          y: foilTop + foilHeight * Number(y) / 100,
        }));
      const text = [...hero.querySelectorAll('h1, .work-hero-role, .work-hero-description, .work-proof-number, .work-proof-label')];
      return {
        name: rect(hero.querySelector('h1')),
        metrics: rect(hero.querySelector('.work-proof')),
        selectedWork: rect(document.querySelector('#work-heading')),
        metricItems: [...hero.querySelectorAll('.work-proof-item')].map((item) => ({
          box: rect(item),
          children: [...item.children].map((child) => ({
            box: rect(child),
            scrollWidth: child.scrollWidth,
            clientWidth: child.clientWidth,
          })),
        })),
        text: text.map((element) => ({ label: element.textContent, box: rect(element) })),
        foilPolygon,
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      };
    });

    expect(layout.name.top, 'name starts above the metrics').toBeLessThan(layout.metrics.top);
    expect(layout.metrics.bottom, "metrics precede Things I've Built in 2026").toBeLessThan(layout.selectedWork.top);
    expect(layout.metrics.bottom, 'all metrics fit above the fold').toBeLessThanOrEqual(layout.viewportHeight);
    expect(layout.documentWidth, 'no horizontal page overflow').toBeLessThanOrEqual(layout.viewportWidth + 1);

    for (const { box, children } of layout.metricItems) {
      for (const child of children) {
        expect(child.box.left, 'metric content is not clipped on the left').toBeGreaterThanOrEqual(box.left - 1);
        expect(child.box.right, 'metric content is not clipped on the right').toBeLessThanOrEqual(box.right + 1);
        expect(child.box.bottom, 'metric content is not clipped below').toBeLessThanOrEqual(box.bottom + 1);
        expect(child.scrollWidth, 'metric text fits its own box').toBeLessThanOrEqual(child.clientWidth + 1);
      }
    }

    // If the hero has a clipped foil, check its painted polygon rather than
    // its rectangular CSS box. Current hero styling has no such pseudo-element.
    const insidePolygon = (point, polygon) => polygon.reduce((inside, a, i) => {
      const b = polygon[(i + 1) % polygon.length];
      return ((a.y > point.y) !== (b.y > point.y) &&
        point.x < (b.x - a.x) * (point.y - a.y) / (b.y - a.y) + a.x) ? !inside : inside;
    }, false);
    for (const { label, box } of layout.foilPolygon.length > 2 ? layout.text : []) {
      // Sampling catches crossing the foil while tolerating subpixel layout.
      for (let x = box.left + 4; x < box.right - 3; x += 4) {
        for (let y = box.top + 4; y < box.bottom - 3; y += 4) {
          expect(insidePolygon({ x, y }, layout.foilPolygon), `${label} crosses the foil at ${x}, ${y}`).toBe(false);
        }
      }
    }

    await realRealTab.click();
    await expect(realRealTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('.work-list a.editorial-project')).toHaveCount(6);
    await expect(page.locator('.work-list a.editorial-project h3')).toHaveText([
      'Curation Tool', 'Shopping Agent', 'Similar Designers',
      'Metadata Enrichment', 'Image Search', 'Site Redesign',
    ]);
    await expect(page.locator('.work-filters, .work-list-content > div')).toHaveCount(0);
    await personalTab.click();
    await expect(page.locator('.personal-project')).toHaveCount(3);
    await realRealTab.focus();
    await realRealTab.press('ArrowLeft');
    await expect(personalTab).toHaveAttribute('aria-selected', 'true');
    await realRealTab.click();
    await expect(page.locator('.work-list a.editorial-project')).toHaveCount(6);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width + 1);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await personalTab.click();
    await expect(page.locator('.work-list-content')).toHaveCSS('animation-name', 'none');
  });
}