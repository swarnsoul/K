const puppeteer = require('puppeteer');
const fs = require('fs');
const sharp = require('sharp');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');

const pm = pixelmatch.default || pixelmatch;

async function run() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });

  // Reset rotation temporarily to capture the unrotated 337x337 component matching Figma's Component 27 variants
  await page.evaluate(() => {
    const el = document.querySelector('[data-figma-id="230:87"]');
    if (el) {
      el.style.transform = 'none';
      el.style.left = '0px';
      el.style.top = '0px';
      // put a neutral or matching dark background behind it if needed, or leave transparent
    }
  });

  // 1. Default state screenshot
  const el = await page.$('[data-figma-id="230:87"]');
  const defBuf = await el.screenshot({ omitBackground: true });
  fs.writeFileSync('scripts/diff_results/rendered_default_unrotated.png', defBuf);

  // 2. Hover state screenshot
  await page.evaluate(() => {
    const el = document.querySelector('[data-figma-id="230:87"]');
    // trigger hover state
    const defaultImg = el.querySelector('[data-name="image 27"]');
    const hoverImg = el.querySelector('[data-name="image 28"]');
    if (defaultImg) defaultImg.style.opacity = '0';
    if (hoverImg) hoverImg.style.opacity = '1';
  });
  await new Promise(r => setTimeout(r, 300));
  const hovBuf = await el.screenshot({ omitBackground: true });
  fs.writeFileSync('scripts/diff_results/rendered_hover_unrotated.png', hovBuf);

  await browser.close();

  // Compare Default
  const defRefMeta = await sharp('scripts/diff_results/variant_default_ref.png').metadata();
  console.log('defRefMeta:', defRefMeta);
  const defRenderedMeta = await sharp('scripts/diff_results/rendered_default_unrotated.png').metadata();
  console.log('defRenderedMeta:', defRenderedMeta);

  // Compare inner 310x310 (inside the rounded corners and shadow)
  const cw = 310, ch = 310;
  const defRefCrop = await sharp('scripts/diff_results/variant_default_ref.png')
    .extract({ left: 13, top: 13, width: cw, height: ch })
    .ensureAlpha()
    .raw()
    .toBuffer();
  const defRenCrop = await sharp('scripts/diff_results/rendered_default_unrotated.png')
    .resize(337, 337, { fit: 'fill' })
    .extract({ left: 13, top: 13, width: cw, height: ch })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const diffDef = new PNG({ width: cw, height: ch });
  const mismatchedDef = pm(defRenCrop, defRefCrop, diffDef.data, cw, ch, { threshold: 0.1 });
  const simDef = 1 - (mismatchedDef / (cw * ch));
  console.log('Default variant similarity (inner 310x310):', simDef, 'mismatched:', mismatchedDef);

  // Compare Hover
  const hovRefCrop = await sharp('scripts/diff_results/variant_hover_ref.png')
    .extract({ left: 13, top: 13, width: cw, height: ch })
    .ensureAlpha()
    .raw()
    .toBuffer();
  const hovRenCrop = await sharp('scripts/diff_results/rendered_hover_unrotated.png')
    .resize(337, 337, { fit: 'fill' })
    .extract({ left: 13, top: 13, width: cw, height: ch })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const diffHov = new PNG({ width: cw, height: ch });
  const mismatchedHov = pm(hovRenCrop, hovRefCrop, diffHov.data, cw, ch, { threshold: 0.1 });
  const simHov = 1 - (mismatchedHov / (cw * ch));
  console.log('Hover variant similarity (inner 310x310):', simHov, 'mismatched:', mismatchedHov);

  // Full 337x337 comparison
  const defRefFull = await sharp('scripts/diff_results/variant_default_ref.png')
    .ensureAlpha()
    .raw()
    .toBuffer();
  const defRenFull = await sharp('scripts/diff_results/rendered_default_unrotated.png')
    .resize(337, 337, { fit: 'fill' })
    .ensureAlpha()
    .raw()
    .toBuffer();
  const diffDefFull = new PNG({ width: 337, height: 337 });
  const mismDefFull = pm(defRenFull, defRefFull, diffDefFull.data, 337, 337, { threshold: 0.15 });
  console.log('Default full 337x337 similarity (threshold 0.15):', 1 - (mismDefFull / (337*337)), 'mismatched:', mismDefFull);

  const hovRefFull = await sharp('scripts/diff_results/variant_hover_ref.png')
    .ensureAlpha()
    .raw()
    .toBuffer();
  const hovRenFull = await sharp('scripts/diff_results/rendered_hover_unrotated.png')
    .resize(337, 337, { fit: 'fill' })
    .ensureAlpha()
    .raw()
    .toBuffer();
  const diffHovFull = new PNG({ width: 337, height: 337 });
  const mismHovFull = pm(hovRenFull, hovRefFull, diffHovFull.data, 337, 337, { threshold: 0.15 });
  console.log('Hover full 337x337 similarity (threshold 0.15):', 1 - (mismHovFull / (337*337)), 'mismatched:', mismHovFull);
}

run();
