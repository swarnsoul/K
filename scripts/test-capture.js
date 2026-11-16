const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });

  // 1. Intro arrow
  const arrowEl = await page.$('[data-figma-id="243:821"]');
  if (arrowEl) {
    const arrowBuf = await arrowEl.screenshot();
    fs.writeFileSync('scripts/diff_results/test_arrow_rendered.png', arrowBuf);
    console.log('Saved test_arrow_rendered.png');
  } else {
    console.log('Arrow element not found');
  }

  // 2. Portrait default
  const portraitEl = await page.$('[data-figma-id="230:87"]');
  if (portraitEl) {
    const portDefBuf = await portraitEl.screenshot();
    fs.writeFileSync('scripts/diff_results/test_portrait_default_rendered.png', portDefBuf);
    console.log('Saved test_portrait_default_rendered.png');

    // Hover
    await portraitEl.hover();
    await new Promise(r => setTimeout(r, 400));
    const portHovBuf = await portraitEl.screenshot();
    fs.writeFileSync('scripts/diff_results/test_portrait_hover_rendered.png', portHovBuf);
    console.log('Saved test_portrait_hover_rendered.png');
  } else {
    console.log('Portrait element not found');
  }

  await browser.close();
}
run();
