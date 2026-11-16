const fs = require('fs');
const { PNG } = require('pngjs');

const db = PNG.sync.read(fs.readFileSync('public/assets/desk/desk_base.png'));

// Slice dimensions
const sliceWidth = 24;
const startY = 608;
const endY = 733; // inclusive
const sliceHeight = endY - startY + 1; // 126px

// Left slice
const leftSlice = new PNG({ width: sliceWidth, height: sliceHeight });
for (let y = 0; y < sliceHeight; y++) {
  for (let x = 0; x < sliceWidth; x++) {
    const srcIdx = ((startY + y) * db.width + x) * 4;
    const destIdx = (y * sliceWidth + x) * 4;
    leftSlice.data[destIdx] = db.data[srcIdx];
    leftSlice.data[destIdx+1] = db.data[srcIdx+1];
    leftSlice.data[destIdx+2] = db.data[srcIdx+2];
    leftSlice.data[destIdx+3] = db.data[srcIdx+3];
  }
}
fs.writeFileSync('public/assets/desk/tabletop_slice_left.png', PNG.sync.write(leftSlice));
console.log('Saved public/assets/desk/tabletop_slice_left.png (24x126)');

// Right slice
const rightSlice = new PNG({ width: sliceWidth, height: sliceHeight });
for (let y = 0; y < sliceHeight; y++) {
  for (let x = 0; x < sliceWidth; x++) {
    const srcX = (db.width - sliceWidth) + x;
    const srcIdx = ((startY + y) * db.width + srcX) * 4;
    const destIdx = (y * sliceWidth + x) * 4;
    rightSlice.data[destIdx] = db.data[srcIdx];
    rightSlice.data[destIdx+1] = db.data[srcIdx+1];
    rightSlice.data[destIdx+2] = db.data[srcIdx+2];
    rightSlice.data[destIdx+3] = db.data[srcIdx+3];
  }
}
fs.writeFileSync('public/assets/desk/tabletop_slice_right.png', PNG.sync.write(rightSlice));
console.log('Saved public/assets/desk/tabletop_slice_right.png (24x126)');
