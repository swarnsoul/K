const fs = require('fs');

function analyzeSectionAlignments(xmlPath, name) {
  const xml = fs.readFileSync(xmlPath, 'utf8');
  console.log(`\n================== ${name} Alignments ==================`);

  // We want to check each Frame 87, 88, 89, 90, 91, 92, 94, 95, 96, 97, 98, 99, 100, 101, 102, 108, 103, 104, 105, 106, 107
  const sectionIds = [
    'Frame 87', 'Frame 88', 'Frame 89', 'Frame 90', 'Frame 91', 'Frame 92',
    'Frame 94', 'Frame 95', 'Frame 96', 'Frame 97', 'Frame 98', 'Frame 99',
    'Frame 100', 'Frame 101', 'Frame 102', 'Frame 108', 'Frame 103', 'Frame 104',
    'Frame 105', 'Frame 106', 'Frame 107'
  ];

  for (const sName of sectionIds) {
    const regex = new RegExp(`<frame id="([^"]+)" name="${sName}" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)">([\\s\\S]*?)<\\/frame>`);
    const m = xml.match(regex);
    if (!m) {
      console.log(`${sName}: NOT FOUND`);
      continue;
    }
    const id = m[1];
    const x = parseFloat(m[2]);
    const y = parseFloat(m[3]);
    const w = parseFloat(m[4]);
    const h = parseFloat(m[5]);
    const inner = m[6];

    // Find direct child elements
    const childMatches = [...inner.matchAll(/<(frame|rectangle|image|text) id="([^"]+)" name="([^"]*)" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"/g)];
    console.log(`\n${sName} (id: ${id}) [y=${y}, h=${h}, w=${w}]:`);
    childMatches.slice(0, 4).forEach(cm => {
      console.log(`   - <${cm[1]}> "${cm[3].slice(0, 40)}" x=${cm[4]}, y=${cm[5]}, w=${cm[6]}, h=${cm[7]}`);
    });
  }
}

analyzeSectionAlignments('scripts/meta_285_57.xml', 'InfluCrush');
analyzeSectionAlignments('scripts/meta_443_103.xml', 'Cirqell');
