const puppeteer = require('puppeteer');

async function testInherit() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(`
    <p id="p" style="color: #3d2b0e;">
      Normal <span id="s" style="color: #da156a;">IIT.</span>
    </p>
  `);

  const result = await page.evaluate(() => {
    const s = document.getElementById('s');
    const child = document.createElement('span');
    child.style.color = 'inherit';
    child.textContent = 'IIT.';
    s.textContent = '';
    s.appendChild(child);

    return {
      childComputedColor: getComputedStyle(child).color,
      pComputedColor: getComputedStyle(document.getElementById('p')).color
    };
  });

  console.log('Colors:', result);
  await browser.close();
}
testInherit();
