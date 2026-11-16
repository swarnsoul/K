const http = require('http');

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

async function test() {
  const init = await rpc('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'agent', version: '1.0' }
  });
  const sid = init.headers['mcp-session-id'];
  const res = await rpc('tools/call', { name: 'get_metadata', arguments: { nodeId: '217:666' } }, sid);
  const parsed = JSON.parse(res.data.split('\ndata: ')[1] || res.data);
  const xml = parsed.result.content[0].text;
  
  const lines = xml.split('\n');
  let print = false;
  for (const line of lines) {
    if (line.includes('y="39') || line.includes('y="4') || line.includes('Frame 85') || line.includes('Frame 182') || line.includes('Group 25')) {
      print = true;
    }
    if (print) console.log(line);
  }
}
test().catch(console.error);
