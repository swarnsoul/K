const puppeteer = require('puppeteer');
const sharp = require('sharp');
const pm = require('pixelmatch').default || require('pixelmatch');
const { PNG } = require('pngjs');

async function testChromeProfile() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--force-color-profile=srgb']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const el = document.querySelector('[data-figma-id="230:87"]');
    if (el) {
      el.style.transform = 'none';
      el.style.left = '0px';
      el.style.top = '0px';
      el.parentElement.style.backgroundColor = '#1c1c1c';
    }
  });
  const el = await page.$('[data-figma-id="230:87"]');
  const buf = await el.screenshot();
  await browser.close();

  const b1 = await sharp(buf).resize(337, 337).ensureAlpha().raw().toBuffer();
  const b2 = await sharp('scripts/diff_results/variant_default_ref.png').ensureAlpha().raw().toBuffer();
  const idx = (168 * 337 + 168) * 4;
  console.log('with srgb profile (168,168):', b1[idx], b1[idx+1], b1[idx+2]);
  console.log('ref (168,168):              ', b2[idx], b2[idx+1], b2[idx+2]);

  for (const t of [0.1, 0.15, 0.2]) {
    const diff = new PNG({ width: 337, height: 337 });
    const m = pm(b1, b2, diff.data, 337, 337, { threshold: t });
    console.log('t=' + t + ' score:', (1 - m/(337*337)).toFixed(4), 'mismatched:', m);
  }
}
testChromeProfile();
