import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';
import { createWebhookServer, verifySignature } from '../webhook-server.js';

const secret = crypto.randomBytes(32).toString('hex');
const repository = 'emxtufan/esa-coder-solutions-update';
const payload = { repository: { full_name: repository }, ref: 'refs/heads/main', deleted: false };
const sign = body => 'sha256=' + crypto.createHmac('sha256', secret).update(body).digest('hex');
const logger = { log() {}, error() {} };

async function fixture(t, deploy = async () => {}, options = {}) {
  const server = createWebhookServer({ secret, repository, deploy, logger, ...options });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(async () => {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  });
  const base = `http://127.0.0.1:${server.address().port}`;
  return async (data = payload, overrides = {}) => {
    const body = typeof data === 'string' ? data : JSON.stringify(data);
    const response = await fetch(base + (overrides.path || '/github-webhook'), {
      method: overrides.method || 'POST',
      headers: {
        'content-type': 'application/json',
        'x-hub-signature-256': sign(body),
        'x-github-event': 'push',
        'x-github-delivery': crypto.randomUUID(),
        ...overrides.headers,
      },
      ...(overrides.method === 'GET' ? {} : { body }),
    });
    return { status: response.status, text: await response.text() };
  };
}

test('HMAC pe octetii originali, semnaturi malformate si payload modificat', () => {
  const body = Buffer.from('test');
  assert.ok(verifySignature(body, sign(body), secret));
  for (const signature of [undefined, '', 'sha1=bad', 'sha256=' + 'z'.repeat(64), sign('other')]) {
    assert.equal(verifySignature(body, signature, secret), false);
  }
  assert.throws(() => createWebhookServer({ secret: '', repository, deploy() {} }));
});

test('Respinge cereri neautorizate si ignora evenimente/branch-uri nepermise', async t => {
  let calls = 0;
  const send = await fixture(t, async () => { calls++; });
  assert.equal((await send(payload, { headers: { 'x-hub-signature-256': '' } })).status, 401);
  assert.equal((await send('{')).status, 400);
  assert.equal((await send('null')).status, 400);
  assert.equal((await send({ ...payload, repository: { full_name: 'other/repo' } })).status, 403);
  assert.equal((await send(payload, { path: '/other' })).status, 404);
  assert.equal((await send(payload, { method: 'GET' })).status, 405);
  assert.equal((await send(payload, { headers: { 'x-github-event': 'ping' } })).status, 200);
  assert.equal((await send({ ...payload, ref: 'refs/heads/develop' })).status, 200);
  assert.equal((await send({ ...payload, deleted: true })).status, 200);
  assert.equal((await send(payload, { headers: { 'x-github-delivery': '' } })).status, 400);
  assert.equal(calls, 0);
  assert.equal((await send()).status, 202);
  assert.equal(calls, 1);
});

test('Limiteaza dimensiunea payload-ului', async t => {
  const send = await fixture(t, async () => assert.fail('Deploy neasteptat'), { maxBytes: 200 });
  assert.equal((await send('x'.repeat(201))).status, 413);
});

test('Push-urile din timpul unui deploy sunt grupate intr-o rerulare, fara concurenta', async t => {
  let calls = 0;
  let release;
  const send = await fixture(t, () => { calls++; return new Promise(resolve => { release = resolve; }); });
  const id = crypto.randomUUID();
  assert.equal((await send(payload, { headers: { 'x-github-delivery': id } })).status, 202);
  assert.equal((await send(payload, { headers: { 'x-github-delivery': id } })).text, 'Duplicate delivery');
  assert.equal((await send()).text, 'Deploy queued');
  assert.equal((await send()).text, 'Deploy queued');
  assert.equal(calls, 1);
  release();
  for (let n = 0; n < 20 && calls !== 2; n++) await delay(10);
  assert.equal(calls, 2);
  release();
  await delay(10);
  assert.equal(calls, 2);
});

test('Un deploy esuat permite redelivery si nu blocheaza urmatoarele cereri', async t => {
  let calls = 0;
  const send = await fixture(t, async () => { calls++; throw new Error('test failure'); });
  const headers = { 'x-github-delivery': crypto.randomUUID() };
  assert.equal((await send(payload, { headers })).status, 202);
  await delay(10);
  assert.equal((await send(payload, { headers })).status, 202);
  assert.equal(calls, 2);
});
