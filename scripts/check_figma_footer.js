const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const step5747 = path.resolve('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/.system_generated/steps/5747/media_0.png');
console.log('Exists step5747:', fs.existsSync(step5747));

const buf = fs.readFileSync(step5747);
const img = PNG.sync.read(buf);
console.log('Desktop-10 w:', img.width, 'h:', img.height);

// 4970 is total height, 3980 is start of footer. Footer is 990 / 4970 = 19.92% of height
const footerH = Math.round(img.height * (990 / 4970));
const footerY = img.height - footerH;

console.log('footerY:', footerY, 'footerH:', footerH);

// Check bottom 20 rows of img
for (let y = img.height - 20; y < img.height; y++) {
  let dark = 0;
  for (let x = 0; x < img.width; x++) {
    const idx = (y * img.width + x) * 4;
    const r = img.data[idx];
    const g = img.data[idx+1];
    const b = img.data[idx+2];
    if (r < 240 || g < 240 || b < 240) dark++;
  }
  console.log(`row ${y} (from bottom: ${img.height - 1 - y}): dark=${dark}`);
}
