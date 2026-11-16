const puppeteer = require('puppeteer');
const { PNG } = require('pngjs');

async function testGreenArrow() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 300, height: 300 });

  // Test different offsets for the inner container
  // Arrow width is 49.81px, height is 50.86px, or SVG width 67.97px, height 69.02px
  // In Figma:
  // node 584:920 has width 49.81px, height 50.86px, and inner img has inset-[-10.71%_-18.23%_-24.99%_-18.23%]
  // Let's test placing the arrow with scaleX(-1) and finding where the tip pixel is!
  
  for (let top = -15; top <= -5; top += 1) {
    for (let left = -15; left <= -5; left += 1) {
      // We will do a coarse search first
    }
  }

  // Let's first test with left: 0, top: 0, width: 49.81px, height: 50.86px
  const testHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { margin: 0; background: #000; }
      .container {
        position: absolute;
        left: 100px;
        top: 100px;
        width: 49.81px;
        height: 50.86px;
      }
      .inner {
        position: absolute;
        left: 0px;
        top: -1px;
        width: 49.81px;
        height: 50.86px;
        transform: scaleX(-1);
        transform-origin: center center;
      }
      .inner img {
        position: absolute;
        inset: -10.71% -18.23% -24.99% -18.23%;
        width: calc(100% + 36.46%);
        height: calc(100% + 35.7%);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="inner" id="inner">
        <img src="http://localhost:3000/assets/cursor-arrow-green.svg" />
      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(testHtml);
  await new Promise(r => setTimeout(r, 200));

  const screenshotBuf = await page.screenshot();
  const png = PNG.sync.read(screenshotBuf);

  let tipY = 9999, tipX = 9999;
  for (let y = 50; y < 200; y++) {
    for (let x = 50; x < 200; x++) {
      const idx = (y * png.width + x) * 4;
      const r = png.data[idx];
      const g = png.data[idx+1];
      const b = png.data[idx+2];
      const a = png.data[idx+3];
      // Looking for green #65FF6C or white border
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

  console.log(`With left:0, top:0 -> Tip is at (${tipX}, ${tipY}). Container was at (100, 100).`);
  console.log(`Offset needed to place tip at (100, 100): left = ${100 - tipX}, top = ${100 - tipY}`);

  await browser.close();
}

testGreenArrow().catch(console.error);
