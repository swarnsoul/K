const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3001/work/cirqell', { waitUntil: 'networkidle2' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 1000));
  
  const nextEl = await page.$('[data-section="next_case_study"]');
  if (nextEl) {
    await nextEl.screenshot({ path: 'test_next_study.png' });
    console.log('Next study screenshot saved');
  }

  const footerEl = await page.$('footer');
  if (footerEl) {
    await footerEl.screenshot({ path: 'test_footer_cirqell.png' });
    console.log('Footer screenshot saved');
  }
  
  await browser.close();
})();
