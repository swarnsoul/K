const fs = require('fs');
const { PNG } = require('pngjs');

const data = fs.readFileSync('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/figma_cursor_node_584_917.png');
const png = PNG.sync.read(data);

let minX = png.width, maxX = 0, minY = png.height, maxY = 0;
for (let y = 0; y < png.height; y++) {
  for (let x = 0; x < png.width; x++) {
    const idx = (y * png.width + x) * 4;
    const a = png.data[idx+3];
    if (a > 10) { // non-transparent
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

console.log(`Bounding box of content in Figma screenshot:`);
console.log(`X: ${minX} to ${maxX} (width: ${maxX - minX + 1})`);
console.log(`Y: ${minY} to ${maxY} (height: ${maxY - minY + 1})`);

// Crop to content
const cropped = new PNG({ width: maxX - minX + 1, height: maxY - minY + 1 });
PNG.bitblt(png, cropped, minX, minY, cropped.width, cropped.height, 0, 0);
fs.writeFileSync('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/figma_cursor_cropped.png', PNG.sync.write(cropped));
console.log('Saved figma_cursor_cropped.png');
