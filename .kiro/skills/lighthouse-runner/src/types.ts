/**
 * Type definitions for Lighthouse Runner
 */

export interface LighthouseConfig {
  timeout: number;
  categories: string[];
  port: number;
  servePort: number;
  jsonOutput: boolean;
}

export interface Metrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
  speedIndex?: number;
  fcp?: number;
  tbt?: number;
}

export interface FailedAudit {
  id: string;
  title: string;
  description: string;
  score: number | null;
  displayValue?: string;
}

export interface FailedAudits {
  [categoryId: string]: FailedAudit[];
}

export interface Scores {
  [categoryId: string]: number;
}

export interface LighthouseReport {
  url: string;
  timestamp: string;
  lighthouseVersion: string;
  scores: Scores;
  metrics: Metrics;
  audits: FailedAudits;
}

export interface ServerResult {
  kill: () => void;
  url: string;
}
