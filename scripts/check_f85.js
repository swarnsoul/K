const fs = require('fs');
const { PNG } = require('pngjs');

const buf = fs.readFileSync('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/.system_generated/steps/5737/media_0.png');
const img = PNG.sync.read(buf);
console.log('Frame 85 screenshot w:', img.width, 'h:', img.height);

// Check center pixel
const idx = (Math.round(img.height / 2) * img.width + Math.round(img.width / 2)) * 4;
console.log('Center pixel RGBA:', img.data[idx], img.data[idx+1], img.data[idx+2], img.data[idx+3]);
// Check top left pixel
console.log('Top left RGBA:', img.data[0], img.data[1], img.data[2], img.data[3]);
