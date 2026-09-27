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
    const selectedWork = page.getByRole('heading', { name: 'Selected work' });

    await expect(name).toContainText('Sharin');
    await expect(name).toContainText('Khander');
    await expect(page.getByTestId('text-products-count')).toHaveText('7');
    await expect(page.getByTestId('text-experiments-count')).toHaveText('150+');
    await expect(page.getByTestId('text-gmv-impact')).toHaveText('$340M');
    await expect(selectedWork).toBeVisible();

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
    expect(layout.metrics.bottom, 'metrics precede Selected work').toBeLessThan(layout.selectedWork.top);
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

    // The foil is a clipped pseudo-element, not a DOM node. Check the painted
    // polygon rather than its rectangular CSS box (which includes empty space).
    expect(layout.foilPolygon.length, 'foil clip-path has measurable points').toBeGreaterThan(2);
    const insidePolygon = (point, polygon) => polygon.reduce((inside, a, i) => {
      const b = polygon[(i + 1) % polygon.length];
      return ((a.y > point.y) !== (b.y > point.y) &&
        point.x < (b.x - a.x) * (point.y - a.y) / (b.y - a.y) + a.x) ? !inside : inside;
    }, false);
    for (const { label, box } of layout.text) {
      // Sampling catches crossing the foil while tolerating subpixel layout.
      for (let x = box.left + 4; x < box.right - 3; x += 4) {
        for (let y = box.top + 4; y < box.bottom - 3; y += 4) {
          expect(insidePolygon({ x, y }, layout.foilPolygon), `${label} crosses the foil at ${x}, ${y}`).toBe(false);
        }
      }
    }
  });
}