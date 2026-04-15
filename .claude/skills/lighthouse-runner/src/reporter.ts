/**
 * Report generation for Lighthouse results
 */

import type { LighthouseReport, Metrics, FailedAudits, Scores } from './types.js';

interface LHR {
  lighthouseVersion: string;
  categories: Record<string, { score: number }>;
  audits: Record<string, unknown>;
}

function formatScoreBar(score: number): string {
  const filled = Math.round(score / 10);
  const empty = 10 - filled;
  return '#'.repeat(filled) + '-'.repeat(empty);
}

function formatMetric(name: string, value: number | undefined): string {
  if (value === undefined) return `${name}: N/A`;

  let formatted: string;
  let status: string;

  switch (name) {
    case 'LCP':
      formatted = `${(value / 1000).toFixed(1)}s`;
      status = value <= 2500 ? 'GOOD' : value <= 4000 ? 'NEEDS IMPROVEMENT' : 'POOR';
      break;
    case 'FID':
      formatted = `${Math.round(value)}ms`;
      status = value <= 100 ? 'GOOD' : value <= 300 ? 'NEEDS IMPROVEMENT' : 'POOR';
      break;
    case 'CLS':
      formatted = value.toFixed(3);
      status = value <= 0.1 ? 'GOOD' : value <= 0.25 ? 'NEEDS IMPROVEMENT' : 'POOR';
      break;
    default:
      formatted = `${Math.round(value)}ms`;
      status = '';
  }

  return `${name}: ${formatted}${status ? ` [${status}]` : ''}`;
}

export function generateTextReport(
  url: string,
  lhr: LHR,
  metrics: Metrics,
  failed: FailedAudits
): string {
  const scores: Scores = {};
  for (const [id, category] of Object.entries(lhr.categories)) {
    scores[id] = Math.round(category.score * 100);
  }

  let output = `# Lighthouse Report: ${url}\n\n`;
  output += `Analyzed at: ${new Date().toISOString()}\n\n`;

  output += `## Scores\n\n`;
  for (const [id, score] of Object.entries(scores)) {
    const name = id.charAt(0).toUpperCase() + id.slice(1).replace('-', ' ');
    output += `- ${name.padEnd(15)} ${score.toString().padStart(3)}/100 [${formatScoreBar(score)}]\n`;
  }

  output += `\n## Core Web Vitals\n\n`;
  output += `- ${formatMetric('LCP', metrics.lcp)}\n`;
  output += `- ${formatMetric('FID', metrics.fid)}\n`;
  output += `- ${formatMetric('CLS', metrics.cls)}\n`;

  output += `\n## Additional Metrics\n\n`;
  output += `- TTFB: ${metrics.ttfb ? Math.round(metrics.ttfb) + 'ms' : 'N/A'}\n`;
  output += `- Speed Index: ${metrics.speedIndex ? (metrics.speedIndex / 1000).toFixed(1) + 's' : 'N/A'}\n`;
  output += `- FCP: ${metrics.fcp ? (metrics.fcp / 1000).toFixed(1) + 's' : 'N/A'}\n`;
  output += `- TBT: ${metrics.tbt ? Math.round(metrics.tbt) + 'ms' : 'N/A'}\n`;

  for (const [categoryId, audits] of Object.entries(failed)) {
    if (audits.length > 0) {
      const name = categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace('-', ' ');
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

export function generateJsonReport(
  url: string,
  lhr: LHR,
  metrics: Metrics,
  failed: FailedAudits
): LighthouseReport {
  const scores: Scores = {};
  for (const [id, category] of Object.entries(lhr.categories)) {
    scores[id] = Math.round(category.score * 100);
  }

  return {
    url,
    timestamp: new Date().toISOString(),
    lighthouseVersion: lhr.lighthouseVersion,
    scores,
    metrics,
    audits: failed,
  };
}
