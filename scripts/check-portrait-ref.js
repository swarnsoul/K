const sharp = require('sharp');

async function checkPortraitRef() {
  const meta = await sharp('scripts/figma_refs/portrait_frame.png').metadata();
  console.log('portrait_frame ref metadata:', meta);
}
checkPortraitRef();
