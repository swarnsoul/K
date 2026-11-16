const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const ARTIFACT_DIR = path.resolve('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98');

async function verify() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. TEST HOME PAGE (/)
  const pageHome = await browser.newPage();
  await pageHome.setViewport({ width: 1440, height: 1000 });
  await pageHome.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  
  const homeCheck = await pageHome.evaluate(() => {
    const deskFooter = document.querySelector('footer[aria-label="Footer Desk Scene"]');
    const figma899 = document.querySelector('[data-figma-id="563:899"]');
    const figma923 = document.querySelector('[data-figma-id="563:923"]');
    const contactFooter = document.querySelector('#contact');
    const lastElement = document.querySelector('main').lastElementChild;

    return {
      hasDeskFooter: !!deskFooter,
      hasFigma899: !!figma899,
      hasFigma923: !!figma923,
      hasContactFooter: !!contactFooter,
      contactFooterId: contactFooter ? contactFooter.getAttribute('data-node-id') : null,
      lastTag: lastElement ? lastElement.tagName : null,
    };
  });

  console.log('=== HOME PAGE (/) CHECK ===');
  console.log('hasDeskFooter:', homeCheck.hasDeskFooter);
  console.log('hasFigma899:', homeCheck.hasFigma899);
  console.log('hasFigma923:', homeCheck.hasFigma923);
  console.log('hasContactFooter:', homeCheck.hasContactFooter, '(node:', homeCheck.contactFooterId, ')');

  // Screenshot bottom of Home
  await pageHome.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 600));
  await pageHome.screenshot({ path: path.join(ARTIFACT_DIR, 'home_bottom_verified.png') });
  await pageHome.close();

  // 2. TEST ABOUT PAGE (/about) at 1440px
  const pageAbout = await browser.newPage();
  await pageAbout.setViewport({ width: 1440, height: 1000 });
  await pageAbout.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });
  await pageAbout.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 800));

  const aboutCheck = await pageAbout.evaluate(() => {
    const footer = document.querySelector('footer[aria-label="Footer Desk Scene"]');
    if (!footer) return { error: 'footer not found' };

    const pinkBand = footer.querySelector('[data-name="Pink Striped Band"]');
    const quote = footer.querySelector('[data-figma-id="563:900"]');
    const hearts = footer.querySelector('[data-figma-id="563:901"]');
    const desk = footer.querySelector('[data-figma-id="563:923"]');

    const quoteRect = quote ? quote.getBoundingClientRect() : null;
    const heartsRect = hearts ? hearts.getBoundingClientRect() : null;
    const deskRect = desk ? desk.getBoundingClientRect() : null;
    const footerRect = footer.getBoundingClientRect();

    const quoteStyle = quote ? window.getComputedStyle(quote.querySelector('p')) : null;
    const footerStyle = window.getComputedStyle(footer);

    const imgs = Array.from(footer.querySelectorAll('img'));
    const brokenImgs = imgs.filter(i => i.naturalWidth === 0);

    return {
      footerExists: true,
      hasPinkBand: !!pinkBand,
      footerBgColor: footerStyle.backgroundColor,
      quoteText: quote ? quote.innerText.trim() : null,
      quoteColor: quoteStyle ? quoteStyle.color : null,
      quoteFont: quoteStyle ? quoteStyle.fontFamily : null,
      quoteRect: quoteRect ? { top: quoteRect.top - footerRect.top, left: quoteRect.left - footerRect.left, width: quoteRect.width, height: quoteRect.height } : null,
      heartsRect: heartsRect ? { top: heartsRect.top - footerRect.top, left: heartsRect.left - footerRect.left, width: heartsRect.width, height: heartsRect.height } : null,
      deskRect: deskRect ? { top: deskRect.top - footerRect.top, left: deskRect.left - footerRect.left, width: deskRect.width, height: deskRect.height } : null,
      totalImages: imgs.length,
      brokenImagesCount: brokenImgs.length,
    };
  });

  console.log('\n=== ABOUT PAGE (/about) CHECK ===');
  console.log('footerExists:', aboutCheck.footerExists);
  console.log('hasPinkBand:', aboutCheck.hasPinkBand);
  console.log('footerBgColor:', aboutCheck.footerBgColor);
  console.log('quoteText:', aboutCheck.quoteText);
  console.log('quoteColor:', aboutCheck.quoteColor);
  console.log('quoteFont:', aboutCheck.quoteFont);
  console.log('images:', aboutCheck.totalImages, 'broken:', aboutCheck.brokenImagesCount);
  console.log('Quote relative top:', aboutCheck.quoteRect ? aboutCheck.quoteRect.top : null);
  console.log('Hearts relative top:', aboutCheck.heartsRect ? aboutCheck.heartsRect.top : null);
  console.log('Desk relative top:', aboutCheck.deskRect ? aboutCheck.deskRect.top : null);

  // Capture footer screenshot
  const footerEl = await pageAbout.$('footer[aria-label="Footer Desk Scene"]');
  const footerShot = await footerEl.screenshot();
  const footerShotPath = path.join(ARTIFACT_DIR, 'about_footer_no_stripes.png');
  fs.writeFileSync(footerShotPath, footerShot);

  // Also capture quote area closeup
  const quoteEl = await pageAbout.$('footer[aria-label="Footer Desk Scene"] [data-figma-id="563:899"]');
  const quoteShot = await quoteEl.screenshot();
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'about_footer_quote_area.png'), quoteShot);

  // 3. Pixel check across top of footer for any dark line
  const shotPng = PNG.sync.read(footerShot);
  let darkPixelsCount = 0;
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < shotPng.width; x++) {
      const idx = (y * shotPng.width + x) * 4;
      const r = shotPng.data[idx];
      const g = shotPng.data[idx+1];
      const b = shotPng.data[idx+2];
      const a = shotPng.data[idx+3];
      // Dark line check (r, g, b < 100 with a > 100)
      if (a > 100 && r < 100 && g < 100 && b < 100) {
        darkPixelsCount++;
      }
    }
  }
  console.log('Dark line pixels in top 5px of footer:', darkPixelsCount, '(0 means completely clean, no line)');

  // 4. Test interactive elements: lamp toggle and diary hover
  const lampBtn = await pageAbout.$('footer[aria-label="Footer Desk Scene"] [data-figma-id="563:928"] button');
  const stateBefore = await pageAbout.evaluate(el => el.getAttribute('data-state'), lampBtn);
  await lampBtn.click();
  await new Promise(r => setTimeout(r, 400));
  const stateAfter = await pageAbout.evaluate(el => el.getAttribute('data-state'), lampBtn);
  console.log('\n=== INTERACTIVE CHECK ===');
  console.log('Lamp toggle:', stateBefore, '->', stateAfter);
  await pageAbout.close();

  // 5. TEST MOBILE (< 1024px, 390px)
  const pageHomeMobile = await browser.newPage();
  await pageHomeMobile.setViewport({ width: 390, height: 844 });
  await pageHomeMobile.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  const homeMobileDesk = await pageHomeMobile.evaluate(() => !!document.querySelector('footer[aria-label="Footer Desk Scene"]'));
  console.log('\n=== MOBILE CHECKS (390px) ===');
  console.log('Home mobile desk footer exists:', homeMobileDesk);
  await pageHomeMobile.close();

  const pageAboutMobile = await browser.newPage();
  await pageAboutMobile.setViewport({ width: 390, height: 844 });
  await pageAboutMobile.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });
  const aboutMobileDesk = await pageAboutMobile.evaluate(() => !!document.querySelector('footer[aria-label="Footer Desk Scene"]'));
  const aboutMobilePinkBand = await pageAboutMobile.evaluate(() => !!document.querySelector('footer[aria-label="Footer Desk Scene"] [data-name="Pink Striped Band"]'));
  console.log('About mobile desk footer exists:', aboutMobileDesk);
  console.log('About mobile pink band exists:', aboutMobilePinkBand);
  await pageAboutMobile.close();

  await browser.close();
}

verify().catch(console.error);
