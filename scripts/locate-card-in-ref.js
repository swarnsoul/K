const sharp = require('sharp');

async function locateCardInRef() {
  const buf = await sharp('scripts/figma_refs/card_1.png').ensureAlpha().raw().toBuffer();
  // Find non-transparent pixels in card_1.png
  let minY = 250, minX = 398, maxY = 0, maxX = 0;
  for (let y = 0; y < 250; y++) {
    for (let x = 0; x < 398; x++) {
      const idx = (y * 398 + x) * 4;
      if (buf[idx + 3] > 10) {
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    }
  }
  console.log(`card_1.png visible pixel bounds: x=[${minX}, ${maxX}], y=[${minY}, ${maxY}]`);

  // Where is the tape?
  // Tape has color #ffd54f: r around 255, g around 213, b around 79
  let tapeMinY = 250, tapeMaxY = 0, tapeMinX = 398, tapeMaxX = 0;
  for (let y = 0; y < 250; y++) {
    for (let x = 0; x < 398; x++) {
      const idx = (y * 398 + x) * 4;
      const r = buf[idx], g = buf[idx+1], b = buf[idx+2];
      if (r > 240 && g > 200 && g < 225 && b > 60 && b < 100) {
        if (y < tapeMinY) tapeMinY = y;
        if (y > tapeMaxY) tapeMaxY = y;
        if (x < tapeMinX) tapeMinX = x;
        if (x > tapeMaxX) tapeMaxX = x;
      }
    }
  }
  console.log(`Tape in card_1.png: x=[${tapeMinX}, ${tapeMaxX}], y=[${tapeMinY}, ${tapeMaxY}]`);
}
locateCardInRef();
