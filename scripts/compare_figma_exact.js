const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const ARTIFACT_DIR = path.resolve('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98');

// Load rendered screenshot at 1440
const renderedBuf = fs.readFileSync(path.join(ARTIFACT_DIR, 'fix3_desk_1440.png'));
const renderedImg = PNG.sync.read(renderedBuf);

// Load Figma reference for Frame 182 (step 5735 media_0.png)
const figmaRefBuf = fs.readFileSync('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/.system_generated/steps/5735/media_0.png');
const figmaImg = PNG.sync.read(figmaRefBuf);

console.log('Rendered:', renderedImg.width, 'x', renderedImg.height);
console.log('Figma Frame 182:', figmaImg.width, 'x', figmaImg.height);

// Frame 182 occupies top: 12.32% to 100% in renderedImg
const startY_rendered = Math.round(renderedImg.height * 0.123232);
const h_rendered_f182 = renderedImg.height - startY_rendered;

// 5 vertical bands across Frame 182
const bands = [
  { name: 'Band 1: Top Props (Pinboard, Lamp Upper, Pothos)', y0: 0.00, y1: 0.30 },
  { name: 'Band 2: Tabletop, Sunset Laptop, Candle, Clock', y0: 0.30, y1: 0.55 },
  { name: 'Band 3: Diary, Mug, Table Surface', y0: 0.55, y1: 0.72 },
  { name: 'Band 4: Desk Drawers & Side Panels', y0: 0.72, y1: 0.90 },
  { name: 'Band 5: Desk Legs & Gap', y0: 0.90, y1: 1.00 },
];

bands.forEach(b => {
  let diff = 0;
  let total = 0;
  const numY = 40;
  const numX = 100;

  for (let iy = 0; iy < numY; iy++) {
    const fracY = b.y0 + (b.y1 - b.y0) * (iy / numY);
    const yr = Math.floor(startY_rendered + h_rendered_f182 * fracY);
    const yf = Math.floor(figmaImg.height * fracY);

    for (let ix = 0; ix < numX; ix++) {
      const fracX = ix / numX;
      const xr = Math.floor(renderedImg.width * fracX);
      const xf = Math.floor(figmaImg.width * fracX);

      const idxR = (yr * renderedImg.width + xr) * 4;
      const idxF = (yf * figmaImg.width + xf) * 4;

      const dr = Math.abs(renderedImg.data[idxR] - figmaImg.data[idxF]);
      const dg = Math.abs(renderedImg.data[idxR+1] - figmaImg.data[idxF+1]);
      const db = Math.abs(renderedImg.data[idxR+2] - figmaImg.data[idxF+2]);

      total++;
      if (dr + dg + db > 40) diff++;
    }
  }

  const mismatch = ((diff / total) * 100).toFixed(2);
  console.log(`${b.name}: mismatch = ${mismatch}%`);
});
