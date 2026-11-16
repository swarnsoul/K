const fs = require('fs');
const dc = JSON.parse(fs.readFileSync('scripts/designContexts.json', 'utf8'));

const cardIds = [
  { num: 1, id: '233:696' },
  { num: 2, id: '233:716' },
  { num: 3, id: '233:731' },
  { num: 4, id: '233:745' },
  { num: 5, id: '233:705' },
  { num: 6, id: '239:764' },
  { num: 7, id: '239:776' },
  { num: 8, id: '239:788' },
  { num: 9, id: '243:807' },
];

for (const c of cardIds) {
  const text = dc[c.id][0].text;
  console.log(`\n=================== CARD ${c.num} (${c.id}) ===================`);
  
  // Find rotate, border container, and img
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('data-name="image') || lines[i].includes('rotate-[') || lines[i].includes('<img')) {
      console.log(lines[i].trim());
    }
  }
}
