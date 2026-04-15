#!/usr/bin/env node

/**
 * Lighthouse Runner
 *
 * Performance, SEO, Accessibility audits using Playwright and Lighthouse.
 */

import { existsSync } from 'fs';
import { parseArgs, printHelp, isUrl } from './cli.js';
import { startLocalServer } from './server.js';
import { runLighthouse, extractMetrics, extractFailedAudits } from './runner.js';
import { generateTextReport, generateJsonReport } from './reporter.js';

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    printHelp();
    process.exit(1);
  }

  const { target, config } = parseArgs(args);

  if (!target) {
    console.error('Error: No target URL or file specified');
    process.exit(1);
  }

  let url = target;
  let serverResult: { kill: () => void } | null = null;

  // If it's a local file, start a server
  if (!isUrl(target)) {
    if (!existsSync(target)) {
      console.error(`Error: File not found: ${target}`);
      process.exit(1);
    }

    console.error(`Starting local server for ${target}...`);
    try {
      const result = await startLocalServer(target, config.servePort);
      serverResult = result;
      url = result.url;
      console.error(`Server started at ${url}`);
    } catch (err) {
      console.error(`Error: ${err instanceof Error ? err.message : err}`);
      process.exit(1);
    }
  }

  try {
    console.error(`Running Lighthouse on ${url}...`);
    const lhr = await runLighthouse(url, config);
    const metrics = extractMetrics(lhr);
    const failed = extractFailedAudits(lhr);

    if (config.jsonOutput) {
      console.log(JSON.stringify(generateJsonReport(url, lhr, metrics, failed), null, 2));
    } else {
      console.log(generateTextReport(url, lhr, metrics, failed));
    }
  } catch (err) {
    console.error(`Error running Lighthouse: ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  } finally {
    if (serverResult) {
      serverResult.kill();
    }
  }
}

main();
