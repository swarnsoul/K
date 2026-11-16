const fs = require('fs');
const xml = fs.readFileSync('scripts/metadata.xml', 'utf8');

const regex = /<(frame|instance|component|group)[^>]+id="([^"]+)"[^>]+name="([^"]+)"[^>]+x="([^"]+)"[^>]+y="([^"]+)"[^>]+width="([^"]+)"[^>]+height="([^"]+)"/g;

let m;
const nodes = [];
while ((m = regex.exec(xml)) !== null) {
  nodes.push({
    tag: m[1],
    id: m[2],
    name: m[3],
    x: parseFloat(m[4]),
    y: parseFloat(m[5]),
    w: parseFloat(m[6]),
    h: parseFloat(m[7]),
  });
}

console.log(JSON.stringify(nodes, null, 2));
