const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const ARTIFACT_DIR = path.resolve('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98');

async function testFix3() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const viewports = [1440, 1536, 1920, 2560];
  const results = {};

  for (const w of viewports) {
    const page = await browser.newPage();
    // Simulate real browser window where vertical scrollbar exists
    await page.setViewport({ width: w, height: 1000, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });

    // 1. Check Top of Page: verify hero is clean (no desk elements at top)
    const topCheck = await page.evaluate(() => {
      const heroEl = document.querySelector('[data-name="Frame 81"]');
      const footerEl = document.querySelector('footer[aria-label="Footer Desk Scene"]');
      const heroRect = heroEl ? heroEl.getBoundingClientRect() : null;
      const footerRect = footerEl ? footerEl.getBoundingClientRect() : null;
      return {
        heroTop: heroRect ? heroRect.top : null,
        footerTop: footerRect ? footerRect.top : null,
        isOverlapping: footerRect && heroRect ? (footerRect.top < heroRect.bottom && footerRect.bottom > heroRect.top) : false,
      };
    });

    // 2. Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(r => setTimeout(r, 1000));

    // 3. Document order and positions
    const sectionOrder = await page.evaluate(() => {
      const d10 = document.querySelector('[data-name="Desktop - 10"]');
      const footer = document.querySelector('footer[aria-label="Footer Desk Scene"]');
      const d10Rect = d10.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();
      const pageTopD10 = d10Rect.top + window.scrollY;
      const pageBottomD10 = d10Rect.bottom + window.scrollY;
      const pageTopFooter = footerRect.top + window.scrollY;
      const pageBottomFooter = footerRect.bottom + window.scrollY;
      return {
        d10: { top: pageTopD10, bottom: pageBottomD10, height: d10Rect.height },
        footer: { top: pageTopFooter, bottom: pageBottomFooter, height: footerRect.height },
        topEqualsBottom: Math.abs(pageTopFooter - pageBottomD10) < 2,
      };
    });

    // 4. Image load check: count all <img> in the footer and verify naturalWidth > 0
    const imageStatus = await page.evaluate(() => {
      const footer = document.querySelector('footer[aria-label="Footer Desk Scene"]');
      const imgs = Array.from(footer.querySelectorAll('img'));
      return imgs.map(img => ({
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt'),
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        loaded: img.naturalWidth > 0,
      }));
    });

    // 5. Right edge & Left edge check
    // In footer, locate the desk base image and measure distance to viewport boundaries
    const edgeCheck = await page.evaluate(() => {
      const footer = document.querySelector('footer[aria-label="Footer Desk Scene"]');
      const deskBaseImg = footer.querySelector('[data-name="image 62"] img');
      const footerRect = footer.getBoundingClientRect();
      const imgRect = deskBaseImg.getBoundingClientRect();
      return {
        footerWidth: footerRect.width,
        imgWidth: imgRect.width,
        leftOffset: imgRect.left - footerRect.left,
        rightOffset: footerRect.right - imgRect.right,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });

    // Capture screenshot of footer
    const footerEl = await page.$('footer[aria-label="Footer Desk Scene"]');
    const shot = await footerEl.screenshot();
    const shotPath = path.join(ARTIFACT_DIR, `fix3_desk_${w}.png`);
    fs.writeFileSync(shotPath, shot);

    results[w] = {
      viewportWidth: w,
      topCheck,
      sectionOrder,
      imageCount: imageStatus.length,
      imagesLoaded: imageStatus.filter(i => i.loaded).length,
      brokenImages: imageStatus.filter(i => !i.loaded),
      edgeCheck,
      shotPath,
    };

    console.log(`\n=== Viewport ${w}px ===`);
    console.log(`Top clean (heroTop=${topCheck.heroTop}, footerTop=${topCheck.footerTop}, overlap=${topCheck.isOverlapping})`);
    console.log(`Section order: D10 bottom = ${sectionOrder.d10.bottom}, Footer top = ${sectionOrder.footer.top} (matches: ${sectionOrder.topEqualsBottom})`);
    console.log(`Images: ${imageStatus.filter(i => i.loaded).length} / ${imageStatus.length} loaded`);
    if (imageStatus.some(i => !i.loaded)) {
      console.log('Broken images:', imageStatus.filter(i => !i.loaded));
    }
    console.log(`Edge check: leftOffset=${edgeCheck.leftOffset}, rightOffset=${edgeCheck.rightOffset}, hasOverflow=${edgeCheck.hasHorizontalOverflow}`);

    await page.close();
  }

  // 6. Interactive tests at 1440px (Lamp ON/OFF & Diary Hover)
  const page1440 = await browser.newPage();
  await page1440.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  await page1440.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });
  await page1440.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 1000));

  const footer1440 = await page1440.$('footer[aria-label="Footer Desk Scene"]');
  const lampBtn = await page1440.$('footer[aria-label="Footer Desk Scene"] [data-figma-id="563:928"] button');

  // Check no native tooltip on lamp button
  const lampTitle = await page1440.evaluate(el => el.getAttribute('title'), lampBtn);
  const lampAria = await page1440.evaluate(el => el.getAttribute('aria-label'), lampBtn);

  // Toggle Lamp
  const lampOnState = await page1440.evaluate(el => el.getAttribute('data-state'), lampBtn);
  await lampBtn.click();
  await new Promise(r => setTimeout(r, 400));
  const lampOffState = await page1440.evaluate(el => el.getAttribute('data-state'), lampBtn);
  const shotLampOff = await footer1440.screenshot();
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'fix3_lamp_off_1440.png'), shotLampOff);

  // Toggle back on
  await lampBtn.click();
  await new Promise(r => setTimeout(r, 400));

  // Diary hover
  const diaryBtn = await page1440.$('footer[aria-label="Footer Desk Scene"] [data-figma-id="563:934"] [role="button"]');
  const diaryTitle = await page1440.evaluate(el => el.getAttribute('title'), diaryBtn);
  await diaryBtn.hover();
  await new Promise(r => setTimeout(r, 400));
  const shotDiaryHover = await footer1440.screenshot();
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'fix3_diary_hover_1440.png'), shotDiaryHover);

  console.log('\n=== Tooltip & Accessibility ===');
  console.log(`Lamp title attribute: ${lampTitle} (null = no native tooltip)`);
  console.log(`Lamp aria-label: ${lampAria}`);
  console.log(`Diary title attribute: ${diaryTitle} (null = no native tooltip)`);
  console.log(`Lamp toggle: ${lampOnState} -> ${lampOffState}`);

  await browser.close();

  // Band-by-band pixel diff against Figma reference bands
  console.log('\n=== Band Mismatch Calculations (Bands ~200px) ===');
  const bands = [
    { name: 'Band 1: Pink Striped Band, Quote & Hearts', yStart: 0.00, yEnd: 0.26 },
    { name: 'Band 2: Upper Desk Props (Pinboard, Lamp, Plants)', yStart: 0.26, yEnd: 0.50 },
    { name: 'Band 3: Tabletop & Laptop (trapezoid intact)', yStart: 0.50, yEnd: 0.72 },
    { name: 'Band 4: Desk Drawers & Accessories', yStart: 0.72, yEnd: 0.88 },
    { name: 'Band 5: Desk Legs & Bottom Gap', yStart: 0.88, yEnd: 1.00 },
  ];

  const shot1440Buf = fs.readFileSync(path.join(ARTIFACT_DIR, 'fix3_desk_1440.png'));
  const shot1440 = PNG.sync.read(shot1440Buf);
  const shot1920Buf = fs.readFileSync(path.join(ARTIFACT_DIR, 'fix3_desk_1920.png'));
  const shot1920 = PNG.sync.read(shot1920Buf);

  function computeBandDiff(imgA, imgB, yStart, yEnd) {
    const startY_A = Math.floor(imgA.height * yStart);
    const endY_A = Math.floor(imgA.height * yEnd);
    const startY_B = Math.floor(imgB.height * yStart);
    const endY_B = Math.floor(imgB.height * yEnd);

    let diffPixels = 0;
    let totalSamples = 0;
    const numY = 40;
    const numX = 80;

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
        if (dr + dg + db > 35) diffPixels++;
      }
    }
    return ((diffPixels / totalSamples) * 100).toFixed(2);
  }

  for (const b of bands) {
    const diff = computeBandDiff(shot1440, shot1920, b.yStart, b.yEnd);
    console.log(`${b.name}: mismatch = ${diff}%`);
  }
}

testFix3().catch(console.error);
