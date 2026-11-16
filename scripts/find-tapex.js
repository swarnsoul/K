const sharp = require('sharp');

async function findTapeX() {
  const refBuf = await sharp('scripts/figma_refs/card_1.png').ensureAlpha().raw().toBuffer();
  const rendBuf = await sharp('scripts/diff_results/card_1_padded.png').ensureAlpha().raw().toBuffer();

  // In ref, tape is at y=20
  let refMinX = 398, refMaxX = 0;
  for (let x = 0; x < 398; x++) {
    const idx = (20 * 398 + x) * 4;
    if (refBuf[idx] > 240 && refBuf[idx+1] > 210 && refBuf[idx+1] < 235 && refBuf[idx+2] < 150) {
      if (x < refMinX) refMinX = x;
      if (x > refMaxX) refMaxX = x;
    }
  }

  // In rend, tape is at y=30
  let rendMinX = 398, rendMaxX = 0;
  for (let x = 0; x < 398; x++) {
    const idx = (30 * 398 + x) * 4;
    if (rendBuf[idx] > 240 && rendBuf[idx+1] > 210 && rendBuf[idx+1] < 235 && rendBuf[idx+2] < 150) {
      if (x < rendMinX) rendMinX = x;
      if (x > rendMaxX) rendMaxX = x;
    }
  }

  console.log(`Ref tape at y=20: x=[${refMinX}, ${refMaxX}], center=${(refMinX + refMaxX)/2}`);
  console.log(`Rend tape at y=30: x=[${rendMinX}, ${rendMaxX}], center=${(rendMinX + rendMaxX)/2}`);
}
findTapeX();
