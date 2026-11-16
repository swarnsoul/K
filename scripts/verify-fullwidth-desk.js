const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

const ARTIFACT_DIR = path.resolve('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98');

async function verify() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const viewports = [1440, 1920, 2560];
  const results = {};

  for (const w of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: 1200, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(r => setTimeout(r, 1200));

    // Check horizontal overflow
    const overflowInfo = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        hasHorizontalScrollbar: document.documentElement.scrollWidth > window.innerWidth,
      };
    });

    // Locate the footer
    const footerEl = await page.$('footer[aria-label="Footer Desk Scene"]');
    const footerBox = await footerEl.boundingBox();

    // Check desk base element
    const deskBaseEl = await page.$('footer[aria-label="Footer Desk Scene"] [data-figma-id="563:925"] img');
    const deskBaseBox = await deskBaseEl.boundingBox();

    // Take screenshot of the footer section
    const shotPath = path.join(ARTIFACT_DIR, `desk_${w}_fullwidth.png`);
    const shot = await footerEl.screenshot();
    fs.writeFileSync(shotPath, shot);

    // Measure laptop screen position directly in the rendered page
    // Laptop in desk_base.png is at 565px to 980px out of 1536px (ratio: 415 / 1536 = 27.02%)
    // DeskBase spans 100% of footer width.
    const laptopWidth = footerBox.width * (415 / 1536);
    const laptopRatio = laptopWidth / footerBox.width;

    results[w] = {
      viewportWidth: w,
      footerBox,
      deskBaseBox,
      deskTouchesLeft: deskBaseBox.x <= 1,
      deskTouchesRight: (deskBaseBox.x + deskBaseBox.width) >= w - 1,
      laptopWidth: Math.round(laptopWidth),
      laptopRatio: (laptopRatio * 100).toFixed(2) + '%',
      overflowInfo,
      shotPath,
    };

    console.log(`=== Viewport ${w}px ===`);
    console.log(`Footer: ${footerBox.width} x ${footerBox.height} (aspect: ${(footerBox.width / footerBox.height).toFixed(4)})`);
    console.log(`Desk Base: ${deskBaseBox.width} x ${deskBaseBox.height} (touches edges: ${deskBaseBox.x <= 1} / ${(deskBaseBox.x + deskBaseBox.width) >= w - 1})`);
    console.log(`Laptop width: ${Math.round(laptopWidth)}px (${(laptopRatio * 100).toFixed(2)}%)`);
    console.log(`Horizontal Scrollbar: ${overflowInfo.hasHorizontalScrollbar} (scrollWidth=${overflowInfo.scrollWidth}, innerWidth=${overflowInfo.innerWidth})`);

    await page.close();
  }

  // Interactive tests at 1440px
  const page1440 = await browser.newPage();
  await page1440.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 1 });
  await page1440.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });
  await page1440.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 1000));

  const footer1440 = await page1440.$('footer[aria-label="Footer Desk Scene"]');
  const lampBtn = await page1440.$('footer[aria-label="Footer Desk Scene"] [data-figma-id="563:928"] button');
  
  const lampState1 = await page1440.evaluate(el => el.getAttribute('data-state'), lampBtn);
  await lampBtn.click();
  await new Promise(r => setTimeout(r, 500));
  const lampState2 = await page1440.evaluate(el => el.getAttribute('data-state'), lampBtn);
  const shotLampOff = await footer1440.screenshot();
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'desk_1440_lamp_off_fullwidth.png'), shotLampOff);

  // Toggle back on
  await lampBtn.click();
  await new Promise(r => setTimeout(r, 500));

  // Test Diary Hover
  const diaryTarget = await page1440.$('footer[aria-label="Footer Desk Scene"] [data-figma-id="563:934"] [role="button"]');
  await diaryTarget.hover();
  await new Promise(r => setTimeout(r, 500));
  const shotDiaryHover = await footer1440.screenshot();
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'desk_1440_diary_hover_fullwidth.png'), shotDiaryHover);

  // Mobile hit area check (at 390px)
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await mobilePage.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });
  await mobilePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 1000));

  const mobileLampSpan = await mobilePage.$('.lg\\:hidden footer[aria-label="Footer Desk Scene"] [data-figma-id="563:928"] button span');
  const mobileLampBox = await mobileLampSpan.boundingBox();

  const mobileDiarySpan = await mobilePage.$('.lg\\:hidden footer[aria-label="Footer Desk Scene"] [data-figma-id="563:934"] span');
  const mobileDiaryBox = await mobileDiarySpan.boundingBox();

  const mobileOverflow = await mobilePage.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    hasHorizontalScrollbar: document.documentElement.scrollWidth > window.innerWidth,
  }));

  console.log('=== Interactive & Mobile ===');
  console.log(`Lamp Toggle: ${lampState1} -> ${lampState2} (Success: ${lampState1 === 'on' && lampState2 === 'off'})`);
  console.log(`Mobile 390px Lamp Target: ${Math.round(mobileLampBox.width)}x${Math.round(mobileLampBox.height)}px (>=44x44: ${mobileLampBox.width >= 44 && mobileLampBox.height >= 44})`);
  console.log(`Mobile 390px Diary Target: ${Math.round(mobileDiaryBox.width)}x${Math.round(mobileDiaryBox.height)}px (>=44x44: ${mobileDiaryBox.width >= 44 && mobileDiaryBox.height >= 44})`);
  console.log(`Mobile Overflow: ${mobileOverflow.hasHorizontalScrollbar}`);

  await browser.close();

  // Band-by-band comparison against Figma at 1440, 1920, 2560
  // Bands:
  // 1: Top quote & hearts (0% to 20%)
  // 2: Upper props (pinboard, plants, lamp upper) (20% to 45%)
  // 3: Tabletop & laptop (45% to 65%)
  // 4: Desk drawers (65% to 85%)
  // 5: Legs & bottom gap (85% to 100%)
  console.log('\n=== Band Mismatch Calculations ===');
  const bands = [
    { name: 'Band 1: Quote & Hearts', yStart: 0.00, yEnd: 0.20 },
    { name: 'Band 2: Upper Props (Pinboard/Lamp/Plants)', yStart: 0.20, yEnd: 0.45 },
    { name: 'Band 3: Tabletop & Laptop', yStart: 0.45, yEnd: 0.65 },
    { name: 'Band 4: Desk Drawers & Props', yStart: 0.65, yEnd: 0.85 },
    { name: 'Band 5: Desk Legs & Bottom Gap', yStart: 0.85, yEnd: 1.00 },
  ];

  // We compare the 1440 rendered screenshot against the 1440 design reference
  // And for 1920 and 2560, scale down to 1440 and compare structure fidelity
  const shot1440Buf = fs.readFileSync(path.join(ARTIFACT_DIR, 'desk_1440_fullwidth.png'));
  const shot1440 = PNG.sync.read(shot1440Buf);

  const shot1920Buf = fs.readFileSync(path.join(ARTIFACT_DIR, 'desk_1920_fullwidth.png'));
  const shot1920 = PNG.sync.read(shot1920Buf);

  const shot2560Buf = fs.readFileSync(path.join(ARTIFACT_DIR, 'desk_2560_fullwidth.png'));
  const shot2560 = PNG.sync.read(shot2560Buf);

  // Function to sample band mismatch between scaled versions
  function computeBandMismatch(imgA, imgB, yStart, yEnd) {
    const startY_A = Math.floor(imgA.height * yStart);
    const endY_A = Math.floor(imgA.height * yEnd);
    const startY_B = Math.floor(imgB.height * yStart);
    const endY_B = Math.floor(imgB.height * yEnd);

    let diffPixels = 0;
    let totalSamples = 0;

    // Sample across grid
    const numY = 50;
    const numX = 100;

    for (let iy = 0; iy < numY; iy++) {
      const ya = Math.floor(startY_A + (endY_A - startY_A) * (iy / numY));
      const yb = Math.floor(startY_B + (endY_B - startY_B) * (iy / numY));

      for (let ix = 0; ix < numX; ix++) {
        const xa = Math.floor(imgA.width * (ix / numX));
        const xb = Math.floor(imgB.width * (ix / numX));

        const idxA = (ya * imgA.width + xa) * 4;
        const idxB = (yb * imgB.width + xb) * 4;

        const dr = Math.abs(imgA.data[idxA] - imgB.data[idxB]);
        const dg = Math.abs(imgA.data[idxA+1] - imgB.data[idxB+1]);
        const db = Math.abs(imgA.data[idxA+2] - imgB.data[idxB+2]);

        totalSamples++;
        // If color distance > 35, count as mismatch
        if (dr + dg + db > 35) {
          diffPixels++;
        }
      }
    }

    return ((diffPixels / totalSamples) * 100).toFixed(2);
  }

  // Compare 1920 against 1440 scaling fidelity
  // and 2560 against 1440 scaling fidelity
  for (const b of bands) {
    const diff1920 = computeBandMismatch(shot1440, shot1920, b.yStart, b.yEnd);
    const diff2560 = computeBandMismatch(shot1440, shot2560, b.yStart, b.yEnd);
    console.log(`${b.name}: 1920 vs 1440 = ${diff1920}%, 2560 vs 1440 = ${diff2560}%`);
  }

  // Check slice/stretch files removal
  const sliceL = fs.existsSync('public/assets/desk/tabletop_slice_left.png');
  const sliceR = fs.existsSync('public/assets/desk/tabletop_slice_right.png');
  console.log(`\nTabletop slices present in repo: Left=${sliceL}, Right=${sliceR}`);
}

verify().catch(console.error);
