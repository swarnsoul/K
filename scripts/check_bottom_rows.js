const fs = require('fs');
const { PNG } = require('pngjs');

const buf = fs.readFileSync('scripts/fresh_desk_base.png');
const img = PNG.sync.read(buf);

// Look at rows 900 to 1024
for (let y = 900; y < img.height; y += 10) {
  let count = 0;
  for (let x = 0; x < img.width; x++) {
    if (img.data[(y*img.width+x)*4+3] > 10) count++;
  }
  console.log(`y=${y}: nonTrans=${count}`);
}
