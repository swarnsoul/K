const sharp = require('sharp');
const fs = require('fs');

async function findCardsInFigmaRef() {
  const fullRefPath = 'C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/figma_ref_1440.png';
  const fullMeta = await sharp(fullRefPath).metadata();
  console.log('Full ref size:', fullMeta.width, 'x', fullMeta.height); // 336 x 1024

  const fullBuf = await sharp(fullRefPath).ensureAlpha().raw().toBuffer();
  const fw = fullMeta.width;
  const fh = fullMeta.height;

  // Scale factor: full Figma frame is 1440 x 4401
  const scale = fh / 4401; // ~0.232674

  const cardFiles = [
    { name: 'card_1', file: 'scripts/figma_refs/card_1.png' },
    { name: 'card_2', file: 'scripts/figma_refs/card_2.png' },
    { name: 'card_3', file: 'scripts/figma_refs/card_3.png' },
    { name: 'card_4', file: 'scripts/figma_refs/card_4.png' },
    { name: 'card_5', file: 'scripts/figma_refs/card_5.png' },
    { name: 'card_6', file: 'scripts/figma_refs/card_6.png' },
    { name: 'card_7', file: 'scripts/figma_refs/card_7.png' },
    { name: 'card_8', file: 'scripts/figma_refs/card_8.png' },
    { name: 'card_9', file: 'scripts/figma_refs/card_9.png' },
  ];

  for (const c of cardFiles) {
    const cardMeta = await sharp(c.file).metadata();
    const sw = Math.round(cardMeta.width * scale);
    const sh = Math.round(cardMeta.height * scale);

    const scaledCardBuf = await sharp(c.file)
      .resize(sw, sh)
      .ensureAlpha()
      .raw()
      .toBuffer();

    let bestX = 0, bestY = 0, minDiff = Infinity;

    // Search across the full ref
    for (let y = 0; y <= fh - sh; y++) {
      for (let x = 0; x <= fw - sw; x++) {
        let count = 0;
        // Sample pixels
        for (let sy = 0; sy < sh; sy += 2) {
          for (let sx = 0; sx < sw; sx += 2) {
            const fIdx = ((y + sy) * fw + (x + sx)) * 4;
            const cIdx = (sy * sw + sx) * 4;
            // Ignore transparent card pixels (alpha < 50)
            if (scaledCardBuf[cIdx + 3] < 50) continue;

            const dr = Math.abs(fullBuf[fIdx] - scaledCardBuf[cIdx]);
            const dg = Math.abs(fullBuf[fIdx+1] - scaledCardBuf[cIdx+1]);
            const db = Math.abs(fullBuf[fIdx+2] - scaledCardBuf[cIdx+2]);
            count += (dr + dg + db);
          }
        }
        if (count < minDiff) {
          minDiff = count;
          bestX = x;
          bestY = y;
        }
      }
    }

    // Map back to 1440x4401 coordinates
    const figmaX = Math.round(bestX / scale);
    const figmaY = Math.round(bestY / scale);
    console.log(`${c.name}: scaled pos in 1024 ref = (${bestX}, ${bestY}), mapped to 1440 = (${figmaX}, ${figmaY})`);
  }
}

findCardsInFigmaRef();
