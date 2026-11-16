const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98';

async function verifyAll() {
  console.log('=== Starting Full Verification for Tools Physics & Custom Cursor ===');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.log('[Browser Error]', msg.text());
    }
  });

  page.on('response', resp => {
    if (resp.status() >= 400) {
      console.log(`[HTTP ${resp.status()}] Failed to load: ${resp.url()}`);
    }
  });

  page.on('pageerror', err => {
    pageErrors.push(err.message);
    console.log('[Page Error]', err.message);
  });

  // ─── 1. Desktop 1440 Check ───────────────────────────────────────────────────
  console.log('--- 1. Testing Desktop 1440 ---');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));

  // Scroll to Tools section
  await page.evaluate(() => {
    const el = document.querySelector('[data-node-id="169:859"]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });

  // Wait for spawn sequence and physics drop
  console.log('Waiting for drop sequence and physics settle (2.5s)...');
  await new Promise(r => setTimeout(r, 2500));

  // Verify icons exist and have valid coordinates
  const iconsData1440 = await page.evaluate(() => {
    const icons = Array.from(document.querySelectorAll('.hidden.xl\\:flex [data-icon-index]'));
    return icons.map(el => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        key: el.getAttribute('data-cursor-key'),
        index: el.getAttribute('data-icon-index'),
        opacity: style.opacity,
        transform: el.style.transform,
        x: rect.left,
        y: rect.top,
        w: rect.width,
        h: rect.height,
        visible: rect.width > 0 && rect.height > 0 && style.opacity === '1',
      };
    });
  });

  console.log(`Desktop 1440 icons detected: ${iconsData1440.length}`);
  console.log('All icons visible and dropped:', iconsData1440.every(i => i.visible));
  console.log('Sample icon data:', iconsData1440.slice(0, 3));

  // Screenshot of 1440 settled tools section
  const section1440 = await page.$('[data-node-id="163:619"]') || await page.$('[data-node-id="169:859"]');
  if (section1440) {
    const box = await section1440.boundingBox();
    if (box) {
      await page.screenshot({
        path: path.join(ARTIFACTS_DIR, 'tools_1440_settled.png'),
        clip: box,
      });
      console.log('Saved tools_1440_settled.png');
    }
  }

  // ─── 2. Mobile 390 Check ─────────────────────────────────────────────────────
  console.log('--- 2. Testing Mobile 390 ---');
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));

  await mobilePage.evaluate(() => {
    const el = document.querySelector('.xl\\:hidden [aria-label*="companions"]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });

  await new Promise(r => setTimeout(r, 2500));

  const iconsData390 = await mobilePage.evaluate(() => {
    const icons = Array.from(document.querySelectorAll('.xl\\:hidden [data-icon-index]'));
    return icons.map(el => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        key: el.getAttribute('data-cursor-key'),
        visible: rect.width > 0 && rect.height > 0 && style.opacity === '1',
        x: rect.left,
        y: rect.top,
      };
    });
  });

  console.log(`Mobile 390 icons detected: ${iconsData390.length}, all visible: ${iconsData390.every(i => i.visible)}`);
  await mobilePage.screenshot({ path: path.join(ARTIFACTS_DIR, 'tools_390_settled.png') });
  console.log('Saved tools_390_settled.png');
  await mobilePage.close();

  // ─── 3. Hovering 3 Different Icons & Label Verification ───────────────────────
  console.log('--- 3. Testing Cursor Hover on 3 Icons ---');
  // Helper to hover and measure label
  async function testIconHover(cursorKey, expectedLabel, shotName) {
    const iconEl = await page.$(`[data-cursor-key="${cursorKey}"]`);
    if (!iconEl) {
      console.error(`Icon ${cursorKey} not found!`);
      return null;
    }
    const box = await iconEl.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    // Wait for text crossfade & lerp
    await new Promise(r => setTimeout(r, 700));

    const labelInfo = await page.evaluate(() => {
      const badge = document.querySelector('[data-cursor-badge]');
      const text = document.querySelector('[data-cursor-text]');
      return {
        text: text ? text.textContent.trim() : '',
        opacity: badge ? badge.style.opacity : '0',
      };
    });

    console.log(`[Hover ${cursorKey}] Expected: "${expectedLabel}", Got: "${labelInfo.text}", Opacity: ${labelInfo.opacity}`);

    // Screenshot around cursor
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, shotName),
      clip: {
        x: Math.max(0, Math.floor(box.x - 20)),
        y: Math.max(0, Math.floor(box.y - 40)),
        width: 320,
        height: 160,
      }
    });
    console.log(`Saved ${shotName}`);
    return labelInfo;
  }

  const hoverFigma = await testIconHover("tool-figma", "Where pixels are born", "hover_tool_figma.png");
  const hoverClaude = await testIconHover("tool-claude", "Vibe coding partner", "hover_tool_claude.png");
  const hoverSpotify = await testIconHover("tool-spotify", "Soundtrack for focus", "hover_tool_spotify.png");

  // ─── 4. Drag & Throw Test: "Got you!" and Reaction ───────────────────────────
  console.log('--- 4. Testing Drag with "Got you!" ---');
  const figmaEl = await page.$('[data-cursor-key="tool-figma"]');
  const fBox = await figmaEl.boundingBox();

  // Move to center of Figma icon
  await page.mouse.move(fBox.x + fBox.width / 2, fBox.y + fBox.height / 2);
  await new Promise(r => setTimeout(r, 400));

  // Pointer down (start drag)
  await page.mouse.down();
  await new Promise(r => setTimeout(r, 200));

  // Move 120px to the right and 30px down
  await page.mouse.move(fBox.x + fBox.width / 2 + 120, fBox.y + fBox.height / 2 + 30);
  await new Promise(r => setTimeout(r, 400));

  // Read label while dragging
  const dragLabelInfo = await page.evaluate(() => {
    const text = document.querySelector('[data-cursor-text]');
    const isDraggingAttr = document.documentElement.hasAttribute('data-physics-dragging');
    return {
      text: text ? text.textContent.trim() : '',
      isDraggingAttr,
    };
  });
  console.log(`[During Drag] Label: "${dragLabelInfo.text}" (Expected: "Got you!"), Attr: ${dragLabelInfo.isDraggingAttr}`);

  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'tools_drag_got_you.png') });
  console.log('Saved tools_drag_got_you.png');

  // Release drag (pointer up)
  await page.mouse.up();
  await new Promise(r => setTimeout(r, 500));

  // Check label after release while pointer is still over or near icon
  const postReleaseLabel = await page.evaluate(() => {
    const text = document.querySelector('[data-cursor-text]');
    const isDraggingAttr = document.documentElement.hasAttribute('data-physics-dragging');
    return {
      text: text ? text.textContent.trim() : '',
      isDraggingAttr,
    };
  });
  console.log(`[After Release] Label: "${postReleaseLabel.text}", Attr: ${postReleaseLabel.isDraggingAttr}`);

  // ─── 5. Resilience: Scroll away & back, Resize, Navigate /about & back ──────
  console.log('--- 5. Testing Resilience ---');
  // Scroll to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));
  // Scroll back to tools
  await page.evaluate(() => {
    const el = document.querySelector('[data-node-id="169:859"]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 500));

  // Resize window
  await page.setViewport({ width: 1300, height: 850 });
  await new Promise(r => setTimeout(r, 500));
  await page.setViewport({ width: 1440, height: 900 });
  await new Promise(r => setTimeout(r, 500));

  // Navigate to /about
  console.log('Navigating to /about...');
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  // Navigate back to /
  console.log('Navigating back to /...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  await page.evaluate(() => {
    const el = document.querySelector('[data-node-id="169:859"]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 2000));

  const postNavIcons = await page.evaluate(() => {
    const icons = Array.from(document.querySelectorAll('[data-icon-index]'));
    return icons.map(el => el.getBoundingClientRect()).filter(r => r.width > 0 && r.height > 0);
  });
  console.log(`Post-nav icons active: ${postNavIcons.length} / 8`);

  // ─── 6. Cursor on Other Sections ─────────────────────────────────────────────
  console.log('--- 6. Checking Cursor on Other Sections ---');
  // Scroll to hero
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 600));
  const navWork = await page.$('[data-cursor-key="nav-work"]');
  const nwBox = await navWork.boundingBox();
  await page.mouse.move(nwBox.x + nwBox.width / 2, nwBox.y + nwBox.height / 2);
  await new Promise(r => setTimeout(r, 600));
  const navWorkLabel = await page.evaluate(() => {
    const t = document.querySelector('[data-cursor-text]');
    return t ? t.textContent.trim() : '';
  });
  console.log(`Nav Work Label: "${navWorkLabel}" (Expected: "See my best work")`);

  console.log('=== Final Error Check ===');
  console.log(`Console Errors: ${consoleErrors.length}`);
  console.log(`Page Errors: ${pageErrors.length}`);

  const report = {
    errors: { consoleErrors, pageErrors },
    desktop1440: { iconsCount: iconsData1440.length, allVisible: iconsData1440.every(i => i.visible) },
    mobile390: { iconsCount: iconsData390.length, allVisible: iconsData390.every(i => i.visible) },
    hoverTests: { hoverFigma, hoverClaude, hoverSpotify },
    dragTest: { dragLabelInfo, postReleaseLabel },
    postNavIconsCount: postNavIcons.length,
    otherSectionsWork: navWorkLabel === "See my best work",
  };

  fs.writeFileSync('scripts/tools_verification_report.json', JSON.stringify(report, null, 2));
  console.log('Report saved to scripts/tools_verification_report.json');

  await browser.close();
}

verifyAll().catch(console.error);
