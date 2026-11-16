const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const outDir = path.resolve('scripts/verify_results');

function computeSimilarity(buf1, buf2) {
  const p1 = PNG.sync.read(buf1);
  const p2 = PNG.sync.read(buf2);
  const w = Math.min(p1.width, p2.width);
  const h = Math.min(p1.height, p2.height);

  let match = 0;
  let total = w * h;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const x1 = Math.floor(x * (p1.width / w));
      const y1 = Math.floor(y * (p1.height / h));
      const x2 = Math.floor(x * (p2.width / w));
      const y2 = Math.floor(y * (p2.height / h));

      const idx1 = (y1 * p1.width + x1) * 4;
      const idx2 = (y2 * p2.width + x2) * 4;

      const dr = Math.abs(p1.data[idx1] - p2.data[idx2]);
      const dg = Math.abs(p1.data[idx1+1] - p2.data[idx2+1]);
      const db = Math.abs(p1.data[idx1+2] - p2.data[idx2+2]);
      const da = Math.abs(p1.data[idx1+3] - p2.data[idx2+3]);
      if (dr <= 30 && dg <= 30 && db <= 30 && da <= 30) {
        match++;
      }
    }
  }
  return match / total;
}

function computeBandsMismatch(renderedBuf, refBuf, numBands = 3) {
  const p1 = PNG.sync.read(renderedBuf);
  const p2 = PNG.sync.read(refBuf);
  const w = Math.min(p1.width, p2.width);
  const h = Math.min(p1.height, p2.height);
  const bandHeight = Math.floor(h / numBands);

  const bands = [];
  for (let b = 0; b < numBands; b++) {
    const yStart = b * bandHeight;
    const yEnd = b === numBands - 1 ? h : (b + 1) * bandHeight;
    let mismatch = 0;
    let total = w * (yEnd - yStart);

    for (let y = yStart; y < yEnd; y++) {
      for (let x = 0; x < w; x++) {
        const x1 = Math.floor(x * (p1.width / w));
        const y1 = Math.floor(y * (p1.height / h));
        const x2 = Math.floor(x * (p2.width / w));
        const y2 = Math.floor(y * (p2.height / h));

        const idx1 = (y1 * p1.width + x1) * 4;
        const idx2 = (y2 * p2.width + x2) * 4;

        const dr = Math.abs(p1.data[idx1] - p2.data[idx2]);
        const dg = Math.abs(p1.data[idx1+1] - p2.data[idx2+1]);
        const db = Math.abs(p1.data[idx1+2] - p2.data[idx2+2]);
        if (dr > 35 || dg > 35 || db > 35) {
          mismatch++;
        }
      }
    }
    const pct = ((mismatch / total) * 100).toFixed(2);
    bands.push({ band: b + 1, yStart, yEnd, mismatchPct: pct + '%' });
  }
  return bands;
}

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  console.log('--- 1. Testing Viewport 1440px ---');
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  // Find visible desktop desk scene
  const deskEl = await page.$('.lg\\:flex [data-figma-id="563:923"]');
  if (!deskEl) throw new Error('DeskScene element not found on About page!');

  await page.evaluate(el => el.scrollIntoView(), deskEl);
  await new Promise(r => setTimeout(r, 500));

  // A. Default state
  const defaultShot = await deskEl.screenshot();
  fs.writeFileSync(path.join(outDir, 'desk_1440_default.png'), defaultShot);
  console.log('Captured default state');

  // B. Click Lamp -> OFF state
  const lampBtn = await page.$('.lg\\:flex [data-figma-id="563:928"] button');
  await lampBtn.click();
  await new Promise(r => setTimeout(r, 450));
  const offShot = await deskEl.screenshot();
  fs.writeFileSync(path.join(outDir, 'desk_1440_lamp_off.png'), offShot);
  console.log('Captured lamp OFF state');

  const lampAriaOff = await page.evaluate(btn => btn.getAttribute('aria-pressed'), lampBtn);
  console.log('Lamp aria-pressed when OFF:', lampAriaOff);

  // Turn lamp back ON
  await lampBtn.click();
  await new Promise(r => setTimeout(r, 450));
  const lampAriaOn = await page.evaluate(btn => btn.getAttribute('aria-pressed'), lampBtn);
  console.log('Lamp aria-pressed when ON:', lampAriaOn);

  // C. Hover Diary
  const diaryEl = await page.$('.lg\\:flex [data-figma-id="563:934"] [role="region"]');
  await diaryEl.hover();
  await new Promise(r => setTimeout(r, 350));
  const hoverShot = await deskEl.screenshot();
  fs.writeFileSync(path.join(outDir, 'desk_1440_diary_hover.png'), hoverShot);
  console.log('Captured diary hover state');

  await page.mouse.move(0, 0);
  await new Promise(r => setTimeout(r, 300));

  // --- 2. Testing Viewport 1920px ---
  console.log('\n--- 2. Testing Viewport 1920px ---');
  await page.setViewport({ width: 1920, height: 1000 });
  await new Promise(r => setTimeout(r, 600));
  await page.evaluate(el => el.scrollIntoView(), deskEl);
  await new Promise(r => setTimeout(r, 400));

  const deskRect1920 = await page.evaluate(el => {
    const r = el.getBoundingClientRect();
    return { x: 0, y: Math.max(0, Math.floor(r.top)), width: 1920, height: Math.min(1000, Math.ceil(r.height)) };
  }, deskEl);

  const shot1920 = await page.screenshot({ clip: deskRect1920 });
  fs.writeFileSync(path.join(outDir, 'desk_1920_viewport.png'), shot1920);

  // Check left and right wood pixels at 1920
  const p1920 = PNG.sync.read(shot1920);
  let woodL1920 = 0, woodR1920 = 0;
  for (let y = 0; y < p1920.height; y++) {
    const idxL = (y * 1920 + 0) * 4;
    const idxR = (y * 1920 + 1919) * 4;
    if (p1920.data[idxL] > 50 && p1920.data[idxL+3] > 200) woodL1920++;
    if (p1920.data[idxR] > 50 && p1920.data[idxR+3] > 200) woodR1920++;
  }
  console.log(`1920px wood pixels touching left edge: ${woodL1920}, right edge: ${woodR1920}`);
  const sw1920 = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log(`1920px scrollWidth: ${sw1920} (<= 1920: ${sw1920 <= 1920})`);

  // --- 3. Testing Viewport 2560px ---
  console.log('\n--- 3. Testing Viewport 2560px ---');
  await page.setViewport({ width: 2560, height: 1000 });
  await new Promise(r => setTimeout(r, 500));
  const sw2560 = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log(`2560px scrollWidth: ${sw2560} (<= 2560: ${sw2560 <= 2560})`);

  // --- 4. Testing Viewport 1280px ---
  console.log('\n--- 4. Testing Viewport 1280px ---');
  await page.setViewport({ width: 1280, height: 1000 });
  await new Promise(r => setTimeout(r, 500));
  const sw1280 = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log(`1280px scrollWidth: ${sw1280} (<= 1280: ${sw1280 <= 1280})`);

  // --- 5. Testing Viewports 1024, 768, 390, 360 ---
  console.log('\n--- 5. Testing Mobile Viewports ---');
  const smallWidths = [1024, 768, 390, 360];
  const respResults = [];
  for (const w of smallWidths) {
    await page.setViewport({ width: w, height: 800 });
    await new Promise(r => setTimeout(r, 400));
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);

    // Find the currently visible lamp button and diary region
    const metrics = await page.evaluate(() => {
      const isVisible = el => {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
      };
      const lamp = Array.from(document.querySelectorAll('[data-figma-id="563:928"] button')).find(isVisible);
      const diary = Array.from(document.querySelectorAll('[data-figma-id="563:934"] [role="region"]')).find(isVisible);
      return {
        lamp: lamp ? { w: lamp.getBoundingClientRect().width, h: lamp.getBoundingClientRect().height } : null,
        diary: diary ? { w: diary.getBoundingClientRect().width, h: diary.getBoundingClientRect().height } : null
      };
    });

    const passed = sw <= w && metrics.lamp && metrics.lamp.w >= 44 && metrics.lamp.h >= 44 && metrics.diary && metrics.diary.w >= 44 && metrics.diary.h >= 44;
    console.log(`Viewport ${w}px: scrollWidth=${sw}, lamp=${metrics.lamp?.w.toFixed(0)}x${metrics.lamp?.h.toFixed(0)}, diary=${metrics.diary?.w.toFixed(0)}x${metrics.diary?.h.toFixed(0)}, OK=${passed}`);
    respResults.push({ width: w, scrollWidth: sw, metrics, passed });
  }

  // --- 6. Reference Similarities & Band Mismatches ---
  console.log('\n--- 6. Computing Metrics vs Figma References ---');
  await page.setViewport({ width: 1440, height: 1000 });
  await new Promise(r => setTimeout(r, 500));
  await page.evaluate(el => el.scrollIntoView(), deskEl);
  await new Promise(r => setTimeout(r, 400));

  const figmaRefBuf = fs.readFileSync('scripts/fresh_refs/frame182_desk_scene.png');
  const defaultBands = computeBandsMismatch(defaultShot, figmaRefBuf, 3);
  console.log('Default State Band Mismatch:', defaultBands);

  // Lamp ON vs Figma lamp ON
  const lampOnEl = await page.$('.lg\\:flex [data-figma-id="563:928"]');
  const lampOnShot = await lampOnEl.screenshot();
  const figmaLampOnBuf = fs.readFileSync('scripts/fresh_refs/lamp_on.png');
  const lampOnSim = computeSimilarity(lampOnShot, figmaLampOnBuf);
  console.log(`Lamp ON similarity: ${(lampOnSim * 100).toFixed(2)}%`);

  // Lamp OFF vs Figma lamp OFF
  await lampBtn.click();
  await new Promise(r => setTimeout(r, 450));
  const lampOffShot = await lampOnEl.screenshot();
  const figmaLampOffBuf = fs.readFileSync('scripts/fresh_refs/lamp_off.png');
  const lampOffSim = computeSimilarity(lampOffShot, figmaLampOffBuf);
  console.log(`Lamp OFF similarity: ${(lampOffSim * 100).toFixed(2)}%`);

  // Plant behind lamp check in OFF state:
  const plantEl = await page.$('.lg\\:flex [data-figma-id="563:926"]');
  const plantVisibleInOff = await page.evaluate(el => {
    const s = window.getComputedStyle(el);
    return s.opacity === '1' && s.display !== 'none';
  }, plantEl);
  console.log('Plant behind lamp visible in OFF state:', plantVisibleInOff);

  // Diary Hover vs Figma Diary Hover
  await diaryEl.hover();
  await new Promise(r => setTimeout(r, 350));
  const diaryShot = await diaryEl.screenshot();
  const figmaDiaryHoverBuf = fs.readFileSync('scripts/fresh_refs/diary_v2_hover.png');
  const diaryHoverSim = computeSimilarity(diaryShot, figmaDiaryHoverBuf);
  console.log(`Diary Hover similarity: ${(diaryHoverSim * 100).toFixed(2)}%`);

  await browser.close();

  const report = {
    defaultBands,
    lampOnSim: (lampOnSim * 100).toFixed(2) + '%',
    lampOffSim: (lampOffSim * 100).toFixed(2) + '%',
    diaryHoverSim: (diaryHoverSim * 100).toFixed(2) + '%',
    plantVisibleInOff,
    woodL1920,
    woodR1920,
    sw1280,
    sw1920,
    sw2560,
    respResults
  };

  fs.writeFileSync(path.join(outDir, 'final_report.json'), JSON.stringify(report, null, 2));
  console.log('\nFinal Report saved to scripts/verify_results/final_report.json');
}

run().catch(e => { console.error('Error:', e); process.exit(1); });
