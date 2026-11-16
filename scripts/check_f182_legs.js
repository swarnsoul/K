const fs = require('fs');
const { PNG } = require('pngjs');

const buf = fs.readFileSync('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/.system_generated/steps/5735/media_0.png');
const img = PNG.sync.read(buf);
console.log('Frame 182 screenshot w:', img.width, 'h:', img.height);

// Check columns around left leg (x ~ 50) and right leg (x ~ 950)
for (let y = img.height - 10; y < img.height; y++) {
  // Let's print pixel values at left leg: x = 50, and right leg: x = 970
  const idxL = (y * img.width + 50) * 4;
  const idxR = (y * img.width + 970) * 4;
  console.log(`y=${y}: Left leg RGBA=(${img.data[idxL]},${img.data[idxL+1]},${img.data[idxL+2]},${img.data[idxL+3]}), Right leg RGBA=(${img.data[idxR]},${img.data[idxR+1]},${img.data[idxR+2]},${img.data[idxR+3]})`);
}
