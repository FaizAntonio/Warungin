#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ROUTER_FILES = [
  path.join(ROOT, "client", "src", "router", "index.ts"),
  path.join(ROOT, "client", "src", "router", "addon.routes.ts"),
];
const MODULES_ROOT = path.join(ROOT, "nest", "src", "modules");
const VIEWS_ROOT = path.join(ROOT, "client", "src", "views");

const PUBLIC_ROUTE_NAMES = new Set([
  "home",
  "demo",
  "contact",
  "terms",
  "pricing",
  "help",
  "help-article",
  "help-category",
  "forgot-password",
  "contact-success",
  "login",
  "payment-success",
  "payment-error",
  "payment-pending",
  "unauthorized",
  "not-found",
]);

const ROLES = [
  "GUEST",
  "SUPER_ADMIN",
  "ADMIN_TENANT",
  "SUPERVISOR",
  "CASHIER",
  "KITCHEN",
];

const AUTH_ROLES = ROLES.filter((r) => r !== "GUEST");

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function walkFiles(dir, matcher) {
  const out = [];
  const stack = [dir];
  while (stack.length > 0) {
    const current = stack.pop();
    if (!fs.existsSync(current)) continue;
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(fullPath);
      else if (matcher(fullPath)) out.push(fullPath);
    }
  }
  return out;
}

