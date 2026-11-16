const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const pixelmatchLib = require("pixelmatch");
const pixelmatch = pixelmatchLib.default || pixelmatchLib;
const { PNG } = require("pngjs");

const ARTIFACT_DIR = "C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98";

async function compare() {
  const figmaNavPath = path.join(ARTIFACT_DIR, "figma_nav_bar_full.png");
  const liveNavPath = path.join(ARTIFACT_DIR, "rendered_nav_bar_1440.png");

  // Read dimensions
  const figmaMeta = await sharp(figmaNavPath).metadata();
  const liveMeta = await sharp(liveNavPath).metadata();

  console.log("Figma nav image:", figmaMeta.width, "x", figmaMeta.height);
  console.log("Live nav image:", liveMeta.width, "x", liveMeta.height);

  // Resize both to 1088x113 (or 1024x108)
  const W = 1024;
  const H = 108;

  const figmaPngRaw = await sharp(figmaNavPath)
    .resize(W, H, { fit: "fill" })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const livePngRaw = await sharp(liveNavPath)
    .resize(W, H, { fit: "fill" })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const diff = new PNG({ width: W, height: H });
  const mismatched = pixelmatch(figmaPngRaw, livePngRaw, diff.data, W, H, {
    threshold: 0.15,
    includeAA: true,
  });

  const total = W * H;
  const similarity = (total - mismatched) / total;

  fs.writeFileSync(path.join(ARTIFACT_DIR, "nav_diff.png"), PNG.sync.write(diff));

  console.log(`Mismatched pixels: ${mismatched} / ${total}`);
  console.log(`Similarity score: ${similarity.toFixed(4)} (${(similarity * 100).toFixed(2)}%)`);
}

compare().catch(console.error);
