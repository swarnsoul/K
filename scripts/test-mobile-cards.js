const puppeteer = require('puppeteer');

async function testMobile() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });

  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });

  // Check horizontal overflow
  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log('Mobile horizontal overflow exists:', overflow);

  // Scroll down to trigger card unfolds
  const cards = await page.$$('.w-full.max-w-\\[460px\\]');
  console.log(`Found ${cards.length} cards on mobile`);

  for (let i = 0; i < cards.length; i++) {
    await cards[i].scrollIntoView();
    await new Promise(r => setTimeout(r, 100));
  }

  // Wait 1200ms for 20% faster timeline (1040ms) to complete
  await new Promise(r => setTimeout(r, 1200));

  const states = await page.evaluate(() => {
    const unfolds = document.querySelectorAll('[data-unfold-state]');
    return Array.from(unfolds).map(el => el.getAttribute('data-unfold-state'));
  });

  console.log('Mobile cards unfold states:', states);

  const overflowAfter = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log('Mobile horizontal overflow after unfold:', overflowAfter);

  await browser.close();
}

testMobile();
