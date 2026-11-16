const fs = require('fs');
const { PNG } = require('pngjs');

const on = PNG.sync.read(fs.readFileSync('public/assets/desk/lamp_on.png'));
const off = PNG.sync.read(fs.readFileSync('public/assets/desk/lamp_off.png'));
console.log('on dimensions:', on.width, on.height);
console.log('off dimensions:', off.width, off.height);

// Check if they have transparent pixels or white background
let onTransparent = 0, onWhite = 0;
for (let i = 0; i < on.data.length; i += 4) {
  if (on.data[i+3] === 0) onTransparent++;
  if (on.data[i] > 250 && on.data[i+1] > 250 && on.data[i+2] > 250) onWhite++;
}
console.log('on transparent:', onTransparent, 'on white-ish:', onWhite, 'total:', on.width*on.height);

let offTransparent = 0, offWhite = 0;
for (let i = 0; i < off.data.length; i += 4) {
  if (off.data[i+3] === 0) offTransparent++;
  if (off.data[i] > 250 && off.data[i+1] > 250 && off.data[i+2] > 250) offWhite++;
}
console.log('off transparent:', offTransparent, 'off white-ish:', offWhite, 'total:', off.width*off.height);
