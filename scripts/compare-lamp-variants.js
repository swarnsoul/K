const sharp = require('sharp');
const fs = require('fs');

async function main() {
  const on = await sharp('scripts/desk_refs/lamp_variant_image67.png').raw().toBuffer();
  const off = await sharp('scripts/desk_refs/lamp_variant_image72.png').raw().toBuffer();
  const meta = await sharp('scripts/desk_refs/lamp_variant_image67.png').metadata();

  const diff = Buffer.alloc(on.length);
  let changedPixels = 0;

  for (let i = 0; i < on.length; i += 4) {
    const dr = Math.abs(on[i] - off[i]);
    const dg = Math.abs(on[i+1] - off[i+1]);
    const db = Math.abs(on[i+2] - off[i+2]);
    const da = Math.abs(on[i+3] - off[i+3]);
    if (dr > 5 || dg > 5 || db > 5 || da > 5) {
      changedPixels++;
      diff[i] = 255;
      diff[i+1] = 0;
      diff[i+2] = 0;
      diff[i+3] = 255;
    } else {
      diff[i] = on[i] / 4;
      diff[i+1] = on[i+1] / 4;
      diff[i+2] = on[i+2] / 4;
      diff[i+3] = on[i+3];
    }
  }

  console.log('Lamp ON/OFF comparison:');
  console.log(`Dimensions: ${meta.width} x ${meta.height}`);
  console.log(`Total pixels: ${meta.width * meta.height}`);
  console.log(`Changed pixels: ${changedPixels} (${((changedPixels / (meta.width * meta.height)) * 100).toFixed(1)}%)`);

  await sharp(diff, { raw: { width: meta.width, height: meta.height, channels: 4 } })
    .png()
    .toFile('scripts/desk_refs/lamp_diff.png');
  console.log('Saved scripts/desk_refs/lamp_diff.png');
}

main().catch(console.error);
