const sharp = require('sharp');
const path = require('path');

const src = 'C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/.user_uploaded/media_1794842484329_f6ff871b.png';

async function run() {
  // crop arrow area
  await sharp(src)
    .extract({ left: 450, top: 50, width: 200, height: 150 })
    .toFile(path.join(__dirname, '../public/crop-arrow.png'));

  // crop behance area
  await sharp(src)
    .extract({ left: 350, top: 20, width: 250, height: 150 })
    .toFile(path.join(__dirname, '../public/crop-behance.png'));

  // crop badge area
  await sharp(src)
    .extract({ left: 50, top: 100, width: 400, height: 150 })
    .toFile(path.join(__dirname, '../public/crop-badge.png'));

  console.log('Done cropping');
}

run();
