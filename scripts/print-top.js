const sharp = require('sharp');

async function printTopPixels() {
  const buf = await sharp('scripts/figma_refs/card_1.png').ensureAlpha().raw().toBuffer();
  for (let y = 5; y < 25; y += 5) {
    const row = [];
    for (let x = 180; x < 220; x += 5) {
      const idx = (y * 398 + x) * 4;
      row.push(`[${buf[idx]},${buf[idx+1]},${buf[idx+2]},${buf[idx+3]}]`);
    }
    console.log(`y=${y}: ${row.join(' ')}`);
  }
}
printTopPixels();
