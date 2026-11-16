const sharp = require('sharp');

async function analyzePixels(filePath) {
  const { data, info } = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
  let minX = info.width, maxX = 0, minY = info.height, maxY = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = info.channels === 4 ? data[idx + 3] : 255;
      // if not transparent and not white (#ffffff / dots)
      if (a > 30 && !(r > 240 && g > 240 && b > 240)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  console.log(`${filePath}: bounds [x: ${minX}..${maxX}, y: ${minY}..${maxY}] in (${info.width}x${info.height})`);
}

analyzePixels('scripts/figma_sections_influcrush/02_hero_intro.png');
analyzePixels('scripts/figma_sections_cirqell/02_hero_intro.png');
