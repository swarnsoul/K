const puppeteer = require('puppeteer');
const { PNG } = require('pngjs');

async function testOffsets() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 200, height: 200 });

  for (let top = -11.45; top <= -11.55; top += 0.02) {
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
          left: -3px;
          top: ${top.toFixed(3)}px;
          width: 49.81px;
          height: 50.86px;
          transform: scaleX(-1) rotate(18deg);
          transform-origin: center center;
        }
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
    await new Promise(r => setTimeout(r, 100));

    const screenshotBuf = await page.screenshot();
    const png = PNG.sync.read(screenshotBuf);

    let tipY = 9999, tipX = 9999;
    for (let y = 30; y < 70; y++) {
      for (let x = 30; x < 70; x++) {
        if (x === 50 && y === 50) continue;
        const idx = (y * png.width + x) * 4;
        const r = png.data[idx];
        const g = png.data[idx+1];
        const b = png.data[idx+2];
        const a = png.data[idx+3];
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
    console.log(`top: ${top.toFixed(3)} -> tip: (${tipX}, ${tipY}), diff: (${tipX - 50}, ${tipY - 50})`);
  }
  await browser.close();
}

testOffsets().catch(console.error);
