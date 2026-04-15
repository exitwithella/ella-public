#!/usr/bin/env node
import { existsSync } from "fs";
import { spawn } from "child_process";
import { dirname, resolve } from "path";
import { chromium } from "playwright";
import lighthouse from "lighthouse";

//#region src/cli.ts
const DEFAULT_CONFIG = {
	timeout: 60,
	categories: [
		"performance",
		"seo",
		"accessibility",
		"best-practices"
	],
	port: 9222,
	servePort: 8765,
	jsonOutput: false
};
function parseArgs(args) {
	const config = { ...DEFAULT_CONFIG };
	let target = null;
	for (const arg of args) if (arg.startsWith("--")) {
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
			case "help":
			case "h":
				printHelp();
				process.exit(0);
				break;
		}
	} else if (!target) target = arg;
	return {
		target,
		config
	};
}
function printHelp() {
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
function isUrl(target) {
	return target.startsWith("http://") || target.startsWith("https://");
}

//#endregion
//#region src/server.ts
async function startLocalServer(filepath, port) {
	const absolutePath = resolve(filepath);
	const dir = dirname(absolutePath);
	return new Promise((resolve$1, reject) => {
		const server = spawn("npx", [
			"serve",
			"-l",
			port.toString(),
			dir
		], {
			stdio: [
				"ignore",
				"pipe",
				"pipe"
			],
			shell: process.platform === "win32"
		});
		let started = false;
		server.stdout?.on("data", (data) => {
			const output = data.toString();
			if (output.includes("Accepting connections") || output.includes("Local:")) {
				started = true;
				const filename = filepath.split(/[/\\]/).pop();
				resolve$1({
					kill: () => server.kill(),
					url: `http://localhost:${port}/${filename}`
				});
			}
		});
		server.stderr?.on("data", (data) => {
			if (!started) console.error(`Server error: ${data.toString()}`);
		});
		server.on("error", (err) => {
			reject(new Error(`Failed to start server: ${err.message}`));
		});
		setTimeout(() => {
			if (!started) {
				server.kill();
				reject(new Error("Server startup timeout"));
			}
		}, 1e4);
	});
}

//#endregion
//#region src/runner.ts
async function runLighthouse(url, config) {
	const browser = await chromium.launch({
		headless: true,
		args: [
			"--no-sandbox",
			"--disable-setuid-sandbox",
			"--disable-dev-shm-usage",
			"--disable-gpu",
			`--remote-debugging-port=${config.port}`
		]
	});
	try {
		const result = await lighthouse(url, {
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
				disabled: false
			},
			throttling: {
				rttMs: 40,
				throughputKbps: 10 * 1024,
				cpuSlowdownMultiplier: 1
			}
		});
		return result.lhr;
	} finally {
		await browser.close();
	}
}
function extractMetrics(lhr) {
	const audits = lhr.audits;
	return {
		lcp: audits["largest-contentful-paint"]?.numericValue,
		fid: audits["max-potential-fid"]?.numericValue,
		cls: audits["cumulative-layout-shift"]?.numericValue,
		ttfb: audits["server-response-time"]?.numericValue,
		speedIndex: audits["speed-index"]?.numericValue,
		fcp: audits["first-contentful-paint"]?.numericValue,
		tbt: audits["total-blocking-time"]?.numericValue
	};
}
function extractFailedAudits(lhr) {
	const failed = {};
	for (const [categoryId, category] of Object.entries(lhr.categories)) {
		failed[categoryId] = [];
		for (const auditRef of category.auditRefs) {
			const audit = lhr.audits[auditRef.id];
			if (audit && audit.score !== null && audit.score < .9) {
				const failedAudit = {
					id: audit.id,
					title: audit.title,
					description: audit.description,
					score: audit.score,
					displayValue: audit.displayValue
				};
				failed[categoryId].push(failedAudit);
			}
		}
		failed[categoryId].sort((a, b) => (a.score || 0) - (b.score || 0));
		failed[categoryId] = failed[categoryId].slice(0, 5);
	}
	return failed;
}

