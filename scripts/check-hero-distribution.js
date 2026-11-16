const sharp = require('sharp');

async function checkHeroLeftRight() {
  const { data, info } = await sharp('scripts/figma_sections_influcrush/02_hero_intro.png').raw().toBuffer({ resolveWithObject: true });
  // check average darkness across horizontal slices
  const colDarkness = new Array(info.width).fill(0);
  for (let x = 0; x < info.width; x++) {
    for (let y = 0; y < info.height; y++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // if dark text pixel
      if (r < 150 && g < 150 && b < 150) {
        colDarkness[x]++;
      }
    }
  }
  
  // Find where the bulk of dark pixels are
  const leftHalf = colDarkness.slice(0, Math.floor(info.width / 2)).reduce((a,b)=>a+b, 0);
  const rightHalf = colDarkness.slice(Math.floor(info.width / 2)).reduce((a,b)=>a+b, 0);
  console.log(`InfluCrush Hero Intro: left half dark pixels = ${leftHalf}, right half dark pixels = ${rightHalf}`);
}

checkHeroLeftRight();
