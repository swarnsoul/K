const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('visited_session', '1');
  });
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  const info = await page.evaluate(() => {
    const frame = document.querySelector('[data-node-id="project-frame-cirqell"]');
    if (!frame) return 'Frame not found';

    const results = [];
    let cur = frame;
    while (cur && cur.id !== 'work') {
      const cs = window.getComputedStyle(cur);
      results.push({
        tag: cur.tagName,
        className: cur.className,
        bg: cs.backgroundColor,
        boxShadow: cs.boxShadow,
        w: cur.offsetWidth,
        h: cur.offsetHeight
      });
      cur = cur.parentElement;
    }

    // Also check children of frame
    const children = [];
    frame.querySelectorAll('*').forEach(el => {
      const cs = window.getComputedStyle(el);
      if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || cs.boxShadow !== 'none') {
        children.push({
          tag: el.tagName,
          className: el.className,
          bg: cs.backgroundColor,
          boxShadow: cs.boxShadow,
          w: el.offsetWidth,
          h: el.offsetHeight
        });
      }
    });

    return { hierarchy: results, styledChildren: children };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
