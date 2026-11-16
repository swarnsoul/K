const sharp = require('sharp');
const fs = require('fs');

async function findCardPadding() {
  const cards = [
    { name: 'card_1', file: 'scripts/figma_refs/card_1.png', w: 350.683, h: 171.065, rot: -9.2 },
    { name: 'card_2', file: 'scripts/figma_refs/card_2.png', w: 393.334, h: 191.870, rot: 10.0 },
    { name: 'card_3', file: 'scripts/figma_refs/card_3.png', w: 477.483, h: 232.919, rot: -7.0 },
    { name: 'card_4', file: 'scripts/figma_refs/card_4.png', w: 465.385, h: 226.974, rot: 7.0 },
    { name: 'card_5', file: 'scripts/figma_refs/card_5.png', w: 477.483, h: 232.919, rot: -8.0 },
    { name: 'card_6', file: 'scripts/figma_refs/card_6.png', w: 477.483, h: 232.919, rot: 5.0 },
    { name: 'card_7', file: 'scripts/figma_refs/card_7.png', w: 477.483, h: 232.919, rot: -8.0 },
    { name: 'card_8', file: 'scripts/figma_refs/card_8.png', w: 477.483, h: 232.919, rot: 6.0 },
    { name: 'card_9', file: 'scripts/figma_refs/card_9.png', w: 418.238, h: 204.019, rot: -7.0 },
  ];

  for (const c of cards) {
    const meta = await sharp(c.file).metadata();
    console.log(`${c.name}: ref image size = ${meta.width} x ${meta.height}`);
    // In the ref image, where is the center?
    // In Figma get_screenshot, the image is centered or tight to bounds?
    // Let's compute center of mass of non-transparent pixels in ref image:
    const buf = await sharp(c.file).ensureAlpha().raw().toBuffer();
    let minX = meta.width, maxX = 0, minY = meta.height, maxY = 0;
    let sumX = 0, sumY = 0, count = 0;
    for (let y = 0; y < meta.height; y++) {
      for (let x = 0; x < meta.width; x++) {
        const idx = (y * meta.width + x) * 4;
        if (buf[idx + 3] > 20) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          sumX += x;
          sumY += y;
          count++;
        }
      }
    }
    const cx = sumX / count;
    const cy = sumY / count;
    console.log(`  Visible bounds: [${minX}, ${minY}] to [${maxX}, ${maxY}], w: ${maxX - minX}, h: ${maxY - minY}`);
    console.log(`  Center: (${cx.toFixed(1)}, ${cy.toFixed(1)})`);
  }
}
findCardPadding();
