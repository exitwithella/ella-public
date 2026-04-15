/**
 * CLI argument parsing for Lighthouse Runner
 */

import type { LighthouseConfig } from './types.js';

const DEFAULT_CONFIG: LighthouseConfig = {
  timeout: 60,
  categories: ['performance', 'seo', 'accessibility', 'best-practices'],
  port: 9222,
  servePort: 8765,
  jsonOutput: false,
};

export function parseArgs(args: string[]): { target: string | null; config: LighthouseConfig } {
  const config: LighthouseConfig = { ...DEFAULT_CONFIG };
  let target: string | null = null;

  for (const arg of args) {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      switch (key) {
        case 'json':
          config.jsonOutput = true;
          break;
        case 'timeout':
          config.timeout = parseInt(value, 10);
          break;
        case 'categories':
          config.categories = value.split(',').map((c) => c.trim());
          break;
        case 'help':
        case 'h':
          printHelp();
          process.exit(0);
          break;
      }
    } else if (!target) {
      target = arg;
    }
  }

  return { target, config };
}

export function printHelp(): void {
  console.log(`
Lighthouse Runner - Performance, SEO, Accessibility audits

Usage:
  npx tsx src/index.ts <url|file> [options]

Options:
  --json                 Output in JSON format
  --timeout=<seconds>    Timeout in seconds (default: 60)
  --categories=<list>    Comma-separated categories
                         (performance,seo,accessibility,best-practices)
  --help, -h             Show this help

Examples:
  npx tsx src/index.ts https://example.com
  npx tsx src/index.ts ./index.html --json
  npx tsx src/index.ts http://localhost:3000 --categories=performance,seo
`);
}

export function isUrl(target: string): boolean {
  return target.startsWith('http://') || target.startsWith('https://');
}
