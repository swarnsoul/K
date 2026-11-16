const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const viewports = [1440, 1280, 1024, 768, 390];

  for (const w of viewports) {
    await page.setViewport({ width: w, height: 900 });
    await page.goto('http://localhost:3001/work/cirqell', { waitUntil: 'networkidle0' });
    const hero = await page.$('[data-section="03_hero_banner"]');
    if (hero) {
      const res = await page.evaluate(el => {
        const card = el.querySelector('.bg-\\[\\#e3e8f4\\]');
        const text = el.querySelector('span');
        const cRect = card ? card.getBoundingClientRect() : null;
        const tRect = text ? text.getBoundingClientRect() : null;
        return {
          width: window.innerWidth,
          cardWidth: cRect ? cRect.width : 0,
          textWidth: tRect ? tRect.width : 0,
          isInside: tRect && cRect ? tRect.left >= cRect.left && tRect.right <= cRect.right : false
        };
      }, hero);
      console.log(res);
    }
  }

  await browser.close();
})();
