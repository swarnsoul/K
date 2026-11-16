const sharp = require('sharp');
const fs = require('fs');

async function findCrop() {
  const nodeShot = await sharp('scripts/detailed_refs/travel_photo_1.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const asset = await sharp('scripts/detailed_refs/imgImage32_new.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  console.log('Node shot:', nodeShot.info.width, 'x', nodeShot.info.height);
  console.log('Asset:', asset.info.width, 'x', asset.info.height);

  // In travel_photo_1.png, let's find the inner photo bounds (inside the 10px rounded white border)
  // Let's sample a small patch of photo from nodeShot, say 40x40 from center:
  // Center is (104, 133)
  const patchW = 40, patchH = 40;
  const startX = 84, startY = 113;

  // Let's test different scale factors between nodeShot and asset:
  // The box in Figma is w = 187.696, h = 245.654
  // The asset is 459 x 1024
  // If object-fit: cover, scale = max(187.7/459, 245.65/1024) = max(0.4089, 0.2399) = 0.4089
  // With 0.4089, width = 187.7, height = 1024 * 0.4089 = 418.7 px!
  // BUT the user says:
  // "BUG 1: THE FIRST PHOTO (top-left of the collage, the girl standing in turquoise water) IS DISTORTED
  // - It is zoomed in, stretched, blurry, and the girl's head is cut off. In Figma the same photo shows the whole girl, in a smaller crop.
  // - Cause: the Figma image fill has its own crop/scale/offset (image transform), and you used a plain object-fit: cover, which ignores it."

  // Let's inspect the fill of node 223:146 in Figma metadata or manifest!
}
findCrop();
