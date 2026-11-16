const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const dir = 'scripts/fresh_refs';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

for (const file of files) {
  const p = path.join(dir, file);
  const png = PNG.sync.read(fs.readFileSync(p));
  let opaque = 0, transparent = 0;
  for (let i = 3; i < png.data.length; i += 4) {
    if (png.data[i] > 10) opaque++;
    else transparent++;
  }
  console.log(`${file}: ${png.width}x${png.height}, opaque: ${opaque}, transparent: ${transparent}`);
}
