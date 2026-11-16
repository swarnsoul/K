const puppeteer = require('puppeteer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outFramesDir = path.resolve('scripts/animation_frames');
if (!fs.existsSync(outFramesDir)) {
  fs.mkdirSync(outFramesDir, { recursive: true });
}

function computeMetrics(buf1, buf2, w, h) {
  let diffSum = 0;
  const count = w * h;
  for (let i = 0; i < count * 4; i += 4) {
    diffSum += (Math.abs(buf1[i] - buf2[i]) + Math.abs(buf1[i+1] - buf2[i+1]) + Math.abs(buf1[i+2] - buf2[i+2])) / 3;
  }
  const meanDiff = diffSum / count;
  const meanDiffPct = (meanDiff / 255) * 100;

  let mean1 = 0, mean2 = 0;
  const l1 = new Float32Array(count);
  const l2 = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const idx = i * 4;
    l1[i] = 0.299 * buf1[idx] + 0.587 * buf1[idx+1] + 0.114 * buf1[idx+2];
    l2[i] = 0.299 * buf2[idx] + 0.587 * buf2[idx+1] + 0.114 * buf2[idx+2];
    mean1 += l1[i];
    mean2 += l2[i];
  }
  mean1 /= count;
  mean2 /= count;

  let var1 = 0, var2 = 0, covar = 0;
  for (let i = 0; i < count; i++) {
    const d1 = l1[i] - mean1;
    const d2 = l2[i] - mean2;
    var1 += d1 * d1;
    var2 += d2 * d2;
    covar += d1 * d2;
  }
  var1 /= count;
  var2 /= count;
  covar /= count;

  const c1 = (0.01 * 255) ** 2;
  const c2 = (0.03 * 255) ** 2;
  const ssim = ((2 * mean1 * mean2 + c1) * (2 * covar + c2)) / ((mean1*mean1 + mean2*mean2 + c1) * (var1 + var2 + c2));

  return { meanDiffPct, ssim };
}

