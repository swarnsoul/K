const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const _pixelmatch = require('pixelmatch');
const pixelmatch = _pixelmatch.default || _pixelmatch;
const { PNG } = require('pngjs');

const outDir = path.resolve('scripts/bands_diff');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function runDiff() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  const pageImgPath = path.join(outDir, 'rendered_full.png');
  await page.screenshot({ path: pageImgPath, fullPage: true });
  console.log('Saved rendered_full.png');
  await browser.close();

  const meta = await sharp(pageImgPath).metadata();
  console.log('Rendered size:', meta.width, 'x', meta.height);

  // Load the full Figma reference
  // Earlier we saved figma_ref_1440.png (336 x 1024)
  // Let's also compose full 1440-width reference from the section screenshots or compare bands
  // In figma_ref_1440.png, it represents the entire 1440x4401 frame scaled to 336x1024
  // Let's downscale rendered_full.png to 336x1024 to do global band diffs:
  const rendScaledBuf = await sharp(pageImgPath)
    .resize(336, 1024, { fit: 'fill' })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const refBuf = await sharp('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/figma_ref_1440.png')
    .resize(336, 1024, { fit: 'fill' })
    .ensureAlpha()
    .raw()
    .toBuffer();

  // Divide into 10 horizontal bands of ~100px each in the scaled image (~440px in 1440 space)
  const bandHeight = Math.floor(1024 / 10);
  const bandReport = [];

  for (let b = 0; b < 10; b++) {
    const startY = b * bandHeight;
    const h = (b === 9) ? (1024 - startY) : bandHeight;
    const bandPixels = 336 * h;

    const bandRef = Buffer.alloc(bandPixels * 4);
    const bandRend = Buffer.alloc(bandPixels * 4);

    for (let row = 0; row < h; row++) {
      const srcOffset = ((startY + row) * 336) * 4;
      const dstOffset = (row * 336) * 4;
      refBuf.copy(bandRef, dstOffset, srcOffset, srcOffset + 336 * 4);
      rendScaledBuf.copy(bandRend, dstOffset, srcOffset, srcOffset + 336 * 4);
    }

    const diffPng = new PNG({ width: 336, height: h });
    const diffCount = pixelmatch(bandRef, bandRend, diffPng.data, 336, h, { threshold: 0.1 });
    const mismatchPct = ((diffCount / bandPixels) * 100).toFixed(2);

    fs.writeFileSync(path.join(outDir, `band_${b+1}_diff.png`), PNG.sync.write(diffPng));

    // Create 50% overlay
    const overlay = await sharp(bandRend, { raw: { width: 336, height: h, channels: 4 } })
      .composite([{
        input: await sharp(bandRef, { raw: { width: 336, height: h, channels: 4 } })
          .composite([{
            input: Buffer.from([255, 255, 255, 128]),
            raw: { width: 1, height: 1, channels: 4 },
            tile: true,
            blend: 'dest-in'
          }])
          .png()
          .toBuffer()
      }])
      .png()
      .toBuffer();

    fs.writeFileSync(path.join(outDir, `band_${b+1}_overlay.png`), overlay);

    const bandYStart = Math.round(startY * (4401 / 1024));
    const bandYEnd = Math.round((startY + h) * (4401 / 1024));
    console.log(`Band ${b+1} (y: ${bandYStart}px - ${bandYEnd}px): ${mismatchPct}% mismatch (${diffCount}/${bandPixels} px)`);
    bandReport.push({
      band: b + 1,
      yRange: `${bandYStart}px - ${bandYEnd}px`,
      diffPixels: diffCount,
      totalPixels: bandPixels,
      mismatchPct: parseFloat(mismatchPct)
    });
  }

  fs.writeFileSync(path.join(outDir, 'band_report.json'), JSON.stringify(bandReport, null, 2));
  console.log('Band pixel diff loop complete!');
}

runDiff().catch(console.error);
