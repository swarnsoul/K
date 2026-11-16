const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const ARTIFACT_DIR = "C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98";

async function recordSession(viewport, name) {
  const outDir = path.join(ARTIFACT_DIR, `reel_frames_${name}`);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport(viewport);

  const client = await page.target().createCDPSession();

  let frames = [];
  let startTime = null;

  client.on("Page.screencastFrame", async (event) => {
    const { data, metadata, sessionId } = event;
    const now = metadata.timestamp ? metadata.timestamp * 1000 : Date.now();
    if (startTime === null) startTime = now;
    frames.push({
      time: now - startTime,
      data: Buffer.from(data, "base64"),
    });

    try {
      await client.send("Page.screencastFrameAck", { sessionId });
    } catch {}
  });

  await client.send("Page.startScreencast", {
    format: "png",
    quality: 80,
    everyNthFrame: 1,
  });

  await page.goto("http://localhost:3001/?splash=1", { waitUntil: "domcontentloaded" });

  await page.waitForFunction(
    () => {
      const s = document.getElementById("splash-screen");
      return s === null || window.getComputedStyle(s).display === "none";
    },
    { timeout: 10000 }
  );

  // Wait extra 300ms to catch hero settle
  await new Promise((r) => setTimeout(r, 500));

  await client.send("Page.stopScreencast");
  await browser.close();

  console.log(`[${name}] Total screencast frames captured: ${frames.length}`);

  // Sample frames every 50ms from first frame to last frame
  if (frames.length > 0) {
    const totalDuration = frames[frames.length - 1].time;
    let sampleIdx = 0;
    for (let t = 0; t <= totalDuration; t += 50) {
      // Find frame closest to t
      let closest = frames[0];
      let minDiff = Math.abs(frames[0].time - t);
      for (const f of frames) {
        const diff = Math.abs(f.time - t);
        if (diff < minDiff) {
          minDiff = diff;
          closest = f;
        }
      }
      const filename = `frame_${String(sampleIdx).padStart(3, "0")}_${Math.round(t)}ms.png`;
      fs.writeFileSync(path.join(outDir, filename), closest.data);
      sampleIdx++;
    }
    console.log(`[${name}] Saved ${sampleIdx} 50ms-interval frames to ${outDir}`);
  }

  return frames.length;
}

async function main() {
  console.log("Starting screencast recordings...");
  await recordSession({ width: 1440, height: 850 }, "1440px");
  await recordSession({ width: 390, height: 844 }, "390px");
  console.log("All screencasts completed!");
}

main().catch((err) => {
  console.error("Recording error:", err);
  process.exit(1);
});
