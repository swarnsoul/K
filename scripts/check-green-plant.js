const fs = require('fs');
const { PNG } = require('pngjs');

const on = PNG.sync.read(fs.readFileSync('public/assets/desk/lamp_on.png'));
const off = PNG.sync.read(fs.readFileSync('public/assets/desk/lamp_off.png'));

// The plant behind the lamp is on the right side of the lamp image
// Let's sample colors in the region around x = 800..1100, y = 300..900
console.log('Sampling plant region in lamp_on and lamp_off...');

let onGreen = 0, offGreen = 0;
for (let y = 300; y < 900; y++) {
  for (let x = 700; x < 1100; x++) {
    const idxOn = (y * on.width + x) * 4;
    const idxOff = (y * off.width + x) * 4;
    // Check for green (g > r and g > b)
    if (on.data[idxOn+1] > on.data[idxOn] + 20 && on.data[idxOn+1] > on.data[idxOn+2]) onGreen++;
    if (off.data[idxOff+1] > off.data[idxOff] + 20 && off.data[idxOff+1] > off.data[idxOff+2]) offGreen++;
  }
}
console.log('lamp_on green pixels:', onGreen);
console.log('lamp_off green pixels:', offGreen);
