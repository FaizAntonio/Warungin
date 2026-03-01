# CHECKLIST ENV READY (Phase 1)

Generated: 2026-03-01

## 1) Scope Lock

- [x] Router/page/API scope locked via generated reports.
- [x] Auth and role matrix artifacts available:
  - `AUDIT_PAGE_API_REPORT.md`
  - `AUDIT_AUTH_ROUTE_API_MATRIX.md`
  - `AUDIT_RUNTIME_ROLE_MATRIX.md`
  - `AUDIT_BUG_REPORT.md`
- [x] Role set locked: `GUEST`, `SUPER_ADMIN`, `ADMIN_TENANT`, `SUPERVISOR`, `CASHIER`, `KITCHEN`.

## 2) Toolchain Baseline

- [x] Node version checked: `v24.11.1`
- [x] npm version checked: `11.6.4`
- [x] Root dependencies installed (`npm install`)
- [x] Frontend dependencies installed (`client/npm install`)
- [x] Backend dependencies installed (`nest/npm install`)

## 3) Dependency/Version Alignment

- [x] Backend peer dependency conflict fixed for Nest 10 compatibility:
  - Updated `nest/package.json` dependency `@nestjs/serve-static` from `^5.0.4` to `^4.0.2`.
- [x] Prisma client generation validated:
  - `npm run prisma:generate` succeeded.

## 4) Environment Variable Readiness

- [x] `.env.example` exists and documents required keys.
- [x] Runtime env variables provided through `.env.local`:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `JWT_REFRESH_SECRET`
  - `PORT`
  - `NODE_ENV`
  - `FRONTEND_URL`
  - `BACKEND_URL`
  - `CORS_ORIGIN`

## 5) Account/Data Readiness

- [x] Added missing readiness scripts referenced by package scripts:
  - `scripts/test-db-connection.js`
  - `scripts/list-users.js`
  - `scripts/test-all-logins.js`
- [x] DB connectivity check (`npm run test:connection`) in current session: PASS.
- [x] User/role inventory checks (`npm run list:users`, `npm run test:all-logins`): PASS.

## 6) Phase 1 Readiness Verdict

- Automation gates are operational and passing.
- Environment/account readiness is **ready** for runtime phase execution.
