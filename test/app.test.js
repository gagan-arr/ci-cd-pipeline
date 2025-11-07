const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('../src/app');

test('GET / should return greeting text', async () => {
  const server = http.createServer(app);

  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  const response = await new Promise((resolve, reject) => {
    http.get({ hostname: '127.0.0.1', port, path: '/' }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });

  assert.match(response, /Hello from CI\/CD pipeline/);

  await new Promise((resolve) => server.close(resolve));
});
