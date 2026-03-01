#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function readSafe(file) {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) return "";
  return fs.readFileSync(filePath, "utf8");
}

function extractNumber(text, regex, fallback = 0) {
  const match = text.match(regex);
  return match ? Number(match[1]) : fallback;
}

const authMatrix = readSafe("AUDIT_AUTH_ROUTE_API_MATRIX.md");
const pageApi = readSafe("AUDIT_PAGE_API_REPORT.md");
const phase23 = readSafe("PHASE23_EXECUTION.md");

const p0 = extractNumber(authMatrix, /- P0:\s*(\d+)/, 0);
const p1 = extractNumber(authMatrix, /- P1:\s*(\d+)/, 0);
const p2 = extractNumber(authMatrix, /- P2:\s*(\d+)/, 0);
const unresolved = extractNumber(pageApi, /API calls with unresolved backend base path:\s*(\d+)/, 0);
const duplicates = extractNumber(pageApi, /Duplicate route entries found:\s*(\d+)/, 0);
const overallPass = /- Overall:\s*PASS/.test(phase23);

const lines = [];
lines.push("# AUDIT HEALTH STATUS");
lines.push("");
lines.push(`Generated: ${new Date().toISOString()}`);
lines.push("");
lines.push("## Snapshot");
lines.push("");
lines.push(`- Phase 2-3 overall: ${overallPass ? "PASS" : "NOT PASS"}`);
lines.push(`- Auth mismatch: P0=${p0}, P1=${p1}, P2=${p2}`);
lines.push(`- Route/API unresolved mapping: ${unresolved}`);
lines.push(`- Duplicate route entries: ${duplicates}`);
lines.push("");
lines.push("## Gate Decision");
lines.push("");

if (overallPass && p0 === 0 && p1 === 0 && p2 === 0 && unresolved === 0 && duplicates === 0) {
  lines.push("- Status: GO (no blocker detected in current audit scope)");
} else {
  lines.push("- Status: HOLD (review generated audit reports before release)");
}

lines.push("");
lines.push("## Evidence Files");
lines.push("");
lines.push("- `PHASE23_EXECUTION.md`");
lines.push("- `AUDIT_AUTH_ROUTE_API_MATRIX.md`");
lines.push("- `AUDIT_PAGE_API_REPORT.md`");
lines.push("- `AUDIT_RUNTIME_ROLE_MATRIX.md`");

fs.writeFileSync(path.join(ROOT, "AUDIT_HEALTH_STATUS.md"), lines.join("\n"));
console.log("Report written: AUDIT_HEALTH_STATUS.md");
