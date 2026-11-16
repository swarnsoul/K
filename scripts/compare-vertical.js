const sharp = require('sharp');

async function compareVerticalPositions() {
  const imgBuf = await sharp('scripts/diff_results/side_by_side_1024.png').ensureAlpha().raw().toBuffer();
  const w = 672, h = 1024;

  // Let's compute average luminance or color per row for left (0..335) and right (336..671)
  console.log('Row-by-row feature comparison (sampled every 10 rows):');
  for (let y = 100; y < 600; y += 20) {
    let leftDark = 0, rightDark = 0;
    for (let x = 0; x < 336; x++) {
      const lIdx = (y * w + x) * 4;
      const rIdx = (y * w + (x + 336)) * 4;

      // Dark pixels (text or photo content: < 200)
      if (imgBuf[lIdx] < 200 || imgBuf[lIdx+1] < 200 || imgBuf[lIdx+2] < 200) leftDark++;
      if (imgBuf[rIdx] < 200 || imgBuf[rIdx+1] < 200 || imgBuf[rIdx+2] < 200) rightDark++;
    }
    const y1440 = Math.round(y * 4401 / 1024);
    console.log(`y_1024: ${y} (y_1440: ${y1440}px) | Left dark px: ${leftDark.toString().padStart(3)} | Right dark px: ${rightDark.toString().padStart(3)}`);
  }
}
compareVerticalPositions();
