const fs = require("fs");

const svg = fs.readFileSync("public/assets/logo-nav-vectorized.svg", "utf-8");

// Parse id and d properly
const paths = [];
const re = /<path\s+id="([^"]+)"\s+d="([^"]+)"/g;
let m;
while ((m = re.exec(svg)) !== null) {
  paths.push({ id: m[1], d: m[2] });
}

console.log("Parsed paths count:", paths.length);
if (paths.length > 0) {
  console.log("First path d starts with:", paths[0].d.substring(0, 30));
}

const existing = fs.readFileSync("lib/logoArtwork.ts", "utf-8");
const strokesPart = existing.substring(0, existing.indexOf("export const LOGO_FILLED_PATHS"));

const updated = `${strokesPart}export const LOGO_FILLED_PATHS: Array<{ id: string; d: string }> = [
${paths.map((p) => `  { id: "${p.id}", d: "${p.d}" },`).join("\n")}
];
`;

fs.writeFileSync("lib/logoArtwork.ts", updated, "utf-8");
console.log("Updated lib/logoArtwork.ts cleanly!");
