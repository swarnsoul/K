const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

const ARTIFACTS_DIR = 'C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98';

async function verifyCorrection() {
  console.log('--- Verifying Custom Cursor Correction ---');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  // 1. Navigate to Home
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // 2. Test Hotspot Offset on live page:
  // Move pointer to (300, 300)
  await page.mouse.move(300, 300);
  // Wait for lerp to settle
  await new Promise(r => setTimeout(r, 400));

  const screenshotBuf = await page.screenshot();
  const fullPng = PNG.sync.read(screenshotBuf);

  // Crop 60x60 area around (300, 300): x from 280 to 340, y from 280 to 340
  let tipX = 9999, tipY = 9999;
  for (let y = 280; y < 340; y++) {
    for (let x = 280; x < 340; x++) {
      const idx = (y * fullPng.width + x) * 4;
      const r = fullPng.data[idx];
      const g = fullPng.data[idx+1];
      const b = fullPng.data[idx+2];
      const a = fullPng.data[idx+3];
      // Arrow green #65FF6C or white border
      const isGreen = g > 200 && r > 50 && r < 150 && b > 50 && b < 150;
      const isWhite = r > 240 && g > 240 && b > 240;
      if (a > 200 && (isGreen || isWhite)) {
        if (y < tipY || (y === tipY && x < tipX)) {
          tipY = y;
          tipX = x;
        }
      }
    }
  }

  const dx = Math.abs(tipX - 300);
  const dy = Math.abs(tipY - 300);
  console.log(`Hotspot verification at (300, 300): Tip detected at (${tipX}, ${tipY}), offset: dx=${dx}px, dy=${dy}px`);

  // 3. Hover over Hero portrait to trigger "Let's talk design" label
  const portraitEl = await page.$('[data-cursor-key="hero-portrait"]');
  if (portraitEl) {
    const box = await portraitEl.boundingBox();
    // Hover on portrait
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await new Promise(r => setTimeout(r, 400));

    // Capture screenshot over portrait (photo area)
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'cursor_over_photo.png') });
    console.log('Saved cursor_over_photo.png');
  }

  // 4. Hover over white background area
  await page.mouse.move(600, 100);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'cursor_over_white.png') });
  console.log('Saved cursor_over_white.png');

  // 5. Test over dark area (e.g. Cirqell dark banner or footer)
  const darkTarget = await page.$('[data-cursor-key="project-cirqell"]');
  if (darkTarget) {
    await page.evaluate(el => el.scrollIntoView({ block: 'center' }), darkTarget);
    await new Promise(r => setTimeout(r, 200));
    const dbox = await darkTarget.boundingBox();
    if (dbox) {
      await page.mouse.move(dbox.x + 100, dbox.y + 100);
      await new Promise(r => setTimeout(r, 400));
      await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'cursor_over_dark.png') });
      console.log('Saved cursor_over_dark.png');
    }
  }

  // 6. Visual comparison against Figma design:
  // Create an isolated comparison page rendering our cursor component with "Let's talk design"
  // vs the user reference image
  const comparePage = await browser.newPage();
  await comparePage.setViewport({ width: 300, height: 160 });
  await comparePage.setContent(`
  <!DOCTYPE html>
  <html>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap" rel="stylesheet">
    <style>
      :root {
        --cursor-fill: #65ff6c;
        --cursor-outline: #ffffff;
        --cursor-outline-width: 4.539px;
        --cursor-radius: 9.078px;
        --cursor-shadow: 0px 3.631px 9.078px 0px rgba(0, 0, 0, 0.25);
        --cursor-label-text: #000000;
        --cursor-font-family: 'Architects Daughter', cursive, sans-serif;
        --cursor-font-size: 18.156px;
        --cursor-line-height: 25.114px;
      }
      body { margin: 0; background: #fff; overflow: hidden; }
      .cursor-unit {
        position: absolute;
        left: 20px;
        top: 20px;
        width: 260px;
        height: 120px;
      }
      .arrow {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 49.81px;
        height: 50.86px;
      }
      .arrow-inner {
        position: absolute;
        left: 0px;
        top: -1px;
        width: 49.81px;
        height: 50.86px;
        transform: scaleX(-1);
      }
      .arrow-inner img {
        position: absolute;
        left: -18.23%;
        top: -10.71%;
        width: calc(100% + 36.46%);
        height: calc(100% + 35.7%);
      }
      .badge {
        position: absolute;
        left: 28px;
        top: 32px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: var(--cursor-fill);
        border: var(--cursor-outline-width) solid var(--cursor-outline);
        border-radius: var(--cursor-radius);
        box-shadow: var(--cursor-shadow);
        padding: 9px 16px;
        min-height: 53px;
        box-sizing: border-box;
      }
      .badge span {
        font-family: var(--cursor-font-family);
        font-size: var(--cursor-font-size);
        line-height: var(--cursor-line-height);
        color: var(--cursor-label-text);
        white-space: nowrap;
      }
    </style>
  </head>
  <body>
    <div class="cursor-unit">
      <div class="arrow">
        <div class="arrow-inner">
          <img src="http://localhost:3000/assets/cursor-arrow-green.svg" />
        </div>
      </div>
      <div class="badge">
        <span>Let's talk design</span>
      </div>
    </div>
  </body>
  </html>
  `);

  await new Promise(r => setTimeout(r, 600));
  const renderedCursorBuf = await comparePage.screenshot();
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'rendered_cursor_green.png'), renderedCursorBuf);
  console.log('Saved rendered_cursor_green.png');

  await browser.close();

  console.log('--- Verification complete ---');
}

verifyCorrection().catch(console.error);
