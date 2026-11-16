const sharp = require('sharp');
const fs = require('fs');

async function main() {
  const d1Meta = await sharp('scripts/desk_refs/diary_variant_image68.png').metadata();
  const d2Meta = await sharp('scripts/desk_refs/diary_variant_image69.png').metadata();

  console.log('Diary Variant 1 (image 68):', d1Meta.width, 'x', d1Meta.height);
  console.log('Diary Variant 2 (image 69):', d2Meta.width, 'x', d2Meta.height);

  // Let's inspect the bounding box and transparency
  const d1 = await sharp('scripts/desk_refs/diary_variant_image68.png').raw().toBuffer();
  const d2 = await sharp('scripts/desk_refs/diary_variant_image69.png').raw().toBuffer();

  // Find non-transparent bounding box for d1
  let minX1 = d1Meta.width, maxX1 = 0, minY1 = d1Meta.height, maxY1 = 0;
  for (let y = 0; y < d1Meta.height; y++) {
    for (let x = 0; x < d1Meta.width; x++) {
      const idx = (y * d1Meta.width + x) * 4;
      if (d1[idx+3] > 10) {
        if (x < minX1) minX1 = x;
        if (x > maxX1) maxX1 = x;
        if (y < minY1) minY1 = y;
        if (y > maxY1) maxY1 = y;
      }
    }
  }

  let minX2 = d2Meta.width, maxX2 = 0, minY2 = d2Meta.height, maxY2 = 0;
  for (let y = 0; y < d2Meta.height; y++) {
    for (let x = 0; x < d2Meta.width; x++) {
      const idx = (y * d2Meta.width + x) * 4;
      if (d2[idx+3] > 10) {
        if (x < minX2) minX2 = x;
        if (x > maxX2) maxX2 = x;
        if (y < minY2) minY2 = y;
        if (y > maxY2) maxY2 = y;
      }
    }
  }

  console.log(`D1 content bbox: [${minX1}, ${minY1}] to [${maxX1}, ${maxY1}] -> ${maxX1 - minX1 + 1} x ${maxY1 - minY1 + 1}`);
  console.log(`D2 content bbox: [${minX2}, ${minY2}] to [${maxX2}, ${maxY2}] -> ${maxX2 - minX2 + 1} x ${maxY2 - minY2 + 1}`);
}

main().catch(console.error);
