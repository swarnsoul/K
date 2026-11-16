const fs = require('fs');

const p = 'C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/.system_generated/steps/5907/output.txt';
const text = fs.readFileSync(p, 'utf8');

// Find all lines inside Desktop - 10 (id="217:666")
const start = text.indexOf('<frame id="217:666"');
const end = text.indexOf('</frame>', text.indexOf('id="563:923"')) + 8;
const d10Xml = text.substring(start, end);

const lines = d10Xml.split('\n');
console.log('Total lines in Desktop - 10 XML:', lines.length);

// Print all lines that mention 563: (nodes in the footer area)
lines.forEach(l => {
  if (l.includes('563:') || l.includes('Frame 85') || l.includes('Frame 182')) {
    console.log(l.trim());
  }
});
