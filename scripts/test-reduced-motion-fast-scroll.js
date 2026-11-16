const puppeteer = require('puppeteer');

async function testReducedMotionAndFastScroll() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  // 1. Reduced motion test
  console.log('Testing prefers-reduced-motion...');
  const pageRM = await browser.newPage();
  await pageRM.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await pageRM.setViewport({ width: 1440, height: 900 });
  await pageRM.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });

  const rmStates = await pageRM.evaluate(() => {
    const cards = document.querySelectorAll('[data-unfold-state]');
    return Array.from(cards).map(c => c.getAttribute('data-unfold-state'));
  });
  console.log('Reduced motion states (should all be "done" immediately):', rmStates.slice(0, 9));
  const allDone = rmStates.slice(0, 9).every(s => s === 'done');
  console.log('All cards immediately done with reduced motion:', allDone);

  // 2. Fast scrolling test (stutter / frame budget check)
  console.log('Testing fast scrolling...');
  const pageFast = await browser.newPage();
  await pageFast.setViewport({ width: 1440, height: 900 });
  await pageFast.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });

  // Measure fps / jank during rapid scroll down
  const jankStats = await pageFast.evaluate(async () => {
    let longFrames = 0;
    let totalFrames = 0;
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = now - lastTime;
      lastTime = now;
      totalFrames++;
      if (dt > 33.3) longFrames++; // dropped frame below 30fps
    };

    let rafId;
    const animLoop = (now) => {
      loop(now);
      rafId = requestAnimationFrame(animLoop);
    };
    rafId = requestAnimationFrame(animLoop);

    // Rapid scroll
    for (let y = 0; y <= 2500; y += 200) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 40));
    }

    // Wait 1500ms
    await new Promise(r => setTimeout(r, 1500));
    cancelAnimationFrame(rafId);

    const states = Array.from(document.querySelectorAll('[data-unfold-state]')).map(c => c.getAttribute('data-unfold-state'));
    return {
      longFrames,
      totalFrames,
      jankPct: ((longFrames / totalFrames) * 100).toFixed(1) + '%',
      allCardsSettled: states.slice(0, 9).every(s => s === 'done')
    };
  });

  console.log('Fast scroll results:', jankStats);

  await browser.close();
}

testReducedMotionAndFastScroll();
