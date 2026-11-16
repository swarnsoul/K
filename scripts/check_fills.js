const fs = require('fs');

async function test() {
  const res = await fetch('http://localhost:3845/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'get_design_context',
        arguments: { nodeId: '217:666' }
      }
    })
  });
  const data = await res.json();
  const text = data.result?.content?.[0]?.text || '';
  console.log('Result text length:', text.length);
  // Look for background or fill in Desktop - 10
  const lines = text.split('\n');
  for (let i = 0; i < Math.min(lines.length, 50); i++) {
    console.log(lines[i]);
  }
}
test();
