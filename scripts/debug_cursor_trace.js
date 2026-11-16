const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  
  const portraitEl = await page.$('[data-cursor-key="hero-portrait"]');
  const box = await portraitEl.boundingBox();

  // Move to center of portrait
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await new Promise(r => setTimeout(r, 800));

  console.log('--- Checking Default (Cartoon): "Let\'s talk design" ---');
  let dataDefault = await page.evaluate(() => {
    const a = document.querySelector('[data-cursor-arrow]');
    const b = document.querySelector('[data-cursor-badge]');
    const t = document.querySelector('[data-cursor-text]');
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    return {
      text: t.textContent,
      tipX: aRect.left,
      tipY: aRect.top,
      badgeX: bRect.left,
      badgeY: bRect.top,
      dx: bRect.left - aRect.left,
      dy: bRect.top - aRect.top,
      badgeW: bRect.width,
      badgeH: bRect.height,
    };
  });
  console.log('Default:', dataDefault);

  // Click to flip portrait to real photo
  console.log('--- Clicking portrait to flip to Real Photo ---');
  await page.click('[data-cursor-key="hero-portrait"]');
  // Wait for mutation observer and text crossfade
  await new Promise(r => setTimeout(r, 800));

  let dataFlipped = await page.evaluate(() => {
    const a = document.querySelector('[data-cursor-arrow]');
    const b = document.querySelector('[data-cursor-badge]');
    const t = document.querySelector('[data-cursor-text]');
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    return {
      text: t.textContent,
      tipX: aRect.left,
      tipY: aRect.top,
      badgeX: bRect.left,
      badgeY: bRect.top,
      dx: bRect.left - aRect.left,
      dy: bRect.top - aRect.top,
      badgeW: bRect.width,
      badgeH: bRect.height,
    };
  });
  console.log('Flipped:', dataFlipped);

  await browser.close();
})();
