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
    const req = http.request('http://127.0.0.1:3845/mcp', { method: 'POST', headers, timeout: 30000 }, res => {
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

async function test() {
  const init = await rpc('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'agent', version: '1.0' }
  });
  const sid = init.headers['mcp-session-id'];
  console.log('Session ID:', sid);

  console.log('Calling get_design_context on 563:930 (candle)...');
  const t0 = Date.now();
  const res = await rpc('tools/call', {
    name: 'get_design_context',
    arguments: { nodeId: '563:930' }
  }, sid);
  console.log(`Finished in ${Date.now() - t0}ms`);
  console.log('Response length:', res.data.length);
  console.log(res.data.slice(0, 500));
}

test().catch(console.error);
