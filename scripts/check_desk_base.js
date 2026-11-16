const fs = require('fs');
const { PNG } = require('pngjs');

const buf = fs.readFileSync('public/assets/desk/desk_base.png');
const img = PNG.sync.read(buf);
console.log('desk_base w:', img.width, 'h:', img.height);

for (let y = img.height - 25; y < img.height; y++) {
  let nonTrans = 0;
  for (let x = 0; x < img.width; x++) {
    const idx = (y * img.width + x) * 4;
    const a = img.data[idx+3];
    if (a > 10) nonTrans++;
  }
  console.log(`row ${y} (from bottom ${img.height - 1 - y}): nonTrans=${nonTrans}`);
}
