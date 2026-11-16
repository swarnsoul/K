const puppeteer = require('puppeteer');
const fs = require('fs');

async function test() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });
  const deskEl = await page.$('.lg\\:flex [data-figma-id="563:923"]');
  await page.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'end' }), deskEl);
  await new Promise(r => setTimeout(r, 1000));
  const scrollY = await page.evaluate(() => window.scrollY);
  console.log('ScrollY after scrollIntoView:', scrollY);
  const shot = await deskEl.screenshot();
  console.log('deskEl screenshot size:', shot.length);
  fs.writeFileSync('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/desk_1920_actual.png', shot);
  await browser.close();
}
test().catch(console.error);
