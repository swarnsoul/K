const sharp = require('sharp');

async function makeSideBySide() {
  const refPath = 'C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/figma_ref_1440.png';
  const pagePath = 'scripts/bands_diff/rendered_full.png';

  const rendScaled = await sharp(pagePath).resize(336, 1024, { fit: 'fill' }).toBuffer();
  const refImg = await sharp(refPath).resize(336, 1024, { fit: 'fill' }).toBuffer();

  // Create 672 x 1024 side by side
  const sbs = await sharp({
    create: {
      width: 672,
      height: 1024,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
  .composite([
    { input: refImg, left: 0, top: 0 },
    { input: rendScaled, left: 336, top: 0 },
  ])
  .png()
  .toFile('scripts/diff_results/side_by_side_1024.png');

  console.log('Saved side_by_side_1024.png');
}
makeSideBySide();
