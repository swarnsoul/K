const sharp = require('sharp');
const _pixelmatch = require('pixelmatch');
const pixelmatch = _pixelmatch.default || _pixelmatch;
const { PNG } = require('pngjs');

async function checkDiff() {
  const refBuf = await sharp('scripts/figma_refs/portrait_frame.png').ensureAlpha().raw().toBuffer();
  const rendBuf = await sharp('scripts/diff_results/portrait_frame_rendered.png').resize(540, 540).ensureAlpha().raw().toBuffer();
  
  // Find min and max x, y of differing pixels
  let minX = 9999, maxX = -1, minY = 9999, maxY = -1;
  let diffs = 0;
  for (let y = 0; y < 540; y++) {
    for (let x = 0; x < 540; x++) {
      const idx = (y * 540 + x) * 4;
      const dr = Math.abs(refBuf[idx] - rendBuf[idx]);
      const dg = Math.abs(refBuf[idx+1] - rendBuf[idx+1]);
      const db = Math.abs(refBuf[idx+2] - rendBuf[idx+2]);
      if (dr > 25 || dg > 25 || db > 25) {
        diffs++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  console.log(`Diffs: ${diffs}, bounding box of diffs: x: [${minX}, ${maxX}], y: [${minY}, ${maxY}]`);
}
checkDiff();
