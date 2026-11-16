const puppeteer = require('puppeteer');
const sharp = require('sharp');
const fs = require('fs');
const pm = require('pixelmatch').default || require('pixelmatch');
const { PNG } = require('pngjs');

async function run() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // -------------------------------------------------------------
  // 1. Intro Arrow (node 243:821)
  // -------------------------------------------------------------
  const arrowEl = await page.$('[data-figma-id="243:821"]');
  const arrowBuf = await arrowEl.screenshot();
  fs.writeFileSync('scripts/diff_results/final_arrow_rendered.png', arrowBuf);

  const a1 = await sharp(arrowBuf).resize(129, 142, { fit: 'fill' }).ensureAlpha().raw().toBuffer();
  const a2 = await sharp('scripts/diff_results/figma_intro_arrow_render.png').resize(129, 142, { fit: 'fill' }).ensureAlpha().raw().toBuffer();
  const aDiff = new PNG({ width: 129, height: 142 });
  const aMismatched = pm(a1, a2, aDiff.data, 129, 142, { threshold: 0.1 });
  const arrowScore = 1 - (aMismatched / (129 * 142));

  // -------------------------------------------------------------
  // 2. Portrait (node 230:87 / Component 27 variants)
  // -------------------------------------------------------------
  // Un-rotate to capture the 337x337 component variant exactly as in Figma's Component 27
  await page.evaluate(() => {
    const el = document.querySelector('[data-figma-id="230:87"]');
    if (el) {
      el.style.transform = 'none';
      el.style.left = '0px';
      el.style.top = '0px';
      el.parentElement.style.backgroundColor = '#1c1c1c';
    }
  });

  const portEl = await page.$('[data-figma-id="230:87"]');

  // Default state screenshot
  const defBuf = await portEl.screenshot();
  fs.writeFileSync('scripts/diff_results/final_portrait_default_rendered.png', defBuf);
  const pDef1 = await sharp(defBuf).resize(337, 337, { fit: 'fill' }).ensureAlpha().raw().toBuffer();
  const pDef2 = await sharp('scripts/diff_results/variant_default_ref.png').resize(337, 337, { fit: 'fill' }).ensureAlpha().raw().toBuffer();
  const defDiff = new PNG({ width: 337, height: 337 });
  const defMismatched = pm(pDef1, pDef2, defDiff.data, 337, 337, { threshold: 0.1 });
  const defScore = 1 - (defMismatched / (337 * 337));

  // Hover state (trigger hover)
  await portEl.hover();
  await new Promise(r => setTimeout(r, 400));
  const hovBuf = await portEl.screenshot();
  fs.writeFileSync('scripts/diff_results/final_portrait_hover_rendered.png', hovBuf);
  const pHov1 = await sharp(hovBuf).resize(337, 337, { fit: 'fill' }).ensureAlpha().raw().toBuffer();
  const pHov2 = await sharp('scripts/diff_results/variant_hover_ref.png').resize(337, 337, { fit: 'fill' }).ensureAlpha().raw().toBuffer();
  const hovDiff = new PNG({ width: 337, height: 337 });
  const hovMismatched = pm(pHov1, pHov2, hovDiff.data, 337, 337, { threshold: 0.1 });
  const hovScore = 1 - (hovMismatched / (337 * 337));

  await browser.close();

  console.log(JSON.stringify({
    arrowScore: arrowScore.toFixed(4),
    defScore: defScore.toFixed(4),
    hovScore: hovScore.toFixed(4),
    aMismatched,
    defMismatched,
    hovMismatched
  }, null, 2));
}

run();
