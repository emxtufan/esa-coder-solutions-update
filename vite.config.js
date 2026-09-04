import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'node:module';
import path from 'node:path';
const require = createRequire(import.meta.url);
const reactRoot = path.dirname(require.resolve('react/package.json'));
const domRoot = path.dirname(require.resolve('react-dom/package.json'));

export default defineConfig({
  plugins: [react()],
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  // The supplied R3F reconciler is production-only. Keep all React runtimes
  // on its exact original release/build in dev as well as in production.
  resolve: { alias: [
    { find: /^react$/, replacement: path.join(reactRoot, 'cjs/react.production.js') },
    { find: /^react\/jsx-runtime$/, replacement: path.join(reactRoot, 'cjs/react-jsx-runtime.production.js') },
    { find: /^react\/jsx-dev-runtime$/, replacement: path.resolve('src/vendor/jsx-dev-runtime.js') },
    { find: /^react-dom$/, replacement: path.join(domRoot, 'cjs/react-dom.production.js') },
    { find: /^react-dom\/client$/, replacement: path.join(domRoot, 'cjs/react-dom-client.production.js') },
  ] },
  build: { sourcemap: true, chunkSizeWarningLimit: 1600 },
  server: { strictPort: true },
});
