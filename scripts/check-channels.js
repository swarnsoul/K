const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(process.env.APPDATA, 'Figma/DesktopProfile/v43/Cache/Cache_Data');

async function check() {
  const list = ['f_0003a6', 'f_0003af', 'f_0003b3', 'f_0003de', 'f_0003b0', 'f_00040e', 'f_00040d'];
  for (const f of list) {
    const p = path.join(dir, f);
    const meta = await sharp(p).metadata();
    const stats = await sharp(p).stats();
    console.log(f, `${meta.width}x${meta.height}`, 'channels:', stats.channels.map(c => Math.round(c.mean)));
  }
}
check().catch(console.error);
