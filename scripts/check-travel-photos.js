const sharp = require('sharp');
const fs = require('fs');

async function checkAllTravelPhotos() {
  for (let i = 1; i <= 7; i++) {
    const f = `scripts/detailed_refs/travel_photo_${i}.png`;
    const meta = await sharp(f).metadata();
    console.log(`Photo ${i} (${f}): ${meta.width} x ${meta.height}`);
  }
}
checkAllTravelPhotos();
