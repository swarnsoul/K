const sharp = require('sharp');

async function printPaddedPixels() {
  const buf = await sharp('scripts/diff_results/card_1_padded.png').ensureAlpha().raw().toBuffer();
  for (let y = 0; y < 35; y += 5) {
    const row = [];
    for (let x = 180; x < 220; x += 5) {
      const idx = (y * 398 + x) * 4;
      row.push(`[${buf[idx]},${buf[idx+1]},${buf[idx+2]}]`);
    }
    console.log(`y=${y}: ${row.join(' ')}`);
  }
}
printPaddedPixels();
