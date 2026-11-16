const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

function computeSimilarity(buf1, buf2) {
  const p1 = PNG.sync.read(buf1);
  const p2 = PNG.sync.read(buf2);
  const w = Math.min(p1.width, p2.width);
  const h = Math.min(p1.height, p2.height);

  let match = 0;
  let total = w * h;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx1 = (y * p1.width + x) * 4;
      const idx2 = (y * p2.width + x) * 4;
      const dr = Math.abs(p1.data[idx1] - p2.data[idx2]);
      const dg = Math.abs(p1.data[idx1+1] - p2.data[idx2+1]);
      const db = Math.abs(p1.data[idx1+2] - p2.data[idx2+2]);
      if (dr <= 25 && dg <= 25 && db <= 25) {
        match++;
      }
    }
  }
  return match / total;
}

async function test() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  // Test Lamp ON in isolation (white bg, exact Figma symbol)
  const lampOnHtml = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0; padding:0; background:white;">
      <div style="width:418px; height:384px; position:relative;">
        <img src="http://localhost:3000/assets/desk/lamp_on.png" style="width:100%; height:100%; object-fit:cover; display:block;" />
        <div style="position:absolute; left:29.9%; right:59.33%; top:calc(50% - 22.5px); aspect-ratio:1/1; background:white; filter:blur(15px); border-radius:100px; transform:translateY(-50%);"></div>
      </div>
    </body>
    </html>
  `;
  await page.setContent(lampOnHtml);
  await new Promise(r => setTimeout(r, 500));
  const shotOn = await page.screenshot({ clip: { x: 0, y: 0, width: 418, height: 384 } });
  const refOn = fs.readFileSync('scripts/fresh_refs/lamp_on.png');
  const simOn = computeSimilarity(shotOn, refOn);
  console.log('Isolated Lamp ON similarity vs Figma symbol:', (simOn * 100).toFixed(2) + '%');

  // Test Lamp OFF in isolation
  const lampOffHtml = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0; padding:0; background:white;">
      <div style="width:418px; height:384px; position:relative;">
        <img src="http://localhost:3000/assets/desk/lamp_off.png" style="width:100%; height:100%; object-fit:cover; display:block;" />
      </div>
    </body>
    </html>
  `;
  await page.setContent(lampOffHtml);
  await new Promise(r => setTimeout(r, 500));
  const shotOff = await page.screenshot({ clip: { x: 0, y: 0, width: 418, height: 384 } });
  const refOff = fs.readFileSync('scripts/fresh_refs/lamp_off.png');
  const simOff = computeSimilarity(shotOff, refOff);
  console.log('Isolated Lamp OFF similarity vs Figma symbol:', (simOff * 100).toFixed(2) + '%');

  // Test Diary Hover in isolation
  const diaryHoverHtml = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0; padding:0; background:white;">
      <div style="width:312px; height:222px; display:flex; align-items:center; justify-content:center;">
        <div style="transform:rotate(-4.97deg); width:268.241px; height:178.827px;">
          <img src="http://localhost:3000/assets/desk/diary_v1.png" style="width:100%; height:100%; object-fit:cover; display:block; filter: drop-shadow(0px 4.243px 10.6px rgba(255,213,79,0.9)) drop-shadow(0px 0px 15px rgba(255,213,79,0.6));" />
        </div>
      </div>
    </body>
    </html>
  `;
  await page.setContent(diaryHoverHtml);
  await new Promise(r => setTimeout(r, 500));
  const shotDiary = await page.screenshot({ clip: { x: 0, y: 0, width: 312, height: 222 } });
  const refDiary = fs.readFileSync('scripts/fresh_refs/diary_v2_hover.png');
  const simDiary = computeSimilarity(shotDiary, refDiary);
  console.log('Isolated Diary Hover similarity vs Figma symbol:', (simDiary * 100).toFixed(2) + '%');

  await browser.close();
}

test().catch(console.error);
