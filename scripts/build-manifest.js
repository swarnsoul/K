const fs = require('fs');
const path = require('path');

const xml = fs.readFileSync('scripts/metadata.xml', 'utf8');
const dc = JSON.parse(fs.readFileSync('scripts/designContexts.json', 'utf8'));

// Parse all nodes from XML
const lines = xml.split('\n');
const nodes = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const m = line.match(/<([a-z0-9\-]+)\s+id="([^"]+)"\s+name="([^"]+)"\s+x="([^"]+)"\s+y="([^"]+)"\s+width="([^"]+)"\s+height="([^"]+)"/);
  if (m) {
    const tag = m[1];
    const id = m[2];
    const name = m[3];
    const x = parseFloat(m[4]);
    const y = parseFloat(m[5]);
    const width = parseFloat(m[6]);
    const height = parseFloat(m[7]);

    // Check if there is text inside
    let textContent = null;
    if (tag === 'text') {
      textContent = name;
    }

    nodes.push({
      nodeId: id,
      name,
      type: tag,
      x,
      y,
      width,
      height,
      rotation: 0,
      opacity: 1,
      visibility: true,
      zIndex: i,
      fills: [],
      strokes: [],
      cornerRadius: 0,
      shadows: null,
      blendMode: 'normal',
      mask: false,
      text: textContent
    });
  }
}

// Write manifest.json
fs.writeFileSync('manifest.json', JSON.stringify({
  frame: {
    id: '217:666',
    name: 'Desktop - 10',
    width: 1440,
    height: 4401
  },
  nodesCount: nodes.length,
  nodes
}, null, 2));

console.log('Manifest written with', nodes.length, 'nodes to manifest.json');
