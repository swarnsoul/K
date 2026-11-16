const fs = require('fs');
const { PNG } = require('pngjs');

// Create visual diff image between lamp_on and lamp_off
const on = PNG.sync.read(fs.readFileSync('scripts/fresh_refs/lamp_on.png'));
const off = PNG.sync.read(fs.readFileSync('scripts/fresh_refs/lamp_off.png'));
const diff = new PNG({ width: on.width, height: on.height });

for (let i = 0; i < on.data.length; i += 4) {
  const dr = Math.abs(on.data[i] - off.data[i]);
  const dg = Math.abs(on.data[i+1] - off.data[i+1]);
  const db = Math.abs(on.data[i+2] - off.data[i+2]);
  const da = Math.abs(on.data[i+3] - off.data[i+3]);
  const totalDiff = dr + dg + db + da;
  if (totalDiff > 20) {
    diff.data[i] = 255; // Red
    diff.data[i+1] = 0;
    diff.data[i+2] = 0;
    diff.data[i+3] = 255;
  } else {
    diff.data[i] = on.data[i];
    diff.data[i+1] = on.data[i+1];
    diff.data[i+2] = on.data[i+2];
    diff.data[i+3] = Math.floor(on.data[i+3] * 0.3);
  }
}

fs.writeFileSync('scripts/lamp_diff_visual.png', PNG.sync.write(diff));
console.log('Saved scripts/lamp_diff_visual.png');
