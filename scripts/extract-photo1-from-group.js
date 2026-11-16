const sharp = require('sharp');

async function extractPhoto1FromGroup() {
  const gMeta = await sharp('scripts/detailed_refs/travel_group22.png').metadata();
  console.log('Group 22 meta:', gMeta);

  // In Group 22, Photo 1 is at x: 77 + padding, y: 58 + padding, w: 188, h: 246
  // Let's crop x: 70 to 280, y: 50 to 320
  await sharp('scripts/detailed_refs/travel_group22.png')
    .extract({ left: 70, top: 50, width: 210, height: 270 })
    .toFile('scripts/diff_results/photo_1_from_group22.png');
  console.log('Saved photo_1_from_group22.png');
}
extractPhoto1FromGroup();
