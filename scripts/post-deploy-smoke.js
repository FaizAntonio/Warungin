#!/usr/bin/env node

const path = require("path");

for (const envFile of [".env", ".env.local", "nest/.env"]) {
  try {
    require("dotenv").config({ path: path.resolve(__dirname, "..", envFile) });
  } catch {
    // ignore
  }
}

const BASE_URL = (process.env.BACKEND_URL || "http://localhost:3000").replace(/\/$/, "");
const FRONTEND_URL = process.env.FRONTEND_URL;
const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;

const skipHttp = process.argv.includes("--skip-http");

function timeoutPromise(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`timeout after ${ms}ms`)), ms);
  });
}

async function requestJson(url, options = {}, timeoutMs = 15000) {
  const response = await Promise.race([
    fetch(url, options),
    timeoutPromise(timeoutMs),
  ]);
  const text = await response.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  return { status: response.status, ok: response.ok, body };
}

async function run() {
  const checks = [];

  if (!skipHttp) {
    checks.push({
      name: "Backend health",
      run: () => requestJson(`${BASE_URL}/health`),
      validate: (r) => r.ok,
      required: true,
    });

    checks.push({
      name: "CORS preflight health",
      run: () =>
        requestJson(
          `${BASE_URL}/health`,
          {
            method: "OPTIONS",
            headers: {
              Origin: FRONTEND_URL || "http://localhost:5173",
              "Access-Control-Request-Method": "GET",
            },
          },
          10000,
        ),
      validate: (r) => r.status >= 200 && r.status < 500,
      required: false,
    });

    if (INTERNAL_API_KEY) {
      checks.push({
        name: "Internal health (with api key)",
        run: () =>
          requestJson(`${BASE_URL}/internal/health`, {
            headers: {
              "x-internal-api-key": INTERNAL_API_KEY,
            },
          }),
        validate: (r) => r.ok,
        required: false,
      });
    }
  }

  const results = [];
  for (const check of checks) {
    try {
      const response = await check.run();
      const pass = check.validate(response);
      results.push({ ...check, pass, response });
    } catch (error) {
      results.push({ ...check, pass: false, error: error.message });
    }
  }

  const requiredFailures = results.filter((r) => r.required && !r.pass);

  console.log("Post-deploy smoke result:");
  for (const r of results) {
    const status = r.pass ? "PASS" : "FAIL";
    const detail = r.error
      ? r.error
      : `status=${r.response?.status}${r.response?.body ? ` body=${JSON.stringify(r.response.body).slice(0, 120)}` : ""}`;
    console.log(`- [${status}] ${r.name} (${r.required ? "required" : "optional"}) -> ${detail}`);
  }

  if (results.length === 0) {
    console.log("- No HTTP checks executed (--skip-http mode)");
  }

  if (requiredFailures.length > 0) {
    process.exit(1);
  }
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
