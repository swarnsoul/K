const fs = require('fs');
const txt = fs.readFileSync('C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98/.system_generated/steps/4911/output.txt', 'utf8');

// Desktop-10 height
const d10 = txt.indexOf('Desktop - 10');
console.log('Desktop-10 frame:', txt.slice(d10, d10 + 120));

// Home page (Desktop-9 frame under 140:671)
const home = txt.indexOf('"Desktop - 9"');
console.log('\nDesktop-9 frame:', txt.slice(home - 40, home + 180));

// Does home page contain Frame 182 / 563:923?
console.log('\nHome page contains 563:923?', txt.includes('563:923'));

// Find where the home page ends (ContactFooter / Desktop-12)
const d12 = txt.indexOf('"Desktop - 12"');
console.log('\nDesktop-12 (ContactFooter) frame:', txt.slice(d12 - 20, d12 + 200));
