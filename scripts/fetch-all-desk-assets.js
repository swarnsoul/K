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
    const req = http.request('http://127.0.0.1:3845/mcp', { method: 'POST', headers, timeout: 20000 }, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => resolve({ data, headers: res.headers }));
    });
    req.on('timeout', () => req.destroy(new Error('RPC timed out')));
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function run() {
  const init = await rpc('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'agent', version: '1.0' }
  });
  const sid = init.headers['mcp-session-id'];
  console.log('Session ID:', sid);

  const targetDir = path.resolve('public/assets/desk');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const nodes = [
    { id: '563:927', name: 'pinboard' },
    { id: '563:929', name: 'plant_right' },
    { id: '563:930', name: 'candle' },
    { id: '563:931', name: 'mug' },
    { id: '563:932', name: 'clock' },
    { id: '563:933', name: 'plant_left' },
    { id: '563:926', name: 'lamp_glow' },
    { id: '563:925', name: 'desk_base' },
    { id: '546:942', name: 'lamp_on' },
    { id: '546:941', name: 'lamp_off' },
    { id: '546:927', name: 'diary_v1' },
    { id: '546:926', name: 'diary_v2' },
    { id: '563:928', name: 'lamp_instance' },
    { id: '563:934', name: 'diary_instance' },
    { id: '563:902', name: 'heart_1' },
    { id: '563:909', name: 'heart_2' },
    { id: '563:916', name: 'heart_3' },
    { id: '563:900', name: 'closing_text' }
  ];

  const designContexts = {};
  const assetMap = {};

  for (const n of nodes) {
    console.log(`Fetching get_design_context for ${n.name} (${n.id})...`);
    try {
      const res = await rpc('tools/call', {
        name: 'get_design_context',
        arguments: { nodeId: n.id }
      }, sid);

      if (res.data.includes('\ndata: ')) {
        const parsed = JSON.parse(res.data.split('\ndata: ')[1]);
        if (parsed.result && parsed.result.content) {
          designContexts[n.id] = parsed.result.content;
          for (const item of parsed.result.content) {
            if (typeof item.text === 'string') {
              const matches = item.text.matchAll(/const\s+([a-zA-Z0-9_]+)\s*=\s*"(http:\/\/localhost:3845\/assets\/[^"]+)";/g);
              for (const m of matches) {
                const varName = m[1];
                const url = m[2];
                assetMap[`${n.name}_${varName}`] = { url, nodeId: n.id, name: n.name };
                console.log(`  -> Found asset for ${n.name}: ${url}`);
              }
            }
          }
        }
      }
    } catch (e) {
      console.error(`  Error on ${n.name}:`, e.message);
    }
  }

  fs.writeFileSync('scripts/desk_dc_all.json', JSON.stringify(designContexts, null, 2));
  fs.writeFileSync('scripts/desk_assets_map.json', JSON.stringify(assetMap, null, 2));
  console.log(`\nFound ${Object.keys(assetMap).length} assets. Downloading to public/assets/desk/...`);

  for (const [key, { url, name }] of Object.entries(assetMap)) {
    const ext = path.extname(url);
    const dest = path.join(targetDir, `${name}${ext}`);
    try {
      await download(url, dest);
      console.log(`Downloaded ${dest} (${fs.statSync(dest).size} bytes)`);
    } catch (e) {
      console.error(`Error downloading ${url}:`, e.message);
    }
  }

  console.log('Done downloading desk assets!');
}

run().catch(console.error);
