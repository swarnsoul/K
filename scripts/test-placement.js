const sharp = require('sharp');
const _pixelmatch = require('pixelmatch');
const pixelmatch = _pixelmatch.default || _pixelmatch;
const { PNG } = require('pngjs');
const fs = require('fs');

async function testPlacement() {
  const figmaRef = await sharp('scripts/diff_results/photo_1_content_figma.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const rawAsset = await sharp('public/assets/about/travel-1.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const fw = 188;
  const fh = 246;

  let best = Infinity;
  let bestW = 0, bestH = 0, bestLeft = 0, bestTop = 0;

  // Search over width from 150 to 300
  for (let w = 150; w <= 320; w += 2) {
    const scale = w / 459;
    const h = Math.round(1024 * scale);

    const scaledBuf = await sharp('public/assets/about/travel-1.png')
      .resize(w, h)
      .ensureAlpha()
      .raw()
      .toBuffer();

    for (let top = -150; top <= 0; top += 2) {
      for (let left = -40; left <= 40; left += 2) {
        let diff = 0;
        let count = 0;

        for (let y = 10; y < fh - 10; y += 4) {
          const sy = y - top;
          if (sy < 0 || sy >= h) continue;
          for (let x = 10; x < fw - 10; x += 4) {
            const sx = x - left;
            if (sx < 0 || sx >= w) continue;

            const fIdx = (y * fw + x) * 4;
            const sIdx = (sy * w + sx) * 4;

            const dr = Math.abs(figmaRef.data[fIdx] - scaledBuf[sIdx]);
            const dg = Math.abs(figmaRef.data[fIdx+1] - scaledBuf[sIdx+1]);
            const db = Math.abs(figmaRef.data[fIdx+2] - scaledBuf[sIdx+2]);
            diff += (dr + dg + db);
            count++;
          }
        }

        if (count > 500) {
          const avg = diff / count;
          if (avg < best) {
            best = avg;
            bestW = w;
            bestH = h;
            bestLeft = left;
            bestTop = top;
          }
        }
      }
    }
  }

  console.log('OPTIMAL CROP FOUND:');
  console.log(`  bestW: ${bestW}px`);
  console.log(`  bestH: ${bestH}px`);
  console.log(`  bestLeft: ${bestLeft}px`);
  console.log(`  bestTop: ${bestTop}px`);
  console.log(`  Avg diff per sample: ${best.toFixed(2)}`);

  const boxW = 187.696, boxH = 245.654;
  console.log(`\nPercentages for CSS:`);
  console.log(`  width: "${((bestW / boxW) * 100).toFixed(2)}%"`);
  console.log(`  height: "${((bestH / boxH) * 100).toFixed(2)}%"`);
  console.log(`  left: "${((bestLeft / boxW) * 100).toFixed(2)}%"`);
  console.log(`  top: "${((bestTop / boxH) * 100).toFixed(2)}%"`);

  // Render the optimal crop and compute pixelmatch
  const cropTest = await sharp({
    create: { width: fw, height: fh, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } }
  })
  .composite([{
    input: await sharp('public/assets/about/travel-1.png').resize(bestW, bestH).toBuffer(),
    left: bestLeft,
    top: bestTop
  }])
  .png()
  .toBuffer();

  const diffPng = new PNG({ width: fw, height: fh });
  const pmCount = pixelmatch(figmaRef.data, await sharp(cropTest).ensureAlpha().raw().toBuffer(), diffPng.data, fw, fh, { threshold: 0.15 });
  console.log(`Pixelmatch diff: ${pmCount}/${fw*fh} (${(pmCount / (fw*fh) * 100).toFixed(2)}%)`);
  fs.writeFileSync('scripts/diff_results/photo_1_optimal_diff.png', PNG.sync.write(diffPng));
}

testPlacement();
