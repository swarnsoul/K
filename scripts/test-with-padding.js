const puppeteer = require('puppeteer');
const sharp = require('sharp');
const _pixelmatch = require('pixelmatch');
const pixelmatch = _pixelmatch.default || _pixelmatch;
const { PNG } = require('pngjs');
const fs = require('fs');

async function testWithPadding() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });

  const el = await page.$('[data-figma-id="233:696"]');
  const box = await el.boundingBox();

  // Exactly aligned padding:
  const padLeft = 18;
  const padTop = 47;
  const clip = {
    x: Math.round(box.x - padLeft),
    y: Math.round(box.y - padTop),
    width: 398,
    height: 250
  };

  await page.screenshot({
    path: 'scripts/diff_results/card_1_padded_aligned.png',
    clip
  });
  await browser.close();

  const refBuf = await sharp('scripts/figma_refs/card_1.png').ensureAlpha().raw().toBuffer();
  const rendBuf = await sharp('scripts/diff_results/card_1_padded_aligned.png').ensureAlpha().raw().toBuffer();

  const diffPng = new PNG({ width: 398, height: 250 });
  const count = pixelmatch(refBuf, rendBuf, diffPng.data, 398, 250, { threshold: 0.15 });
  const pct = ((count / (398 * 250)) * 100).toFixed(2);
  console.log(`Card 1 PERFECT aligned diff: ${count}/99500 (${pct}%)`);

  fs.writeFileSync('scripts/diff_results/card_1_aligned_diff.png', PNG.sync.write(diffPng));
}

testWithPadding();
