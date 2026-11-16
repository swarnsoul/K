const fs = require('fs');

const content = fs.readFileSync('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/.system_generated/steps/10824/output.txt', 'utf8');

function extractFrames(xmlChunk) {
  const lines = xmlChunk.split('\n');
  const result = [];
  let currentFrame = null;
  for (const line of lines) {
    const trimmed = line.trim();
    const frameMatch = trimmed.match(/<frame id="([^"]+)" name="([^"]+)" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"/);
    if (frameMatch) {
      const depth = line.search(/\S/) / 2;
      result.push({
        id: frameMatch[1],
        name: frameMatch[2],
        x: frameMatch[3],
        y: frameMatch[4],
        w: frameMatch[5],
        h: frameMatch[6],
        depth,
        raw: trimmed
      });
    } else if (trimmed.startsWith('<text') || trimmed.startsWith('<rounded-rectangle') || trimmed.startsWith('<vector') || trimmed.startsWith('<group')) {
      const depth = line.search(/\S/) / 2;
      result.push({
        leaf: true,
        depth,
        raw: trimmed
      });
    }
  }
  return result;
}

const m15 = content.indexOf('<frame id="443:103"');
const m11 = content.indexOf('<frame id="285:57"');

const xml15 = content.slice(m15, m11);
const xml11 = content.slice(m11);

fs.writeFileSync('scripts/parsed-15.json', JSON.stringify(extractFrames(xml15), null, 2));
fs.writeFileSync('scripts/parsed-11.json', JSON.stringify(extractFrames(xml11), null, 2));

console.log('Saved parsed-15.json and parsed-11.json');
