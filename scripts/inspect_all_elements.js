const fs = require('fs');
const xml = fs.readFileSync('scripts/meta_443_103.xml', 'utf8');

const sectionIds = [
  { id: '443:312', name: 'Navbar' },
  { id: '443:358', name: 'Hero Intro' },
  { id: '443:106', name: 'Hero Banner' },
  { id: '443:110', name: 'Design Process' },
  { id: '443:166', name: 'Key Screens' },
  { id: '443:171', name: 'Problem Space' },
  { id: '443:175', name: 'Key Challenges' },
  { id: '443:180', name: 'Bento' },
  { id: '443:182', name: 'Opportunity' },
  { id: '443:186', name: '4 Pillars' },
  { id: '443:199', name: 'Validation' },
  { id: '443:203', name: 'Key Insights' },
  { id: '443:207', name: 'Info Architecture' },
  { id: '443:228', name: 'User Flow' },
  { id: '443:256', name: 'Ideation' },
  { id: '443:262', name: 'Wireframes' },
  { id: '443:268', name: 'Solution' },
  { id: '443:275', name: 'HiFi Screens' },
  { id: '443:294', name: 'Design System' },
  { id: '443:300', name: 'Accessibility' },
  { id: '443:304', name: 'Business Impact' },
  { id: '443:308', name: 'Reflection' }
];

sectionIds.forEach(sec => {
  const marker = `id="${sec.id}"`;
  const idx = xml.indexOf(marker);
  if (idx === -1) {
    console.log(`Not found: ${sec.name} (${sec.id})`);
    return;
  }
  // find slice until next section or reasonable length
  const nextSecs = sectionIds.map(s => xml.indexOf(`id="${s.id}"`)).filter(p => p > idx).sort((a,b) => a - b);
  const nextIdx = nextSecs[0] || (idx + 5000);
  const block = xml.slice(idx, nextIdx);

  console.log(`\n================ ${sec.name} (${sec.id}) ================`);
  // Find all text elements
  const textMatches = [...block.matchAll(/<text id="([^"]+)" name="([^"]+)" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"/g)];
  textMatches.forEach(t => {
    console.log(`  TEXT [${t[1]}] (x=${t[3]}, y=${t[4]}, w=${t[5]}, h=${t[6]}): "${t[2]}"`);
  });
  // Find all image or rounded-rectangle elements
  const imgMatches = [...block.matchAll(/<(rounded-rectangle|vector) id="([^"]+)" name="([^"]+)" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"/g)];
  imgMatches.forEach(im => {
    console.log(`  ${im[1].toUpperCase()} [${im[2]}] (x=${im[4]}, y=${im[5]}, w=${im[6]}, h=${im[7]}): "${im[3]}"`);
  });
});
