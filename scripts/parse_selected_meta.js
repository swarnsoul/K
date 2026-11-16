const fs = require('fs');
const text = fs.readFileSync('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/.system_generated/steps/11987/output.txt', 'utf8');

const lines = text.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith('    <frame') || (line.startsWith('    <rounded-rectangle') && line.includes('x="0"'))) {
    console.log(line.trim());
  }
}
