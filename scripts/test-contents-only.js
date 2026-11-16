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

async function run() {
  const init = await rpc('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'agent', version: '1.0' }
  });
  const sid = init.headers['mcp-session-id'];

  const outDir = path.resolve('scripts/desk_isolated');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const nodes = [
    { id: '563:925', name: 'image62_desk_base' },
    { id: '563:926', name: 'image65_glow' },
    { id: '563:927', name: 'pinboard' },
    { id: '563:929', name: 'image66_plant_right' },
    { id: '563:930', name: 'image63_candle' },
    { id: '563:931', name: 'image64_mug' },
    { id: '563:932', name: 'image69_clock' },
    { id: '563:933', name: 'image70_plant_left' },
    { id: '546:942', name: 'lamp_on_symbol' },
    { id: '546:941', name: 'lamp_off_symbol' },
    { id: '546:927', name: 'diary_v1_symbol' },
    { id: '546:926', name: 'diary_v2_symbol' },
    { id: '563:901', name: 'hearts_group' },
    { id: '563:902', name: 'heart_1' },
    { id: '563:909', name: 'heart_2' },
    { id: '563:916', name: 'heart_3' },
  ];

  for (const item of nodes) {
    console.log(`Fetching isolated screenshot for ${item.name} (${item.id})...`);
    const ssRes = await rpc('tools/call', {
      name: 'get_screenshot',
      arguments: { nodeId: item.id, contentsOnly: true }
    }, sid);

    let ssParsed;
    if (ssRes.data.includes('\ndata: ')) {
      ssParsed = JSON.parse(ssRes.data.split('\ndata: ')[1]);
    } else {
      ssParsed = JSON.parse(ssRes.data);
    }

    if (ssParsed.result && ssParsed.result.content) {
      const img = ssParsed.result.content.find(c => c.type === 'image');
      if (img) {
        const dest = path.join(outDir, `${item.name}.png`);
        fs.writeFileSync(dest, Buffer.from(img.data, 'base64'));
        console.log(`-> Saved ${dest}`);
      }
    }
  }
  console.log('All isolated screenshots saved!');
}

run().catch(console.error);
