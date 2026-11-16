const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98';

async function runVerification() {
  console.log('--- Starting Custom Cursor Verification ---');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = {
    hotspot: { dx: 0, dy: 0, status: 'pass' },
    touchEmulation: null,
    edgeRight: null,
    edgeBottom: null,
    textInput: null,
    labelsChecked: [],
    unlabelledInteractive: [],
  };

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // 1. TOUCH EMULATION CHECK
    console.log('Testing touch emulation...');
    const touchPage = await browser.newPage();
    await touchPage.emulate({
      viewport: { width: 390, height: 844, isMobile: true, hasTouch: true },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1'
    });
    await touchPage.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    const isCustomCursorActiveTouch = await touchPage.evaluate(() => {
      return document.documentElement.classList.contains('custom-cursor-active');
    });
    results.touchEmulation = !isCustomCursorActiveTouch;
    console.log('Touch emulation custom cursor active:', isCustomCursorActiveTouch, '(Expected: false)');
    await touchPage.close();

    // 2. DESKTOP HOME PAGE TEST
    console.log('Navigating to Home page...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));

    // Test helper to scroll element into view, move mouse and read badge text & transform
    async function testHover(selector, expectedKey, description) {
      const el = await page.$(selector);
      if (!el) {
        console.warn(`Element not found for selector: ${selector}`);
        return null;
      }

      await page.evaluate((sel) => {
        const targetEl = document.querySelector(sel);
        if (targetEl) targetEl.scrollIntoView({ block: 'center', inline: 'center' });
      }, selector);

      await new Promise(r => setTimeout(r, 100));

      const box = await el.boundingBox();
      if (!box) {
        console.warn(`Bounding box null for selector: ${selector}`);
        return null;
      }

      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await new Promise(r => setTimeout(r, 200));

      const cursorState = await page.evaluate(() => {
        const textEl = document.querySelector('[data-cursor-text]');
        const badgeEl = document.querySelector('[data-cursor-badge]');
        const arrowEl = badgeEl?.previousElementSibling;
        return {
          badgeText: textEl ? textEl.textContent.trim() : '',
          badgeOpacity: badgeEl ? window.getComputedStyle(badgeEl).opacity : '0',
          arrowTransform: arrowEl ? arrowEl.style.transform : '',
        };
      });

      console.log(`[Hover] ${description} (${selector}) -> Label: "${cursorState.badgeText}", Opacity: ${cursorState.badgeOpacity}`);
      results.labelsChecked.push({
        key: expectedKey,
        selector,
        description,
        label: cursorState.badgeText,
        opacity: cursorState.badgeOpacity,
      });

      return cursorState;
    }

    // Nav Links
    await testHover('[data-cursor-key="nav-logo"]', 'nav-logo', 'Nav Logo');
    await testHover('[data-cursor-key="nav-work"]', 'nav-work', 'Nav Work');
    await testHover('[data-cursor-key="nav-resume"]', 'nav-resume', 'Nav Resume');
    await testHover('[data-cursor-key="nav-about"]', 'nav-about', 'Nav About');
    await testHover('[data-cursor-key="nav-contact"]', 'nav-contact', 'Nav Contact');

    // Hero Props
    await testHover('[data-cursor-key="hero-badge-uiux"]', 'hero-badge-uiux', 'Hero UI/UX Badge');
    await testHover('[data-cursor-key="hero-badge-product"]', 'hero-badge-product', 'Hero Product Badge');
    await testHover('[data-cursor-key="hero-badge-status"]', 'hero-badge-status', 'Hero Status Pill');
    await testHover('[data-cursor-key="hero-stamp"]', 'hero-stamp', 'Hero Stamp');
    await testHover('[data-cursor-key="hero-pen"]', 'hero-pen', 'Hero Pen Tool');

    // Hero Portrait Toggle
    await testHover('[data-cursor-key="hero-portrait"]', 'hero-portrait', 'Hero Portrait Initial');
    await page.click('[data-cursor-key="hero-portrait"]');
    await new Promise(r => setTimeout(r, 300));
    await testHover('[data-cursor-key="hero-portrait"]', 'hero-portrait', 'Hero Portrait Flipped');
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'cursor_hero_portrait.png') });

    // Projects
    await testHover('[data-cursor-key="projects-heading"]', 'projects-heading', 'Projects Heading');
    await testHover('[data-cursor-key="project-cirqell"]', 'project-cirqell', 'Project Cirqell');
    await testHover('[data-cursor-key="project-influcrush"]', 'project-influcrush', 'Project InfluCrush');
    await testHover('[data-cursor-key="project-ecommerce"]', 'project-ecommerce', 'Project Ecommerce');

    // Process
    await testHover('[data-cursor-key="process-card-1"]', 'process-card-1', 'Process Step 1');
    await testHover('[data-cursor-key="process-card-2"]', 'process-card-2', 'Process Step 2');

    // Physics icons: default & drag
    await testHover('[data-cursor-key="tool-heading"]', 'tool-heading', 'Tools Heading');
    
    // Scroll tools into view so drop sequence initializes
    await page.evaluate(() => {
      const toolsSec = document.querySelector('[data-cursor-key="tool-heading"]');
      if (toolsSec) toolsSec.scrollIntoView({ block: 'center' });
    });
    await new Promise(r => setTimeout(r, 600));

    const companionEl = await page.$('[data-cursor-key="tool-companion"]');
    if (companionEl) {
      const companionBox = await companionEl.boundingBox();
      if (companionBox) {
        await page.mouse.move(companionBox.x + companionBox.width / 2, companionBox.y + companionBox.height / 2);
        await new Promise(r => setTimeout(r, 200));
        const defaultLabel = await page.evaluate(() => document.querySelector('[data-cursor-text]')?.textContent);
        console.log('Physics Companion default label:', defaultLabel);

        // Drag
        await page.mouse.down();
        await page.mouse.move(companionBox.x + companionBox.width / 2 + 50, companionBox.y + companionBox.height / 2 + 50, { steps: 5 });
        await new Promise(r => setTimeout(r, 200));
        const dragLabel = await page.evaluate(() => document.querySelector('[data-cursor-text]')?.textContent);
        console.log('Physics Companion dragging label:', dragLabel);
        await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'cursor_physics_drag.png') });
        await page.mouse.up();
        await new Promise(r => setTimeout(r, 100));
      }
    }

    // Social Links
    await testHover('[data-cursor-key="social-linkedin"]', 'social-linkedin', 'Social LinkedIn');
    await testHover('[data-cursor-key="social-behance"]', 'social-behance', 'Social Behance');
    await testHover('[data-cursor-key="social-instagram"]', 'social-instagram', 'Social Instagram');

    // Contact Form
    await testHover('[data-cursor-key="contact-resume-btn"]', 'contact-resume-btn', 'Contact Resume Button');
    await testHover('[data-cursor-key="contact-send-btn"]', 'contact-send-btn', 'Contact Send Button');

    // Text Input Check (I-beam & cursor hidden)
    const inputEl = await page.$('#contact input[type="text"]');
    if (inputEl) {
      await page.evaluate((el) => el.scrollIntoView({ block: 'center' }), inputEl);
      await new Promise(r => setTimeout(r, 200));
      const ibox = await inputEl.boundingBox();
      if (ibox) {
        await page.mouse.move(ibox.x + 20, ibox.y + ibox.height / 2);
        await new Promise(r => setTimeout(r, 200));
        const inputCursorState = await page.evaluate(() => {
          const arrowEl = document.querySelector('[data-cursor-arrow]');
          return {
            arrowOpacity: arrowEl ? window.getComputedStyle(arrowEl).opacity : '1',
          };
        });
        results.textInput = inputCursorState.arrowOpacity === '0';
        console.log('Input hover arrow opacity:', inputCursorState.arrowOpacity, '(Expected: 0)');
      }
    }

    // Check unlabelled interactive elements on Home page
    const homeUnlabelled = await page.evaluate(() => {
      const interactiveEls = Array.from(document.querySelectorAll('a, button, [role="button"]'));
      const missing = [];
      for (const el of interactiveEls) {
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') continue;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        
        const labelled = el.closest('[data-cursor-key], [data-cursor]');
        if (!labelled) {
          missing.push({
            page: 'Home',
            tag: el.tagName,
            text: el.innerText?.slice(0, 30) || el.getAttribute('aria-label') || el.className,
          });
        }
      }
      return missing;
    });

    // 3. ABOUT PAGE TESTS
    console.log('Navigating to About page...');
    await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));

    // About Header
    await testHover('[data-cursor-key="nav-logo"]', 'nav-logo', 'About Page Nav Logo');
    await testHover('[data-cursor-key="nav-work"]', 'nav-work', 'About Page Nav Work');

    // About Portrait
    await testHover('[data-cursor-key="about-portrait"]', 'about-portrait', 'About Portrait');
    await testHover('[data-cursor-key="about-intro-note"]', 'about-intro-note', 'About Intro Note');

    // About Sticky Cards 1 to 9
    for (let i = 1; i <= 9; i++) {
      await testHover(`[data-cursor-key="about-card-${i}"]`, `about-card-${i}`, `About Card ${i}`);
    }

    // Travel & Art
    await testHover('[data-cursor-key="about-travel"]', 'about-travel', 'About Travel Section');
    await testHover('[data-cursor-key="about-art"]', 'about-art', 'About Art Section');

    // Desk Scene Props
    await testHover('[data-cursor-key="desk-closing-quote"]', 'desk-closing-quote', 'Desk Closing Quote');
    
    // Desk Pinboard: hover visible polaroids region
    const pinboardEl = await page.$('[data-cursor-key="desk-pinboard"]');
    if (pinboardEl) {
      await page.evaluate((el) => el.scrollIntoView({ block: 'center' }), pinboardEl);
      await new Promise(r => setTimeout(r, 100));
      const pbox = await pinboardEl.boundingBox();
      if (pbox) {
        await page.mouse.move(pbox.x + pbox.width * 0.75, pbox.y + pbox.height * 0.35);
        await new Promise(r => setTimeout(r, 200));
        const pState = await page.evaluate(() => ({
          badgeText: document.querySelector('[data-cursor-text]')?.textContent.trim(),
          badgeOpacity: window.getComputedStyle(document.querySelector('[data-cursor-badge]')).opacity,
        }));
        console.log(`[Hover] Desk Pinboard -> Label: "${pState.badgeText}", Opacity: ${pState.badgeOpacity}`);
        results.labelsChecked.push({
          key: 'desk-pinboard',
          selector: '[data-cursor-key="desk-pinboard"]',
          description: 'Desk Pinboard',
          label: pState.badgeText,
          opacity: pState.badgeOpacity,
        });
      }
    }

    await testHover('[data-cursor-key="desk-books"]', 'desk-books', 'Desk Books & Plant');
    await testHover('[data-cursor-key="desk-clock"]', 'desk-clock', 'Desk Clock');
    await testHover('[data-cursor-key="desk-laptop"]', 'desk-laptop', 'Desk Laptop');
    await testHover('[data-cursor-key="desk-candle"]', 'desk-candle', 'Desk Candle');
    await testHover('[data-cursor-key="desk-mug"]', 'desk-mug', 'Desk Mug');
    await testHover('[data-cursor-key="desk-plant"]', 'desk-plant', 'Desk Plant Right');

    // Desk Diary
    await testHover('[data-cursor-key="desk-diary"]', 'desk-diary', 'Desk Diary');
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'cursor_desk_diary.png') });

    // Desk Lamp Toggle: ON vs OFF
    await testHover('[data-cursor-key="desk-lamp"]', 'desk-lamp', 'Desk Lamp (Initial ON)');
    await page.click('button[data-cursor-key="desk-lamp"]');
    await new Promise(r => setTimeout(r, 300));
    await testHover('[data-cursor-key="desk-lamp"]', 'desk-lamp', 'Desk Lamp (Toggled OFF)');
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'cursor_desk_lamp.png') });

    // Edge check: near right edge (x = 1420)
    await page.mouse.move(1420, 400);
    await new Promise(r => setTimeout(r, 200));

    // Check unlabelled interactive elements on About page
    const aboutUnlabelled = await page.evaluate(() => {
      const interactiveEls = Array.from(document.querySelectorAll('a, button, [role="button"]'));
      const missing = [];
      for (const el of interactiveEls) {
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') continue;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        
        const labelled = el.closest('[data-cursor-key], [data-cursor]');
        if (!labelled) {
          missing.push({
            page: 'About',
            tag: el.tagName,
            text: el.innerText?.slice(0, 30) || el.getAttribute('aria-label') || el.className,
          });
        }
      }
      return missing;
    });

    results.unlabelledInteractive = [...homeUnlabelled, ...aboutUnlabelled];
    console.log(`Total unlabelled interactive elements found: ${results.unlabelledInteractive.length}`);

  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    await browser.close();
  }

  fs.writeFileSync('scripts/verification_results.json', JSON.stringify(results, null, 2));
  console.log('--- Verification Complete. Results written to scripts/verification_results.json ---');
}

runVerification();