function normalizeImport(importPath) {
  return path
    .join(ROOT, "client", "src", importPath.replace(/^\.\.\//, ""))
    .replace(/\\/g, "/");
}

function parseRouterViews() {
  const map = new Map();
  for (const filePath of ROUTER_FILES) {
    const lines = read(filePath).split(/\r?\n/);
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const match = line.match(/import\((['"])(\.{2}\/views\/[^'"]+\.vue)\1\)/);
      if (!match) continue;

      const viewPath = normalizeImport(match[2]);
      let routePath = "";
      let routeName = "";
      let roles = [];
      let requiresAuth = false;

      for (let j = i; j >= Math.max(0, i - 30); j -= 1) {
        const probe = lines[j];
        if (!routePath) {
          const m = probe.match(/path:\s*(['"])([^'"]+)\1/);
          if (m) routePath = m[2];
        }
        if (!routeName) {
          const m = probe.match(/name:\s*(['"])([^'"]+)\1/);
          if (m) routeName = m[2];
        }
        if (routePath && routeName) break;
      }

      let nearestRoles = null;
      let nearestDistance = Number.MAX_SAFE_INTEGER;
      for (
        let j = Math.max(0, i - 6);
        j <= Math.min(lines.length - 1, i + 6);
        j += 1
      ) {
        const probe = lines[j];
        if (probe.includes("requiresAuth: true")) requiresAuth = true;
        const rolesMatch = probe.match(/roles:\s*\[([^\]]+)\]/);
        if (!rolesMatch) continue;
        const d = Math.abs(i - j);
        if (d < nearestDistance) {
          nearestDistance = d;
          nearestRoles = rolesMatch[1]
            .split(",")
            .map((x) => x.trim().replace(/['"]/g, ""))
            .filter(Boolean);
        }
      }
      if (nearestRoles && nearestRoles.length > 0) {
        roles = nearestRoles;
        requiresAuth = true;
      }

      if (!map.has(viewPath)) map.set(viewPath, []);
      map.get(viewPath).push({
        routePath,
        routeName,
        roles,
        requiresAuth,
        source: path.relative(ROOT, filePath),
      });
    }
  }
  return map;
}

function parseViewCalls() {
  const files = walkFiles(VIEWS_ROOT, (p) => p.endsWith(".vue"));
  const map = new Map();
  for (const filePath of files) {
    const normalized = filePath.replace(/\\/g, "/");
    const content = read(filePath);
    const regex = /api\.(get|post|put|patch|delete)\(\s*(["'`])([^"'`]+)\2/g;
    const calls = [];
    let m;
    while ((m = regex.exec(content)) !== null) {
      calls.push({ method: m[1].toUpperCase(), endpoint: m[3] });
    }
    if (calls.length > 0) map.set(normalized, calls);
  }
  return map;
}

function parseControllerEndpoints() {
  const files = walkFiles(MODULES_ROOT, (p) => p.endsWith("controller.ts"));
  const endpoints = [];

  for (const filePath of files) {
    const rel = path.relative(ROOT, filePath);
    const lines = read(filePath).split(/\r?\n/);
    let classBase = "";
    let classRoles = [];
    let classPublic = false;
    let classGuarded = false;

    let decorators = [];
    let pendingHttp = null;

    const parseRoles = (line) => {
      const m = line.match(/@Roles\(([^)]+)\)/);
      if (!m) return [];
      return m[1]
        .split(",")
        .map((x) => x.trim().replace(/['"]/g, ""))
        .filter(Boolean);
    };

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i].trim();

      if (line.startsWith("@")) {
        decorators.push(line);
        const http = line.match(/^@(Get|Post|Put|Patch|Delete)\(([^)]*)\)/);
        if (http) {
          pendingHttp = {
            method: http[1].toUpperCase(),
            childPath: http[2].trim().replace(/^['"]|['"]$/g, ""),
            line: i + 1,
          };
        }
        continue;
      }

      if (/^export class\s+\w+/.test(line)) {
        classBase = "";
        classRoles = [];
        classPublic = false;
        classGuarded = false;
        for (const d of decorators) {
          const c = d.match(/@Controller\((['"])([^'"]+)\1\)/);
          if (c) classBase = c[2].replace(/^\/+/, "");
          if (d.includes("@Public()")) classPublic = true;
          if (d.includes("@UseGuards(")) classGuarded = true;
          const r = parseRoles(d);
          if (r.length > 0) classRoles = r;
        }
        decorators = [];
        pendingHttp = null;
        continue;
      }

      if (!pendingHttp) continue;
      const isMethod =
        /^(public\s+|private\s+|protected\s+)?(async\s+)?[A-Za-z0-9_]+\s*\(/.test(
          line,
        );
      if (!isMethod) continue;

      let methodPublic = classPublic;
      let methodRoles = [...classRoles];
      let methodGuarded = classGuarded;

      for (const d of decorators) {
        if (d.includes("@Public()")) methodPublic = true;
        if (d.includes("@UseGuards(")) methodGuarded = true;
        const r = parseRoles(d);
        if (r.length > 0) methodRoles = r;
      }

      const fullPath = [classBase, pendingHttp.childPath]
        .filter(Boolean)
        .join("/")
        .replace(/\/+/g, "/");

      endpoints.push({
        method: pendingHttp.method,
        path: `/${fullPath}`,
        roles: methodRoles,
        isPublic: methodPublic,
        isGuarded: methodGuarded,
        ref: `${rel}:${pendingHttp.line}`,
      });

      decorators = [];
      pendingHttp = null;
    }
  }

  return endpoints;
}

function sanitizePath(p) {
  return p.replace(/\?.*$/, "").replace(/^\/+/, "");
}

function endpointMatches(callEndpoint, backendPath) {
  const callSeg = sanitizePath(callEndpoint).split("/").filter(Boolean);
  const backSeg = sanitizePath(backendPath).split("/").filter(Boolean);
  if (callSeg.length !== backSeg.length) return false;
  for (let i = 0; i < callSeg.length; i += 1) {
    const c = callSeg[i];
    const b = backSeg[i];
    if (c.includes("${") || b.startsWith(":")) continue;
    if (c !== b) return false;
  }
  return true;
}

function routeAccess(route, role) {
  if (PUBLIC_ROUTE_NAMES.has(route.routeName)) return true;
  if (route.roles.length > 0) return route.roles.includes(role);
  if (route.requiresAuth) return role !== "GUEST";
  return role !== "GUEST";
}

function apiAccess(endpoint, role) {
  if (!endpoint) return false;
  if (endpoint.isPublic) return true;
  if (endpoint.roles.length > 0) return endpoint.roles.includes(role);
  if (endpoint.isGuarded) return role !== "GUEST";
  return true;
}

function generate() {
  const routesByView = parseRouterViews();
  const callsByView = parseViewCalls();
  const endpoints = parseControllerEndpoints();

  const matrix = [];
  for (const [view, routeEntries] of routesByView.entries()) {
    const calls = callsByView.get(view) || [];
    for (const route of routeEntries) {
      if (calls.length === 0) {
        matrix.push({ view, route, call: null, endpoint: null });
        continue;
      }
      for (const call of calls) {
        const endpoint =
          endpoints.find(
            (e) =>
              e.method === call.method &&
              endpointMatches(call.endpoint, e.path),
          ) || null;
        matrix.push({ view, route, call, endpoint });
      }
    }
  }

  const perRole = {};
  for (const role of ROLES) {
    perRole[role] = { ok: 0, routeBlocked: 0, apiDenied: 0, unmapped: 0 };
  }

  const mismatches = [];
  for (const row of matrix) {
    for (const role of ROLES) {
      const canRoute = routeAccess(row.route, role);
      if (!canRoute) {
        perRole[role].routeBlocked += 1;
        continue;
      }

      if (!row.call) {
        perRole[role].ok += 1;
        continue;
      }

      if (!row.endpoint) {
        perRole[role].unmapped += 1;
        mismatches.push({
          role,
          type: "unmapped-endpoint",
          route: row.route.routePath,
          page: path.relative(ROOT, row.view),
          api: `${row.call.method} ${row.call.endpoint}`,
        });
        continue;
      }

      const canApi = apiAccess(row.endpoint, role);
      if (!canApi) {
        perRole[role].apiDenied += 1;
        if (role !== "GUEST") {
          mismatches.push({
            role,
            type: "api-denied",
            route: row.route.routePath,
            page: path.relative(ROOT, row.view),
            api: `${row.call.method} ${row.call.endpoint}`,
            backend: `${row.endpoint.method} ${row.endpoint.path}`,
            ref: row.endpoint.ref,
          });
        }
      } else {
        perRole[role].ok += 1;
      }
    }
  }

  const lines = [];
  lines.push("# RUNTIME ROLE MATRIX REPORT");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push("## Per-Role Summary");
  lines.push("");
  lines.push("| Role | OK | Route Blocked | API Denied | Unmapped | ");
  lines.push("|---|---:|---:|---:|---:|");
  for (const role of ROLES) {
    const s = perRole[role];
    lines.push(
      `| ${role} | ${s.ok} | ${s.routeBlocked} | ${s.apiDenied} | ${s.unmapped} |`,
    );
  }
  lines.push("");

  const nonGuestMismatches = mismatches.filter((m) => m.role !== "GUEST");
  lines.push("## Non-Guest Mismatch Candidates");
  lines.push("");
  if (nonGuestMismatches.length === 0) {
    lines.push("- No role mismatch candidate detected for authenticated roles");
  } else {
    for (const m of nonGuestMismatches.slice(0, 120)) {
      lines.push(
        `- role=${m.role} | type=${m.type} | route=${m.route} | page=${m.page} | api=${m.api}${m.backend ? ` | backend=${m.backend}` : ""}${m.ref ? ` | ref=${m.ref}` : ""}`,
      );
    }
  }
  lines.push("");

  lines.push("## Critical Route Checklist (manual runtime)");
  lines.push("");
  const criticalRoutes = [
    "dashboard",
    "orders",
    "customers",
    "products",
    "pos",
    "open-shift",
    "settings/store",
    "settings/password",
    "settings/2fa",
    "marketing",
    "reports/advanced",
    "tenants",
    "tenants/:id",
    "superadmin/backups",
    "/payment/success",
    "/payment/error",
    "/payment/pending",
  ];
  for (const r of criticalRoutes) {
    lines.push(
      `- [ ] Validate route \`${r}\` for all roles with expected 200/403`,
    );
  }
  lines.push("");

  const out = path.join(ROOT, "AUDIT_RUNTIME_ROLE_MATRIX.md");
  fs.writeFileSync(out, lines.join("\n"));
  console.log(`Report written: ${out}`);
}

generate();
