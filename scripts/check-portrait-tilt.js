const sharp = require('sharp');

async function checkPortraitTilt() {
  const buf = await sharp('scripts/figma_refs/portrait_frame.png').ensureAlpha().raw().toBuffer();
  // Find top edge of photo at x1 = 150 and x2 = 350
  function findTopY(x) {
    for (let y = 0; y < 540; y++) {
      const idx = (y * 540 + x) * 4;
      const r = buf[idx], g = buf[idx+1], b = buf[idx+2];
      if (r < 240 || g < 240 || b < 240) return y;
    }
    return -1;
  }
  const y1 = findTopY(150);
  const y2 = findTopY(350);
  const dy = y2 - y1;
  const angle = (Math.atan2(dy, 200) * 180 / Math.PI).toFixed(2);
  console.log(`Portrait: y1(x=150)=${y1}, y2(x=350)=${y2}, dy=${dy} -> angle = ${angle} deg (Code had -10.54 deg)`);
}
checkPortraitTilt();
