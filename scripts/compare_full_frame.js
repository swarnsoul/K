const puppeteer = require("puppeteer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
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

  // Pause animation for exact rest comparison
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

  // Capture full 1440x120 header area
  const fullHeaderPath = path.join(ARTIFACT_DIR, "live_full_header_1440.png");
  await page.screenshot({
    path: fullHeaderPath,
    clip: { x: 0, y: 0, width: 1440, height: 120 },
  });

  const figmaNavPath = path.join(ARTIFACT_DIR, "figma_nav_bar_full.png");
  const figmaMeta = await sharp(figmaNavPath).metadata();

  console.log("Figma Frame 86 image dimensions:", figmaMeta.width, figmaMeta.height);

  // Resize live screenshot to match Figma export dimensions (1024x108 or 1440x120)
  const W = 1440;
  const H = 120;

  const figmaBuf = await sharp(figmaNavPath)
    .resize(W, H, { fit: "fill" })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const liveBuf = await sharp(fullHeaderPath)
    .resize(W, H, { fit: "fill" })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const diff = new PNG({ width: W, height: H });
  const mismatched = pixelmatch(figmaBuf, liveBuf, diff.data, W, H, {
    threshold: 0.15,
    includeAA: true,
  });

  const total = W * H;
  const similarity = (total - mismatched) / total;

  fs.writeFileSync(path.join(ARTIFACT_DIR, "nav_frame_diff.png"), PNG.sync.write(diff));

  console.log(`Frame 86 Mismatched: ${mismatched} / ${total}`);
  console.log(`Frame 86 Similarity: ${similarity.toFixed(4)} (${(similarity * 100).toFixed(2)}%)`);

  // Now compare just the nav card (1088x58 + 48px hanging = 1088x89)
  const cardClip = { left: 176, top: 31, width: 1088, height: 89 };
  const cardLiveBuf = await sharp(fullHeaderPath).extract(cardClip).ensureAlpha().raw().toBuffer();
  const cardFigmaBuf = await sharp(figmaBuf, { raw: { width: W, height: H, channels: 4 } })
    .extract(cardClip)
    .ensureAlpha()
    .raw()
    .toBuffer();

  const cardDiff = new PNG({ width: cardClip.width, height: cardClip.height });
  const cardMismatched = pixelmatch(
    cardFigmaBuf,
    cardLiveBuf,
    cardDiff.data,
    cardClip.width,
    cardClip.height,
    { threshold: 0.15, includeAA: true }
  );
  const cardTotal = cardClip.width * cardClip.height;
  const cardSimilarity = (cardTotal - cardMismatched) / cardTotal;

  fs.writeFileSync(path.join(ARTIFACT_DIR, "card_diff.png"), PNG.sync.write(cardDiff));

  console.log(`Card Mismatched: ${cardMismatched} / ${cardTotal}`);
  console.log(`Card Similarity: ${cardSimilarity.toFixed(4)} (${(cardSimilarity * 100).toFixed(2)}%)`);

  await browser.close();
}

run().catch(console.error);
