const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const specs = [
  // Travel
  { ref: 'travel_1.png', out: 'travel-1.png', left: 10, top: 10, width: 188, height: 246 },
  { ref: 'travel_2.png', out: 'travel-2.png', left: 10, top: 10, width: 245, height: 326 },
  { ref: 'travel_3.png', out: 'travel-3.png', left: 10, top: 10, width: 272, height: 231 },
  { ref: 'travel_4.png', out: 'travel-4.png', left: 20, top: 20, width: 307, height: 337 },
  { ref: 'travel_5.png', out: 'travel-5.png', left: 10, top: 10, width: 204, height: 271 },
  { ref: 'travel_6.png', out: 'travel-6.png', left: 20, top: 20, width: 218, height: 291 },
  { ref: 'travel_7.png', out: 'travel-7.png', left: 20, top: 20, width: 178, height: 237 },
  // Art
  { ref: 'art_1.png', out: 'art-1.png', left: 20, top: 20, width: 195, height: 331 },
  { ref: 'art_2.png', out: 'art-2.png', left: 20, top: 20, width: 196, height: 348 },
  { ref: 'art_3.png', out: 'art-3.png', left: 20, top: 20, width: 196, height: 348 },
  { ref: 'art_4.png', out: 'art-4.png', left: 20, top: 20, width: 196, height: 348 },
  // Cards
  { ref: 'card_1_img.png', out: 'card-1.png', left: 0, top: 0, width: 124, height: 103 },
  { ref: 'card_2_img.png', out: 'card-2.png', left: 0, top: 0, width: 154, height: 136 },
  { ref: 'card_3_img.png', out: 'card-3.png', left: 0, top: 0, width: 210, height: 210 },
  { ref: 'card_4_img.png', out: 'card-4.png', left: 0, top: 0, width: 187, height: 170 },
  { ref: 'card_5_img.png', out: 'card-5.png', left: 0, top: 0, width: 200, height: 233 },
  { ref: 'card_6_img.png', out: 'card-6.png', left: 0, top: 0, width: 226, height: 157 },
  { ref: 'card_7_img.png', out: 'card-7.png', left: 0, top: 0, width: 184, height: 204 },
  { ref: 'card_8_img.png', out: 'card-8.png', left: 0, top: 0, width: 212, height: 186 },
  { ref: 'card_9_img.png', out: 'card-9.png', left: 0, top: 0, width: 160, height: 178 },
  // Portrait
  { ref: 'portrait_inner.png', out: 'portrait.png', left: 20, top: 18, width: 337, height: 337 }
];

async function extractAll() {
  for (const s of specs) {
    const src = path.join('scripts/node_renders', s.ref);
    const dst = path.join('public/assets/about', s.out);
    const meta = await sharp(src).metadata();
    
    const w = Math.min(s.width, meta.width);
    const h = Math.min(s.height, meta.height);
    const l = Math.max(0, Math.min(s.left, meta.width - w));
    const t = Math.max(0, Math.min(s.top, meta.height - h));

    await sharp(src)
      .extract({ left: l, top: t, width: w, height: h })
      .toFile(dst);
    console.log('Extracted', s.out, w + 'x' + h);
  }
}
extractAll();
