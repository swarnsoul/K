const sharp = require('sharp');

async function checkAllTilts() {
  const cards = [
    { name: 'card_1', file: 'scripts/figma_refs/card_1.png', currentAngleInCode: -9.2 },
    { name: 'card_2', file: 'scripts/figma_refs/card_2.png', currentAngleInCode: 10.0 },
    { name: 'card_3', file: 'scripts/figma_refs/card_3.png', currentAngleInCode: -7.0 },
    { name: 'card_4', file: 'scripts/figma_refs/card_4.png', currentAngleInCode: 7.0 },
    { name: 'card_5', file: 'scripts/figma_refs/card_5.png', currentAngleInCode: -8.0 },
    { name: 'card_6', file: 'scripts/figma_refs/card_6.png', currentAngleInCode: 5.0 },
    { name: 'card_7', file: 'scripts/figma_refs/card_7.png', currentAngleInCode: -8.0 },
    { name: 'card_8', file: 'scripts/figma_refs/card_8.png', currentAngleInCode: 6.0 },
    { name: 'card_9', file: 'scripts/figma_refs/card_9.png', currentAngleInCode: -7.0 },
  ];

  for (const c of cards) {
    const meta = await sharp(c.file).metadata();
    const buf = await sharp(c.file).ensureAlpha().raw().toBuffer();
    const w = meta.width;
    const h = meta.height;

    // Find the top-most card edge at x1 = 0.2 * w and x2 = 0.8 * w
    const x1 = Math.round(0.25 * w);
    const x2 = Math.round(0.75 * w);

    function findFirstCardPixel(targetX) {
      for (let y = 0; y < h; y++) {
        const idx = (y * w + targetX) * 4;
        const r = buf[idx], g = buf[idx+1], b = buf[idx+2];
        // Not background (254, 254, 254)
        if (Math.abs(r - 254) > 10 || Math.abs(g - 254) > 10 || Math.abs(b - 254) > 10) {
          return y;
        }
      }
      return -1;
    }

    const y1 = findFirstCardPixel(x1);
    const y2 = findFirstCardPixel(x2);

    const dy = y2 - y1;
    const dx = x2 - x1;
    const angleRad = Math.atan2(dy, dx);
    const angleDeg = (angleRad * 180 / Math.PI).toFixed(1);

    console.log(`${c.name}: x1=${x1}(y=${y1}), x2=${x2}(y=${y2}), dy=${dy} -> angle = ${angleDeg} deg (Current in code: ${c.currentAngleInCode} deg)`);
  }
}
checkAllTilts();