//#endregion
//#region src/reporter.ts
function formatScoreBar(score) {
	const filled = Math.round(score / 10);
	const empty = 10 - filled;
	return "#".repeat(filled) + "-".repeat(empty);
}
function formatMetric(name, value) {
	if (value === void 0) return `${name}: N/A`;
	let formatted;
	let status;
	switch (name) {
		case "LCP":
			formatted = `${(value / 1e3).toFixed(1)}s`;
			status = value <= 2500 ? "GOOD" : value <= 4e3 ? "NEEDS IMPROVEMENT" : "POOR";
			break;
		case "FID":
			formatted = `${Math.round(value)}ms`;
			status = value <= 100 ? "GOOD" : value <= 300 ? "NEEDS IMPROVEMENT" : "POOR";
			break;
		case "CLS":
			formatted = value.toFixed(3);
			status = value <= .1 ? "GOOD" : value <= .25 ? "NEEDS IMPROVEMENT" : "POOR";
			break;
		default:
			formatted = `${Math.round(value)}ms`;
			status = "";
	}
	return `${name}: ${formatted}${status ? ` [${status}]` : ""}`;
}
function generateTextReport(url, lhr, metrics, failed) {
	const scores = {};
	for (const [id, category] of Object.entries(lhr.categories)) scores[id] = Math.round(category.score * 100);
	let output = `# Lighthouse Report: ${url}\n\n`;
	output += `Analyzed at: ${new Date().toISOString()}\n\n`;
	output += `## Scores\n\n`;
	for (const [id, score] of Object.entries(scores)) {
		const name = id.charAt(0).toUpperCase() + id.slice(1).replace("-", " ");
		output += `- ${name.padEnd(15)} ${score.toString().padStart(3)}/100 [${formatScoreBar(score)}]\n`;
	}
	output += `\n## Core Web Vitals\n\n`;
	output += `- ${formatMetric("LCP", metrics.lcp)}\n`;
	output += `- ${formatMetric("FID", metrics.fid)}\n`;
	output += `- ${formatMetric("CLS", metrics.cls)}\n`;
	output += `\n## Additional Metrics\n\n`;
	output += `- TTFB: ${metrics.ttfb ? Math.round(metrics.ttfb) + "ms" : "N/A"}\n`;
	output += `- Speed Index: ${metrics.speedIndex ? (metrics.speedIndex / 1e3).toFixed(1) + "s" : "N/A"}\n`;
	output += `- FCP: ${metrics.fcp ? (metrics.fcp / 1e3).toFixed(1) + "s" : "N/A"}\n`;
	output += `- TBT: ${metrics.tbt ? Math.round(metrics.tbt) + "ms" : "N/A"}\n`;
	for (const [categoryId, audits] of Object.entries(failed)) if (audits.length > 0) {
		const name = categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace("-", " ");
		output += `\n## ${name} Issues\n\n`;
		audits.forEach((audit, idx) => {
			const scorePercent = Math.round((audit.score || 0) * 100);
			output += `${idx + 1}. **${audit.title}** (${scorePercent}%)\n`;
			if (audit.displayValue) output += `   ${audit.displayValue}\n`;
		});
	}
	return output;
}
function generateJsonReport(url, lhr, metrics, failed) {
	const scores = {};
	for (const [id, category] of Object.entries(lhr.categories)) scores[id] = Math.round(category.score * 100);
	return {
		url,
		timestamp: new Date().toISOString(),
		lighthouseVersion: lhr.lighthouseVersion,
		scores,
		metrics,
		audits: failed
	};
}

//#endregion
//#region src/index.ts
async function main() {
	const args = process.argv.slice(2);
	if (args.length === 0) {
		printHelp();
		process.exit(1);
	}
	const { target, config } = parseArgs(args);
	if (!target) {
		console.error("Error: No target URL or file specified");
		process.exit(1);
	}
	let url = target;
	let serverResult = null;
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
		if (config.jsonOutput) console.log(JSON.stringify(generateJsonReport(url, lhr, metrics, failed), null, 2));
		else console.log(generateTextReport(url, lhr, metrics, failed));
	} catch (err) {
		console.error(`Error running Lighthouse: ${err instanceof Error ? err.message : err}`);
		process.exit(1);
	} finally {
		if (serverResult) serverResult.kill();
	}
}
main();

//#endregion
//# sourceMappingURL=index.js.map