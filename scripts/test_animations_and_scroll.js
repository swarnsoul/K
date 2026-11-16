const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3001/work/cirqell', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Check initial progress
  const initialProgress = await page.evaluate(() => {
    const bar = document.querySelector('[aria-hidden="true"] > div');
    return bar ? bar.style.transform : 'none';
  });
  console.log('Initial progress bar transform:', initialProgress);

  // Scroll down to 30% of page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.3));
  await new Promise(r => setTimeout(r, 600));

  const progress30 = await page.evaluate(() => {
    const bar = document.querySelector('[aria-hidden="true"] > div');
    return bar ? bar.style.transform : 'none';
  });
  console.log('30% scroll progress bar transform:', progress30);

  // Scroll down to 70% of page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.7));
  await new Promise(r => setTimeout(r, 600));

  const progress70 = await page.evaluate(() => {
    const bar = document.querySelector('[aria-hidden="true"] > div');
    return bar ? bar.style.transform : 'none';
  });
  console.log('70% scroll progress bar transform:', progress70);

  // Check how many data-reveal elements have .is-revealed
  const revealStats = await page.evaluate(() => {
    const all = document.querySelectorAll('[data-reveal]');
    const revealed = document.querySelectorAll('[data-reveal].is-revealed');
    return { total: all.length, revealed: revealed.length };
  });
  console.log('Reveal stats at 70% scroll:', revealStats);

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 800));

  const finalStats = await page.evaluate(() => {
    const all = document.querySelectorAll('[data-reveal]');
    const revealed = document.querySelectorAll('[data-reveal].is-revealed');
    return { total: all.length, revealed: revealed.length };
  });
  console.log('Final reveal stats at 100% scroll:', finalStats);

  await page.screenshot({ path: 'scripts/scroll_bottom_test.png' });
  await browser.close();
  console.log('Animation and scroll test complete!');
})();
