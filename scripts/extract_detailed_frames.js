const http = require("http");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const videoFilePath = "C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/.user_uploaded/media_1793548968654_06d779a2.mp4";
const artifactDir = "C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98";

const server = http.createServer((req, res) => {
  if (req.url === "/video.mp4") {
    const stat = fs.statSync(videoFilePath);
    res.writeHead(200, { "Content-Length": stat.size, "Content-Type": "video/mp4" });
    fs.createReadStream(videoFilePath).pipe(res);
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<!DOCTYPE html><html><body><video id="v" src="/video.mp4" muted playsinline></video></body></html>`);
  }
});

server.listen(4568, async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto("http://localhost:4568");

  await page.evaluate(() => {
    const v = document.getElementById("v");
    return new Promise((r) => {
      v.onloadedmetadata = () => r();
    });
  });

  const times = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.3, 1.6, 2.0, 2.4, 2.8, 3.2, 3.6, 4.0, 4.4, 4.6, 4.8, 5.0, 5.3, 5.6];
  for (const t of times) {
    await page.evaluate((time) => {
      const v = document.getElementById("v");
      return new Promise((r) => {
        v.currentTime = time;
        v.onseeked = () => r();
      });
    }, t);
    await page.screenshot({ path: path.join(artifactDir, `vframe_${t.toFixed(1).replace(".", "_")}s.png`) });
  }

  await browser.close();
  server.close();
  console.log("Extracted detailed frames successfully!");
});
