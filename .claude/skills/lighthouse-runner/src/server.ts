/**
 * Local server for file analysis
 */

import { spawn, type ChildProcess } from 'child_process';
import { dirname } from 'path';
import { resolve } from 'path';
import type { ServerResult } from './types.js';

export async function startLocalServer(
  filepath: string,
  port: number
): Promise<ServerResult> {
  const absolutePath = resolve(filepath);
  const dir = dirname(absolutePath);

  return new Promise((resolve, reject) => {
    const server: ChildProcess = spawn('npx', ['serve', '-l', port.toString(), dir], {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: process.platform === 'win32',
    });

    let started = false;

    server.stdout?.on('data', (data: Buffer) => {
      const output = data.toString();
      if (output.includes('Accepting connections') || output.includes('Local:')) {
        started = true;
        const filename = filepath.split(/[/\\]/).pop();
        resolve({
          kill: () => server.kill(),
          url: `http://localhost:${port}/${filename}`,
        });
      }
    });

    server.stderr?.on('data', (data: Buffer) => {
      if (!started) {
        console.error(`Server error: ${data.toString()}`);
      }
    });

    server.on('error', (err: Error) => {
      reject(new Error(`Failed to start server: ${err.message}`));
    });

    // Timeout for server startup
    setTimeout(() => {
      if (!started) {
        server.kill();
        reject(new Error('Server startup timeout'));
      }
    }, 10000);
  });
}
