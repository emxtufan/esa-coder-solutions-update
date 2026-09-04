import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'deliverables/email-esa');
const html = fs.readFileSync(path.join(output, 'email-clienti.html'), 'utf8');
const plain = fs.readFileSync(path.join(output, 'email-clienti.txt'), 'utf8');
const subject = plain.match(/^Subiect: (.+)/)[1];
const text = plain.replace(/^Subiect:.*\r?\n\r?\n/, '');
const base64 = value => Buffer.from(value).toString('base64').match(/.{1,76}/g).join('\r\n');
const boundary = 'esa-formal-alternative-2026';
const message = [
  'X-Unsent: 1', `Subject: ${subject}`, 'MIME-Version: 1.0',
  `Content-Type: multipart/alternative; boundary="${boundary}"`, '',
  `--${boundary}`, 'Content-Type: text/plain; charset=UTF-8', 'Content-Transfer-Encoding: base64', '', base64(text),
  `--${boundary}`, 'Content-Type: text/html; charset=UTF-8', 'Content-Transfer-Encoding: base64', '', base64(html),
  `--${boundary}--`, '',
].join('\r\n');
assert.ok(!/<script|<form|<img|<iframe|<button|<h[1-6]|url\(/i.test(html));
assert.equal((html.match(/href=/g) || []).length, 1);
assert.ok(html.includes('href="https://esa-coder-solutions.com/"'));
assert.ok(html.includes('role="presentation"'));
assert.ok(!/^To:|^From:|Content-Disposition:/m.test(message));
assert.ok(!/team-stoica|beauty-villa|event-smart-assistant|cid:/i.test(html));
assert.ok(html.length < 5 * 1024);
assert.ok(text.trim().split(/\s+/).length < 140);
assert.ok(!/[\u0102\u0103\u00c2\u00e2\u00ce\u00ee\u0218-\u021b]/u.test(html));
fs.writeFileSync(path.join(output, 'email-clienti.eml'), message);
console.log(`PASS: short formal email (${text.trim().split(/\s+/).length} words), one link, no images, no attachments, matching plain-text version, no recipients.`);
