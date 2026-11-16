const puppeteer = require('puppeteer');

async function testWAAPI() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(`
    <div id="box" style="width: 200px; height: 150px; background: red; clip-path: polygon(50% 8%, 92% 50%, 50% 92%, 8% 50%);">
      Hello
    </div>
  `);

  const result = await page.evaluate(async () => {
    const el = document.getElementById('box');
    const anim = el.animate([
      { clipPath: 'polygon(50% 8%, 92% 50%, 50% 92%, 8% 50%)', transform: 'scale(0.45) rotate(-35deg)' },
      { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', transform: 'scale(1) rotate(0deg)' }
    ], {
      duration: 500,
      easing: 'cubic-bezier(0.34, 1.25, 0.64, 1)',
      fill: 'forwards'
    });
    await anim.finished;
    return {
      clipPath: getComputedStyle(el).clipPath,
      transform: getComputedStyle(el).transform
    };
  });

  console.log('WAAPI animation result:', result);
  await browser.close();
}
testWAAPI();
