const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  
  try {
    await page.goto('http://localhost:3001/work/cirqell', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({ 
      path: path.join(__dirname, 'cirqell_current_1440.png'), 
      fullPage: true 
    });
    console.log('Desktop 1440 screenshot done');
    
    await page.setViewport({ width: 390, height: 844 });
    await page.reload({ waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ 
      path: path.join(__dirname, 'cirqell_current_390.png'), 
      fullPage: true 
    });
    console.log('Mobile 390 screenshot done');
    
  } catch (e) {
    console.error('Error:', e.message);
  }
  
  await browser.close();
})();
