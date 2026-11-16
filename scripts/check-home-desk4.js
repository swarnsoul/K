const fs = require('fs');
const txt = fs.readFileSync('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/.system_generated/steps/4911/output.txt', 'utf8');

// Find Desktop-10 (217:666)
const d10 = txt.match(/id="217:666"[^>]*/);
console.log('Desktop-10:', d10 ? d10[0] : 'not found');

// Find Desktop-9 (140:671)
const d9 = txt.match(/id="140:671"[^>]*/);
console.log('Desktop-9:', d9 ? d9[0] : 'not found');

// Find the closing section (Frame 85) which is at y=3980 height=260, so ends at 4240
// Find the desk scene (Frame 182) at y=4102 height=868, so ends at 4970
// So the total about page height is 4970

// Check where ContactFooter (174:960) appears in document order (Home vs About)
const idxContactFooter = txt.indexOf('174:960');
const idxDeskScene = txt.indexOf('563:923');
console.log('\nContactFooter (174:960) comes before or after desk scene?');
console.log('174:960 idx:', idxContactFooter);
console.log('563:923 idx:', idxDeskScene);
console.log('ContactFooter is in Home page (before desk scene in About):', idxContactFooter < idxDeskScene);
