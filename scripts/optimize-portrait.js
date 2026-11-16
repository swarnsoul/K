const sharp = require('sharp');
const _pixelmatch = require('pixelmatch');
const pixelmatch = _pixelmatch.default || _pixelmatch;
const { PNG } = require('pngjs');

async function optimizePlacement() {
  const refBuf = await sharp('scripts/figma_refs/portrait_frame.png').ensureAlpha().raw().toBuffer();
  const rendImg = await sharp('scripts/diff_results/portrait_frame_rendered.png').ensureAlpha().raw().toBuffer();

  // Let's test shifts from dx = -20 to +20, dy = -20 to +20
  let bestDx = 0, bestDy = 0, minDiff = Infinity;

  for (let dy = -20; dy <= 20; dy++) {
    for (let dx = -20; dx <= 20; dx++) {
      let diff = 0;
      for (let y = 30; y < 510; y++) {
        const ry = y + dy;
        if (ry < 0 || ry >= 540) continue;
        for (let x = 30; x < 510; x++) {
          const rx = x + dx;
          if (rx < 0 || rx >= 540) continue;

          const refIdx = (y * 540 + x) * 4;
          const rendIdx = (ry * 540 + rx) * 4;

          const dr = Math.abs(refBuf[refIdx] - rendImg[rendIdx]);
          const dg = Math.abs(refBuf[refIdx+1] - rendImg[rendIdx+1]);
          const db = Math.abs(refBuf[refIdx+2] - rendImg[rendIdx+2]);
          if (dr > 25 || dg > 25 || db > 25) {
            diff++;
          }
        }
      }
      if (diff < minDiff) {
        minDiff = diff;
        bestDx = dx;
        bestDy = dy;
      }
    }
  }

  console.log(`Best shift: dx=${bestDx}, dy=${bestDy}, minDiff=${minDiff} (${(minDiff / (480*480)*100).toFixed(2)}%)`);
}
optimizePlacement();
