const fs = require('fs');
const { PNG } = require('pngjs');

function analyze(filePath) {
  const data = fs.readFileSync(filePath);
  const png = PNG.sync.read(data);
  let opaque = 0, transparent = 0;
  for (let i = 3; i < png.data.length; i += 4) {
    if (png.data[i] > 10) opaque++;
    else transparent++;
  }
  console.log(`${filePath}: ${png.width}x${png.height}, opaque: ${opaque}, transparent: ${transparent}`);
  return png;
}

analyze('scripts/desk_isolated/image65_glow.png');
analyze('scripts/desk_isolated/image66_plant_right.png');
analyze('scripts/desk_isolated/lamp_on_symbol.png');
analyze('scripts/desk_isolated/lamp_off_symbol.png');
