const fs = require('fs');
const http = require('http');
const path = require('path');

const dc = JSON.parse(fs.readFileSync('scripts/designContexts.json', 'utf8'));

// Find all asset declarations: const imgX = "http://localhost:3845/assets/hash.ext";
const assetMap = {};

for (const [nodeId, contents] of Object.entries(dc)) {
  for (const item of contents) {
    if (typeof item.text === 'string') {
      const lines = item.text.split('\n');
      for (const line of lines) {
        const m = line.match(/const\s+([a-zA-Z0-9_]+)\s*=\s*"(http:\/\/localhost:3845\/assets\/[^"]+)";/);
        if (m) {
          const varName = m[1];
          const url = m[2];
          assetMap[varName] = { url, nodeId };
        }
      }
    }
  }
}

console.log('Asset mappings found:', Object.keys(assetMap).length);
console.log(assetMap);

// Download all assets into public/assets/about/
const targetDir = path.resolve('public/assets/about');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function downloadAll() {
  for (const [varName, { url, nodeId }] of Object.entries(assetMap)) {
    const ext = path.extname(url);
    const filename = `${varName}${ext}`;
    const dest = path.join(targetDir, filename);
    await download(url, dest);
    const size = fs.statSync(dest).size;
    console.log(`Downloaded ${filename} (${size} bytes) for node ${nodeId}`);
  }
  console.log('All Figma assets downloaded successfully!');
}

downloadAll().catch(console.error);
