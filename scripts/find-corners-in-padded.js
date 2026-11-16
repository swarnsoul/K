const sharp = require('sharp');

async function findCornersInPadded() {
  const buf = await sharp('scripts/diff_results/card_1_padded_aligned.png').ensureAlpha().raw().toBuffer();
  let topY = 250, topX = 0;
  for (let y = 0; y < 250; y++) {
    for (let x = 0; x < 398; x++) {
      const idx = (y * 398 + x) * 4;
      const r = buf[idx], g = buf[idx+1], b = buf[idx+2];
      if (r >= 244 && r <= 251 && g >= 237 && g <= 247 && b >= 215 && b <= 237) {
        if (y < topY) {
          topY = y;
          topX = x;
        }
      }
    }
  }
  console.log(`Top-most pixel of card container in card_1_padded_aligned.png: x=${topX}, y=${topY}`);
}
findCornersInPadded();
