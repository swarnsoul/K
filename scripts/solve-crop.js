const sharp = require('sharp');

async function solveCrop() {
  const figmaImg = await sharp('scripts/diff_results/photo_1_content_figma.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const assetImg = await sharp('scripts/detailed_refs/imgImage32_new.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const fw = figmaImg.info.width;  // 188
  const fh = figmaImg.info.height; // 246
  const aw = assetImg.info.width;  // 459
  const ah = assetImg.info.height; // 1024

  // Let's test a fine grid of scale factors:
  // If the girl is entirely visible in a 246px height box:
  // Since asset height is 1024, if height = 246px, scale = 246 / 1024 = 0.2402!
  // If asset is 100% of height: scale ~ 0.24 to 0.35
  let minDiff = Infinity;
  let best = null;

  for (let s = 0.23; s <= 0.35; s += 0.002) {
    const sw = Math.round(aw * s);
    const sh = Math.round(ah * s);

    const scaledBuf = await sharp('scripts/detailed_refs/imgImage32_new.png')
      .resize(sw, sh)
      .ensureAlpha()
      .raw()
      .toBuffer();

    // In Figma, where is it positioned?
    // Let's test left from -100 to 100, top from -100 to 100
    for (let top = -50; top <= Math.max(0, sh - fh + 50); top += 2) {
      for (let left = -50; left <= Math.max(0, sw - fw + 50); left += 2) {
        let diff = 0;
        let samples = 0;

        for (let y = 10; y < fh - 10; y += 4) {
          const sy = y + top;
          if (sy < 0 || sy >= sh) continue;
          for (let x = 10; x < fw - 10; x += 4) {
            const sx = x + left;
            if (sx < 0 || sx >= sw) continue;

            const fIdx = (y * fw + x) * 4;
            const sIdx = (sy * sw + sx) * 4;

            const dr = Math.abs(figmaImg.data[fIdx] - scaledBuf[sIdx]);
            const dg = Math.abs(figmaImg.data[fIdx+1] - scaledBuf[sIdx+1]);
            const db = Math.abs(figmaImg.data[fIdx+2] - scaledBuf[sIdx+2]);

            diff += (dr + dg + db);
            samples++;
          }
        }

        if (samples > 500) {
          const score = diff / samples;
          if (score < minDiff) {
            minDiff = score;
            best = { s, sw, sh, left, top, score };
          }
        }
      }
    }
  }

  console.log('Best match:', best);
  if (best) {
    const boxW = 187.696, boxH = 245.654;
    console.log('\nExact CSS for <img>:');
    console.log(`  className="absolute max-w-none pointer-events-none"`);
    console.log(`  style={{`);
    console.log(`    width: "${((best.sw / boxW) * 100).toFixed(2)}%",`);
    console.log(`    height: "${((best.sh / boxH) * 100).toFixed(2)}%",`);
    console.log(`    left: "${((-best.left / boxW) * 100).toFixed(2)}%",`);
    console.log(`    top: "${((-best.top / boxH) * 100).toFixed(2)}%",`);
    console.log(`  }}`);
  }
}
solveCrop();
