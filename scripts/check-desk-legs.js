const fs = require('fs');
const { PNG } = require('pngjs');

const db = PNG.sync.read(fs.readFileSync('public/assets/desk/desk_base.png'));

// Check columns where legs are located below y=730
for (let y = 750; y < db.height; y += 50) {
  let opaqueX = [];
  for (let x = 0; x < db.width; x++) {
    const idx = (y * db.width + x) * 4;
    if (db.data[idx+3] > 100) opaqueX.push(x);
  }
  if (opaqueX.length > 0) {
    console.log(`y=${y}: opaque from x=${opaqueX[0]} to x=${opaqueX[opaqueX.length-1]} (count=${opaqueX.length})`);
  }
}
