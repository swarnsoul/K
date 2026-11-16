const sharp = require('sharp');

async function matchPhoto1() {
  const figmaRef = await sharp('scripts/detailed_refs/travel_photo_1.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const rawAsset = await sharp('scripts/detailed_refs/imgImage32_new.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const fw = figmaRef.info.width;
  const fh = figmaRef.info.height;
  const aw = rawAsset.info.width;
  const ah = rawAsset.info.height;

  // The box in Figma is 187.7 x 245.65. With border/shadow: 208 x 266.
  // In travel_photo_1.png:
  // The border is 1px white with 10px rounded corners.
  // Inside the border, the visible area is 188 x 246.
  // The raw asset is 459 x 1024.
  // Let's test what scaling and crop of rawAsset matches figmaRef!
  console.log('Figma Ref size:', fw, 'x', fh);
  console.log('Raw Asset size:', aw, 'x', ah);

  // Let's test scaled widths from 180 to 460
  let bestDiff = Infinity;
  let bestScale = 0, bestX = 0, bestY = 0;

  // In figmaRef, photo content is at offset (10, 10) of size (188, 246)
  const cropRef = await sharp('scripts/detailed_refs/travel_photo_1.png')
    .extract({ left: 15, top: 15, width: 178, height: 236 })
    .ensureAlpha()
    .raw()
    .toBuffer();

  for (let scaledW = 180; scaledW <= 460; scaledW += 5) {
    const scale = scaledW / aw;
    const scaledH = Math.round(ah * scale);

    const scaledAsset = await sharp('scripts/detailed_refs/imgImage32_new.png')
      .resize(scaledW, scaledH)
      .ensureAlpha()
      .raw()
      .toBuffer();

    for (let top = 0; top <= scaledH - 236; top += 5) {
      for (let left = 0; left <= scaledW - 178; left += 5) {
        let diff = 0;
        for (let y = 10; y < 226; y += 4) {
          for (let x = 10; x < 168; x += 4) {
            const rIdx = (y * 178 + x) * 4;
            const aIdx = ((top + y) * scaledW + (left + x)) * 4;
            const dr = Math.abs(cropRef[rIdx] - scaledAsset[aIdx]);
            const dg = Math.abs(cropRef[rIdx+1] - scaledAsset[aIdx+1]);
            const db = Math.abs(cropRef[rIdx+2] - scaledAsset[aIdx+2]);
            diff += (dr + dg + db);
          }
        }
        if (diff < bestDiff) {
          bestDiff = diff;
          bestScale = scale;
          bestX = left;
          bestY = top;
        }
      }
    }
  }

  const sampleCount = (216/4) * (158/4);
  console.log(`Best match:`);
  console.log(`  Scale: ${bestScale.toFixed(4)} (asset size -> ${Math.round(aw * bestScale)} x ${Math.round(ah * bestScale)})`);
  console.log(`  Crop offset: left=${bestX}, top=${bestY}`);
  console.log(`  Avg diff per sample: ${(bestDiff / sampleCount).toFixed(2)}`);
  
  // Percentages relative to the container box (187.7 x 245.65):
  const boxW = 187.7, boxH = 245.65;
  const imgW = aw * bestScale;
  const imgH = ah * bestScale;
  console.log(`  CSS for <img>:`);
  console.log(`    width: ${((imgW / boxW) * 100).toFixed(2)}%`);
  console.log(`    height: ${((imgH / boxH) * 100).toFixed(2)}%`);
  console.log(`    left: ${((-bestX / boxW) * 100).toFixed(2)}%`);
  console.log(`    top: ${((-bestY / boxH) * 100).toFixed(2)}%`);
}
matchPhoto1();
