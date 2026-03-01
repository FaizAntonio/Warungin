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
- `JWT_SECRET`: (set)
- `JWT_REFRESH_SECRET`: (set)
- `JWT_EXPIRES_IN`: 7d
- `CORS_ORIGIN`: http://localhost:5000
- `DATABASE_URL`: (managed by Replit)
- `MIDTRANS_*`: Payment gateway (optional, empty)
- `SMTP_*`: Email (optional, empty)

## Deployment

Configured for autoscale deployment:
- **Build**: Builds client and nest
- **Run**: `node nest/dist/main.js` (serves static frontend + API)
