const sharp = require('sharp');
const _pixelmatch = require('pixelmatch');
const pixelmatch = _pixelmatch.default || _pixelmatch;
const { PNG } = require('pngjs');

async function testAboutMe() {
  const refBuf = await sharp('scripts/figma_refs/about_me.png').ensureAlpha().raw().toBuffer();
  let best = Infinity, bestDx = 0, bestDy = 0;
  for (let dy = -10; dy <= 10; dy++) {
    for (let dx = -10; dx <= 10; dx++) {
      const pageCrop = await sharp('scripts/diff_results/page_1440_full.png')
        .extract({ left: 630 + dx, top: 164 + dy, width: 180, height: 31 })
        .ensureAlpha()
        .raw()
        .toBuffer();
      const diffPng = new PNG({ width: 180, height: 31 });
      const count = pixelmatch(refBuf, pageCrop, diffPng.data, 180, 31, { threshold: 0.15 });
      if (count < best) {
        best = count;
        bestDx = dx;
        bestDy = dy;
      }
    }
  }
  console.log(`Best About Me match at dx=${bestDx}, dy=${bestDy}: ${best}/5580 (${(best / 5580 * 100).toFixed(2)}%)`);
}
testAboutMe();
