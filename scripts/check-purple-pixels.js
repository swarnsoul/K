const fs = require('fs');
const { PNG } = require('pngjs');

// Load ref and check purple outline pixels
const ref = PNG.sync.read(fs.readFileSync('scripts/fresh_refs/diary_v2_hover.png'));
let purpleCount = 0;
for (let i = 0; i < ref.data.length; i += 4) {
  const r = ref.data[i], g = ref.data[i+1], b = ref.data[i+2];
  // Purple outline in Figma: r~138, g~56, b~245
  if (Math.abs(r - 138) < 30 && Math.abs(g - 56) < 30 && Math.abs(b - 245) < 30) {
    purpleCount++;
  }
}
console.log('Purple outline pixels in Figma screenshot:', purpleCount, 'out of', ref.width * ref.height, `(${(purpleCount / (ref.width * ref.height) * 100).toFixed(2)}%)`);
