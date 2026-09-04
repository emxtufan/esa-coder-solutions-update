import http from 'node:http';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { loadEnvFile } from 'node:process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

export function verifySignature(body, signature, secret) {
  if (typeof signature !== 'string' || !/^sha256=[a-f0-9]{64}$/.test(signature)) return false;
  const expected = crypto.createHmac('sha256', secret).update(body).digest();
  return crypto.timingSafeEqual(expected, Buffer.from(signature.slice(7), 'hex'));
}

export function createWebhookServer({ secret, repository, branch = 'main', deploy, maxBytes = 1024 * 1024, logger = console }) {
  if (!secret || secret.length < 32) throw new Error('WEBHOOK_SECRET trebuie sa aiba minimum 32 de caractere.');
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository || '')) throw new Error('WEBHOOK_REPOSITORY trebuie sa fie owner/repository.');
  if (typeof deploy !== 'function') throw new Error('Lipseste actiunea de deploy.');
  let active = false;
  let pending = false;
  // Bounded, in-memory deduplication. Restarting the listener clears this history.
  const deliveries = new Map();
  async function drain() {
    active = true;
    do {
      pending = false;
      try {
        await deploy();
        logger.log('Deploy finalizat.');
      } catch (error) {
        logger.error('Deploy esuat:', error.message);
        // Allow GitHub redelivery after a failed deployment.
        deliveries.clear();
      }
    } while (pending);
    active = false;
  }
  const server = http.createServer(async (req, res) => {
    const reply = (code, text) => {
      res.writeHead(code, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(text);
    };
    if (req.url !== '/github-webhook') return reply(404, 'Not found');
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return reply(405, 'Method not allowed');
    }
    if (Number(req.headers['content-length']) > maxBytes) {
      req.resume();
      return reply(413, 'Payload too large');
    }
    const chunks = [];
    let size = 0;
    try {
      for await (const chunk of req) {
        size += chunk.length;
        if (size > maxBytes) {
          reply(413, 'Payload too large');
          return;
        }
        chunks.push(chunk);
      }
    } catch {
      if (!res.destroyed) reply(400, 'Incomplete request');
      return;
    }
    const body = Buffer.concat(chunks);
    if (!verifySignature(body, req.headers['x-hub-signature-256'], secret)) return reply(401, 'Unauthorized');
    let payload;
    try { payload = JSON.parse(body.toString('utf8')); }
    catch { return reply(400, 'Invalid JSON'); }
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return reply(400, 'Invalid payload');
    if (payload.repository?.full_name !== repository) return reply(403, 'Repository not allowed');
    if (req.headers['x-github-event'] !== 'push') return reply(200, 'Ignored event');
    if (payload.ref !== `refs/heads/${branch}` || payload.deleted === true) return reply(200, 'Ignored branch');
    const delivery = req.headers['x-github-delivery'];
    if (typeof delivery !== 'string' || !/^[a-zA-Z0-9-]{1,128}$/.test(delivery)) return reply(400, 'Missing or invalid delivery ID');
    if (deliveries.has(delivery)) return reply(200, 'Duplicate delivery');
    deliveries.set(delivery, Date.now());
    if (deliveries.size > 1024) deliveries.delete(deliveries.keys().next().value);
    if (active) {
      pending = true; // Coalesce pushes, then fetch the latest branch again.
      return reply(202, 'Deploy queued');
    }
    reply(202, 'Deploy accepted');
    void drain();
  });
  server.requestTimeout = 15_000;
  server.headersTimeout = 10_000;
  server.timeout = 15_000;
  return server;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    try { loadEnvFile(path.join(root, 'webhook.env')); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    const port = Number(process.env.WEBHOOK_PORT || 9000);
    if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('WEBHOOK_PORT invalid.');
    const branch = process.env.DEPLOY_BRANCH || 'main';
    const repository = process.env.WEBHOOK_REPOSITORY;
    const server = createWebhookServer({
      secret: process.env.WEBHOOK_SECRET,
      repository,
      branch,
      deploy: () => new Promise((resolve, reject) => {
        const env = { ...process.env, APP_DIR: root, DEPLOY_BRANCH: branch, DEPLOY_REPOSITORY: repository };
        delete env.WEBHOOK_SECRET;
        const child = spawn('/bin/bash', [path.join(root, 'deploy.sh')], { cwd: root, env, stdio: 'inherit' });
        child.once('error', reject);
        child.once('close', code => code === 0 ? resolve() : reject(new Error(`deploy.sh: exit ${code}`)));
      }),
    });
    server.on('error', error => { console.error(error.message); process.exitCode = 1; });
    server.listen(port, '127.0.0.1', () => console.log(`GitHub webhook: http://127.0.0.1:${port}/github-webhook`));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
