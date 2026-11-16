const sharp = require('sharp');

async function findPhotoBox(imagePath) {
  const { data, info } = await sharp(imagePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  // The photo has a white border (r > 250, g > 250, b > 250) or dark content inside
  // Let's find non-background pixels. Background is (254, 254, 254) or (255, 255, 255)
  // Inside the photo, pixels are definitely darker than 240
  let minX = w, maxX = 0, minY = h, maxY = 0;
  let count = 0;
  let sumX = 0, sumY = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // Check if it's the photo content (not shadow or pure white background)
      if (r < 235 || g < 235 || b < 235) {
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
  console.log(`${imagePath}:`);
  console.log(`  BBox of photo content: [${minX}, ${minY}] to [${maxX}, ${maxY}], w: ${maxX - minX}, h: ${maxY - minY}`);
  console.log(`  Center: (${cx.toFixed(2)}, ${cy.toFixed(2)})`);
}

async function run() {
  await findPhotoBox('scripts/figma_refs/portrait_frame.png');
  await findPhotoBox('scripts/diff_results/portrait_frame_rendered.png');
}
run();
