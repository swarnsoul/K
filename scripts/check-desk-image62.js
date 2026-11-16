const sharp = require('sharp');

async function test() {
  const m1 = await sharp('scripts/desk_refs/desk_image62.png').raw().toBuffer();
  const meta1 = await sharp('scripts/desk_refs/desk_image62.png').metadata();

  const mAll = await sharp('scripts/desk_refs/desk_scene_frame182.png').raw().toBuffer();
  const metaAll = await sharp('scripts/desk_refs/desk_scene_frame182.png').metadata();

  console.log('image62:', meta1.width, 'x', meta1.height);
  console.log('frame182:', metaAll.width, 'x', metaAll.height);

  let diff = 0;
  for (let i = 0; i < m1.length; i += 4) {
    if (Math.abs(m1[i] - mAll[i]) > 10 || Math.abs(m1[i+1] - mAll[i+1]) > 10 || Math.abs(m1[i+2] - mAll[i+2]) > 10) {
      diff++;
    }
  }
  console.log('Difference between image62 and frame182:', diff, 'pixels out of', meta1.width * meta1.height);
}

test().catch(console.error);