async function run() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const results = {};

  console.log('--- 1. VERIFYING DESKTOP CARD SIDES & HORIZONTAL CENTERS ---');
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });

  const cardFigmaIds = [
    { id: '233:696', name: 'Card 1' },
    { id: '233:716', name: 'Card 2' },
    { id: '233:731', name: 'Card 3' },
    { id: '233:745', name: 'Card 4' },
    { id: '233:705', name: 'Card 5' },
    { id: '239:764', name: 'Card 6' },
    { id: '239:776', name: 'Card 7' },
    { id: '239:788', name: 'Card 8' },
    { id: '243:807', name: 'Card 9' }
  ];

  const desktopSides = await page.evaluate((ids) => {
    return ids.map(({ id, name }) => {
      const el = document.querySelector(`[data-figma-id="${id}"]`);
      if (!el) return { name, id, found: false };
      const side = el.getAttribute('data-side');
      const unfoldEl = el.querySelector('[data-side]');
      const unfoldSide = unfoldEl ? unfoldEl.getAttribute('data-side') : null;
      const rect = el.getBoundingClientRect();
      const styleLeft = parseFloat(el.style.left || '0');
      const styleWidth = parseFloat(el.style.width || '0');
      const centerX = styleLeft + styleWidth / 2;
      return {
        name,
        id,
        found: true,
        side,
        unfoldSide,
        centerX: centerX.toFixed(1),
        expectedSide: centerX > 720 ? 'right' : 'left'
      };
    });
  }, cardFigmaIds);

  console.table(desktopSides);
  results.desktopSides = desktopSides;

  console.log('\n--- 2. VERIFYING LENIS & NO SCROLL PARALLAX / DRIFT ---');
  const lenisCheck = await page.evaluate(async () => {
    const hasLenis = typeof window.__lenis !== 'undefined';
    
    // Check initial document positions of static elements
    const collageTitle = document.querySelector('h2');
    const photo1 = document.querySelector('[data-figma-id="223:146"]');
    const introArrow = document.querySelector('[data-figma-id="243:821"]');
    
    const getDocPos = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: r.top + window.scrollY, left: r.left + window.scrollX };
    };

    const initialPos = {
      photo1: getDocPos(photo1),
      introArrow: getDocPos(introArrow)
    };

    // Scroll down 600px
    window.scrollTo(0, 600);
    await new Promise(r => setTimeout(r, 100));

    const scrolledPos = {
      photo1: getDocPos(photo1),
      introArrow: getDocPos(introArrow)
    };

    window.scrollTo(0, 0);

    return {
      hasLenis,
      photo1Drift: initialPos.photo1 && scrolledPos.photo1 ? Math.abs(initialPos.photo1.top - scrolledPos.photo1.top) : null,
      introArrowDrift: initialPos.introArrow && scrolledPos.introArrow ? Math.abs(initialPos.introArrow.top - scrolledPos.introArrow.top) : null
    };
  });

  console.log('Lenis Active:', lenisCheck.hasLenis);
  console.log('Photo1 Doc Position Drift on Scroll (px):', lenisCheck.photo1Drift);
  console.log('Intro Arrow Doc Position Drift on Scroll (px):', lenisCheck.introArrowDrift);
  results.lenisCheck = lenisCheck;

  console.log('\n--- 3. VERIFYING PREFERS-REDUCED-MOTION ---');
  const reducedMotionPage = await browser.newPage();
  await reducedMotionPage.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await reducedMotionPage.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });

  const rmCheck = await reducedMotionPage.evaluate(() => {
    const hasLenis = typeof window.__lenis !== 'undefined';
    const cards = Array.from(document.querySelectorAll('[data-unfold-state]'));
    const allDone = cards.every(c => c.getAttribute('data-unfold-state') === 'done');
    const states = cards.map(c => c.getAttribute('data-unfold-state'));
    return { hasLenis, allDone, totalCards: cards.length, states };
  });

  console.log('prefers-reduced-motion: Lenis bypassed:', !rmCheck.hasLenis);
  console.log('prefers-reduced-motion: All cards immediately "done":', rmCheck.allDone, `(${rmCheck.totalCards} cards)`);
  results.reducedMotion = rmCheck;
  await reducedMotionPage.close();

  console.log('\n--- 4. RESPONSIVE HORIZONTAL OVERFLOW CHECK (1440, 1280, 1024, 768, 390) ---');
  const viewports = [1440, 1280, 1024, 768, 390];
  const overflowResults = [];
  for (const vp of viewports) {
    const vpPage = await browser.newPage();
    await vpPage.setViewport({ width: vp, height: 900 });
    await vpPage.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });
    const overflow = await vpPage.evaluate((vpWidth) => {
      const scrollW = document.documentElement.scrollWidth;
      const innerW = window.innerWidth;
      return {
        viewport: vpWidth,
        scrollWidth: scrollW,
        innerWidth: innerW,
        hasHorizontalScroll: scrollW > innerW
      };
    }, vp);
    overflowResults.push(overflow);
    await vpPage.close();
  }
  console.table(overflowResults);
  results.overflow = overflowResults;

  console.log('\n--- 5. CAPTURING ANIMATION CHECKPOINT FRAMES (CARD 1 RIGHT vs CARD 2 LEFT) ---');
  // Checkpoints: 0, 200, 450, 700, 950, 1300 ms
  const checkpoints = [0, 200, 450, 700, 950, 1300];

  for (const t of checkpoints) {
    // Fresh page for Card 1 (Right note, opens left)
    const p1 = await browser.newPage();
    await p1.setViewport({ width: 1440, height: 900 });
    await p1.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });
    await p1.evaluate(async (timeTarget) => {
      const card = document.querySelector('[data-figma-id="233:696"]');
      if (card) {
        card.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
      await new Promise(r => setTimeout(r, timeTarget));
    }, t);
    const card1El = await p1.$('[data-figma-id="233:696"]');
    if (card1El) {
      await card1El.screenshot({ path: path.join(outFramesDir, `card1_right_${t}ms.png`) });
    }
    await p1.close();

    // Fresh page for Card 2 (Left note, opens right)
    const p2 = await browser.newPage();
    await p2.setViewport({ width: 1440, height: 900 });
    await p2.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });
    await p2.evaluate(async (timeTarget) => {
      const card = document.querySelector('[data-figma-id="233:716"]');
      if (card) {
        card.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
      await new Promise(r => setTimeout(r, timeTarget));
    }, t);
    const card2El = await p2.$('[data-figma-id="233:716"]');
    if (card2El) {
      await card2El.screenshot({ path: path.join(outFramesDir, `card2_left_${t}ms.png`) });
    }
    await p2.close();
    console.log(`Captured checkpoint ${t}ms for Card 1 (Right) and Card 2 (Left)`);
  }

  console.log('\n--- 6. VERIFYING TEXT ORIENTATION ON UNSETTLED AND SETTLED CARDS ---');
  // Confirm that text elements never have scaleX(-1) or mirrored styling
  const textCheck = await page.evaluate(() => {
    const cards = document.querySelectorAll('[data-side]');
    let hasMirroredText = false;
    const report = [];
    cards.forEach((c) => {
      const side = c.getAttribute('data-side');
      const texts = c.querySelectorAll('p, span, [data-unfold-text]');
      texts.forEach((t) => {
        const style = window.getComputedStyle(t);
        const transform = style.transform;
        if (transform.includes('-1,') || style.direction === 'rtl') {
          hasMirroredText = true;
          report.push({ side, text: t.textContent?.slice(0, 20), transform });
        }
      });
    });
    return { hasMirroredText, report };
  });

  console.log('Any Mirrored/Reversed Text Found:', textCheck.hasMirroredText);
  results.textCheck = textCheck;

  console.log('\n--- 7. SSIM METRICS FOR ALL FINAL CARDS AGAINST FIGMA RENDERS ---');
  // Scroll through all cards so all IntersectionObservers fire and settle
  const cardList = [
    { id: '233:696', name: 'Card 1', ref: 'scripts/figma_refs/card_1.png' },
    { id: '233:716', name: 'Card 2', ref: 'scripts/figma_refs/card_2.png' },
    { id: '233:731', name: 'Card 3', ref: 'scripts/figma_refs/card_3.png' },
    { id: '233:745', name: 'Card 4', ref: 'scripts/figma_refs/card_4.png' },
    { id: '233:705', name: 'Card 5', ref: 'scripts/figma_refs/card_5.png' },
    { id: '239:764', name: 'Card 6', ref: 'scripts/figma_refs/card_6.png' },
    { id: '239:776', name: 'Card 7', ref: 'scripts/figma_refs/card_7.png' },
    { id: '239:788', name: 'Card 8', ref: 'scripts/figma_refs/card_8.png' },
    { id: '243:807', name: 'Card 9', ref: 'scripts/figma_refs/card_9.png' },
  ];

  for (const item of cardList) {
    await page.evaluate((id) => {
      const el = document.querySelector(`[data-figma-id="${id}"]`);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    }, item.id);
    await new Promise(r => setTimeout(r, 100));
  }

  // Wait 1400ms for all cards to complete animation to pure 'done' Figma state
  await new Promise(r => setTimeout(r, 1400));
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 400));

  const cardMetricsReport = [];
  for (const item of cardList) {
    const el = await page.$(`[data-figma-id="${item.id}"]`);
    const shot = await el.screenshot();
    const meta = await sharp(shot).metadata();
    const refMeta = await sharp(item.ref).metadata();
    const w = Math.min(meta.width, refMeta.width);
    const h = Math.min(meta.height, refMeta.height);

    const shotResized = await sharp(shot).resize(w, h).raw().toBuffer();
    const refResized = await sharp(item.ref).resize(w, h).raw().toBuffer();
    const metrics = computeMetrics(shotResized, refResized, w, h);
    cardMetricsReport.push({
      name: item.name,
      id: item.id,
      side: desktopSides.find(s => s.id === item.id)?.side,
      meanDiffPct: metrics.meanDiffPct.toFixed(2) + '%',
      ssim: metrics.ssim.toFixed(4)
    });
  }

  console.table(cardMetricsReport);
  results.cardMetrics = cardMetricsReport;

  fs.writeFileSync('scripts/mirror_and_scroll_results.json', JSON.stringify(results, null, 2));
  console.log('\nVerification complete! Results written to scripts/mirror_and_scroll_results.json');

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
