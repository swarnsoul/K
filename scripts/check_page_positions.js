const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });

  const elements = await page.evaluate(() => {
    const list = [];
    const d10 = document.querySelector('[data-name="Desktop - 10"]');
    if (d10) {
      const r = d10.getBoundingClientRect();
      list.push({ name: 'Desktop-10', top: r.top, left: r.left, width: r.width, height: r.height });
    }
    const hero = document.querySelector('[data-name="Frame 81"]');
    if (hero) {
      const r = hero.getBoundingClientRect();
      list.push({ name: 'Intro Box (Hi again)', top: r.top, left: r.left, width: r.width, height: r.height });
    }
    const footer = document.querySelector('footer[aria-label="Footer Desk Scene"]');
    if (footer) {
      const r = footer.getBoundingClientRect();
      list.push({ name: 'Footer Desk Scene', top: r.top, left: r.left, width: r.width, height: r.height });
    }
    return list;
  });

  console.log('Element rects at scroll=0:');
  console.log(elements);

  await browser.close();
})();
