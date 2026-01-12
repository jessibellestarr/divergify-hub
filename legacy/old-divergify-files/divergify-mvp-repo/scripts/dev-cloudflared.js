#!/usr/bin/env node
'use strict';

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const serverDir = path.join(rootDir, 'server');

const children = new Set();
let shuttingDown = false;

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', ...options });
    child.on('error', reject);
    child.on('exit', code => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
    });
  });
}

async function ensureServerDependencies() {
  if (fs.existsSync(path.join(serverDir, 'node_modules'))) return;
  console.log('[setup] Installing server dependencies...');
  await run('npm', ['install'], { cwd: serverDir });
}

async function ensureBinaryAvailable(bin) {
  await new Promise((resolve, reject) => {
    const check = spawn(bin, ['--version'], { stdio: 'ignore' });
    check.on('error', () => reject(new Error(`Required tool "${bin}" not found. Install it before running dev.`)));
    check.on('exit', () => resolve());
  });
}

function registerChild(child) {
  children.add(child);
  child.on('exit', code => {
    if (!shuttingDown) {
      shuttingDown = true;
      for (const proc of children) {
        if (proc !== child && !proc.killed) {
          proc.kill('SIGINT');
        }
      }
      if (code && code !== 0) {
        process.exitCode = code;
      }
      process.exit();
    }
  });
}

function spawnLabeled(name, command, args, options = {}) {
  const child = spawn(command, args, {
    cwd: rootDir,
    env: { ...process.env, ...(options.env || {}) },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  const prefix = `[${name}] `;
  child.stdout.on('data', data => {
    process.stdout.write(prefix + data.toString());
  });
  child.stderr.on('data', data => {
    process.stderr.write(prefix + data.toString());
  });

  registerChild(child);
  return child;
}

function setupSignalHandlers() {
  const stop = () => {
    if (shuttingDown) return;
    shuttingDown = true;
    for (const child of children) {
      if (!child.killed) child.kill('SIGINT');
    }
    setTimeout(() => process.exit(), 200);
  };

  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
}

async function main() {
  setupSignalHandlers();

  await ensureServerDependencies();
  await ensureBinaryAvailable('cloudflared');

  console.log('[dev] Starting Divergify backend...');
  const server = spawnLabeled('server', 'npm', ['run', 'server']);

  let expoStarted = false;
  let cloudUrl = '';
  const urlRegex = /(https:\/\/[a-zA-Z0-9.-]+\.trycloudflare\.com)/;

  console.log('[dev] Starting Cloudflared tunnel...');
  const tunnel = spawn('cloudflared', ['tunnel', '--url', 'http://localhost:8787'], {
    cwd: rootDir,
    env: process.env,
    stdio: ['ignore', 'pipe', 'pipe']
  });

  registerChild(tunnel);

  const handleTunnelOutput = data => {
    const text = data.toString();
    process.stdout.write(`[cloudflared] ${text}`);
    if (!expoStarted) {
      const match = text.match(urlRegex);
      if (match) {
        cloudUrl = match[1];
        expoStarted = true;
        console.log(`[dev] Tunnel ready at ${cloudUrl}`);
        console.log('[dev] Launching Expo (tunnel mode)...');
        const expo = spawnLabeled('expo', 'npx', ['expo', 'start', '--tunnel'], {
          env: { ...process.env, EXPO_PUBLIC_BACKEND_URL: cloudUrl }
        });
        children.add(expo);
      }
    }
  };

  tunnel.stdout.on('data', handleTunnelOutput);
  tunnel.stderr.on('data', handleTunnelOutput);

  tunnel.on('error', err => {
    console.error('[cloudflared] Failed to start tunnel:', err.message);
    process.exitCode = 1;
    process.exit();
  });

  server.on('error', err => {
    console.error('[server] Failed to start backend:', err.message);
    process.exitCode = 1;
    process.exit();
  });

  console.log('[dev] Waiting for Expo to launch. Scan the QR code with Expo Go when ready.');
}

main().catch(err => {
  console.error('[dev] Setup failed:', err.message);
  process.exit(1);
});
