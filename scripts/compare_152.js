const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const pixelmatchLib = require("pixelmatch");
const pixelmatch = pixelmatchLib.default || pixelmatchLib;
const { PNG } = require("pngjs");

const ARTIFACT_DIR = "C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98";

async function run() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3001/", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1000));

  // Pause sway animation at 0deg rest
  await page.addStyleTag({
    content: `
      .nav-hanging-arm-linkedin,
      .nav-hanging-arm-behance,
      .nav-hanging-icon-linkedin,
      .nav-hanging-icon-behance {
        animation: none !important;
        transform: none !important;
      }
    `,
  });

  // Height is 152px at 1440px width
  const W = 1440;
  const H = 152;
  const livePath = path.join(ARTIFACT_DIR, "live_header_1440x152.png");
  await page.screenshot({
    path: livePath,
    clip: { x: 0, y: 0, width: W, height: H },
  });

  const figmaNavPath = path.join(ARTIFACT_DIR, "figma_nav_bar_full.png");

  // Resize both to exactly 1440x152
  const figmaBuf = await sharp(figmaNavPath)
    .resize(W, H, { fit: "fill" })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const liveBuf = await sharp(livePath)
    .resize(W, H, { fit: "fill" })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const diff = new PNG({ width: W, height: H });
  const mismatched = pixelmatch(figmaBuf, liveBuf, diff.data, W, H, {
    threshold: 0.2,
    includeAA: true,
  });

  const total = W * H;
  const similarity = (total - mismatched) / total;

  fs.writeFileSync(path.join(ARTIFACT_DIR, "nav_152_diff.png"), PNG.sync.write(diff));

  console.log(`Mismatched: ${mismatched} / ${total}`);
  console.log(`Similarity: ${similarity.toFixed(4)} (${(similarity * 100).toFixed(2)}%)`);

  await browser.close();
}

run().catch(console.error);
