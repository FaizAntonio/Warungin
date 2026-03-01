# Warungin - Enterprise SaaS POS System

## Project Overview

Warungin is a multi-tenant, enterprise-grade Point of Sale (POS) system designed for Indonesian small-medium businesses (UMKM). It features a Vue 3 frontend and a NestJS backend with PostgreSQL.

## Architecture

### Frontend (`/client`)
- **Framework**: Vue 3 + TypeScript
- **Build tool**: Vite 6
- **State management**: Pinia
- **Styling**: Tailwind CSS
- **HTTP client**: Axios
- **Router**: Vue Router 4
- **Charts**: Chart.js + vue-chartjs
- **Dev server**: Port 5000 (proxies `/api` to backend at port 3000)

### Backend (`/nest`)
- **Framework**: NestJS 10 + TypeScript
- **ORM**: Prisma 6 (custom output to `nest/src/generated/client`)
- **Database**: PostgreSQL (Replit built-in via `DATABASE_URL`)
- **Auth**: JWT (passport-jwt)
- **Port**: 3000

### Database (`/prisma`)
- Schema is at `/prisma/schema.prisma`
- Generated client outputs to `/nest/src/generated/client`
- Migrations are applied via `npx prisma migrate deploy`

## Setup Notes

### Prisma Client Generation
The Prisma schema outputs to `nest/src/generated/client`. To regenerate:
1. The root `@prisma/client` package may not include `runtime/*.d.ts` files
2. Copy `.d.ts` files from `nest/node_modules/@prisma/client/runtime/` to `node_modules/@prisma/client/runtime/`
3. Then run `npx prisma generate` from the project root

### NestJS Asset Copying
The `nest/nest-cli.json` uses `assets: [{"include": "generated/**/*", "watchAssets": true}]` to copy the generated Prisma client to `dist/` during builds.

### RLS Migration Fix
The `zzz_enable_rls` migration was patched to use `DO $$ ... IF EXISTS` blocks to handle tables that may not exist at migration time.

## Workflows

- **Start application**: `cd client && npm run dev` → Port 5000 (webview)
- **Backend API**: `cd nest && npm run start:dev` → Port 3000 (console)

## Environment Variables

All configured as shared env vars in Replit Secrets:
- `NODE_ENV`: development
- `PORT`: 3000
- `FRONTEND_URL`: http://localhost:5000
- `BACKEND_URL`: http://localhost:3000
- `JWT_SECRET`: (set, 32+ chars required)
- `JWT_REFRESH_SECRET`: (set)
- `JWT_EXPIRES_IN`: 7d
- `CORS_ORIGIN`: http://localhost:5000
- `DATABASE_URL`: (managed by Replit)
- `INTERNAL_API_KEY`: (set, 16+ chars required)
- `MIDTRANS_*`: Payment gateway (optional, empty)
- `SMTP_*`: Email (optional, empty)

## Security: Internal Endpoints

Sensitive internal endpoints (`/api/internal/backup`, `/api/internal/subscription/revert`, `/api/internal/api-key/rotate`, etc.) are protected by `InternalApiKeyGuard` requiring `X-Internal-Api-Key` header matching the `INTERNAL_API_KEY` environment variable.

## Security: JWT

JWT secret has no hardcoded fallback. The `jwtSecret` getter in `AuthService` will throw if `JWT_SECRET` is missing or shorter than 32 characters.

## CORS Configuration

`nest/src/main.ts` CORS config allows headers: `Content-Type`, `Authorization`, `X-Requested-With`, `X-Correlation-ID`, `X-Tenant-Id`, `X-Internal-Api-Key`. Default origin is `http://localhost:5000`. Supports comma-separated origins via `CORS_ORIGIN` env var.

## Super Admin

- **Email**: admin@warungin.com
- **Default Password**: SuperAdmin123! (set via `SUPERADMIN_PASSWORD` env var or default)
- **Role**: SUPER_ADMIN
- **Tenant**: Warungin HQ (ENTERPRISE plan)
- **Script**: `node scripts/create-super-admin.js` to create/reset
- Super admin has full CRUD access to all tenants

## Deployment

Configured for autoscale deployment:
- **Build**: `npx prisma generate && cd client && npm install && npm run build && cd ../nest && npm install --legacy-peer-deps && npm run build`
- **Run**: `node nest/dist/main.js` (serves static frontend via ServeStaticModule + API)
- In production, frontend and backend are same-origin (no CORS needed for browser requests)
- `CORS_ORIGIN` should include the deployment domain for any cross-origin scenarios

## API URL Resolution

Frontend (`client/src/api/index.ts`) resolves the API URL:
1. Uses `VITE_API_URL` env var if set
2. In production (non-localhost), auto-detects from `window.location` → `${origin}/api`
3. Falls back to `http://localhost:3000/api` for development
