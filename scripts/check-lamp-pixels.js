const fs = require('fs');
const { PNG } = require('pngjs');

// Check lamp_on.png and lamp_off.png pixels
const on = PNG.sync.read(fs.readFileSync('scripts/fresh_refs/lamp_on.png'));
const off = PNG.sync.read(fs.readFileSync('scripts/fresh_refs/lamp_off.png'));
const pr = PNG.sync.read(fs.readFileSync('scripts/fresh_refs/plant_right.png'));

console.log('on alpha:');
let onOpaque = 0, offOpaque = 0;
for (let i = 3; i < on.data.length; i += 4) {
  if (on.data[i] > 10) onOpaque++;
  if (off.data[i] > 10) offOpaque++;
}
console.log('on opaque pixels:', onOpaque, '/', on.width*on.height);
console.log('off opaque pixels:', offOpaque, '/', off.width*off.height);

// In lamp_on, where are the opaque pixels?
let minX = on.width, maxX = 0, minY = on.height, maxY = 0;
for (let y = 0; y < on.height; y++) {
  for (let x = 0; x < on.width; x++) {
    const idx = (y * on.width + x) * 4;
    if (on.data[idx+3] > 10) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
console.log(`lamp_on bounding box: [${minX}, ${minY}] to [${maxX}, ${maxY}] (size: ${maxX-minX+1}x${maxY-minY+1})`);

minX = off.width; maxX = 0; minY = off.height; maxY = 0;
for (let y = 0; y < off.height; y++) {
  for (let x = 0; x < off.width; x++) {
    const idx = (y * off.width + x) * 4;
    if (off.data[idx+3] > 10) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
console.log(`lamp_off bounding box: [${minX}, ${minY}] to [${maxX}, ${maxY}] (size: ${maxX-minX+1}x${maxY-minY+1})`);
