const fs = require('fs');
const txt = fs.readFileSync('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/.system_generated/steps/4911/output.txt', 'utf8');

// Full Desktop-9 section
const home9Start = txt.indexOf('id="140:671"');
const home9End = txt.indexOf('</frame>', txt.lastIndexOf('id="140:671"')) + 200;
const d9Section = txt.slice(home9Start, home9Start + 300);
console.log('Desktop-9 section start:', d9Section);

// Does Desktop-9 contain 563:923?
const d9Full = txt.slice(home9Start, home9Start + 10000);
console.log('\nD9 contains 563:923?', d9Full.includes('563:923'));
console.log('D9 contains Frame 182?', d9Full.includes('Frame 182'));

// Check the home page frame reference for desk scene
const idxDesk = txt.indexOf('563:923');
console.log('\n563:923 appears in full doc, context around first:', txt.slice(Math.max(0,idxDesk-200), idxDesk + 100));

// Desktop-9 height
const home9 = txt.match(/id="140:671"[^>]*height="(\d+)"/);
console.log('\nD9 height:', home9 ? home9[1] : 'not found');
