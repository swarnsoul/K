const fs = require('fs');
const xml = fs.readFileSync('scripts/meta_443_103.xml', 'utf8');

// Find all direct children under Desktop - 15 or Frame 80
const lines = xml.split('\n');
console.log('Total lines:', lines.length);

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // check for frame or section with name Frame 86 .. Frame 108 etc.
  if (line.includes('name="Frame ') || line.includes('name="Desktop') || line.includes('name="Reflection') || line.includes('name="Contact') || line.includes('name="Footer')) {
    console.log(`Line ${i}: ${line.trim()}`);
  }
}
