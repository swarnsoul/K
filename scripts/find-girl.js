const sharp = require('sharp');

async function findGirl() {
  const figmaPhoto = await sharp('scripts/diff_results/photo_1_content_figma.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const rawAsset = await sharp('scripts/detailed_refs/imgImage32_new.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const fw = figmaPhoto.info.width;
  const fh = figmaPhoto.info.height;
  const aw = rawAsset.info.width;
  const ah = rawAsset.info.height;

  // Let's find distinct features of the girl:
  // Yellow shirt: r > 200, g > 190, b in 100..160
  // Dark shorts: dark blue/black
  // Turquoise water: r in 60..150, g in 180..240, b in 200..255
  function findFeature(buf, w, h, name, matchFn) {
    let minX = w, maxX = 0, minY = h, maxY = 0, count = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        if (matchFn(buf[idx], buf[idx+1], buf[idx+2])) {
          count++;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    console.log(`${name}: count=${count}, x=[${minX}, ${maxX}], y=[${minY}, ${maxY}]`);
  }

  const isYellowShirt = (r, g, b) => (r > 200 && g > 180 && b < 160);
  findFeature(figmaPhoto.data, fw, fh, 'Figma photo_1 - Yellow shirt', isYellowShirt);
  findFeature(rawAsset.data, aw, ah, 'Raw Asset - Yellow shirt', isYellowShirt);

  const isDarkShorts = (r, g, b) => (r < 50 && g < 50 && b > 60 && b < 140);
  findFeature(figmaPhoto.data, fw, fh, 'Figma photo_1 - Dark shorts', isDarkShorts);
  findFeature(rawAsset.data, aw, ah, 'Raw Asset - Dark shorts', isDarkShorts);
}
findGirl();
