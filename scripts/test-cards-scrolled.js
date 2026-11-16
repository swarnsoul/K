const puppeteer = require('puppeteer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const _pixelmatch = require('pixelmatch');
const pixelmatch = _pixelmatch.default || _pixelmatch;
const { PNG } = require('pngjs');

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
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });

  // Scroll down smoothly through all cards so all IntersectionObservers fire
  console.log('Scrolling through page to trigger card unfolds...');
  const cardList = [
    { id: '233:696', name: 'card_1', ref: 'scripts/figma_refs/card_1.png' },
    { id: '233:716', name: 'card_2', ref: 'scripts/figma_refs/card_2.png' },
    { id: '233:731', name: 'card_3', ref: 'scripts/figma_refs/card_3.png' },
    { id: '233:745', name: 'card_4', ref: 'scripts/figma_refs/card_4.png' },
    { id: '233:705', name: 'card_5', ref: 'scripts/figma_refs/card_5.png' },
    { id: '239:764', name: 'card_6', ref: 'scripts/figma_refs/card_6.png' },
    { id: '239:776', name: 'card_7', ref: 'scripts/figma_refs/card_7.png' },
    { id: '239:788', name: 'card_8', ref: 'scripts/figma_refs/card_8.png' },
    { id: '243:807', name: 'card_9', ref: 'scripts/figma_refs/card_9.png' },
  ];

  for (const item of cardList) {
    await page.evaluate((id) => {
      const el = document.querySelector(`[data-figma-id="${id}"]`);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    }, item.id);
    await new Promise(r => setTimeout(r, 200));
  }

  // Wait 1500ms for all animations to settle to 'done' state
  await new Promise(r => setTimeout(r, 1500));

  // Scroll back to top so clip coordinates match document bounding box
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 300));

  console.log('Testing card end states vs Figma refs...');
  const results = [];

  for (const item of cardList) {
    const el = await page.$(`[data-figma-id="${item.id}"]`);
    if (!el) {
      console.log(`${item.name} not found`);
      continue;
    }

    const box = await el.boundingBox();
    const refMeta = await sharp(item.ref).metadata();
    const targetW = refMeta.width;
    const targetH = refMeta.height;

    const clipX = Math.round(box.x + box.width / 2 - targetW / 2);
    const clipY = Math.round(box.y + box.height / 2 - targetH / 2);

    const shot = await page.screenshot({
      clip: { x: clipX, y: clipY, width: targetW, height: targetH }
    });

    const bRen = await sharp(shot).ensureAlpha().raw().toBuffer();
    const bRef = await sharp(item.ref).ensureAlpha().raw().toBuffer();

    const diffPng = new PNG({ width: targetW, height: targetH });
    const mism = pixelmatch(bRen, bRef, diffPng.data, targetW, targetH, { threshold: 0.1 });
    const totalPx = targetW * targetH;
    const simScore = 1 - (mism / totalPx);

    const metrics = computeMetrics(bRen, bRef, targetW, targetH);

    results.push({
      name: item.name,
      id: item.id,
      pixelmatchScore: simScore,
      ssim: metrics.ssim,
      meanDiffPct: metrics.meanDiffPct
    });

    console.log(
      `${item.name.padEnd(8)}: Pixelmatch Sim = ${(simScore * 100).toFixed(2)}%, SSIM = ${metrics.ssim.toFixed(4)}, MeanDiff = ${metrics.meanDiffPct.toFixed(2)}%`
    );
  }

  await browser.close();
}

run();
