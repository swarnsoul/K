const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@800&display=swap" rel="stylesheet">
      <style>
        body { margin: 0; font-family: 'Inter', sans-serif; font-weight: 800; }
        .box { width: 1318px; height: 542px; background: #f1e5f3; position: relative; border-radius: 30px; margin: 20px auto; overflow: hidden; }
        .title { position: absolute; top: 140.5px; left: 50%; transform: translate(-50%, -50%); color: #720287; opacity: 0.2; white-space: nowrap; }
      </style>
    </head>
    <body>
      <div class="box"><span class="title" style="font-size: 192.8px;">INFLUCRUSH</span></div>
      <div class="box"><span class="title" style="font-size: 180px;">INFLUCRUSH</span></div>
      <div class="box"><span class="title" style="font-size: 170px;">INFLUCRUSH</span></div>
      <div class="box"><span class="title" style="font-size: 160px;">INFLUCRUSH</span></div>
      <div class="box"><span class="title" style="font-size: 156px;">INFLUCRUSH</span></div>
      <div class="box"><span class="title" style="font-size: 150px;">INFLUCRUSH</span></div>
    </body>
    </html>
  `);
  await page.evaluateHandle('document.fonts.ready');
  const widths = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.title')).map(el => ({
      fontSize: el.style.fontSize,
      width: el.getBoundingClientRect().width,
      boxWidth: 1318,
      marginEachSide: (1318 - el.getBoundingClientRect().width) / 2
    }));
  });
  console.log(widths);
  await browser.close();
})();
