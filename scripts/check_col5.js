const fs = require('fs');
const { PNG } = require('pngjs');

const crop = PNG.sync.read(fs.readFileSync('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/figma_band_crop.png'));
console.log('crop w:', crop.width, 'h:', crop.height);

// In crop, the text starts around x=11 (which corresponds to x=53 in 1440).
// Let's inspect column x=5 from y=0 to crop.height
for (let y = 0; y < crop.height; y++) {
  const idx = (y * crop.width + 5) * 4;
  console.log(`y=${y}: RGBA=(${crop.data[idx]},${crop.data[idx+1]},${crop.data[idx+2]},${crop.data[idx+3]})`);
}
