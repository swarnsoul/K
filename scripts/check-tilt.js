const sharp = require('sharp');

async function checkTilt() {
  const buf = await sharp('scripts/figma_refs/card_1.png').ensureAlpha().raw().toBuffer();
  // Find top-left corner vs top-right corner of card_1.png
  // Check y of card boundary at x=50 vs x=350
  function findCardYAtX(targetX) {
    for (let y = 0; y < 250; y++) {
      const idx = (y * 398 + targetX) * 4;
      const r = buf[idx], g = buf[idx+1], b = buf[idx+2];
      if (r >= 240 && r <= 252 && g >= 230 && g <= 248 && b >= 210 && b <= 240) {
        return y;
      }
    }
    return -1;
  }

  console.log(`card_1.png: y at x=50 is: ${findCardYAtX(50)}`);
  console.log(`card_1.png: y at x=350 is: ${findCardYAtX(350)}`);
}
checkTilt();
