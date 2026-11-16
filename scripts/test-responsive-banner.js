const puppeteer = require('puppeteer');
const sharp = require('sharp');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const viewports = [
    { width: 1440, height: 900, label: '1440' },
    { width: 1280, height: 800, label: '1280' },
    { width: 1024, height: 768, label: '1024' },
    { width: 768, height: 1024, label: '768' },
    { width: 390, height: 844, label: '390' }
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@800&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Inter', sans-serif; background: #fff; overflow-x: hidden; }
          .section {
            width: 100%;
            max-width: 1440px;
            margin: 0 auto;
            padding: 24px ${vp.width >= 1280 ? '61px' : vp.width >= 768 ? '32px' : '16px'};
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .box {
            position: relative;
            width: 100%;
            max-width: 1318px;
            height: ${vp.width >= 1280 ? '542px' : vp.width >= 768 ? '460px' : '340px'};
            background: #f1e5f3;
            border-radius: ${vp.width >= 768 ? '30px' : '20px'};
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .title-wrap {
            position: absolute;
            top: ${vp.width >= 1280 ? '140.5px' : '35%'};
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            user-select: none;
          }
          .title {
            font-family: 'Inter', sans-serif;
            font-weight: 800;
            font-size: clamp(48px, 13.5vw, 192.8px);
            line-height: 1;
            letter-spacing: -0.01em;
            color: #720287;
            opacity: 0.2;
            text-transform: uppercase;
            white-space: nowrap;
            text-align: center;
          }
          .phone {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: ${vp.width >= 1280 ? '301px' : vp.width >= 768 ? '260px' : '200px'};
            height: ${vp.width >= 1280 ? '520px' : vp.width >= 768 ? '440px' : '320px'};
            object-fit: cover;
            object-position: top;
          }
        </style>
      </head>
      <body>
        <div class="section">
          <div class="box">
            <div class="title-wrap">
              <span class="title">INFLUCRUSH</span>
            </div>
            <img class="phone" src="http://localhost:3001/assets/case-studies/influcrush/fc432d4b02ed226592080afb117f55eb4f04f720.png" />
          </div>
        </div>
      </body>
      </html>
    `);

    await page.evaluateHandle('document.fonts.ready');

    const metrics = await page.evaluate(() => {
      const box = document.querySelector('.box').getBoundingClientRect();
      const text = document.querySelector('.title').getBoundingClientRect();
      const titleWrap = document.querySelector('.title-wrap').getBoundingClientRect();
      return {
        boxWidth: box.width,
        boxLeft: box.left,
        boxRight: box.right,
        textWidth: text.width,
        textLeft: text.left,
        textRight: text.right,
        overflowLeft: box.left - text.left,
        overflowRight: text.right - box.right,
        isInside: text.left >= box.left && text.right <= box.right,
        fontSize: window.getComputedStyle(document.querySelector('.title')).fontSize
      };
    });

    console.log(`Viewport ${vp.label}:`, metrics);

    const screenshotPath = path.join(__dirname, `../public/preview-${vp.label}.png`);
    await page.screenshot({ path: screenshotPath });
  }

  await browser.close();
})();
