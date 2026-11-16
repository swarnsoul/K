const http = require("http");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const videoFilePath = "C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/.user_uploaded/media_1793548968654_06d779a2.mp4";
const artifactDir = "C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98";

const server = http.createServer((req, res) => {
  if (req.url === "/video.mp4") {
    const stat = fs.statSync(videoFilePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(videoFilePath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(videoFilePath).pipe(res);
    }
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <html>
        <body style="margin:0; background:#fff; display:flex; align-items:center; justify-content:center; height:100vh;">
          <video id="v" src="/video.mp4" style="max-width:100%; max-height:100%;" muted playsinline></video>
        </body>
      </html>
    `);
  }
});

server.listen(4567, async () => {
  console.log("Server listening on http://localhost:4567");
  try {
    const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto("http://localhost:4567", { waitUntil: "domcontentloaded" });

    const meta = await page.evaluate(async () => {
      const v = document.getElementById("v");
      await new Promise((r) => {
        if (v.readyState >= 1) r();
        else v.onloadedmetadata = () => r();
      });
      return {
        duration: v.duration,
        videoWidth: v.videoWidth,
        videoHeight: v.videoHeight,
      };
    });

    console.log("Video metadata:", meta);

    const sampleTimes = [0.1, 0.4, 0.7, 1.0, 1.8, 2.5, 3.2, 4.0, 4.5, 4.8, 5.2, 5.7, 6.2];
    for (const t of sampleTimes) {
      if (t > meta.duration) continue;
      await page.evaluate((time) => {
        const v = document.getElementById("v");
        return new Promise((r) => {
          v.currentTime = time;
          v.onseeked = () => r();
        });
      }, t);
      const frameName = `video_frame_${t.toFixed(1).replace(".", "_")}s.png`;
      await page.screenshot({ path: path.join(artifactDir, frameName) });
      console.log(`Saved frame at ${t}s to ${frameName}`);
    }

    await browser.close();
  } catch (err) {
    console.error("Error inspecting video:", err);
  } finally {
    server.close();
  }
});
