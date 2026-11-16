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
  console.log('Session ID:', sid);

  const nodes = [
    { id: '563:923', name: 'Frame 182 Desk Scene' },
    { id: '546:943', name: 'Component 29 Lamp Component Set' },
    { id: '546:942', name: 'Lamp Variant image 67 (ON)' },
    { id: '546:941', name: 'Lamp Variant image 72 (OFF)' },
    { id: '546:928', name: 'Component 28 Diary Component Set' },
    { id: '546:927', name: 'Diary Variant image 68' },
    { id: '546:926', name: 'Diary Variant image 69' },
    { id: '563:899', name: 'Frame 85 Closing' },
    { id: '563:901', name: 'Group 24 Hearts' }
  ];

  const results = {};
  for (const n of nodes) {
    console.log(`Calling get_design_context on ${n.name} (${n.id})...`);
    try {
      const t0 = Date.now();
      const res = await rpc('tools/call', {
        name: 'get_design_context',
        arguments: { nodeId: n.id }
      }, sid);
      const elapsed = Date.now() - t0;
      console.log(`-> Returned in ${elapsed}ms, data length: ${res.data.length}`);
      
      let parsed;
      if (res.data.includes('\ndata: ')) {
        parsed = JSON.parse(res.data.split('\ndata: ')[1]);
      } else {
        parsed = JSON.parse(res.data);
      }
      results[n.id] = parsed;
      fs.writeFileSync(`scripts/desk_dc_${n.id.replace(':', '_')}.json`, JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.error(`Error on ${n.id}:`, e.message);
    }
  }

  fs.writeFileSync('scripts/desk_design_contexts.json', JSON.stringify(results, null, 2));
  console.log('All done! Saved scripts/desk_design_contexts.json');
}

run().catch(console.error);
