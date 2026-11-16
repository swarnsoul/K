const sharp = require('sharp');
const _pixelmatch = require('pixelmatch');
const pixelmatch = _pixelmatch.default || _pixelmatch;
const { PNG } = require('pngjs');

async function testArrow() {
  const refBuf = await sharp('scripts/figma_refs/intro_arrow.png').ensureAlpha().raw().toBuffer();
  // Arrow: 129x142, page pos: left: 1018, top: 485
  let best = Infinity, bestDx = 0, bestDy = 0;
  for (let dy = -5; dy <= 5; dy++) {
    for (let dx = -5; dx <= 5; dx++) {
      const pageCrop = await sharp('scripts/diff_results/page_1440_full.png')
        .extract({ left: 1018 + dx, top: 485 + dy, width: 129, height: 142 })
        .ensureAlpha()
        .raw()
        .toBuffer();
      const diffPng = new PNG({ width: 129, height: 142 });
      const count = pixelmatch(refBuf, pageCrop, diffPng.data, 129, 142, { threshold: 0.15 });
      if (count < best) {
        best = count;
        bestDx = dx;
        bestDy = dy;
      }
    }
  }
  console.log(`Best Intro Arrow match at dx=${bestDx}, dy=${bestDy}: ${best}/18318 (${(best / 18318 * 100).toFixed(2)}%)`);
}
testArrow();
