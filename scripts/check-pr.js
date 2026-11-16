const fs = require('fs');
const { PNG } = require('pngjs');

const pr = PNG.sync.read(fs.readFileSync('public/assets/desk/plant_right.png'));
console.log('plant_right.png:', pr.width, pr.height);
// Check if plant_right is the pothos plant or what
console.log('plant_right size:', fs.statSync('public/assets/desk/plant_right.png').size);
