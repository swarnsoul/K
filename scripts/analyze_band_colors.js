const fs = require('fs');
const { PNG } = require('pngjs');

const crop = PNG.sync.read(fs.readFileSync('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/figma_band_crop.png'));
console.log('crop w:', crop.width, 'h:', crop.height);

// Let's find background colors that are NOT pure white (255,255,255)
const colorCounts = {};
for (let y = 0; y < crop.height; y++) {
  for (let x = 0; x < crop.width; x++) {
    const idx = (y * crop.width + x) * 4;
    const r = crop.data[idx];
    const g = crop.data[idx+1];
    const b = crop.data[idx+2];
    const a = crop.data[idx+3];
    if (a > 0 && !(r === 255 && g === 255 && b === 255)) {
      const hex = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
      colorCounts[hex] = (colorCounts[hex] || 0) + 1;
    }
  }
}

// Print top 20 non-white colors
const sorted = Object.entries(colorCounts).sort((a,b) => b[1] - a[1]).slice(0, 20);
console.log('Top non-white colors in figma_band_crop.png:');
console.log(sorted);
