const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const _pixelmatch = require('pixelmatch');
const pixelmatch = _pixelmatch.default || _pixelmatch;
const { PNG } = require('pngjs');

const diffDir = path.resolve('scripts/diff_results');
if (!fs.existsSync(diffDir)) {
  fs.mkdirSync(diffDir, { recursive: true });
}

const elementsToTest = [
  { id: '223:125', name: 'about_me', ref: 'scripts/figma_refs/about_me.png' },
  { id: '223:143', name: 'portrait_frame', ref: 'scripts/figma_refs/portrait_frame.png' },
  { id: '243:820', name: 'intro_note', ref: 'scripts/figma_refs/intro_note.png' },
  { id: '243:821', name: 'intro_arrow', ref: 'scripts/figma_refs/intro_arrow.png' },
  { id: '233:696', name: 'card_1', ref: 'scripts/figma_refs/card_1.png' },
  { id: '233:716', name: 'card_2', ref: 'scripts/figma_refs/card_2.png' },
  { id: '233:731', name: 'card_3', ref: 'scripts/figma_refs/card_3.png' },
  { id: '233:745', name: 'card_4', ref: 'scripts/figma_refs/card_4.png' },
  { id: '233:705', name: 'card_5', ref: 'scripts/figma_refs/card_5.png' },
  { id: '239:764', name: 'card_6', ref: 'scripts/figma_refs/card_6.png' },
  { id: '239:776', name: 'card_7', ref: 'scripts/figma_refs/card_7.png' },
  { id: '239:788', name: 'card_8', ref: 'scripts/figma_refs/card_8.png' },
  { id: '243:807', name: 'card_9', ref: 'scripts/figma_refs/card_9.png' },
  { id: '255:887', name: 'travel_section', ref: 'scripts/figma_refs/travel_section.png' },
  { id: '257:888', name: 'art_section', ref: 'scripts/figma_refs/art_section.png' },
  { id: '265:96',  name: 'closing_section', ref: 'scripts/figma_refs/closing_section.png' },
];

async function run() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Capture full page screenshot
  const fullPagePath = path.join(diffDir, 'page_1440_full.png');
  await page.screenshot({ path: fullPagePath, fullPage: true });
  console.log('Saved full page screenshot:', fullPagePath);

  const report = [];

  for (const item of elementsToTest) {
    const el = await page.$(`[data-figma-id="${item.id}"]`);
    if (!el) {
      console.log(`Element ${item.name} (${item.id}) not found!`);
      report.push({ name: item.name, status: 'NOT_FOUND' });
      continue;
    }

    const box = await el.boundingBox();
    const renderedPath = path.join(diffDir, `${item.name}_rendered.png`);

    if (fs.existsSync(item.ref)) {
      const refMeta = await sharp(item.ref).metadata();
      const isCard = item.name.startsWith('card_');

      let rendBuf;
      let targetW = refMeta.width;
      let targetH = refMeta.height;

      if (isCard) {
        // Center-aligned capture matching ref image dimensions
        const clipX = Math.round(box.x + box.width / 2 - targetW / 2);
        const clipY = Math.round(box.y + box.height / 2 - targetH / 2);

        await page.screenshot({
          path: renderedPath,
          clip: {
            x: Math.max(0, clipX),
            y: Math.max(0, clipY),
            width: targetW,
            height: targetH
          }
        });

        rendBuf = await sharp(renderedPath).ensureAlpha().raw().toBuffer();
      } else {
        await el.screenshot({ path: renderedPath });
        const rendMeta = await sharp(renderedPath).metadata();

        if (rendMeta.width !== targetW || rendMeta.height !== targetH) {
          rendBuf = await sharp(renderedPath)
            .resize(targetW, targetH, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
            .ensureAlpha()
            .raw()
            .toBuffer();
        } else {
          rendBuf = await sharp(renderedPath).ensureAlpha().raw().toBuffer();
        }
      }

      const refBuf = await sharp(item.ref)
        .ensureAlpha()
        .raw()
        .toBuffer();

      const diffPng = new PNG({ width: targetW, height: targetH });
      const numDiffPixels = pixelmatch(refBuf, rendBuf, diffPng.data, targetW, targetH, { threshold: 0.15 });
      const totalPixels = targetW * targetH;
      const mismatchPct = ((numDiffPixels / totalPixels) * 100).toFixed(2);

      fs.writeFileSync(path.join(diffDir, `${item.name}_diff.png`), PNG.sync.write(diffPng));

      // Create overlay image (ref at 50% opacity over rendered)
      const overlay = await sharp(rendBuf, { raw: { width: targetW, height: targetH, channels: 4 } })
        .composite([{
          input: await sharp(item.ref)
            .resize(targetW, targetH, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
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

      fs.writeFileSync(path.join(diffDir, `${item.name}_overlay.png`), overlay);

      console.log(`[DIFF] ${item.name}: ${mismatchPct}% mismatch (${numDiffPixels}/${totalPixels} px), ref: ${refMeta.width}x${refMeta.height}`);
      report.push({
        name: item.name,
        mismatchPct: parseFloat(mismatchPct),
        refSize: `${refMeta.width}x${refMeta.height}`,
      });
    }
  }

  await browser.close();
  fs.writeFileSync(path.join(diffDir, 'report.json'), JSON.stringify(report, null, 2));
  console.log('Comparison complete!');
}

run();
