const sharp = require('sharp');
const fs = require('fs');

async function measureY() {
  // Let's load figma_ref_1440.png (336 x 1024)
  // and rendered_full.png (1440 x 4401)
  const refPath = 'C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/figma_ref_1440.png';
  const rendPath = 'scripts/bands_diff/rendered_full.png';

  const refMeta = await sharp(refPath).metadata();
  const rendMeta = await sharp(rendPath).metadata();
  console.log('Ref meta:', refMeta.width, 'x', refMeta.height);
  console.log('Rend meta:', rendMeta.width, 'x', rendMeta.height);

  // In figma_ref_1440 (scaled to 1024 height), each y pixel corresponds to 4401 / 1024 = 4.2978 px in 1440 space.
  // Let's find the vertical positions of distinct features in both:
  // 1. "About Me" heading
  // 2. Intro note (blue box #90caf9: r~144, g~202, b~249)
  // 3. Card 1 (beige container)
  // 4. Card 2 (pink container #f4c5c5: r~244, g~197, b~197)
  // 5. Card 3 (cyan container #b6e8ff: r~182, g~232, b~255)
  // 6. Card 4 (yellow container #fff3b6: r~255, g~243, b~182)
  // 7. Card 5 (pink container #ffcceb: r~255, g~204, b~235)
  // 8. Card 6 (purple container #ebd7f9: r~235, g~215, b~249)
  // 9. Card 7 (light pink #f1d5ef)
  // 10. Card 8 (cyan #b6e8ff)
  // 11. Card 9 (beige)
  // 12. Travel section banner / photo collage
  // 13. Art section banner / photo collage
  // 14. Closing section hearts

  // Let's inspect the blue intro note box in both images:
  const refBuf = await sharp(refPath).raw().toBuffer();
  const rendScaled = await sharp(rendPath).resize(336, 1024, { fit: 'fill' }).raw().toBuffer();

  function findColorYRange(buf, w, h, matchFn) {
    let minY = h, maxY = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 3; // or 4 depending on channels
        const r = buf[idx], g = buf[idx+1], b = buf[idx+2];
        if (matchFn(r, g, b)) {
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    return { minY, maxY, cy: (minY + maxY) / 2 };
  }

  // Check intro note: blue box around r: 144, g: 202, b: 249
  const isBlueNote = (r, g, b) => (r > 130 && r < 160 && g > 190 && g < 220 && b > 235);
  console.log('Intro note ref:', findColorYRange(refBuf, 336, 1024, isBlueNote));
  console.log('Intro note rend:', findColorYRange(rendScaled, 336, 1024, isBlueNote));

  // Check pink card 2: r > 235 && r < 250 && g > 185 && g < 205 && b > 185 && b < 205
  const isCard2Pink = (r, g, b) => (r > 235 && r < 250 && g > 185 && g < 205 && b > 185 && b < 205);
  console.log('Card 2 ref:', findColorYRange(refBuf, 336, 1024, isCard2Pink));
  console.log('Card 2 rend:', findColorYRange(rendScaled, 336, 1024, isCard2Pink));

  // Check cyan card 3: r > 170 && r < 190 && g > 220 && g < 240 && b > 245
  const isCard3Cyan = (r, g, b) => (r > 170 && r < 190 && g > 220 && g < 240 && b > 245);
  console.log('Card 3 ref:', findColorYRange(refBuf, 336, 1024, isCard3Cyan));
  console.log('Card 3 rend:', findColorYRange(rendScaled, 336, 1024, isCard3Cyan));

  // Check yellow card 4: r > 245 && g > 235 && g < 250 && b > 170 && b < 195
  const isCard4Yellow = (r, g, b) => (r > 245 && g > 235 && g < 250 && b > 170 && b < 195);
  console.log('Card 4 ref:', findColorYRange(refBuf, 336, 1024, isCard4Yellow));
  console.log('Card 4 rend:', findColorYRange(rendScaled, 336, 1024, isCard4Yellow));
}
measureY();
