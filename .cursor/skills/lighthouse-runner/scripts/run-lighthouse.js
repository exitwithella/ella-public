#!/usr/bin/env node

import { spawn } from "child_process";
import { existsSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";
import lighthouse from "lighthouse";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Default configuration
const DEFAULT_CONFIG = {
  timeout: 60,
  categories: ["performance", "seo", "accessibility", "best-practices"],
  port: 9222,
  servePort: 8765,
};

// Parse command line arguments
function parseArgs(args) {
  const config = { ...DEFAULT_CONFIG };
  let target = null;

  for (const arg of args) {
    if (arg.startsWith("--")) {
      const [key, value] = arg.slice(2).split("=");
      switch (key) {
        case "json":
          config.jsonOutput = true;
          break;
        case "timeout":
          config.timeout = parseInt(value, 10);
          break;
        case "categories":
          config.categories = value.split(",").map((c) => c.trim());
          break;
        default:
          break;
      }
    } else if (!target) {
      target = arg;
    }
  }

  return { target, config };
}

// Check if target is a URL
function isUrl(target) {
  return target.startsWith("http://") || target.startsWith("https://");
}

// Start a local server for file analysis
async function startLocalServer(filepath, port) {
  const absolutePath = resolve(filepath);
  const dir = dirname(absolutePath);

  return new Promise((resolve, reject) => {
    const server = spawn("npx", ["serve", "-l", port.toString(), dir], {
      stdio: ["ignore", "pipe", "pipe"],
    });

    let started = false;

    server.stdout.on("data", (data) => {
      const output = data.toString();
      if (output.includes("Accepting connections") || output.includes("Local:")) {
        started = true;
        const filename = filepath.split("/").pop();
        resolve({
          server,
          url: `http://localhost:${port}/${filename}`,
        });
      }
    });

    server.stderr.on("data", (data) => {
      if (!started) {
        console.error(`Server error: ${data.toString()}`);
      }
    });

    server.on("error", (err) => {
      reject(new Error(`Failed to start server: ${err.message}`));
    });

    // Timeout for server startup
    setTimeout(() => {
      if (!started) {
        server.kill();
        reject(new Error("Server startup timeout"));
      }
    }, 10000);
  });
}

// Run Lighthouse
async function runLighthouse(url, config) {
  let browser = null;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        `--remote-debugging-port=${config.port}`,
      ],
    });

    const { lhr } = await lighthouse(url, {
      port: config.port,
      output: "json",
      logLevel: "error",
      onlyCategories: config.categories,
      formFactor: "desktop",
      screenEmulation: {
        mobile: false,
        width: 1350,
        height: 940,
        deviceScaleFactor: 1,
        disabled: false,
      },
      throttling: {
        rttMs: 40,
        throughputKbps: 10 * 1024,
        cpuSlowdownMultiplier: 1,
      },
    });

    return lhr;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Extract key metrics from Lighthouse result
function extractMetrics(lhr) {
  const audits = lhr.audits;

  return {
    lcp: audits["largest-contentful-paint"]?.numericValue,
    fid: audits["max-potential-fid"]?.numericValue,
    cls: audits["cumulative-layout-shift"]?.numericValue,
    ttfb: audits["server-response-time"]?.numericValue,
    speedIndex: audits["speed-index"]?.numericValue,
    fcp: audits["first-contentful-paint"]?.numericValue,
    tbt: audits["total-blocking-time"]?.numericValue,
  };
}

// Extract failed audits
function extractFailedAudits(lhr) {
  const failed = {};

  for (const [categoryId, category] of Object.entries(lhr.categories)) {
    failed[categoryId] = [];

    for (const auditRef of category.auditRefs) {
      const audit = lhr.audits[auditRef.id];
      if (audit && audit.score !== null && audit.score < 0.9) {
        failed[categoryId].push({
          id: audit.id,
          title: audit.title,
          description: audit.description,
          score: audit.score,
          displayValue: audit.displayValue,
        });
      }
    }

    // Sort by score (lowest first)
    failed[categoryId].sort((a, b) => (a.score || 0) - (b.score || 0));
    // Limit to top 5
    failed[categoryId] = failed[categoryId].slice(0, 5);
  }

  return failed;
}

// Format score bar
function formatScoreBar(score) {
  const filled = Math.round(score / 10);
  const empty = 10 - filled;
  return "⬛".repeat(filled) + "⬜".repeat(empty);
}

