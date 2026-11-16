const puppeteer = require('puppeteer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

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
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  const items = [
    // 1. Travel 7
    { id: '223:146', ref: 'travel_1.png', name: 'image 32 (Travel 1)' },
    { id: '255:880', ref: 'travel_2.png', name: 'image 46 (Travel 2)' },
    { id: '255:871', ref: 'travel_3.png', name: 'image 43 (Travel 3)' },
    { id: '251:868', ref: 'travel_4.png', name: 'image 42 (Travel 4)' },
    { id: '255:883', ref: 'travel_5.png', name: 'image 47 (Travel 5)' },
    { id: '255:874', ref: 'travel_6.png', name: 'image 44 (Travel 6)' },
    { id: '255:877', ref: 'travel_7.png', name: 'image 45 (Travel 7)' },
    // 2. Art 4
    { id: '259:69',  ref: 'art_1.png',    name: 'image 48 (Art 1)' },
    { id: '259:70',  ref: 'art_2.png',    name: 'image 49 (Art 2)' },
    { id: '259:71',  ref: 'art_3.png',    name: 'image 50 (Art 3)' },
    { id: '259:72',  ref: 'art_4.png',    name: 'image 51 (Art 4)' },
    // 3. Cards 9
    { id: '233:702', ref: 'card_1_img.png', name: 'image 34 (Card 1)' },
    { id: '233:729', ref: 'card_2_img.png', name: 'image 35 (Card 2)' },
    { id: '239:755', ref: 'card_3_img.png', name: 'image 37 (Card 3)' },
    { id: '233:750', ref: 'card_4_img.png', name: 'image 36 (Card 4)' },
    { id: '233:714', ref: 'card_5_img.png', name: 'image 33 (Card 5)' },
    { id: '239:774', ref: 'card_6_img.png', name: 'image 38 (Card 6)' },
    { id: '239:786', ref: 'card_7_img.png', name: 'image 39 (Card 7)' },
    { id: '265:122', ref: 'card_8_img.png', name: 'image 40 (Card 8)' },
    { id: '243:818', ref: 'card_9_img.png', name: 'image 41 (Card 9)' },
    // 4. Portrait
    { id: '230:80',  ref: 'portrait_inner.png', name: 'image 27 (Portrait)' }
  ];

  const results = [];

  for (const item of items) {
    const el = await page.$(`[data-figma-id="${item.id}"]`);
    if (!el) {
      console.log(item.name, 'NOT FOUND on page');
      continue;
    }
    const shot = await el.screenshot();
    const rendMeta = await sharp(shot).metadata();
    const refMeta = await sharp(path.join('scripts/node_renders', item.ref)).metadata();

    const rw = rendMeta.width;
    const rh = rendMeta.height;
    const fw = refMeta.width;
    const fh = refMeta.height;

    const cw = Math.min(rw - 12, fw - 12);
    const ch = Math.min(rh - 12, fh - 12);

    const rendCropped = await sharp(shot)
      .extract({ left: Math.round((rw - cw)/2), top: Math.round((rh - ch)/2), width: cw, height: ch })
      .ensureAlpha()
      .raw()
      .toBuffer();

    const refCropped = await sharp(path.join('scripts/node_renders', item.ref))
      .extract({ left: Math.round((fw - cw)/2), top: Math.round((fh - ch)/2), width: cw, height: ch })
      .ensureAlpha()
      .raw()
      .toBuffer();

    const m = computeMetrics(rendCropped, refCropped, cw, ch);
    results.push({ name: item.name, id: item.id, ssim: m.ssim, meanDiffPct: m.meanDiffPct });
    console.log(`${item.name.padEnd(25)}: SSIM = ${m.ssim.toFixed(4)}, MeanDiff = ${m.meanDiffPct.toFixed(2)}%`);
  }

  await browser.close();
}
run();
