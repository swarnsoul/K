const fs = require("fs");
const svgContent = fs.readFileSync("public/assets/logo-nav-vectorized.svg", "utf-8");

console.log("SVG content length:", svgContent.length);
// Check bounding box or paths
const paths = [...svgContent.matchAll(/<path[^>]+id="([^"]+)"[^>]+d="([^"]+)"/g)].map((m) => ({
  id: m[1],
  d: m[2],
}));

console.log("Path count:", paths.length);
console.log("Paths ids:", paths.map((p) => p.id));
