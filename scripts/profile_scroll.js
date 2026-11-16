const puppeteer = require('puppeteer');
const fs = require('fs');

async function profilePage(url, viewport, sectionRanges, throttleCpu = false) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport(viewport);

  if (throttleCpu) {
    const client = await page.target().createCDPSession();
    await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  }

  await page.goto(url, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Inject performance profiler
  await page.evaluate(() => {
    window.__perfData = {
      frames: [],
      longTasks: [],
    };

    // Long task observer
    if ('PerformanceObserver' in window) {
      try {
        const obs = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            window.__perfData.longTasks.push({
              name: entry.name,
              startTime: entry.startTime,
              duration: entry.duration,
              scrollY: window.scrollY,
            });
          }
        });
        obs.observe({ entryTypes: ['longtask'] });
      } catch (e) {}
    }

    // Frame timer
    let lastTime = performance.now();
    function onFrame(now) {
      const delta = now - lastTime;
      lastTime = now;
      window.__perfData.frames.push({
        delta,
        scrollY: window.scrollY,
      });
      requestAnimationFrame(onFrame);
    }
    requestAnimationFrame(onFrame);
  });

  // Move mouse to center of page so wheel events target main scroll area
  await page.mouse.move(viewport.width / 2, viewport.height / 2);

  // Perform steady mouse wheel scroll from top to bottom
  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  const steps = 60;
  const scrollStep = maxScroll / steps;

  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel({ deltaY: scrollStep });
    await new Promise(r => setTimeout(r, 40)); // ~25fps dispatch rate, simulating human wheel steps
  }

  await new Promise(r => setTimeout(r, 800));

  // Collect data
  const rawData = await page.evaluate(() => window.__perfData);
  await browser.close();

  // Analyze frames
  const allDeltas = rawData.frames.map(f => f.delta).slice(2); // drop first 2 frames
  const totalFrames = allDeltas.length;
  const droppedFrames = allDeltas.filter(d => d > 20).length;
  const avgFrameTime = allDeltas.reduce((a, b) => a + b, 0) / (totalFrames || 1);
  const overallFps = 1000 / avgFrameTime;
  const droppedPercent = (droppedFrames / (totalFrames || 1)) * 100;

  // Breakdown by section
  const sectionResults = {};
  for (const [secName, [sMin, sMax]] of Object.entries(sectionRanges)) {
    const secFrames = rawData.frames.filter(f => f.scrollY >= sMin && f.scrollY <= sMax).map(f => f.delta);
    const secLongTasks = rawData.longTasks.filter(t => t.scrollY >= sMin && t.scrollY <= sMax);
    if (secFrames.length > 0) {
      const sTotal = secFrames.length;
      const sDropped = secFrames.filter(d => d > 20).length;
      const sAvg = secFrames.reduce((a, b) => a + b, 0) / sTotal;
      const sFps = 1000 / sAvg;
      sectionResults[secName] = {
        fps: Math.round(sFps * 10) / 10,
        droppedFrames: sDropped,
        totalFrames: sTotal,
        droppedPercent: Math.round((sDropped / sTotal) * 1000) / 10,
        avgFrameTimeMs: Math.round(sAvg * 100) / 100,
        longTasksCount: secLongTasks.length,
        longTasksTotalMs: Math.round(secLongTasks.reduce((a, t) => a + t.duration, 0)),
      };
    } else {
      sectionResults[secName] = { fps: 60, droppedFrames: 0, totalFrames: 0, droppedPercent: 0, avgFrameTimeMs: 16.67, longTasksCount: 0, longTasksTotalMs: 0 };
    }
  }

  return {
    overall: {
      fps: Math.round(overallFps * 10) / 10,
      totalFrames,
      droppedFrames,
      droppedPercent: Math.round(droppedPercent * 10) / 10,
      avgFrameTimeMs: Math.round(avgFrameTime * 100) / 100,
      longTasksTotal: rawData.longTasks.length,
      longTasksTotalDurationMs: Math.round(rawData.longTasks.reduce((a, t) => a + t.duration, 0)),
    },
    sections: sectionResults,
    longTasks: rawData.longTasks,
  };
}

async function runProfiling() {
  console.log('=== PROFILING PRODUCTION BUILD ===');

  const homeSections = {
    "Hero (0-850px)": [0, 850],
    "Projects Pinned Stage (850-2600px)": [850, 2600],
    "Process (2600-3450px)": [2600, 3450],
    "Design Companions / Tools (3450-4100px)": [3450, 4100],
    "Social (4100-4600px)": [4100, 4600],
    "Contact Footer (4600px+)": [4600, 99999],
  };

  const aboutSections = {
    "Hero & Bio (0-900px)": [0, 900],
    "Sticky Notes Story (900-3200px)": [900, 3200],
    "Travel & Art Gallery (3200-4500px)": [3200, 4500],
    "Desk Footer Scene (4500px+)": [4500, 99999],
  };

  console.log('1. Profiling Home Page @ 1440...');
  const home1440 = await profilePage('http://localhost:3000', { width: 1440, height: 900 }, homeSections, false);

  console.log('2. Profiling About Page @ 1440...');
  const about1440 = await profilePage('http://localhost:3000/about', { width: 1440, height: 900 }, aboutSections, false);

  console.log('3. Profiling Home Page @ Mobile 390 (CPU 4x Throttled)...');
  const homeMobile = await profilePage('http://localhost:3000', { width: 390, height: 844 }, homeSections, true);

  console.log('4. Profiling About Page @ Mobile 390 (CPU 4x Throttled)...');
  const aboutMobile = await profilePage('http://localhost:3000/about', { width: 390, height: 844 }, aboutSections, true);

  const report = {
    home1440,
    about1440,
    homeMobile,
    aboutMobile,
  };

  fs.writeFileSync('scripts/initial_performance_report.json', JSON.stringify(report, null, 2));
  console.log('--- Initial Profile Complete ---');
  console.log(JSON.stringify(report, null, 2));
}

runProfiling().catch(console.error);
