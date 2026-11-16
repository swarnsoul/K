const fs = require('fs');
const sharp = require('sharp');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');

async function compareImages(img1Path, img2Path, outDiffPath, width, height) {
  const b1 = await sharp(img1Path).resize(width, height, { fit: 'fill' }).ensureAlpha().raw().toBuffer();
  const b2 = await sharp(img2Path).resize(width, height, { fit: 'fill' }).ensureAlpha().raw().toBuffer();

  const diffPng = new PNG({ width, height });
  const pm = pixelmatch.default || pixelmatch;
  const mismatched = pm(b1, b2, diffPng.data, width, height, { threshold: 0.1, alpha: 0.5 });
  const total = width * height;
  const similarity = 1 - (mismatched / total);

  if (outDiffPath) {
    fs.writeFileSync(outDiffPath, PNG.sync.write(diffPng));
  }

  return { similarity, mismatched, total };
}

async function run() {
  // Arrow comparison
  const arrowComp = await compareImages(
    'scripts/diff_results/test_arrow_rendered.png',
    'scripts/diff_results/figma_intro_arrow_render.png',
    'scripts/diff_results/arrow_diff.png',
    129,
    142
  );
  console.log('Arrow similarity:', arrowComp.similarity, 'mismatched:', arrowComp.mismatched);
}

run();
