import http from 'node:http';
import { createReadStream } from 'node:fs';
import { realpath, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { loadEnvFile } from 'node:process';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export function loadServerEnvironment(filename = path.join(projectRoot, '.env')) {
  try {
    // Existing hosting/shell variables take precedence over the local file.
    loadEnvFile(filename);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.hdr': 'application/octet-stream',
  '.wasm': 'application/wasm',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
};

function reply(req, res, status, message) {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(req.method === 'HEAD' ? undefined : message);
}

export async function createSiteServer({ root = path.join(projectRoot, 'dist') } = {}) {
  const webRoot = await realpath(root);
  if (!(await stat(path.join(webRoot, 'index.html'))).isFile()) {
    throw new Error('Lipseste dist/index.html. Ruleaza npm run build.');
  }

  async function resolveFile(filename) {
    try {
      const resolved = await realpath(path.join(webRoot, filename));
      const relative = path.relative(webRoot, resolved);
      if (relative.startsWith('..') || path.isAbsolute(relative)) return null;
      const info = await stat(resolved);
      return info.isFile() ? { resolved, info } : null;
    } catch (error) {
      if (['ENOENT', 'ENOTDIR', 'EACCES', 'EINVAL'].includes(error.code)) return null;
      throw error;
    }
  }

  const server = http.createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Cache-Control', 'no-cache');
    try {
      if (!['GET', 'HEAD'].includes(req.method)) {
        res.setHeader('Allow', 'GET, HEAD');
        reply(req, res, 405, 'Metoda nepermisa.');
        return;
      }
      let pathname;
      try {
        pathname = decodeURIComponent((req.url || '/').split('?')[0]);
      } catch {
        reply(req, res, 400, 'Adresa invalida.');
        return;
      }
      if (!pathname.startsWith('/') || /[\\\x00-\x1f:]/.test(pathname) ||
          pathname.split('/').some(segment => segment.startsWith('.'))) {
        reply(req, res, 403, 'Acces interzis.');
        return;
      }
      // Source maps, source files and API endpoints are not public site routes.
      if (/^\/(?:api|src|node_modules)(?:\/|$)/i.test(pathname) || /\.map$/i.test(pathname)) {
        reply(req, res, 404, 'Resursa nu exista.');
        return;
      }
      let file = await resolveFile(pathname === '/' ? 'index.html' : pathname.slice(1));
      if (!file && !path.extname(pathname) && !/^\/(?:assets|styles)(?:\/|$)/i.test(pathname)) {
        // React handles page routing, including its own not-found page.
        file = await resolveFile('index.html');
      }
      if (!file) {
        reply(req, res, 404, 'Resursa nu exista.');
        return;
      }
      const { resolved, info } = file;
      const etag = `W/"${info.size.toString(16)}-${Math.trunc(info.mtimeMs).toString(16)}"`;
      res.setHeader('ETag', etag);
      res.setHeader('Last-Modified', info.mtime.toUTCString());
      if (/^\/assets\/[^/]+-[A-Za-z0-9_-]{8,}\.(?:js|css)$/.test(pathname)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
      if (req.headers['if-none-match']?.split(/,\s*/).includes(etag)) {
        res.writeHead(304);
        res.end();
        return;
      }
      res.setHeader('Content-Type', mimeTypes[path.extname(resolved).toLowerCase()] || 'application/octet-stream');
      res.setHeader('Content-Length', info.size);
      res.writeHead(200);
      if (req.method === 'HEAD') res.end();
      else await pipeline(createReadStream(resolved), res);
    } catch (error) {
      if (error.code === 'ERR_STREAM_PREMATURE_CLOSE' || req.destroyed) return;
      console.error('Eroare la livrarea paginii:', error.message);
      if (!res.headersSent) reply(req, res, 500, 'Eroare interna.');
      else res.destroy();
    }
  });
  server.requestTimeout = 30_000;
  server.headersTimeout = 15_000;
  return server;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    loadServerEnvironment();
    const port = Number(process.env.PORT || 4173);
    const host = process.env.HOST || '127.0.0.1';
    if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT trebuie sa fie intre 1 si 65535.');
    const server = await createSiteServer();
    server.on('error', error => {
      console.error(error.code === 'EADDRINUSE' ? `Portul ${port} este ocupat. Opreste serverul vechi sau seteaza PORT.` : error.message);
      process.exitCode = 1;
    });
    server.listen(port, host, () => console.log(`ESA Coder Solutions: http://${host}:${port}/ (server Node, fara Vite)`));
    const shutdown = () => {
      server.close();
      setTimeout(() => server.closeAllConnections(), 5000).unref();
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error(error.code === 'ENOENT' ? 'Lipseste versiunea compilata. Ruleaza npm run build, apoi npm start.' : error.message);
    process.exitCode = 1;
  }
}
