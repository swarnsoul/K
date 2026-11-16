const fs = require('fs');
const http = require('http');
const path = require('path');

function rpc(method, params = {}, sessionId) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ jsonrpc: '2.0', id: 1, method, params });
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream',
      'Content-Length': Buffer.byteLength(payload)
    };
    if (sessionId) headers['mcp-session-id'] = sessionId;
    const req = http.request('http://127.0.0.1:3845/mcp', { method: 'POST', headers }, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => resolve({ data, headers: res.headers }));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

const refNodes = [
  { id: '223:125', name: 'about_me' },
  { id: '223:143', name: 'portrait_frame' },
  { id: '243:820', name: 'intro_note' },
  { id: '243:821', name: 'intro_arrow' },
  { id: '233:696', name: 'card_1' },
  { id: '233:716', name: 'card_2' },
  { id: '233:731', name: 'card_3' },
  { id: '233:745', name: 'card_4' },
  { id: '233:705', name: 'card_5' },
  { id: '239:764', name: 'card_6' },
  { id: '239:776', name: 'card_7' },
  { id: '239:788', name: 'card_8' },
  { id: '243:807', name: 'card_9' },
  { id: '255:887', name: 'travel_section' },
  { id: '257:888', name: 'art_section' },
  { id: '265:96',  name: 'closing_section' },
];

async function run() {
  const outDir = path.resolve('scripts/figma_refs');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const init = await rpc('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'agent', version: '1.0' }
  });
  const sid = init.headers['mcp-session-id'];

  for (const item of refNodes) {
    try {
      const res = await rpc('tools/call', {
        name: 'get_screenshot',
        arguments: { nodeId: item.id }
      }, sid);

      const parsed = JSON.parse(res.data.split('\ndata: ')[1]);
      const img = parsed.result.content.find(c => c.type === 'image');
      if (img) {
        const dest = path.join(outDir, `${item.name}.png`);
        fs.writeFileSync(dest, Buffer.from(img.data, 'base64'));
        console.log(`Saved ${item.name}.png (${fs.statSync(dest).size} bytes)`);
      } else {
        console.log(`No image for ${item.name}`);
      }
    } catch (err) {
      console.error(`Error fetching ${item.name}:`, err.message);
    }
  }
  console.log('All reference screenshots fetched!');
}

run().catch(console.error);
