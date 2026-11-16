const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const outDir = path.resolve('scripts/animation_frames');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Expose a controller to freeze or step through performance.now()
  await page.evaluateOnNewDocument(() => {
    window.__manualTime = 0;
    window.__useManualTime = false;
    const realNow = performance.now.bind(performance);
    performance.now = function () {
      return window.__useManualTime ? window.__manualTime : realNow();
    };
  });

  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });

  // Scroll to Card 1 so it's in view
  const card1 = await page.$('[data-figma-id="233:696"]');
  if (!card1) {
    console.error('Card 1 not found!');
    await browser.close();
    return;
  }

  // Checkpoints: 0, 200, 450, 700, 950, 1300ms
  // Let's test standard playback capture
  // We can reload and scroll with precise offsets or use element evaluate
  console.log('Capturing real-time sequence on Card 1...');
  
  // Re-navigate to clean state
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });
  
  // Trigger animation manually on Card 1 and capture at intervals
  const checkpoints = [0, 200, 450, 700, 950, 1300];
  
  for (const t of checkpoints) {
    // In order to get exact frame at time t, we can create a fresh page, step time to t, and screenshot Card 1
    const p = await browser.newPage();
    await p.setViewport({ width: 1440, height: 900 });
    await p.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });

    await p.evaluate(async (timeTarget) => {
      // Find Card 1
      const card = document.querySelector('[data-figma-id="233:696"]');
      if (!card) return;
      card.scrollIntoView({ behavior: 'instant', block: 'center' });
      // Wait for observer to fire and animation to progress to timeTarget
      await new Promise(r => setTimeout(r, timeTarget));
    }, t);

    const el = await p.$('[data-figma-id="233:696"]');
    if (el) {
      const shot = await el.screenshot();
      const filename = path.join(outDir, `card_1_frame_${t}ms.png`);
      fs.writeFileSync(filename, shot);
      console.log(`Saved ${filename}`);
    }
    await p.close();
  }

  await browser.close();
  console.log('Frame capture complete.');
}

run();
