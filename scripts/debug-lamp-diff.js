const fs = require('fs');
const { PNG } = require('pngjs');

const p1 = PNG.sync.read(fs.readFileSync('scripts/fresh_refs/lamp_instance.png'));
const p2 = PNG.sync.read(fs.readFileSync('scripts/fresh_refs/lamp_on.png'));

console.log('p1 (563:928 instance):', p1.width, p1.height);
console.log('p2 (546:942 symbol):', p2.width, p2.height);

// Sample 5 pixels
for (let y = 150; y < 160; y += 2) {
  for (let x = 150; x < 160; x += 2) {
    const idx = (y * 418 + x) * 4;
    console.log(`[${x},${y}]: p1=(${p1.data[idx]},${p1.data[idx+1]},${p1.data[idx+2]},${p1.data[idx+3]}) vs p2=(${p2.data[idx]},${p2.data[idx+1]},${p2.data[idx+2]},${p2.data[idx+3]})`);
  }
}
