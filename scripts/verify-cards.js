const fs = require('fs');
const xml = fs.readFileSync('scripts/metadata.xml', 'utf8');

// Let's find each Card and its direct children
const cardMatches = [...xml.matchAll(/<frame id="(233:\d+|239:\d+|243:\d+)" name="Card" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)">([\s\S]*?)<\/frame>/g)];

for (const m of cardMatches) {
  const cardId = m[1];
  const bx = parseFloat(m[2]);
  const by = parseFloat(m[3]);
  const bw = parseFloat(m[4]);
  const bh = parseFloat(m[5]);
  const cx = bx + bw / 2;
  const cy = by + bh / 2;

  // Find inner container inside this card
  const innerMatch = m[6].match(/<frame id="([^"]+)" name="Container" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"/);
  console.log(`\nCard ID: ${cardId}`);
  console.log(`  BBox: x=${bx.toFixed(2)}, y=${by.toFixed(2)}, w=${bw.toFixed(2)}, h=${bh.toFixed(2)}`);
  console.log(`  Center: cx=${cx.toFixed(2)}, cy=${cy.toFixed(2)}`);
  if (innerMatch) {
    console.log(`  Inner Container ID: ${innerMatch[1]}, x=${innerMatch[2]}, y=${innerMatch[3]}, w=${parseFloat(innerMatch[4]).toFixed(2)}, h=${parseFloat(innerMatch[5]).toFixed(2)}`);
  }
}
