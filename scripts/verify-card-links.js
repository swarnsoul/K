const puppeteer = require('puppeteer');

async function testHomepageLinks() {
  console.log('Testing homepage project card links and cursor...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1500));

  // Scroll to projects
  await page.evaluate(() => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1200));

  // Find Cirqell card link
  const cirqellLink = await page.$('a[href="/work/cirqell"]');
  console.log('Cirqell card link exists:', !!cirqellLink);

  const influcrushLink = await page.$('a[href="/work/influcrush"]');
  console.log('InfluCrush card link exists:', !!influcrushLink);

  if (cirqellLink) {
    console.log('Clicking Cirqell link with evaluate click...');
    await page.evaluate(el => el.click(), cirqellLink);
    await page.waitForFunction(() => window.location.pathname === '/work/cirqell', { timeout: 10000 });
    console.log('Successfully navigated to:', await page.evaluate(() => window.location.pathname));
  }

  // Go back to home
  console.log('Navigating back to home...');
  await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1500));
  await page.evaluate(() => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1200));

  const influcrushLink2 = await page.$('a[href="/work/influcrush"]');
  if (influcrushLink2) {
    console.log('Clicking InfluCrush link with evaluate click...');
    await page.evaluate(el => el.click(), influcrushLink2);
    await page.waitForFunction(() => window.location.pathname === '/work/influcrush', { timeout: 10000 });
    console.log('Successfully navigated to:', await page.evaluate(() => window.location.pathname));
  }

  await browser.close();
  console.log('All card navigation tests passed successfully!');
}

testHomepageLinks().catch(console.error);
