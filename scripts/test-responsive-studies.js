const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = "C:\\Users\\acer\\.gemini\\antigravity\\brain\\4e5d3daf-196b-4036-a731-fc1f17b54f98";

const VIEWPORTS = [
  { name: 'mobile_390', width: 390, height: 844 },
  { name: 'tablet_768', width: 768, height: 1024 },
  { name: 'desktop_1440', width: 1440, height: 900 },
];

async function testPage(project) {
  console.log(`\n================ Testing Responsive: ${project} ================`);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const page = await browser.newPage();

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto(`http://localhost:3001/work/${project}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('[data-section="02_hero_intro"]', { timeout: 20000 });
    await new Promise(r => setTimeout(r, 1200));

    // Check for horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);

    console.log(`[${vp.name}] Width: ${vp.width}px | ScrollWidth: ${scrollWidth}px | Horizontal Overflow: ${overflow ? 'FAIL' : 'PASS (0px)'}`);

    // Take full page screenshot on mobile and desktop
    const shotPath = path.join(ARTIFACT_DIR, `${project}_${vp.name}_full.png`);
    await page.screenshot({ path: shotPath, fullPage: true });
    console.log(`Saved screenshot: ${project}_${vp.name}_full.png`);
  }

  await browser.close();
}

async function main() {
  await testPage('influcrush');
  await testPage('cirqell');
  console.log('\nAll responsive tests completed!');
}

main().catch(console.error);
