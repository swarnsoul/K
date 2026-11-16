const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch').default || require('pixelmatch');

const ARTIFACTS_DIR = 'C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98';

function compareImages(img1Path, img2Path, diffPath) {
  const img1 = PNG.sync.read(fs.readFileSync(img1Path));
  const img2 = PNG.sync.read(fs.readFileSync(img2Path));

  const width = Math.min(img1.width, img2.width);
  const height = Math.min(img1.height, img2.height);

  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );

  const totalPixels = width * height;
  const similarity = 1 - numDiffPixels / totalPixels;

  if (diffPath) {
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
  }

  return { similarity, numDiffPixels, totalPixels, width, height };
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluateOnNewDocument(() => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = (query) => {
      if (query === '(hover: hover) and (pointer: fine)') {
        return {
          matches: true,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        };
      }
      return originalMatchMedia(query);
    };
  });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.toString()));

  console.log('--- 1. Testing 1440 Viewport ---');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  const portrait = await page.waitForSelector('[data-cursor-key="hero-portrait"]');
  const box = await portrait.boundingBox();
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;

  // A. Before Hover
  const beforeHit = await page.evaluate((x, y) => {
    const el = document.elementFromPoint(x, y);
    return el?.getAttribute('data-cursor-key') || el?.tagName;
  }, cx, cy);
  console.log('Element under center before hover:', beforeHit);

  const beforeStates = await page.evaluate(() => {
    const p = document.querySelector('[data-cursor-key="hero-portrait"]');
    const imgs = p.querySelectorAll('img');
    return {
      state: p.getAttribute('data-state'),
      cartoonOpacity: window.getComputedStyle(imgs[0]).opacity,
      realOpacity: window.getComputedStyle(imgs[1]).opacity,
    };
  });
  console.log('States before hover:', beforeStates);

  const beforeShotPath = path.join(ARTIFACTS_DIR, 'rendered_portrait_before.png');
  await portrait.screenshot({ path: beforeShotPath });

  // B. During Hover
  await page.mouse.move(cx, cy);
  await new Promise(r => setTimeout(r, 400)); // wait for 200ms crossfade

  const duringHit = await page.evaluate((x, y) => {
    const el = document.elementFromPoint(x, y);
    return el?.getAttribute('data-cursor-key') || el?.tagName;
  }, cx, cy);
  console.log('Element under center during hover:', duringHit);

  const duringStates = await page.evaluate(() => {
    const p = document.querySelector('[data-cursor-key="hero-portrait"]');
    const imgs = p.querySelectorAll('img');
    const badgeText = document.querySelector('span[data-cursor-text]')?.textContent;
    return {
      state: p.getAttribute('data-state'),
      cartoonOpacity: window.getComputedStyle(imgs[0]).opacity,
      realOpacity: window.getComputedStyle(imgs[1]).opacity,
      cursorLabel: badgeText,
    };
  });
  console.log('States during hover:', duringStates);

  const duringShotPath = path.join(ARTIFACTS_DIR, 'rendered_portrait_during.png');
  await portrait.screenshot({ path: duringShotPath });

  // C. After Hover (move away)
  await page.mouse.move(50, 50);
  await new Promise(r => setTimeout(r, 400));

  const afterStates = await page.evaluate(() => {
    const p = document.querySelector('[data-cursor-key="hero-portrait"]');
    const imgs = p.querySelectorAll('img');
    return {
      state: p.getAttribute('data-state'),
      cartoonOpacity: window.getComputedStyle(imgs[0]).opacity,
      realOpacity: window.getComputedStyle(imgs[1]).opacity,
    };
  });
  console.log('States after moving away:', afterStates);

  const afterShotPath = path.join(ARTIFACTS_DIR, 'rendered_portrait_after.png');
  await portrait.screenshot({ path: afterShotPath });

  // D. Compare with Figma screenshots
  const figmaCartoon = path.join(ARTIFACTS_DIR, 'figma_hero_portrait_cartoon.png');
  const figmaReal = path.join(ARTIFACTS_DIR, 'figma_hero_portrait_real.png');

  const cartoonComp = compareImages(beforeShotPath, figmaCartoon, path.join(ARTIFACTS_DIR, 'diff_cartoon.png'));
  const realComp = compareImages(duringShotPath, figmaReal, path.join(ARTIFACTS_DIR, 'diff_real.png'));

  console.log('Cartoon similarity to Figma:', (cartoonComp.similarity * 100).toFixed(2) + '%');
  console.log('Real photo similarity to Figma:', (realComp.similarity * 100).toFixed(2) + '%');

  // E. Keyboard Focus test
  await page.evaluate(() => {
    const p = document.querySelector('[data-cursor-key="hero-portrait"]');
    p.focus();
  });
  await new Promise(r => setTimeout(r, 300));
  const focusStates = await page.evaluate(() => {
    const p = document.querySelector('[data-cursor-key="hero-portrait"]');
    const imgs = p.querySelectorAll('img');
    return {
      state: p.getAttribute('data-state'),
      cartoonOpacity: window.getComputedStyle(imgs[0]).opacity,
      realOpacity: window.getComputedStyle(imgs[1]).opacity,
    };
  });
  console.log('States on keyboard focus:', focusStates);

  await page.evaluate(() => {
    const p = document.querySelector('[data-cursor-key="hero-portrait"]');
    p.blur();
  });
  await new Promise(r => setTimeout(r, 300));

  // --- 2. Testing 1024 Viewport ---
  console.log('\n--- 2. Testing 1024 Viewport ---');
  await page.setViewport({ width: 1024, height: 800 });
  await new Promise(r => setTimeout(r, 400));

  const portrait1024 = await page.waitForSelector('[data-cursor-key="hero-portrait"]');
  const box1024 = await portrait1024.boundingBox();
  const cx1024 = box1024.x + box1024.width / 2;
  const cy1024 = box1024.y + box1024.height / 2;

  await page.mouse.move(cx1024, cy1024);
  await new Promise(r => setTimeout(r, 400));
  const states1024 = await page.evaluate(() => {
    const p = document.querySelector('[data-cursor-key="hero-portrait"]');
    const imgs = p.querySelectorAll('img');
    return {
      state: p.getAttribute('data-state'),
      cartoonOpacity: window.getComputedStyle(imgs[0]).opacity,
      realOpacity: window.getComputedStyle(imgs[1]).opacity,
    };
  });
  console.log('1024 Hover states:', states1024);

  await page.mouse.move(50, 50);
  await new Promise(r => setTimeout(r, 400));

  // --- 3. Testing Mobile 390 Viewport (Touch Tap) ---
  console.log('\n--- 3. Testing Mobile 390 Viewport (Touch Tap) ---');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));

  const mobilePortrait = await page.waitForSelector('[data-cursor-key="hero-portrait"]');
  const mobBefore = await page.evaluate(() => {
    const p = document.querySelector('[data-cursor-key="hero-portrait"]');
    const imgs = p.querySelectorAll('img');
    return {
      state: p.getAttribute('data-state'),
      cartoonOpacity: window.getComputedStyle(imgs[0]).opacity,
      realOpacity: window.getComputedStyle(imgs[1]).opacity,
    };
  });
  console.log('Mobile before tap:', mobBefore);

  await mobilePortrait.tap();
  await new Promise(r => setTimeout(r, 400));
  const mobAfterTap1 = await page.evaluate(() => {
    const p = document.querySelector('[data-cursor-key="hero-portrait"]');
    const imgs = p.querySelectorAll('img');
    return {
      state: p.getAttribute('data-state'),
      cartoonOpacity: window.getComputedStyle(imgs[0]).opacity,
      realOpacity: window.getComputedStyle(imgs[1]).opacity,
    };
  });
  console.log('Mobile after tap 1 (swapped to real):', mobAfterTap1);

  await mobilePortrait.tap();
  await new Promise(r => setTimeout(r, 400));
  const mobAfterTap2 = await page.evaluate(() => {
    const p = document.querySelector('[data-cursor-key="hero-portrait"]');
    const imgs = p.querySelectorAll('img');
    return {
      state: p.getAttribute('data-state'),
      cartoonOpacity: window.getComputedStyle(imgs[0]).opacity,
      realOpacity: window.getComputedStyle(imgs[1]).opacity,
    };
  });
  console.log('Mobile after tap 2 (swapped back to cartoon):', mobAfterTap2);

  // --- 4. Navigation Test: Go to /about and back ---
  console.log('\n--- 4. Navigation Test (/about and back) ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));

  const pNav = await page.waitForSelector('[data-cursor-key="hero-portrait"]');
  const bNav = await pNav.boundingBox();
  await page.mouse.move(bNav.x + bNav.width / 2, bNav.y + bNav.height / 2);
  await new Promise(r => setTimeout(r, 400));
  const navStates = await page.evaluate(() => {
    const p = document.querySelector('[data-cursor-key="hero-portrait"]');
    const imgs = p.querySelectorAll('img');
    const badgeText = document.querySelector('span[data-cursor-text]')?.textContent;
    return {
      state: p.getAttribute('data-state'),
      cartoonOpacity: window.getComputedStyle(imgs[0]).opacity,
      realOpacity: window.getComputedStyle(imgs[1]).opacity,
      cursorLabel: badgeText,
    };
  });
  console.log('States after navigating back to home:', navStates);

  console.log('\nTotal Console Errors:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Console Errors:', consoleErrors);
  }

  await browser.close();
})();
