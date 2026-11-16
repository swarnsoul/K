const sharp = require('sharp');
const puppeteer = require('puppeteer');
const pm = require('pixelmatch').default || require('pixelmatch');
const { PNG } = require('pngjs');

async function testSpanShift() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(`
    <style>
      body { margin: 0; padding: 20px; background: white; }
    </style>
    <div id="raw" style="font-family: sans-serif; font-size: 20px; width: 300px; line-height: 30px; color: #3d2b0e;">
      I always dreamed of becoming an engineer from <span style="color: #da156a;">IIT.</span>
    </div>
    <div id="spans" style="font-family: sans-serif; font-size: 20px; width: 300px; line-height: 30px; color: #3d2b0e; margin-top: 20px;">
      <span>I</span><span> </span><span>a</span><span>l</span><span>w</span><span>a</span><span>y</span><span>s</span><span> </span><span>d</span><span>r</span><span>e</span><span>a</span><span>m</span><span>e</span><span>d</span><span> </span><span>o</span><span>f</span><span> </span><span>b</span><span>e</span><span>c</span><span>o</span><span>m</span><span>i</span><span>n</span><span>g</span><span> </span><span>a</span><span>n</span><span> </span><span>e</span><span>n</span><span>g</span><span>i</span><span>n</span><span>e</span><span>e</span><span>r</span><span> </span><span>f</span><span>r</span><span>o</span><span>m</span><span> </span><span style="color: #da156a;"><span>I</span><span>I</span><span>T</span><span>.</span></span>
    </div>
  `);
  
  const elRaw = await page.$('#raw');
  const bufRaw = await elRaw.screenshot();
  const elSpans = await page.$('#spans');
  const bufSpans = await elSpans.screenshot();

  const b1 = await sharp(bufRaw).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const b2 = await sharp(bufSpans).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const diff = new PNG({ width: b1.info.width, height: b1.info.height });
  const mism = pm(b1.data, b2.data, diff.data, b1.info.width, b1.info.height, { threshold: 0.1 });
  console.log('Mismatches between raw text and span text:', mism);

  await browser.close();
}
testSpanShift();
