const path = require('node:path');
const { loadEnvFile } = require('node:process');
const appDir = path.resolve(__dirname, '..');
try { loadEnvFile(path.join(appDir, '.env')); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
const release = process.env.ESA_RELEASE_DIR || appDir;
module.exports = {
  apps: [{
    name: 'EMI',
    script: path.join(release, 'server.js'),
    cwd: release,
    interpreter: process.execPath,
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    time: true,
    env: { NODE_ENV: 'production', HOST: process.env.HOST || '127.0.0.1', PORT: process.env.PORT || '4173' },
  }],
};
