const sharp = require('sharp');

async function main() {
  const meta68 = await sharp('scripts/desk_refs/diary_variant_image68.png').metadata();
  const meta69 = await sharp('scripts/desk_refs/diary_variant_image69.png').metadata();
  console.log('Diary 68:', meta68.width, 'x', meta68.height);
  console.log('Diary 69:', meta69.width, 'x', meta69.height);

  // Crop top-left of each to check header / title area
  await sharp('scripts/desk_refs/diary_variant_image68.png')
    .extract({ left: 30, top: 20, width: 120, height: 60 })
    .png()
    .toFile('scripts/desk_refs/diary68_header.png');
  console.log('Saved diary68_header.png');

  // Let's also check if diary 69 is larger because of pen or rotation
}
main().catch(console.error);
