async function main() {
  const res = await fetch('http://localhost:3845/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: { name: 'get_metadata', arguments: {} }
    })
  });
  const data = await res.json();
  console.log('Keys in data:', Object.keys(data));
  if (data.error) console.error('Data error:', data.error);
  if (data.result) {
    console.log('Keys in result:', Object.keys(data.result));
    require('fs').writeFileSync('scripts/metadata_dump.txt', JSON.stringify(data.result, null, 2));
    console.log('Saved scripts/metadata_dump.txt');
  }
}
main();
