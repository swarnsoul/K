const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push({ type: msg.type(), text: msg.text() }));
  page.on('pageerror', err => consoleLogs.push({ type: 'error', text: err.toString() }));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  console.log('Waiting for selector...');
  const portraitHandle = await page.waitForSelector('[data-cursor-key="hero-portrait"]', { timeout: 15000 });

  const box = await portraitHandle.boundingBox();
  console.log('Portrait boundingBox:', box);

  const centerX = box.x + box.width / 2;
  const centerY = box.y + box.height / 2;

  // 1. Check elementFromPoint before and during hover
  const elementBefore = await page.evaluate((x, y) => {
    const el = document.elementFromPoint(x, y);
    return {
      tagName: el ? el.tagName : null,
      className: el ? el.className : null,
      dataset: el ? JSON.stringify(el.dataset) : null,
      outerHTML: el ? el.outerHTML.slice(0, 150) : null,
    };
  }, centerX, centerY);
  console.log('Element under center before hover:', elementBefore);

  await page.mouse.move(centerX, centerY);
  await new Promise(r => setTimeout(r, 500));

  const elementDuring = await page.evaluate((x, y) => {
    const el = document.elementFromPoint(x, y);
    return {
      tagName: el ? el.tagName : null,
      className: el ? el.className : null,
      dataset: el ? JSON.stringify(el.dataset) : null,
      outerHTML: el ? el.outerHTML.slice(0, 150) : null,
    };
  }, centerX, centerY);
  console.log('Element under center during hover:', elementDuring);

  // 2. Check images naturalWidth and opacity
  const imagesInfo = await page.evaluate(() => {
    const portrait = document.querySelector('[data-cursor-key="hero-portrait"]');
    if (!portrait) return null;
    const imgs = Array.from(portrait.querySelectorAll('img'));
    return {
      portraitState: portrait.getAttribute('data-state'),
      images: imgs.map(img => ({
        src: img.src,
        alt: img.alt,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        opacity: window.getComputedStyle(img).opacity,
        display: window.getComputedStyle(img).display,
        visibility: window.getComputedStyle(img).visibility,
      })),
    };
  });
  console.log('Images info:', JSON.stringify(imagesInfo, null, 2));

  // 3. Check cursor label
  const cursorInfo = await page.evaluate(() => {
    const cursor = document.getElementById('custom-cursor-root');
    const label = cursor ? cursor.querySelector('span') : null;
    return {
      cursorExists: !!cursor,
      labelText: label ? label.textContent : null,
      labelOpacity: label ? window.getComputedStyle(label).opacity : null,
    };
  });
  console.log('Cursor info:', cursorInfo);

  console.log('Console logs / errors count:', consoleLogs.length);
  if (consoleLogs.length > 0) {
    console.log('Logs:', consoleLogs.slice(-10));
  }

  await browser.close();
})();
