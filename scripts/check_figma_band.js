const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const p = 'C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/.system_generated/steps/5923/media_0.png';
const buf = fs.readFileSync(p);
const img = PNG.sync.read(buf);

console.log('Desktop-10 screenshot w:', img.width, 'h:', img.height);

// In Desktop-10 (total height 4970), y=3980 to 4240 is:
const startY = Math.round(img.height * (3980 / 4970));
const endY = Math.round(img.height * (4240 / 4970));

console.log(`startY=${startY}, endY=${endY}`);

// Let's crop this region and save it as an artifact to see the pink striped band!
const cropH = endY - startY;
const crop = new PNG({ width: img.width, height: cropH });
for (let y = 0; y < cropH; y++) {
  for (let x = 0; x < img.width; x++) {
    const srcIdx = ((startY + y) * img.width + x) * 4;
    const dstIdx = (y * img.width + x) * 4;
    for (let c = 0; c < 4; c++) crop.data[dstIdx + c] = img.data[srcIdx + c];
  }
}

fs.writeFileSync('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/figma_band_crop.png', PNG.sync.write(crop));
console.log('Saved figma_band_crop.png');

// Check colors across x at startY + 5
for (let x = 0; x < img.width; x += 15) {
  const idx = ((startY + 10) * img.width + x) * 4;
  console.log(`x=${x}: RGB=(${crop.data[idx]}, ${crop.data[idx+1]}, ${crop.data[idx+2]})`);
}
