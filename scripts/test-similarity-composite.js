const fs = require('fs');
const { PNG } = require('pngjs');

function compareOverWhite(bufRendered, bufRef) {
  const p1 = PNG.sync.read(bufRendered);
  const p2 = PNG.sync.read(bufRef);
  const w = Math.min(p1.width, p2.width);
  const h = Math.min(p1.height, p2.height);

  let matchForeground = 0;
  let totalForeground = 0;
  let totalPixels = w * h;
  let allMatch = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const x1 = Math.floor(x * (p1.width / w));
      const y1 = Math.floor(y * (p1.height / h));
      const x2 = Math.floor(x * (p2.width / w));
      const y2 = Math.floor(y * (p2.height / h));

      const idx1 = (y1 * p1.width + x1) * 4;
      const idx2 = (y2 * p2.width + x2) * 4;

      // Composite over white
      const a1 = p1.data[idx1+3] / 255;
      const r1 = p1.data[idx1] * a1 + 255 * (1 - a1);
      const g1 = p1.data[idx1+1] * a1 + 255 * (1 - a1);
      const b1 = p1.data[idx1+2] * a1 + 255 * (1 - a1);

      const a2 = p2.data[idx2+3] / 255;
      const r2 = p2.data[idx2] * a2 + 255 * (1 - a2);
      const g2 = p2.data[idx2+1] * a2 + 255 * (1 - a2);
      const b2 = p2.data[idx2+2] * a2 + 255 * (1 - a2);

      const dr = Math.abs(r1 - r2);
      const dg = Math.abs(g1 - g2);
      const db = Math.abs(b1 - b2);

      if (dr <= 35 && dg <= 35 && db <= 35) {
        allMatch++;
      }

      // If either is foreground
      if (a1 > 0.1 || a2 > 0.1 || (p2.data[idx2] < 240 || p2.data[idx2+1] < 240 || p2.data[idx2+2] < 240)) {
        totalForeground++;
        if (dr <= 35 && dg <= 35 && db <= 35) {
          matchForeground++;
        }
      }
    }
  }

  return {
    allMatchScore: (allMatch / totalPixels),
    foregroundScore: totalForeground > 0 ? (matchForeground / totalForeground) : 1
  };
}

const lampOnShot = fs.readFileSync('scripts/fresh_refs/lamp_instance.png');
const figmaLampOn = fs.readFileSync('scripts/fresh_refs/lamp_on.png');
console.log('Lamp ON vs Figma:', compareOverWhite(lampOnShot, figmaLampOn));

const lampOffShot = fs.readFileSync('scripts/fresh_refs/lamp_off.png');
console.log('Lamp OFF vs Figma:', compareOverWhite(lampOffShot, figmaLampOn));

const diaryShot = fs.readFileSync('scripts/fresh_refs/diary_instance.png');
const figmaDiaryDefault = fs.readFileSync('scripts/fresh_refs/diary_v1_default.png');
console.log('Diary Default vs Figma:', compareOverWhite(diaryShot, figmaDiaryDefault));

const figmaDiaryHover = fs.readFileSync('scripts/fresh_refs/diary_v2_hover.png');
console.log('Diary Hover vs Figma:', compareOverWhite(figmaDiaryHover, figmaDiaryHover));
