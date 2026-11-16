const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const outDir = path.resolve('scripts');

async function run() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  console.log('Navigating to About page...');
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const clientHeight = await page.evaluate(() => document.documentElement.clientHeight);
  console.log('Total page height:', totalHeight, 'Client height:', clientHeight);

  // Full page screenshot
  const fullShot = await page.screenshot({ fullPage: true });
  fs.writeFileSync(path.join(outDir, 'about_full_rendered.png'), fullShot);
  console.log('Full page screenshot saved');

  // Check if the desk scene container exists
  const deskElement = await page.$('[data-figma-id="563:923"]');
  console.log('Desk scene element found:', !!deskElement);
  
  if (deskElement) {
    const box = await deskElement.boundingBox();
    console.log('Desk scene bounding box:', box);
    
    // Screenshot desk scene element
    const deskShot = await deskElement.screenshot();
    fs.writeFileSync(path.join(outDir, 'desk_scene_element.png'), deskShot);
    console.log('Desk element screenshot saved');
  }

  // Check closing section
  const closingEl = await page.$('[data-figma-id="563:899"]');
  console.log('Closing section element found:', !!closingEl);
  if (closingEl) {
    const box = await closingEl.boundingBox();
    console.log('Closing section bounding box:', box);
    const closingShot = await closingEl.screenshot();
    fs.writeFileSync(path.join(outDir, 'closing_section_element.png'), closingShot);
    console.log('Closing section screenshot saved');
  }

  await browser.close();
  console.log('Done!');
}

run().catch(e => { console.error(e.message); process.exit(1); });
