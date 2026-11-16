const sharp = require('sharp');
const _pixelmatch = require('pixelmatch');
const pixelmatch = _pixelmatch.default || _pixelmatch;
const { PNG } = require('pngjs');

async function testBandShifts() {
  const pageImgPath = 'scripts/bands_diff/rendered_full.png';
  const rendScaledBuf = await sharp(pageImgPath)
    .resize(336, 1024, { fit: 'fill' })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const refBuf = await sharp('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/figma_ref_1440.png')
    .resize(336, 1024, { fit: 'fill' })
    .ensureAlpha()
    .raw()
    .toBuffer();

  // Test for band 2 (y from 102 to 204), band 3 (y from 204 to 306), band 4 (y from 306 to 408), band 5 (y from 408 to 512)
  const bands = [
    { b: 2, startY: 102, h: 102 },
    { b: 3, startY: 204, h: 102 },
    { b: 4, startY: 306, h: 102 },
    { b: 5, startY: 408, h: 102 },
  ];

  for (const band of bands) {
    let bestShift = 0, minDiff = Infinity;
    for (let shift = -30; shift <= 30; shift++) {
      let count = 0;
      for (let row = 10; row < band.h - 10; row++) {
        const refY = band.startY + row;
        const rendY = refY + shift;
        if (rendY < 0 || rendY >= 1024) continue;

        for (let col = 0; col < 336; col++) {
          const rIdx = (refY * 336 + col) * 4;
          const pIdx = (rendY * 336 + col) * 4;
          const dr = Math.abs(refBuf[rIdx] - rendScaledBuf[pIdx]);
          const dg = Math.abs(refBuf[rIdx+1] - rendScaledBuf[pIdx+1]);
          const db = Math.abs(refBuf[rIdx+2] - rendScaledBuf[pIdx+2]);
          if (dr > 25 || dg > 25 || db > 25) count++;
        }
      }
      if (count < minDiff) {
        minDiff = count;
        bestShift = shift;
      }
    }
    const shift1440 = Math.round(bestShift * 4401 / 1024);
    const total = (band.h - 20) * 336;
    console.log(`Band ${band.b}: best vertical shift = ${bestShift} px in 1024 space (${shift1440} px in 1440 space), min mismatch = ${(minDiff / total * 100).toFixed(2)}%`);
  }
}
testBandShifts();
