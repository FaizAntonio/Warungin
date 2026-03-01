#!/usr/bin/env node

const { spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");

function run(command, description) {
  const result = spawnSync(command, {
    cwd: ROOT,
    shell: true,
    encoding: "utf8",
  });
  return {
    description,
    command,
    ok: result.status === 0,
    output: `${result.stdout || ""}${result.stderr || ""}`.trim(),
    code: result.status,
  };
}

const checks = [
  {
    command: "npm run audit:local",
    description: "Full local audit pipeline",
    required: true,
  },
  {
    command: "npm run audit:status",
    description: "Audit health summary",
    required: true,
  },
  {
    command: "npm run audit:gate",
    description: "Audit gate enforcement",
    required: true,
  },
  {
    command: "npm run check:all",
    description: "Type/lint/prisma validation",
    required: false,
  },
];

const results = checks.map((check) => ({ ...check, ...run(check.command, check.description) }));
const failedRequired = results.filter((r) => r.required && !r.ok);
const failedOptional = results.filter((r) => !r.required && !r.ok);

const lines = [];
lines.push("# RELEASE READINESS");
lines.push("");
lines.push(`Generated: ${new Date().toISOString()}`);
lines.push("");
lines.push("## Command Results");
lines.push("");
lines.push("| Check | Command | Required | Status | Exit |");
lines.push("|---|---|---|---|---:|");
for (const r of results) {
  lines.push(`| ${r.description} | \`${r.command}\` | ${r.required ? "yes" : "no"} | ${r.ok ? "PASS" : "FAIL"} | ${r.code ?? "-"} |`);
}
lines.push("");
lines.push("## Verdict");
lines.push("");
lines.push(`- Overall: ${failedRequired.length === 0 ? "READY" : "NOT READY"}`);
lines.push(`- Failed required checks: ${failedRequired.length}`);
lines.push(`- Failed optional checks: ${failedOptional.length}`);

if (failedRequired.length > 0 || failedOptional.length > 0) {
  lines.push("");
  lines.push("## Failed Check Details");
  lines.push("");
  for (const f of [...failedRequired, ...failedOptional]) {
    lines.push(`### ${f.description}`);
    lines.push(`- Required: ${f.required ? "yes" : "no"}`);
    lines.push("```text");
    lines.push((f.output || "(no output)").slice(0, 8000));
    lines.push("```");
  }
}

fs.writeFileSync(path.join(ROOT, "RELEASE_READINESS.md"), lines.join("\n"));
console.log("Report written: RELEASE_READINESS.md");

if (failedRequired.length > 0) {
  process.exit(1);
}
