const puppeteer = require('puppeteer');
const fs = require('fs');
const { PNG } = require('pngjs');

async function test() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const ref = PNG.sync.read(fs.readFileSync('scripts/fresh_refs/diary_v2_hover.png'));
  const w = ref.width; // 312
  const h = ref.height; // 222

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0; padding:0; background:rgb(30,30,30); overflow:hidden;">
      <div style="width:${w}px; height:${h}px; display:flex; align-items:center; justify-content:center; position:relative;">
        <div style="transform:rotate(-4.97deg); width:268.241px; height:178.827px;">
          <img src="http://localhost:3000/assets/desk/diary_v1.png" style="width:100%; height:100%; object-fit:cover; display:block; filter: drop-shadow(0px 4.243px 10.6px rgba(255,213,79,0.9)) drop-shadow(0px 0px 15px rgba(255,213,79,0.6));" />
        </div>
      </div>
    </body>
    </html>
  `;
  await page.setContent(html);
  await new Promise(r => setTimeout(r, 600));
  const shot = await page.screenshot({ clip: { x: 0, y: 0, width: w, height: h } });
  const pShot = PNG.sync.read(shot);

  let match = 0, total = w * h;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const dr = Math.abs(pShot.data[idx] - ref.data[idx]);
      const dg = Math.abs(pShot.data[idx+1] - ref.data[idx+1]);
      const db = Math.abs(pShot.data[idx+2] - ref.data[idx+2]);
      if (dr <= 35 && dg <= 35 && db <= 35) match++;
    }
  }
  console.log(`Rotated Diary Hover with glow similarity vs Figma: ${(match / total * 100).toFixed(2)}%`);
  await browser.close();
}
test().catch(console.error);
