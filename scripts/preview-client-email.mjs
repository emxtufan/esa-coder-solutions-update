import http from 'node:http';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const root = new URL('../deliverables/email-esa/', import.meta.url);
const assets = new Set(['email-clienti.html', 'esa-coder-solutions-lockup-transparent.png', 'team-stoica.jpg', 'beauty-villa.jpg', 'event-smart-assistant.jpg']);
http.createServer((req, res) => {
  const file = req.url === '/' ? 'email-clienti.html' : req.url.slice(1);
  if (!assets.has(file)) { res.writeHead(404); res.end(); return; }
  res.setHeader('Content-Type', file.endsWith('.jpg') ? 'image/jpeg' : file.endsWith('.png') ? 'image/png' : 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  fs.createReadStream(fileURLToPath(new URL(file, root))).pipe(res);
}).listen(4174, '127.0.0.1', () => console.log('Email preview: http://127.0.0.1:4174/'));
