const fs = require('fs');
const { PNG } = require('pngjs');

const buf = fs.readFileSync('scripts/fresh_desk_base.png');
const img = PNG.sync.read(buf);
console.log('fresh_desk_base w:', img.width, 'h:', img.height);

// In fresh_desk_base, let's look at the left leg columns (x ~ 100 to 150) from bottom up
for (let y = img.height - 30; y < img.height; y++) {
  let alphaSum = 0;
  for (let x = 0; x < img.width; x++) {
    const a = img.data[(y * img.width + x) * 4 + 3];
    if (a > 10) alphaSum++;
  }
  console.log(`y=${y}: non-transparent pixels=${alphaSum}`);
}
