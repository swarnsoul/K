const fs = require('fs');
const dc = JSON.parse(fs.readFileSync('scripts/designContexts.json', 'utf8'));

const cardIds = [
  '233:696',
  '233:716',
  '233:731',
  '233:745',
  '233:705',
  '239:764',
  '239:776',
  '239:788',
  '243:807'
];

for (const id of cardIds) {
  const items = dc[id] || [];
  console.log(`\n=================== CARD ${id} ===================`);
  for (const it of items) {
    if (it.text) {
      // Find the return statement or top-level element
      const lines = it.text.split('\n');
      for (const line of lines) {
        if (line.includes('h-[') || line.includes('w-[') || line.includes('min-h') || line.includes('rotate') || line.includes('translate')) {
          console.log('  ', line.trim());
        }
      }
    }
  }
}
