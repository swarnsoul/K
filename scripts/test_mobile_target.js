const puppeteer = require('puppeteer');

(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: 390, height: 844 });
  await p.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });

  // Scroll to bottom
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 1000));

  const el = await p.$('.lg\\:hidden footer[aria-label="Footer Desk Scene"] [data-figma-id="563:928"] button span');
  console.log('Found span:', !!el);
  if (el) {
    const box = await el.boundingBox();
    console.log('box:', box);
  }

  const elDiary = await p.$('.lg\\:hidden footer[aria-label="Footer Desk Scene"] [data-figma-id="563:934"] span');
  console.log('Found diary span:', !!elDiary);
  if (elDiary) {
    const box = await elDiary.boundingBox();
    console.log('diary box:', box);
  }

  await b.close();
})();
