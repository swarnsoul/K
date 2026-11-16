const fs = require('fs');

const raw = fs.readFileSync('scripts/influcrush_figma_raw.jsx', 'utf8');

// Find all top-level direct child elements inside the root div
// The root div is `<div className="border-b border-black border-solid content-stretch flex flex-col items-start relative size-full" data-node-id="285:58">`
// Let's identify the major sections by looking for comments or top-level elements
const lines = raw.split('\n');
console.log('Total lines in raw JSX:', lines.length);

// Let's look for headings, data-name or data-node-id
const sections = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('data-node-id=') && (line.includes('Heading 1') || line.includes('data-name=') || line.includes('font-medium') || line.includes('font-semibold'))) {
    sections.push({ lineNum: i + 1, text: line.trim() });
  }
}
console.log('Key lines found:', sections.slice(0, 30));
