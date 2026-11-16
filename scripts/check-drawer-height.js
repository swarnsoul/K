const fs = require('fs');
const { PNG } = require('pngjs');

const db = PNG.sync.read(fs.readFileSync('public/assets/desk/desk_base.png'));

// Check columns x = 0..24
for (let y = 600; y < 870; y += 10) {
  const idx = (y * db.width + 12) * 4;
  console.log(`y=${y}: rgba(${db.data[idx]}, ${db.data[idx+1]}, ${db.data[idx+2]}, ${db.data[idx+3]})`);
}
