const fs = require('fs');
const spec = JSON.parse(fs.readFileSync('scripts/spec_influcrush.json', 'utf8'));
console.log('Spec keys/sample:');
console.log(Object.keys(spec).slice(0, 10));
if (Array.isArray(spec)) {
  console.log('Array length:', spec.length);
  console.log('First item:', spec[0]);
} else {
  console.log('First entry:', Object.entries(spec)[0]);
}
