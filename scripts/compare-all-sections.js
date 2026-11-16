const puppeteer = require('puppeteer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = "C:\\Users\\acer\\.gemini\\antigravity\\brain\\4e5d3daf-196b-4036-a731-fc1f17b54f98";

const SECTIONS = [
  { name: '01_navbar', selector: '[data-section="01_navbar"]' },
  { name: '02_hero_intro', selector: '[data-section="02_hero_intro"]' },
  { name: '03_hero_banner', selector: '[data-section="03_hero_banner"]' },
  { name: '04_design_process', selector: '[data-section="04_design_process"]' },
  { name: '05_overview_screens', selector: '[data-section="05_overview_screens"]' },
  { name: '06_problem_space', selector: '[data-section="06_problem_space"]' },
  { name: '07_key_challenges', selector: '[data-section="07_key_challenges"]' },
  { name: '08_bento_showcase', selector: '[data-section="08_bento_showcase"]' },
  { name: '09_opportunity', selector: '[data-section="09_opportunity"]' },
  { name: '10_pillars', selector: '[data-section="10_pillars"]' },
  { name: '11_validation', selector: '[data-section="11_validation"]' },
  { name: '12_insights', selector: '[data-section="12_insights"]' },
  { name: '13_info_architecture', selector: '[data-section="13_info_architecture"]' },
  { name: '14_user_flow', selector: '[data-section="14_user_flow"]' },
  { name: '15_ideation', selector: '[data-section="15_ideation"]' },
  { name: '16_wireframes', selector: '[data-section="16_wireframes"]' },
  { name: '17_solution', selector: '[data-section="17_solution"]' },
  { name: '18_hifi_screens', selector: '[data-section="18_hifi_screens"]' },
  { name: '19_design_system', selector: '[data-section="19_design_system"]' },
  { name: '20_accessibility', selector: '[data-section="20_accessibility"]' },
  { name: '21_business_impact', selector: '[data-section="21_business_impact"]' },
  { name: '22_reflection', selector: '[data-section="22_reflection"]' },
];

async function runComparison(project) {
  console.log(`\n================== Comparing ${project} ==================`);
  const figmaDir = path.join(__dirname, `figma_sections_${project}`);
  const outDir = path.join(__dirname, `comparisons_${project}`);
  const artifactSubdir = path.join(ARTIFACT_DIR, `comparisons_${project}`);
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(artifactSubdir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  console.log(`Navigating to http://localhost:3001/work/${project}...`);
  await page.goto(`http://localhost:3001/work/${project}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('[data-section="02_hero_intro"]', { timeout: 30000 });
  console.log('Page loaded, waiting for fonts...');
  await new Promise(r => setTimeout(r, 2000));

  for (const s of SECTIONS) {
    const figmaPath = path.join(figmaDir, `${s.name}.png`);
    if (!fs.existsSync(figmaPath)) {
      console.warn(`Missing figma ref: ${figmaPath}`);
      continue;
    }

    try {
      const el = await page.$(s.selector);
      if (!el) {
        console.warn(`Element not found for selector: ${s.selector}`);
        continue;
      }

      // Scroll into view
      await page.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }), el);
      await new Promise(r => setTimeout(r, 300));

      // Capture screenshot of element
      const liveBuffer = await el.screenshot();

      // Read metadata of both
      const figmaMeta = await sharp(figmaPath).metadata();
      const liveMeta = await sharp(liveBuffer).metadata();

      // Standardize widths to 720px each for side-by-side composite (total 1440px wide)
      const targetW = 720;
      const figmaH = Math.round(figmaMeta.height * (targetW / figmaMeta.width));
      const liveH = Math.round(liveMeta.height * (targetW / liveMeta.width));
      const maxH = Math.max(figmaH, liveH, 100);

      const figmaResized = await sharp(figmaPath)
        .resize(targetW, figmaH)
        .extend({
          top: 0,
          bottom: maxH - figmaH,
          left: 0,
          right: 0,
          background: { r: 245, g: 245, b: 245, alpha: 1 }
        })
        .toBuffer();

      const liveResized = await sharp(liveBuffer)
        .resize(targetW, liveH)
        .extend({
          top: 0,
          bottom: maxH - liveH,
          left: 0,
          right: 0,
          background: { r: 245, g: 245, b: 245, alpha: 1 }
        })
        .toBuffer();

      // Header labels: create composite side by side
      const composite = await sharp({
        create: {
          width: targetW * 2,
          height: maxH + 40,
          channels: 4,
          background: { r: 30, g: 30, b: 35, alpha: 1 }
        }
      })
      .composite([
        {
          input: Buffer.from(`
            <svg width="${targetW * 2}" height="40">
              <text x="20" y="26" font-family="sans-serif" font-size="16" font-weight="bold" fill="#00ffcc">FIGMA REFERENCE: ${s.name}</text>
              <text x="${targetW + 20}" y="26" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffcc00">LIVE IMPLEMENTATION (1440px)</text>
            </svg>
          `),
          top: 0,
          left: 0
        },
        { input: figmaResized, top: 40, left: 0 },
        { input: liveResized, top: 40, left: targetW }
      ])
      .png()
      .toBuffer();

      const outName = `${s.name}_compare.png`;
      fs.writeFileSync(path.join(outDir, outName), composite);
      fs.writeFileSync(path.join(artifactSubdir, outName), composite);
      console.log(`Saved comparison: ${s.name} (live: ${liveMeta.width}x${liveMeta.height}, figma: ${figmaMeta.width}x${figmaMeta.height})`);
    } catch (err) {
      console.error(`Error comparing ${s.name}:`, err.message);
    }
  }

  await browser.close();
}

async function main() {
  await runComparison('influcrush');
  await runComparison('cirqell');
  console.log('\nAll comparisons completed!');
}

main().catch(console.error);
