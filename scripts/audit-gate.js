#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const statusPath = path.join(ROOT, "AUDIT_HEALTH_STATUS.md");
const phase23Path = path.join(ROOT, "PHASE23_EXECUTION.md");

function read(filePath) {
  if (!fs.existsSync(filePath)) return "";
  return fs.readFileSync(filePath, "utf8");
}

const status = read(statusPath);
const phase23 = read(phase23Path);

const isGo = /- Status:\s*GO/.test(status);
const isPhasePass = /- Overall:\s*PASS/.test(phase23);

if (!isGo || !isPhasePass) {
  console.error("Audit gate: FAIL");
  console.error(`- GO status: ${isGo ? "yes" : "no"}`);
  console.error(`- Phase23 PASS: ${isPhasePass ? "yes" : "no"}`);
  process.exit(1);
}

console.log("Audit gate: PASS");
