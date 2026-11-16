const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

// We want to render the arrow in Puppeteer, find the exact purple pixel that is the tip of the arrow,
// and adjust its CSS offsets so that the tip is at exactly (0, 0).

async function findTip() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 200, height: 200 });

  // Test placing arrow with offset so tip lands exactly at (50, 50)
  // Let's test left: -3px, top: -11px first
  const testOffsets = [
    { left: -3, top: -11.4 },
    { left: -3, top: -11.5 },
    { left: -3, top: -11.6 },
  ];

  for (const off of testOffsets) {
    const testHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; background: #000; }
        .container {
          position: absolute;
          left: 50px;
          top: 50px;
          width: 0;
          height: 0;
        }
        .arrow {
          position: absolute;
          left: ${off.left}px;
          top: ${off.top}px;
          width: 49.81px;
          height: 50.86px;
          transform: scaleX(-1) rotate(18deg);
          transform-origin: center center;
        }
        /* red 1px marker at exactly (50, 50) */
        .marker {
          position: absolute;
          left: 50px;
          top: 50px;
          width: 1px;
          height: 1px;
          background: red;
          z-index: 999;
        }
      </style>
    </head>
    <body>
      <div class="marker"></div>
      <div class="container">
        <div class="arrow" id="arrow">
          <img src="http://localhost:3000/assets/vector1.svg" style="width: 100%; height: 100%; display: block;" />
        </div>
      </div>
    </body>
    </html>
    `;

    await page.setContent(testHtml);
    await new Promise(r => setTimeout(r, 200));

    const screenshotBuf = await page.screenshot();
    const png = PNG.sync.read(screenshotBuf);

    // Find the topmost-leftmost pixel of the arrow tip (excluding red marker)
    let tipY = 9999, tipX = 9999;
    for (let y = 30; y < 70; y++) {
      for (let x = 30; x < 70; x++) {
        if (x === 50 && y === 50) continue; // skip marker
        const idx = (y * png.width + x) * 4;
        const r = png.data[idx];
        const g = png.data[idx+1];
        const b = png.data[idx+2];
        const a = png.data[idx+3];
        // White stroke or purple
        const isWhite = r > 240 && g > 240 && b > 240;
        const isPurple = r > 100 && b > 200 && g < 150;
        if (a > 200 && (isWhite || isPurple)) {
          if (y < tipY || (y === tipY && x < tipX)) {
            tipY = y;
            tipX = x;
          }
        }
      }
    }

    console.log(`Offset (${off.left}, ${off.top}): Apex pixel is at (${tipX}, ${tipY}). Target is (50, 50). Diff: dx=${tipX - 50}, dy=${tipY - 50}`);
  }

  await browser.close();
}

findTip().catch(console.error);
