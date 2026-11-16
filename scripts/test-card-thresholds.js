const sharp = require('sharp');
const pm = require('pixelmatch').default || require('pixelmatch');
const { PNG } = require('pngjs');

async function testThresholds() {
  const cardList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (const num of cardList) {
    const renPath = `scripts/diff_results/card_${num}_rendered.png`;
    const refPath = `scripts/figma_refs/card_${num}.png`;
    const b1 = await sharp(renPath).ensureAlpha().raw().toBuffer();
    const b2 = await sharp(refPath).ensureAlpha().raw().toBuffer();
    const meta = await sharp(refPath).metadata();
    const w = meta.width, h = meta.height;
    
    const diff1 = new PNG({ width: w, height: h });
    const diff2 = new PNG({ width: w, height: h });
    const diff3 = new PNG({ width: w, height: h });
    const m1 = pm(b1, b2, diff1.data, w, h, { threshold: 0.1 });
    const m2 = pm(b1, b2, diff2.data, w, h, { threshold: 0.15 });
    const m3 = pm(b1, b2, diff3.data, w, h, { threshold: 0.2 });
    console.log(`card_${num}: t=0.1 -> ${(1 - m1/(w*h)).toFixed(4)}, t=0.15 -> ${(1 - m2/(w*h)).toFixed(4)}, t=0.2 -> ${(1 - m3/(w*h)).toFixed(4)}`);
  }
}
testThresholds();
