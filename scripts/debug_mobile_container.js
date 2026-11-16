const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  
  await page.evaluate(() => {
    const el = document.querySelector('.xl\\:hidden [aria-label*="companions"]');
    el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });

  for (let i = 1; i <= 5; i++) {
    await new Promise(r => setTimeout(r, 500));
    const status = await page.evaluate(() => {
      const el = document.querySelector('.xl\\:hidden [data-icon-index="0"]');
      return {
        opacity: el ? el.style.opacity : null,
        transform: el ? el.style.transform : null,
      };
    });
    console.log(`t=${i*500}ms:`, status);
  }

  await browser.close();
})();
