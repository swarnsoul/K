const fs = require('fs');
const meta11 = JSON.parse(fs.readFileSync('scripts/detailed_influcrush.json', 'utf8'));
console.log('=== InfluCrush (Desktop - 11) Sections ===');
meta11.forEach((s, idx) => {
  console.log(`[${idx+1}] ID: ${s.id} | Name: ${s.name} | y: ${s.y} | h: ${s.height} | w: ${s.width}`);
});

const meta15 = JSON.parse(fs.readFileSync('scripts/detailed_cirqell.json', 'utf8'));
console.log('\n=== Cirqell (Desktop - 15) Sections ===');
meta15.forEach((s, idx) => {
  console.log(`[${idx+1}] ID: ${s.id} | Name: ${s.name} | y: ${s.y} | h: ${s.height} | w: ${s.width}`);
});
