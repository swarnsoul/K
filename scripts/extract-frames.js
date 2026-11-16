const fs = require('fs');
const xml11 = fs.readFileSync('scripts/meta_285_57.xml', 'utf8');
const xml15 = fs.readFileSync('scripts/meta_443_103.xml', 'utf8');

function extractFrames(xml) {
  const matches = [];
  const regex = /<frame id="([^"]+)" name="([^"]+)" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"/g;
  let m;
  while ((m = regex.exec(xml)) !== null) {
    if (m[2].startsWith('Frame ')) {
      matches.push({ id: m[1], name: m[2], x: parseFloat(m[3]), y: parseFloat(m[4]), w: parseFloat(m[5]), h: parseFloat(m[6]) });
    }
  }
  return matches;
}

const frames11 = extractFrames(xml11);
const frames15 = extractFrames(xml15);

console.log('Frames in InfluCrush (285:57):', frames11.length);
console.log('Frames in Cirqell (443:103):', frames15.length);
fs.writeFileSync('scripts/frames_11.json', JSON.stringify(frames11, null, 2));
fs.writeFileSync('scripts/frames_15.json', JSON.stringify(frames15, null, 2));
