#!/usr/bin/env node

const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");

function must(command, label) {
  const result = spawnSync(command, {
    cwd: ROOT,
    shell: true,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    const output = `${result.stdout || ""}${result.stderr || ""}`.trim();
    throw new Error(`${label} failed\n${output}`);
  }
}

try {
  must('node "scripts/start-local-db.js"', "Local DB startup");
  must('node "scripts/seed-role-readiness.js"', "Role readiness seed");
  must("npm run audit:phase23", "Phase 2-3 audit");
  console.log("Local full audit completed.");
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
