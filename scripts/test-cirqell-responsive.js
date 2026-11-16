const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = "C:\\Users\\acer\\.gemini\\antigravity\\brain\\4e5d3daf-196b-4036-a731-fc1f17b54f98";

const VIEWPORTS = [
  { name: 'desktop_1440', width: 1440, height: 900 },
  { name: 'laptop_1024', width: 1024, height: 768 },
  { name: 'tablet_768', width: 768, height: 1024 },
  { name: 'mobile_390', width: 390, height: 844 },
];

async function testCirqell() {
  console.log(`\n================ Testing Responsive for Cirqell ================`);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const page = await browser.newPage();
  const results = [];

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto(`http://localhost:3001/work/cirqell`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('[data-section="02_hero_intro"]', { timeout: 20000 });
    await new Promise(r => setTimeout(r, 1200));

    const metrics = await page.evaluate(() => {
      const scrollW = document.documentElement.scrollWidth;
      const innerW = window.innerWidth;
      const overflow = scrollW > innerW;
      return { scrollW, innerW, overflow };
    });

    const shotPath = path.join(ARTIFACT_DIR, `cirqell_${vp.name}_full.png`);
    await page.screenshot({ path: shotPath, fullPage: true });

    results.push({
      viewport: vp.name,
      width: vp.width,
      scrollWidth: metrics.scrollW,
      overflow: metrics.overflow ? 'FAIL' : 'PASS (0px)',
      screenshot: shotPath
    });

    console.log(`[${vp.name}] Width: ${vp.width}px | ScrollWidth: ${metrics.scrollW}px | Overflow: ${metrics.overflow ? 'FAIL' : 'PASS (0px)'}`);
  }

  await browser.close();
  console.log('\nResponsive Test Summary:', JSON.stringify(results, null, 2));
}

testCirqell().catch(console.error);
