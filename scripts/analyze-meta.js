const fs = require('fs');
const content = fs.readFileSync('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/.system_generated/steps/10824/output.txt', 'utf8');

const m15 = content.indexOf('<frame id="443:103"');
const m11 = content.indexOf('<frame id="285:57"');

console.log('m15 index:', m15);
console.log('m11 index:', m11);

const part15 = content.slice(m15, m11);
const part11 = content.slice(m11);

console.log('=== PART 15 (Desktop - 15) ===');
const lines15 = part15.split('\n');
console.log('Total lines in 15:', lines15.length);
lines15.filter(l => l.includes('<frame ') && l.includes('name="Frame ')).forEach(l => console.log(l.trim()));

console.log('\n=== PART 11 (Desktop - 11) ===');
const lines11 = part11.split('\n');
console.log('Total lines in 11:', lines11.length);
lines11.filter(l => l.includes('<frame ') && l.includes('name="Frame ')).forEach(l => console.log(l.trim()));
