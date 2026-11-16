const fs = require('fs');
const xml = fs.readFileSync('scripts/meta_443_103.xml', 'utf8');

// Parse top-level sections
const sectionRegex = /<frame id="([^"]+)" name="(Frame \d+|Frame|Desktop - 15)"[^>]*x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"/g;

// Let's find all frames under Desktop - 15 (id="443:103") and Frame 80 (id="443:104")
const lines = xml.split('\n');
console.log("Analyzing sections...");

// Let's extract frames with their names and coordinates
const frames = [];
const frameRegex = /<(frame|rounded-rectangle|instance) id="([^"]+)" name="([^"]+)" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"/g;
let m;
while ((m = frameRegex.exec(xml)) !== null) {
  frames.push({
    tag: m[1],
    id: m[2],
    name: m[3],
    x: parseFloat(m[4]),
    y: parseFloat(m[5]),
    w: parseFloat(m[6]),
    h: parseFloat(m[7])
  });
}

// Find top-level children of Frame 80 and Desktop-15
console.log("Top-level frames in Frame 80 / Desktop 15:");
frames.filter(f => (f.name.startsWith("Frame ") || f.name.startsWith("Desktop") || f.name.startsWith("image 3")) && f.w >= 1000).forEach(f => {
  console.log(`${f.id.padEnd(10)} | ${f.name.padEnd(12)} | y=${String(f.y).padEnd(8)} | h=${String(f.h).padEnd(8)} | w=${f.w}`);
});
