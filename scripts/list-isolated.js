const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const dir = 'scripts/desk_isolated';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

for (const file of files) {
  const p = path.join(dir, file);
  const png = PNG.sync.read(fs.readFileSync(p));
  console.log(`${file}: ${png.width}x${png.height}`);
}
