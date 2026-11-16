const fs = require('fs');
const { PNG } = require('pngjs');

function analyze(filePath) {
  const data = fs.readFileSync(filePath);
  const png = PNG.sync.read(data);
  console.log(`${filePath}: ${png.width}x${png.height}`);
  return png;
}

const onPng = analyze('scripts/fresh_refs/lamp_on.png');
const offPng = analyze('scripts/fresh_refs/lamp_off.png');
const plantPng = analyze('scripts/fresh_refs/plant_right.png');
const glowPng = analyze('scripts/fresh_refs/lamp_glow.png');
const instPng = analyze('scripts/fresh_refs/lamp_instance.png');

// Check difference between lamp_on and lamp_off
let diffPixels = 0;
let totalPixels = onPng.width * onPng.height;
for (let i = 0; i < onPng.data.length; i += 4) {
  const rDiff = Math.abs(onPng.data[i] - offPng.data[i]);
  const gDiff = Math.abs(onPng.data[i+1] - offPng.data[i+1]);
  const bDiff = Math.abs(onPng.data[i+2] - offPng.data[i+2]);
  const aDiff = Math.abs(onPng.data[i+3] - offPng.data[i+3]);
  if (rDiff > 5 || gDiff > 5 || bDiff > 5 || aDiff > 5) {
    diffPixels++;
  }
}
console.log(`Diff pixels between lamp_on and lamp_off: ${diffPixels} / ${totalPixels} (${(diffPixels/totalPixels*100).toFixed(2)}%)`);
