const sharp = require('sharp');

async function checkOverlay() {
  const refBuf = await sharp('scripts/figma_refs/card_1.png').ensureAlpha().raw().toBuffer();
  const rendBuf = await sharp('scripts/diff_results/card_1_padded_aligned.png').ensureAlpha().raw().toBuffer();

  // Print text location in ref vs rend
  // Text in Card 1: "I always dreamed of becoming an engineer from IIT."
  // Color of "I": #3d2b0e -> r: 61, g: 43, b: 14
  // Color of "IIT.": #da156a -> r: 218, g: 21, b: 106

  function findText(buf, name) {
    let count = 0, sumX = 0, sumY = 0;
    for (let y = 0; y < 250; y++) {
      for (let x = 0; x < 398; x++) {
        const idx = (y * 398 + x) * 4;
        const r = buf[idx], g = buf[idx+1], b = buf[idx+2];
        if (r < 80 && g < 60 && b < 40) { // dark brown text
          count++;
          sumX += x;
          sumY += y;
        }
      }
    }
    console.log(`${name}: dark text count=${count}, center=(${sumX/count}, ${sumY/count})`);
  }

  findText(refBuf, 'Ref card_1');
  findText(rendBuf, 'Rend card_1');
}
checkOverlay();
