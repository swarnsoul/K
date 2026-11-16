const puppeteer = require('puppeteer');

async function testNextStudyLink() {
  console.log('Testing Next Case Study link from /work/cirqell...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3001/work/cirqell', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  const nextLink = await page.$('a[href="/work/influcrush"]');
  console.log('Next Case Study link found:', !!nextLink);

  if (nextLink) {
    await page.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }), nextLink);
    await new Promise(r => setTimeout(r, 500));
    console.log('Clicking Next Case Study link...');
    await page.evaluate(el => el.click(), nextLink);
    await page.waitForFunction(() => window.location.pathname === '/work/influcrush', { timeout: 10000 });
    console.log('Successfully navigated to:', await page.evaluate(() => window.location.pathname));
  }

  await browser.close();
  console.log('Next Case Study link test passed successfully!');
}

testNextStudyLink().catch(console.error);
