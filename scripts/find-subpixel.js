const sharp = require('sharp');

async function findSubpixelShift() {
  const refBuf = await sharp('scripts/figma_refs/card_1.png').ensureAlpha().raw().toBuffer();
  const rendBuf = await sharp('scripts/diff_results/card_1_padded.png').ensureAlpha().raw().toBuffer();

  let bestDx = 0, bestDy = 0, minDiff = Infinity;
  for (let dy = -30; dy <= 30; dy++) {
    for (let dx = -30; dx <= 30; dx++) {
      let count = 0;
      for (let y = 30; y < 220; y++) {
        const ry = y + dy;
        if (ry < 0 || ry >= 250) continue;
        for (let x = 30; x < 368; x++) {
          const rx = x + dx;
          if (rx < 0 || rx >= 398) continue;
          const rIdx = (y * 398 + x) * 4;
          const pIdx = (ry * 398 + rx) * 4;
          const dr = Math.abs(refBuf[rIdx] - rendBuf[pIdx]);
          const dg = Math.abs(refBuf[rIdx+1] - rendBuf[pIdx+1]);
          const db = Math.abs(refBuf[rIdx+2] - rendBuf[pIdx+2]);
          if (dr > 25 || dg > 25 || db > 25) count++;
        }
      }
      if (count < minDiff) {
        minDiff = count;
        bestDx = dx;
        bestDy = dy;
      }
    }
  }

  console.log(`Best shift: dx=${bestDx}, dy=${bestDy}, minDiff=${minDiff} (${(minDiff / (190*338)*100).toFixed(2)}%)`);
}
findSubpixelShift();
