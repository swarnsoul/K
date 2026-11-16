const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function capture1920() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 800));

  const shot = await page.screenshot({ clip: { x: 0, y: 1080 - 868, width: 1920, height: 868 } });
  fs.writeFileSync('scripts/verify_results/desk_1920_actual.png', shot);
  fs.writeFileSync('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/desk_1920_actual.png', shot);
  console.log('Saved desk_1920_actual.png');
  await browser.close();
}
capture1920().catch(console.error);
