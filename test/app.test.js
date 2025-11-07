const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('../src/app');

const server = http.createServer(app);

test('GET / should return greeting text', async () => {
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  await new Promise((resolve, reject) => {
    http.get({ hostname: '127.0.0.1', port, path: '/' }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          assert.match(data, /Hello from CI\/CD pipeline/);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });

  await new Promise((resolve) => server.close(resolve));
});
