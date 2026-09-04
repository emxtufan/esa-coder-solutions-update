import assert from 'node:assert/strict';
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { createSiteServer } from '../server.js';

const server = await createSiteServer();
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
try {
  const index = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  for (const route of ['/', '/contact', '/contact?source=email', '/pagina-inexistenta']) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    assert.equal(await response.text(), index, route);
    assert.equal(response.headers.get('cache-control'), 'no-cache');
  }
  const assets = [...index.matchAll(/(?:src|href)="(\/(?:assets|styles)\/[^\"]+)"/g)].map(match => match[1]);
  assets.push('/assets/ESA_logo_1.glb', '/assets/esa/logo.png');
  assert.ok(assets.some(asset => asset.endsWith('.js')));
  for (const asset of assets) {
    const response = await fetch(base + asset);
    assert.equal(response.status, 200, asset);
    assert.notEqual(response.headers.get('content-type'), 'text/html; charset=utf-8');
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile(new URL('../dist' + asset, import.meta.url)));
    const cached = await fetch(base + asset, { headers: { 'If-None-Match': response.headers.get('etag') } });
    assert.equal(cached.status, 304, asset);
    assert.equal(await cached.text(), '');
  }
  const head = await fetch(base + '/contact', { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.equal(Number(head.headers.get('content-length')), Buffer.byteLength(index));
  assert.equal(await head.text(), '');
  for (const route of ['/assets/missing.glb', '/assets/missing', '/styles/missing.css', '/api/pusher', '/src/main.jsx', '/assets/bundle.js.map', '/package.json']) {
    assert.equal((await fetch(base + route)).status, 404, route);
  }
  for (const method of ['POST', 'PUT', 'DELETE']) {
    const response = await fetch(base, { method });
    assert.equal(response.status, 405);
    assert.equal(response.headers.get('allow'), 'GET, HEAD');
  }
  // Raw requests preserve traversal sequences that URL clients normally normalize.
  for (const [route, status] of [['/../package.json', 403], ['/%2e%2e/package.json', 403], ['/.env', 403], ['/assets%5c..%5c.env', 403], ['/%00', 403], ['/%ZZ', 400]]) {
    const actual = await new Promise((resolve, reject) => {
      http.get(base, { path: route }, response => {
        response.resume();
        response.on('end', () => resolve(response.statusCode));
      }).on('error', reject);
    });
    assert.equal(actual, status, route);
  }
  console.log(`PASS: pagini React, ${assets.length} resurse identice cu dist, cache, HEAD, 404, metode si protectia fisierelor.`);
} finally {
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
}
