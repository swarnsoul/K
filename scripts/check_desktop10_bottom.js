const fs = require('fs');
const { PNG } = require('pngjs');

const buf = fs.readFileSync('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/.system_generated/steps/5747/media_0.png');
const img = PNG.sync.read(buf);
console.log('w:', img.width, 'h:', img.height);

// Look at the bottom 40 rows
for (let y = img.height - 40; y < img.height; y++) {
  // Find min and max dark pixels x
  let minX = 9999, maxX = -1, darkCount = 0;
  for (let x = 0; x < img.width; x++) {
    const idx = (y * img.width + x) * 4;
    const r = img.data[idx], g = img.data[idx+1], b = img.data[idx+2];
    if (r < 230 || g < 230 || b < 230) {
      darkCount++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
    }
  }
  console.log(`row ${y}: count=${darkCount}, minX=${minX}, maxX=${maxX}`);
}
