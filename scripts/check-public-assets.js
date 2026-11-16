const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const dir = 'public/assets/desk';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

for (const file of files) {
  const p = path.join(dir, file);
  const png = PNG.sync.read(fs.readFileSync(p));
  let transparent = 0, opaque = 0;
  for (let i = 3; i < png.data.length; i += 4) {
    if (png.data[i] === 0) transparent++;
    else opaque++;
  }
  console.log(`${file}: ${png.width}x${png.height}, transparent: ${transparent} (${(transparent/(png.width*png.height)*100).toFixed(1)}%)`);
}
