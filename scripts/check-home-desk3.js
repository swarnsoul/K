const fs = require('fs');
const txt = fs.readFileSync('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/.system_generated/steps/4911/output.txt', 'utf8');

// Find the page that contains 563:923
const idx563 = txt.indexOf('563:923');
// Print a wider context before 563:923 to find which page it's in
const context = txt.slice(Math.max(0, idx563 - 800), idx563 + 200);
console.log('Context around 563:923:\n', context);
