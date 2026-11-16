const fs = require('fs');
const { PNG } = require('pngjs');

// Compare the actual rendered lamp against Figma lamp on the opaque pixels
const renderedOn = PNG.sync.read(fs.readFileSync('scripts/verify_results/desk_1440_default.png'));
const figmaRef = PNG.sync.read(fs.readFileSync('scripts/fresh_refs/frame182_desk_scene.png'));

console.log('renderedOn:', renderedOn.width, 'x', renderedOn.height);
console.log('figmaRef:', figmaRef.width, 'x', figmaRef.height);

// In frame182_desk_scene, let's compare the lamp region:
// Lamp is at x=975..1393, y=146..530 (in 1439x868 coords)
// In figmaRef (1024x618), scale coords:
const sx = figmaRef.width / 1439;
const sy = figmaRef.height / 868;

const lampX1 = Math.floor(975 * sx);
const lampX2 = Math.floor((975 + 418) * sx);
const lampY1 = Math.floor(146 * sy);
const lampY2 = Math.floor((146 + 384) * sy);

console.log(`Lamp region in figmaRef: [${lampX1}, ${lampY1}] to [${lampX2}, ${lampY2}]`);

let match = 0, total = 0;
for (let y = lampY1; y < lampY2; y++) {
  for (let x = lampX1; x < lampX2; x++) {
    const rx = Math.floor(x * (renderedOn.width / figmaRef.width));
    const ry = Math.floor(y * (renderedOn.height / figmaRef.height));

    const idxR = (ry * renderedOn.width + rx) * 4;
    const idxF = (y * figmaRef.width + x) * 4;

    const dr = Math.abs(renderedOn.data[idxR] - figmaRef.data[idxF]);
    const dg = Math.abs(renderedOn.data[idxR+1] - figmaRef.data[idxF+1]);
    const db = Math.abs(renderedOn.data[idxR+2] - figmaRef.data[idxF+2]);

    total++;
    if (dr <= 30 && dg <= 30 && db <= 30) {
      match++;
    }
  }
}
console.log(`Lamp region similarity vs Figma frame: ${(match / total * 100).toFixed(2)}% (${match}/${total})`);

// Now compare Diary region in default state:
// Diary is at x=197..482, y=480..670
const diaryX1 = Math.floor(197 * sx);
const diaryX2 = Math.floor((197 + 285) * sx);
const diaryY1 = Math.floor(480 * sy);
const diaryY2 = Math.floor((480 + 190) * sy);

let dMatch = 0, dTotal = 0;
for (let y = diaryY1; y < diaryY2; y++) {
  for (let x = diaryX1; x < diaryX2; x++) {
    const rx = Math.floor(x * (renderedOn.width / figmaRef.width));
    const ry = Math.floor(y * (renderedOn.height / figmaRef.height));

    const idxR = (ry * renderedOn.width + rx) * 4;
    const idxF = (y * figmaRef.width + x) * 4;

    const dr = Math.abs(renderedOn.data[idxR] - figmaRef.data[idxF]);
    const dg = Math.abs(renderedOn.data[idxR+1] - figmaRef.data[idxF+1]);
    const db = Math.abs(renderedOn.data[idxR+2] - figmaRef.data[idxF+2]);

    dTotal++;
    if (dr <= 30 && dg <= 30 && db <= 30) {
      dMatch++;
    }
  }
}
console.log(`Diary region similarity vs Figma frame: ${(dMatch / dTotal * 100).toFixed(2)}% (${dMatch}/${dTotal})`);
