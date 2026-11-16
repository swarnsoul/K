const puppeteer = require('puppeteer');

(async () => {
  console.log('=== Step 1: Diagnosing Next.js 1 Issue & Console Errors ===');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleMessages = [];
  const pageErrors = [];

  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    consoleMessages.push({ type, text, location: msg.location() });
    if (type === 'error' || type === 'warn') {
      console.log(`[Browser Console ${type.toUpperCase()}]`, text);
    }
  });

  page.on('pageerror', err => {
    pageErrors.push({ message: err.message, stack: err.stack });
    console.log('[Browser PageError]', err.message, err.stack);
  });

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Scroll to "My Design Companions" section
  await page.evaluate(() => {
    const el = document.querySelector('[data-cursor-key="tool-heading"]') ||
               Array.from(document.querySelectorAll('h2, h3, div')).find(e => e.textContent.includes('Design Companions'));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  await new Promise(r => setTimeout(r, 2000));

  // Check Next.js dev overlay
  const overlayInfo = await page.evaluate(() => {
    const nextPortal = document.querySelector('nextjs-portal');
    let overlayText = null;
    if (nextPortal && nextPortal.shadowRoot) {
      overlayText = nextPortal.shadowRoot.innerHTML;
    }
    // Also look for toast or error badge in body
    const bodyText = document.body.innerText;
    return {
      hasPortal: !!nextPortal,
      overlayText: overlayText ? overlayText.slice(0, 1000) : null,
      issuesFound: Array.from(document.querySelectorAll('*')).filter(e => (e.textContent || '').includes('1 Issue')).map(e => e.outerHTML.slice(0, 200))
    };
  });

  console.log('Overlay Info:', overlayInfo);
  console.log('Total Page Errors:', pageErrors.length);
  console.log('Total Console Errors:', consoleMessages.filter(c => c.type === 'error').length);

  await browser.close();
})();
