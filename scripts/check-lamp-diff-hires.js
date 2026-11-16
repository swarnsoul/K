const fs = require('fs');
const { PNG } = require('pngjs');

const on = PNG.sync.read(fs.readFileSync('public/assets/desk/lamp_on.png'));
const off = PNG.sync.read(fs.readFileSync('public/assets/desk/lamp_off.png'));

// Find bounding box of non-transparent pixels in on and off
function getBBox(png, name) {
  let minX = png.width, maxX = 0, minY = png.height, maxY = 0;
  for (let y = 0; y < png.height; y++) {
    for (let x = 0; x < png.width; x++) {
      const idx = (y * png.width + x) * 4;
      if (png.data[idx+3] > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  console.log(`${name} bbox: [${minX}, ${minY}] to [${maxX}, ${maxY}] (${maxX-minX+1}x${maxY-minY+1})`);
}

getBBox(on, 'lamp_on');
getBBox(off, 'lamp_off');

// Create diff image
const w = Math.min(on.width, off.width);
const h = Math.min(on.height, off.height);
const diff = new PNG({ width: w, height: h });

let numDiff = 0;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const idxOn = (y * on.width + x) * 4;
    const idxOff = (y * off.width + x) * 4;
    const idxD = (y * w + x) * 4;
    const dr = Math.abs(on.data[idxOn] - off.data[idxOff]);
    const dg = Math.abs(on.data[idxOn+1] - off.data[idxOff+1]);
    const db = Math.abs(on.data[idxOn+2] - off.data[idxOff+2]);
    const da = Math.abs(on.data[idxOn+3] - off.data[idxOff+3]);
    if (dr > 15 || dg > 15 || db > 15 || da > 15) {
      numDiff++;
      diff.data[idxD] = 255;
      diff.data[idxD+1] = 0;
      diff.data[idxD+2] = 0;
      diff.data[idxD+3] = 255;
    } else {
      diff.data[idxD] = on.data[idxOn];
      diff.data[idxD+1] = on.data[idxOn+1];
      diff.data[idxD+2] = on.data[idxOn+2];
      diff.data[idxD+3] = Math.floor(on.data[idxOn+3] * 0.2);
    }
  }
}
console.log('Diff pixels:', numDiff, 'total:', w*h);
fs.writeFileSync('scripts/lamp_diff_highres.png', PNG.sync.write(diff));
