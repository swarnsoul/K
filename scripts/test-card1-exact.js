const sharp = require('sharp');
const _pixelmatch = require('pixelmatch');
const pixelmatch = _pixelmatch.default || _pixelmatch;
const { PNG } = require('pngjs');
const fs = require('fs');

async function testCard1Exact() {
  const refPath = 'scripts/figma_refs/card_1.png';
  const pagePath = 'scripts/diff_results/page_1440_full.png';

  const refMeta = await sharp(refPath).metadata();
  const refBuf = await sharp(refPath).ensureAlpha().raw().toBuffer();

  const rw = refMeta.width;
  const rh = refMeta.height;

  // Extract a 500x350 patch around Card 1 from page
  const patchX = 750, patchY = 550, patchW = 500, patchH = 350;
  const patchBuf = await sharp(pagePath)
    .extract({ left: patchX, top: patchY, width: patchW, height: patchH })
    .ensureAlpha()
    .raw()
    .toBuffer();

  let bestX = 0, bestY = 0, minDiff = Infinity;

  // Search inside patchBuf
  for (let dy = 0; dy <= patchH - rh; dy++) {
    for (let dx = 0; dx <= patchW - rw; dx++) {
      let count = 0;
      for (let y = 0; y < rh; y += 2) {
        for (let x = 0; x < rw; x += 2) {
          const pIdx = ((dy + y) * patchW + (dx + x)) * 4;
          const rIdx = (y * rw + x) * 4;

          const dr = Math.abs(patchBuf[pIdx] - refBuf[rIdx]);
          const dg = Math.abs(patchBuf[pIdx+1] - refBuf[rIdx+1]);
          const db = Math.abs(patchBuf[pIdx+2] - refBuf[rIdx+2]);
          if (dr > 25 || dg > 25 || db > 25) {
            count++;
          }
        }
      }
      if (count < minDiff) {
        minDiff = count;
        bestX = patchX + dx;
        bestY = patchY + dy;
      }
    }
  }

  // Now calculate full pixelmatch at bestX, bestY
  const pageCrop = await sharp(pagePath)
    .extract({ left: bestX, top: bestY, width: rw, height: rh })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const diffPng = new PNG({ width: rw, height: rh });
  const finalDiffCount = pixelmatch(refBuf, pageCrop, diffPng.data, rw, rh, { threshold: 0.15 });
  const totalPixels = rw * rh;
  const pct = ((finalDiffCount / totalPixels) * 100).toFixed(2);

  console.log(`Best Card 1 match at page x=${bestX}, y=${bestY}: ${finalDiffCount}/${totalPixels} px (${pct}%)`);
  fs.writeFileSync('scripts/diff_results/card_1_best_crop.png', await sharp(pageCrop, { raw: { width: rw, height: rh, channels: 4 } }).png().toBuffer());
  fs.writeFileSync('scripts/diff_results/card_1_best_diff.png', PNG.sync.write(diffPng));
}

testCard1Exact();
