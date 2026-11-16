const sharp = require('sharp');

async function findCornersInRef() {
  const buf = await sharp('scripts/figma_refs/card_1.png').ensureAlpha().raw().toBuffer();
  // The card has a beige background: linear-gradient between rgb(250, 246, 236) and rgb(245, 238, 216).
  // Outside the card, the background is rgb(254, 254, 254) with a drop shadow.
  // The shadow is black/grey with alpha (blended on 254, 254, 254).
  // Let's find the top-most pixel of the beige card (r between 244 and 251, g between 237 and 247, b between 215 and 237)
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
  console.log(`Top-most pixel of card container in card_1.png: x=${topX}, y=${topY}`);
}
findCornersInRef();
