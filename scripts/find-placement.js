const sharp = require('sharp');

async function findExactPlacement() {
  // Let's compare travel_photo_1.png with imgImage32_new.png
  // In travel_photo_1.png, where is the top of the photo?
  // Let's find the white border corners
  const ref = await sharp('scripts/detailed_refs/travel_photo_1.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const asset = await sharp('scripts/detailed_refs/imgImage32_new.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const rw = ref.info.width;
  const rh = ref.info.height;
  const aw = asset.info.width;
  const ah = asset.info.height;

  // Let's test scales: what if the whole image fits or is scaled to fit width or height?
  // What if scale = 245.65 / 1024 = 0.2399? (fit height)
  // Or what if scale = 0.3?
  // Let's search over scale from 0.2 to 0.6, left offset from -100 to 50, top offset from -100 to 50
  let best = Infinity, bestS = 0, bestL = 0, bestT = 0;

  // Inner box in ref: x from 10 to 198 (w=188), y from 10 to 256 (h=246)
  // Let's test:
  for (let s = 0.22; s <= 0.45; s += 0.005) {
    const sw = Math.round(aw * s);
    const sh = Math.round(ah * s);

    const sAsset = await sharp('scripts/detailed_refs/imgImage32_new.png')
      .resize(sw, sh)
      .ensureAlpha()
      .raw()
      .toBuffer();

    for (let t = -50; t <= Math.max(0, sh - 240); t += 5) {
      for (let l = -50; l <= Math.max(0, sw - 180); l += 5) {
        let diff = 0;
        let count = 0;
        for (let py = 20; py < 220; py += 10) {
          const ay = py + t;
          if (ay < 0 || ay >= sh) continue;
          for (let px = 20; px < 160; px += 10) {
            const ax = px + l;
            if (ax < 0 || ax >= sw) continue;

            const rIdx = ((py + 10) * rw + (px + 10)) * 4;
            const aIdx = (ay * sw + ax) * 4;

            const dr = Math.abs(ref.data[rIdx] - sAsset[aIdx]);
            const dg = Math.abs(ref.data[rIdx+1] - sAsset[aIdx+1]);
            const db = Math.abs(ref.data[rIdx+2] - sAsset[aIdx+2]);
            diff += (dr + dg + db);
            count++;
          }
        }
        if (count > 200) {
          const avg = diff / count;
          if (avg < best) {
            best = avg;
            bestS = s;
            bestL = l;
            bestT = t;
          }
        }
      }
    }
  }

  console.log(`Best placement found:`);
  console.log(`  Scale: ${bestS.toFixed(4)}`);
  console.log(`  Image rendered size: ${Math.round(aw * bestS)} x ${Math.round(ah * bestS)}`);
  console.log(`  Left offset in box: ${-bestL} px`);
  console.log(`  Top offset in box: ${-bestT} px`);
  console.log(`  Avg diff per pixel: ${best.toFixed(2)}`);

  const boxW = 187.7, boxH = 245.65;
  console.log(`\nExact CSS percentages for <img />:`);
  console.log(`  width: ${((aw * bestS / boxW) * 100).toFixed(2)}%`);
  console.log(`  height: ${((ah * bestS / boxH) * 100).toFixed(2)}%`);
  console.log(`  left: ${((-bestL / boxW) * 100).toFixed(2)}%`);
  console.log(`  top: ${((-bestT / boxH) * 100).toFixed(2)}%`);
}
findExactPlacement();