// Format metric value
function formatMetric(name, value, unit = "ms") {
  if (value === undefined) return `${name}: N/A`;

  let formatted;
  let status;

  switch (name) {
    case "LCP":
      formatted = `${(value / 1000).toFixed(1)}s`;
      status = value <= 2500 ? "✓" : value <= 4000 ? "⚠" : "✗";
      break;
    case "FID":
      formatted = `${Math.round(value)}ms`;
      status = value <= 100 ? "✓" : value <= 300 ? "⚠" : "✗";
      break;
    case "CLS":
      formatted = value.toFixed(3);
      status = value <= 0.1 ? "✓" : value <= 0.25 ? "⚠" : "✗";
      break;
    default:
      formatted = unit === "ms" ? `${Math.round(value)}ms` : `${(value / 1000).toFixed(1)}s`;
      status = "";
  }

  return `${name}: ${formatted} ${status}`;
}

// Generate text report
function generateTextReport(url, lhr) {
  const scores = {};
  for (const [id, category] of Object.entries(lhr.categories)) {
    scores[id] = Math.round(category.score * 100);
  }

  const metrics = extractMetrics(lhr);
  const failed = extractFailedAudits(lhr);

  let output = `# Lighthouse Report: ${url}\n\n`;
  output += `Analyzed at: ${new Date().toISOString()}\n\n`;

  output += `## Scores\n\n`;
  for (const [id, score] of Object.entries(scores)) {
    const name = id.charAt(0).toUpperCase() + id.slice(1).replace("-", " ");
    output += `- ${name.padEnd(15)} ${score.toString().padStart(3)}/100 ${formatScoreBar(score)}\n`;
  }

  output += `\n## Core Web Vitals\n\n`;
  output += `- ${formatMetric("LCP", metrics.lcp)}\n`;
  output += `- ${formatMetric("FID", metrics.fid)}\n`;
  output += `- ${formatMetric("CLS", metrics.cls)}\n`;

  output += `\n## Additional Metrics\n\n`;
  output += `- TTFB: ${metrics.ttfb ? Math.round(metrics.ttfb) + "ms" : "N/A"}\n`;
  output += `- Speed Index: ${metrics.speedIndex ? (metrics.speedIndex / 1000).toFixed(1) + "s" : "N/A"}\n`;
  output += `- FCP: ${metrics.fcp ? (metrics.fcp / 1000).toFixed(1) + "s" : "N/A"}\n`;
  output += `- TBT: ${metrics.tbt ? Math.round(metrics.tbt) + "ms" : "N/A"}\n`;

  for (const [categoryId, audits] of Object.entries(failed)) {
    if (audits.length > 0) {
      const name = categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace("-", " ");
      output += `\n## ${name} Issues\n\n`;
      audits.forEach((audit, idx) => {
        const scorePercent = Math.round((audit.score || 0) * 100);
        output += `${idx + 1}. **${audit.title}** (${scorePercent}%)\n`;
        if (audit.displayValue) {
          output += `   ${audit.displayValue}\n`;
        }
      });
    }
  }

  return output;
}

// Generate JSON report
function generateJsonReport(url, lhr) {
  const scores = {};
  for (const [id, category] of Object.entries(lhr.categories)) {
    scores[id] = Math.round(category.score * 100);
  }

  return {
    url,
    timestamp: new Date().toISOString(),
    lighthouseVersion: lhr.lighthouseVersion,
    scores,
    metrics: extractMetrics(lhr),
    audits: extractFailedAudits(lhr),
  };
}

// Main execution
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: run-lighthouse.js <url|file> [options]");
    console.error("");
    console.error("Options:");
    console.error("  --json                 Output in JSON format");
    console.error("  --timeout=<seconds>    Timeout in seconds (default: 60)");
    console.error("  --categories=<list>    Comma-separated categories");
    console.error("                         (performance,seo,accessibility,best-practices)");
    process.exit(1);
  }

  const { target, config } = parseArgs(args);

  if (!target) {
    console.error("Error: No target URL or file specified");
    process.exit(1);
  }

  let url = target;
  let server = null;

  // If it's a local file, start a server
  if (!isUrl(target)) {
    if (!existsSync(target)) {
      console.error(`Error: File not found: ${target}`);
      process.exit(1);
    }

    console.error(`Starting local server for ${target}...`);
    try {
      const result = await startLocalServer(target, config.servePort);
      server = result.server;
      url = result.url;
      console.error(`Server started at ${url}`);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  }

  try {
    console.error(`Running Lighthouse on ${url}...`);
    const lhr = await runLighthouse(url, config);

    if (config.jsonOutput) {
      console.log(JSON.stringify(generateJsonReport(url, lhr), null, 2));
    } else {
      console.log(generateTextReport(url, lhr));
    }
  } catch (err) {
    console.error(`Error running Lighthouse: ${err.message}`);
    process.exit(1);
  } finally {
    if (server) {
      server.kill();
    }
  }
}

main();
