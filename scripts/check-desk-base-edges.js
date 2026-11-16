const fs = require('fs');
const { PNG } = require('pngjs');

const db = PNG.sync.read(fs.readFileSync('public/assets/desk/desk_base.png'));
console.log('desk_base width:', db.width, 'height:', db.height);

// Check column x=0 and column x=width-1
let leftEdgeOpaque = 0, rightEdgeOpaque = 0;
for (let y = 0; y < db.height; y++) {
  const idxLeft = (y * db.width + 0) * 4;
  const idxRight = (y * db.width + (db.width - 1)) * 4;
  if (db.data[idxLeft + 3] > 200) leftEdgeOpaque++;
  if (db.data[idxRight + 3] > 200) rightEdgeOpaque++;
}
console.log('Opaque pixels at x=0:', leftEdgeOpaque, 'at x=width-1:', rightEdgeOpaque);

// Find where tabletop is (y coords)
for (let y = 0; y < db.height; y += 20) {
  const idxL = (y * db.width + 0) * 4;
  const idxR = (y * db.width + (db.width - 1)) * 4;
  if (db.data[idxL + 3] > 200 || db.data[idxR + 3] > 200) {
    console.log(`y=${y}: L: rgb(${db.data[idxL]}, ${db.data[idxL+1]}, ${db.data[idxL+2]}), R: rgb(${db.data[idxR]}, ${db.data[idxR+1]}, ${db.data[idxR+2]})`);
  }
}
