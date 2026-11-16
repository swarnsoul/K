const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const viewports = [
  { name: 'phone_320', w: 320, h: 568 },
  { name: 'phone_360', w: 360, h: 640 },
  { name: 'phone_390', w: 390, h: 844 },
  { name: 'phone_430', w: 430, h: 932 },
  { name: 'tablet_768', w: 768, h: 1024 },
  { name: 'tablet_820', w: 820, h: 1180 },
  { name: 'desktop_1024', w: 1024, h: 768 },
  { name: 'desktop_1280', w: 1280, h: 800 },
  { name: 'desktop_1440', w: 1440, h: 900 },
];

const outDir = path.resolve('scripts/responsive_tests');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function testResponsive() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  for (const vp of viewports) {
    await page.setViewport({ width: vp.w, height: vp.h });
    await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500));

    // Check for any horizontal overflow / scrollWidth > clientWidth
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const hasHScroll = scrollWidth > clientWidth;

    const screenshotPath = path.join(outDir, `${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });

    console.log(`Viewport ${vp.name.padEnd(14)} (${vp.w}x${vp.h}): scrollW=${scrollWidth}, clientW=${clientWidth}, hScroll=${hasHScroll ? 'YES (OVERFLOW!)' : 'NO (CLEAN)'}`);
  }

  await browser.close();
  console.log('All responsive tests completed successfully!');
}

testResponsive();
