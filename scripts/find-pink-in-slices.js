const sharp = require('sharp');

async function findCard2InSlices() {
  const figmaSlice = await sharp('scripts/diff_results/figma_slice_120_240.png').ensureAlpha().raw().toBuffer();
  const rendSlice = await sharp('scripts/diff_results/rendered_slice_120_240.png').ensureAlpha().raw().toBuffer();

  // Find pink pixels (r > 220, g in 170..210, b in 170..210)
  function findPink(buf, name) {
    let minY = 120, maxY = 0, minX = 336, maxX = 0;
    let count = 0;
    for (let y = 0; y < 120; y++) {
      for (let x = 0; x < 336; x++) {
        const idx = (y * 336 + x) * 4;
        const r = buf[idx], g = buf[idx+1], b = buf[idx+2];
        if (r > 220 && g > 170 && g < 210 && b > 170 && b < 210) {
          count++;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
        }
      }
    }
    console.log(`${name}: pink count=${count}, y=[${minY}, ${maxY}], x=[${minX}, ${maxX}]`);
  }

  findPink(figmaSlice, 'Figma slice (offset +120)');
  findPink(rendSlice, 'Rendered slice (offset +120)');
}
findCard2InSlices();
