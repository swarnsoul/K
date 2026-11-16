const fs = require('fs');
const { PNG } = require('pngjs');

const pr = PNG.sync.read(fs.readFileSync('public/assets/desk/plant_right.png'));
// Check non-transparent bbox and colors in plant_right.png
let minX = pr.width, maxX = 0, minY = pr.height, maxY = 0;
let hasGreen = 0, hasWhite = 0, hasYellow = 0;

for (let y = 0; y < pr.height; y++) {
  for (let x = 0; x < pr.width; x++) {
    const idx = (y * pr.width + x) * 4;
    if (pr.data[idx+3] > 10) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      const r = pr.data[idx], g = pr.data[idx+1], b = pr.data[idx+2];
      if (g > r + 15 && g > b + 15) hasGreen++;
      if (r > 230 && g > 230 && b > 230) hasWhite++;
      if (r > 200 && g > 150 && b < 100) hasYellow++;
    }
  }
}
console.log(`plant_right bbox: [${minX}, ${minY}] to [${maxX}, ${maxY}]`);
console.log('Green pixels:', hasGreen, 'White pixels:', hasWhite, 'Yellow pixels:', hasYellow);
