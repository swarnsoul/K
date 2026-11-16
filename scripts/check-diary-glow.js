const fs = require('fs');
const { PNG } = require('pngjs');

const d1 = PNG.sync.read(fs.readFileSync('scripts/fresh_refs/diary_v1_default.png'));
const d2 = PNG.sync.read(fs.readFileSync('scripts/fresh_refs/diary_v2_hover.png'));

console.log('d1 dimensions:', d1.width, d1.height);
console.log('d2 dimensions:', d2.width, d2.height);

// Check if d2 has yellow pixels around the diary
let yellowPixels = 0;
for (let i = 0; i < d2.data.length; i += 4) {
  const r = d2.data[i], g = d2.data[i+1], b = d2.data[i+2], a = d2.data[i+3];
  // Yellow glow: #ffd54f -> r~255, g~213, b~79
  if (r > 200 && g > 150 && b < 120 && a > 20) {
    yellowPixels++;
  }
}
console.log('d2 yellow pixels:', yellowPixels, 'out of', d2.width*d2.height);
