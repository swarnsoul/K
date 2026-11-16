const sharp = require('sharp');

async function test() {
  // Let's create an html file to preview all desk refs side by side
  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #333; color: #fff; font-family: sans-serif; padding: 20px; }
    .grid { display: flex; flex-wrap: wrap; gap: 20px; }
    .card { background: #222; border: 1px solid #444; border-radius: 8px; padding: 10px; text-align: center; }
    img { max-width: 350px; max-height: 350px; background: repeating-conic-gradient(#555 0% 25%, #444 0% 50%) 50% / 20px 20px; display: block; margin: 0 auto 10px; }
  </style>
</head>
<body>
  <h1>Desk Scene Assets</h1>
  <div class="grid">
    <div class="card"><h3>Desk Base (image 62)</h3><img src="desk_image62.png" /></div>
    <div class="card"><h3>Lamp Glow (image 65)</h3><img src="desk_image65.png" /></div>
    <div class="card"><h3>Pinboard (image 927)</h3><img src="desk_pinboard.png" /></div>
    <div class="card"><h3>Lamp ON (image 67)</h3><img src="lamp_variant_image67.png" /></div>
    <div class="card"><h3>Lamp OFF (image 72)</h3><img src="lamp_variant_image72.png" /></div>
    <div class="card"><h3>Lamp Diff</h3><img src="lamp_diff.png" /></div>
    <div class="card"><h3>Plant Right (image 66)</h3><img src="desk_image66_plant_right.png" /></div>
    <div class="card"><h3>Candle (image 63)</h3><img src="desk_candle_image63.png" /></div>
    <div class="card"><h3>Mug (image 64)</h3><img src="desk_mug_image64.png" /></div>
    <div class="card"><h3>Clock (image 69)</h3><img src="desk_clock_image69.png" /></div>
    <div class="card"><h3>Plant Left + Books (image 70)</h3><img src="desk_plant_left_image70.png" /></div>
    <div class="card"><h3>Diary Variant 1 (image 68)</h3><img src="diary_variant_image68.png" /></div>
    <div class="card"><h3>Diary Variant 2 (image 69)</h3><img src="diary_variant_image69.png" /></div>
    <div class="card"><h3>Hearts Group</h3><img src="hearts_group.png" /></div>
    <div class="card"><h3>Full Desk Scene</h3><img src="desk_scene_frame182.png" /></div>
  </div>
</body>
</html>
  `;
  require('fs').writeFileSync('scripts/desk_refs/preview.html', html);
  console.log('Saved scripts/desk_refs/preview.html');
}

test();
