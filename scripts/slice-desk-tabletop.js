const fs = require('fs');
const { PNG } = require('pngjs');

const db = PNG.sync.read(fs.readFileSync('public/assets/desk/desk_base.png'));
console.log('desk_base:', db.width, 'x', db.height);

// In desk_base.png (1536x1024):
// The desk base in DeskScene is positioned at:
// width: 1439, height: 959 (which is 110.4839% of 868)
// Let's find the y-range of the tabletop and drawer front in desk_base.png:
let topY = null, bottomY = null;

for (let y = 0; y < db.height; y++) {
  const idxL = (y * db.width + 0) * 4;
  const a = db.data[idxL + 3];
  if (a > 200) {
    if (topY === null) topY = y;
    bottomY = y;
  }
}

console.log(`Left edge solid wood y range: ${topY} to ${bottomY}`);

// Let's check right edge
let rTopY = null, rBottomY = null;
for (let y = 0; y < db.height; y++) {
  const idxR = (y * db.width + (db.width - 1)) * 4;
  const a = db.data[idxR + 3];
  if (a > 200) {
    if (rTopY === null) rTopY = y;
    rBottomY = y;
  }
}
console.log(`Right edge solid wood y range: ${rTopY} to ${rBottomY}`);
