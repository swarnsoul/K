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
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));

  // 1. Intro Arrow (node 243:821)
  const arrowEl = await page.$('[data-figma-id="243:821"]');
  const arrowShot = await arrowEl.screenshot();
  const arrowMeta = await sharp(arrowShot).metadata();
  const arrowRefMeta = await sharp('scripts/diff_results/figma_intro_arrow_render.png').metadata();
  const aw = Math.min(arrowMeta.width, arrowRefMeta.width);
  const ah = Math.min(arrowMeta.height, arrowRefMeta.height);
  const aBuf1 = await sharp(arrowShot).resize(aw, ah, { fit: 'fill' }).ensureAlpha().raw().toBuffer();
  const aBuf2 = await sharp('scripts/diff_results/figma_intro_arrow_render.png').resize(aw, ah, { fit: 'fill' }).ensureAlpha().raw().toBuffer();
  const arrowMetrics = computeMetrics(aBuf1, aBuf2, aw, ah);
  console.log('Intro Arrow (243:821):', { ssim: arrowMetrics.ssim, meanDiffPct: arrowMetrics.meanDiffPct });

  // 2. Portrait Default (node 230:80 / 230:83)
  // Match Figma's canvas background behind the rounded corners
  await page.evaluate(() => {
    const el = document.querySelector('[data-figma-id="230:87"]');
    if (el) {
      el.style.transform = 'none';
      el.style.left = '0px';
      el.style.top = '0px';
      el.parentElement.style.backgroundColor = '#1c1c1c';
    }
  });

  const portEl = await page.$('[data-figma-id="230:87"]');
  const defShot = await portEl.screenshot();
  const defBuf1 = await sharp(defShot).resize(337, 337, { fit: 'fill' }).ensureAlpha().raw().toBuffer();
  const defBuf2 = await sharp('scripts/diff_results/variant_default_ref.png').resize(337, 337, { fit: 'fill' }).ensureAlpha().raw().toBuffer();
  const defMetrics = computeMetrics(defBuf1, defBuf2, 337, 337);
  console.log('Portrait Default (230:83):', { ssim: defMetrics.ssim, meanDiffPct: defMetrics.meanDiffPct });

  // 3. Portrait Hover (node 230:82 / 230:84)
  await page.evaluate(() => {
    const el = document.querySelector('[data-figma-id="230:87"]');
    const defaultImg = el.querySelector('[data-name="image 27"]');
    const hoverImg = el.querySelector('[data-name="image 28"]');
    if (defaultImg) defaultImg.style.opacity = '0';
    if (hoverImg) hoverImg.style.opacity = '1';
  });
  await new Promise(r => setTimeout(r, 300));
  const hovShot = await portEl.screenshot();
  const hovBuf1 = await sharp(hovShot).resize(337, 337, { fit: 'fill' }).ensureAlpha().raw().toBuffer();
  const hovBuf2 = await sharp('scripts/diff_results/variant_hover_ref.png').resize(337, 337, { fit: 'fill' }).ensureAlpha().raw().toBuffer();
  const hovMetrics = computeMetrics(hovBuf1, hovBuf2, 337, 337);
  console.log('Portrait Hover (230:84):', { ssim: hovMetrics.ssim, meanDiffPct: hovMetrics.meanDiffPct });

  await browser.close();
}

run();
