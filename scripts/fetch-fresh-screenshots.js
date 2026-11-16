const http = require('http');
const fs = require('fs');
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
    const req = http.request('http://127.0.0.1:3845/mcp', { method: 'POST', headers, timeout: 15000 }, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => resolve({ data, headers: res.headers }));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function run() {
  const init = await rpc('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'agent', version: '1.0' }
  });
  const sid = init.headers['mcp-session-id'];

  const nodes = [
    { id: '563:923', name: 'frame182_desk_scene' },
    { id: '563:925', name: 'desk_base' },
    { id: '563:926', name: 'lamp_glow' },
    { id: '563:927', name: 'pinboard' },
    { id: '563:928', name: 'lamp_instance' },
    { id: '563:929', name: 'plant_right' },
    { id: '563:930', name: 'candle' },
    { id: '563:931', name: 'mug' },
    { id: '563:932', name: 'clock' },
    { id: '563:933', name: 'plant_left' },
    { id: '563:934', name: 'diary_instance' },
    { id: '546:942', name: 'lamp_on' },
    { id: '546:941', name: 'lamp_off' },
    { id: '546:927', name: 'diary_v1_default' },
    { id: '546:926', name: 'diary_v2_hover' }
  ];

  const outDir = path.resolve('scripts/fresh_refs');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const item of nodes) {
    const t0 = Date.now();
    try {
      const res = await rpc('tools/call', {
        name: 'get_screenshot',
        arguments: { nodeId: item.id }
      }, sid);
      const parsed = JSON.parse(res.data.split('\ndata: ')[1] || res.data);
      const img = parsed.result?.content?.find(c => c.type === 'image');
      if (img) {
        const dest = path.join(outDir, `${item.name}.png`);
        fs.writeFileSync(dest, Buffer.from(img.data, 'base64'));
        console.log(`Saved ${item.name}.png (${Date.now() - t0}ms)`);
      } else {
        console.log(`No image in result for ${item.name}`);
      }
    } catch (e) {
      console.error(`Failed ${item.name}:`, e.message);
    }
  }
}

run().catch(console.error);
