# Project Flow Blueprint - New-Warungin

Dokumen ini dibuat untuk memberi gambaran utuh tentang produk, arsitektur, route, dan alur logika aplikasi berdasarkan implementasi kode saat ini.

## 1) Project ini produk apa?

New-Warungin adalah **SaaS POS multi-tenant** untuk UMKM/F&B dengan fokus:

- Operasional harian kasir (POS, order, pembayaran, shift)
- Operasional dapur (kitchen order flow)
- Operasional manajemen tenant (produk, user, outlet, laporan, inventori)
- Operasional super admin (multi-tenant oversight, monitoring, backup, subscription)
- Fitur add-on (delivery marketing, analytics lanjutan)

Stack aktif saat ini:

- Backend utama: `nest/` (NestJS + Prisma)
- Frontend: `client/` (Vue 3 + Pinia + Vue Router)
- Database: PostgreSQL via `prisma/schema.prisma`

## 2) Aktor dan hak akses utama

Role yang muncul dominan di kode:

- `SUPER_ADMIN`: lintas tenant, monitoring, tenant management, super dashboard
- `ADMIN_TENANT`: pemilik/admin tenant, akses manajemen bisnis tenant
- `SUPERVISOR`: operasional menengah (order, laporan tertentu, store-scoped)
- `CASHIER`: POS, order operasional kasir, wajib shift aktif
- `KITCHEN`: alur dapur/kitchen display, status order dapur

## 3) Arsitektur runtime (ringkas)

```text
Browser (Vue client)
  -> Axios interceptor (token + tenantId + outletId)
  -> NestJS API (/api/*)
      -> Global JwtAuthGuard (kecuali @Public)
      -> (per-controller) TenantGuard + RolesGuard + SubscriptionGuard
      -> Service layer
      -> Prisma Client
      -> PostgreSQL
```

Detail penting:

- Backend pakai global prefix `api` (kecuali `GET /health`) di `nest/src/main.ts`.
- Frontend request via `client/src/api/index.ts`.
- Banyak controller memakai guard berlapis: `JwtAuthGuard`, `TenantGuard`, `RolesGuard`, `SubscriptionGuard`.

## 4) Frontend route map (flow pengguna)

### A. Public/marketing flow

- `/` home marketing + konten publik (`/demo`, `/pricing`, `/terms`, `/help`, `/contact`)
- `/login` untuk autentikasi
- `/forgot-password`
- `/payment/success|error|pending` callback hasil pembayaran

### B. Authenticated app flow

Entry area private:

- `/app/*` (layout dinamis berbasis role)
- `/pos` (fullscreen POS)
- `/open-shift` (fullscreen shift opening)
- `/kitchen` (fullscreen kitchen display)

Guard logic utama di `client/src/router/index.ts`:

1. Cek token (`localStorage`/`sessionStorage`)
2. Restore session via `fetchMe()` bila perlu
3. Redirect role:
   - Super admin -> `super-dashboard`
   - Role lain -> `dashboard`
4. Khusus `CASHIER`: dipaksa ke `/open-shift` jika belum shift aktif
5. Check store assignment untuk `CASHIER/SUPERVISOR/KITCHEN`
6. Cek `meta.roles`, `meta.requiresPermission`, `meta.requiresAddon`

## 5) Auth & session flow (end-to-end)

1. User login via `POST /api/auth/login`
2. FE simpan token (remember me -> localStorage, jika tidak -> sessionStorage)
3. FE panggil `GET /api/auth/me` untuk refresh profil + permission
4. Router guard memutuskan redirect dashboard sesuai role
5. Axios interceptor otomatis menambahkan:
   - `Authorization: Bearer <token>`
   - `tenantId` query (kondisional, terutama super admin saat pilih tenant)
   - `outletId` query (jika store dipilih)

Catatan implementasi:

- Endpoint `GET /api/auth/me` saat ini public secara decorator, tapi membaca token dari header auth secara manual di controller.

## 6) POS flow inti (kasir -> order -> payment -> kitchen)

Flow operasional harian (ringkas):

1. Kasir login
2. Guard cek shift aktif (jika tidak, redirect ke `/open-shift`)
3. Open shift: `POST /api/cash-shift/open`
4. Operasi POS:
   - kelola item/order (`/api/orders`)
   - update status (`/api/orders/:id/status`, `/api/orders/:id/kitchen-status`)
5. Pembayaran:
   - buat payment `POST /api/payments`
   - monitor status `GET /api/payments/status/:orderId`
6. Dapur menerima update status order via tampilan kitchen
7. Close shift: `POST /api/cash-shift/close`

## 7) Multi-tenant flow (super admin)

1. Super admin login
2. Memilih tenant aktif di frontend
3. Axios interceptor menambahkan `tenantId` ke request yang relevan
4. Backend `TenantGuard` menetapkan `request.tenantId`
5. Service query data tenant sesuai context

Tujuan desain ini: 1 akun super admin bisa meninjau/operasikan data lintas tenant dengan context tenant terpilih.

## 8) Subscription & addon flow

Subscription:

- Banyak endpoint bisnis diproteksi `SubscriptionGuard`.
- `SUPER_ADMIN` dan `ADMIN_TENANT` bypass check tertentu (sesuai implementasi guard).

Addon:

- Route tertentu butuh `meta.requiresAddon` (contoh: `DELIVERY_MARKETING`, `BUSINESS_ANALYTICS`).
- Router memvalidasi addon aktif lewat API `/addons` sebelum memberi akses.

## 9) Backend API map (domain-level)

Base controller utama (prefix otomatis `/api`):

- Auth & identity: `auth`, `2fa`, `password`, `sessions`
- Core POS: `products`, `products/adjustments`, `orders`, `cash-shift`, `store-shift`, `payments`, `payment`
- Master data: `customers`, `members`, `users`, `outlets`, `tenants`, `employees`, `suppliers`
- Inventory: `purchase-orders`, `stock-alerts`, `stock-transfers`
- Financial/reporting: `transactions`, `finance`, `financial-management`, `reports`, `analytics`, `dashboard`
- Subscription/addon: `subscriptions`, `subscription-receipts`, `addons`
- Document/output: `receipts`, `pdf`
- Governance/ops: `settings`, `audit-logs`, `archive`, `contact`, `admin-monitor`
- Backup/internal: `tenant/backup`, `superadmin/backups`, `internal`
- Integrasi: `webhooks`, payment callback endpoint

Public endpoint yang terlihat jelas di kode:

- `GET /health`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `GET /api/auth/me` (token dibaca manual dari header)
- `POST /api/payments/callback`
- `POST /api/payments/webhook/n8n`
- Beberapa endpoint `internal/*` ditandai public (lihat audit report)

## 10) Model data inti (Prisma)

Entitas kunci (ringkas):

- Tenant & akses: `Tenant`, `User`, `Subscription`, `SubscriptionHistory`, `TenantAddon`
- Operasional jualan: `Product`, `Order`, `OrderItem`, `Transaction`, `Discount`, `ReceiptTemplate`
- Operasional toko: `Outlet`, `StoreShift`, `CashShift`, `Employee`
- Pelanggan: `Customer`, `Member`
- Inventory: `Supplier`, `PurchaseOrder`, `PurchaseOrderItem`, `StockTransfer`, `StockTransferItem`, `StockValuation`
- Integrasi/ops: `Webhook`, `WebhookDelivery`, `AuditLog`, `BackupLog`, `ContactSubmission`, `SupportTicket`, `SystemSettings`

Inti domain: hampir semua operasi bisnis berporos di `tenantId` + (opsional) `outletId`.

## 11) Realtime + offline behavior

Realtime:

- FE punya `useSocket()` (`socket.io-client`) untuk event notifikasi seperti `order:new`, `order:update`.

Offline:

- FE menginisialisasi `offlineStorage` saat startup.
- Ada route/view untuk failed sync (`/app/pos/failed-syncs`) yang menandakan dukungan pemulihan transaksi offline.

## 12) Flow boot aplikasi

Backend boot (`nest/src/main.ts`):

1. init app + logger
2. pasang `helmet`
3. pasang rate limiter global + auth limiter
4. set global prefix `/api`
5. pasang validation pipe + exception filter + response interceptor
6. CORS enable
7. listen port

Frontend boot (`client/src/main.ts`):

1. register PWA service worker (jika tersedia)
2. init Vue + Pinia + Router
3. init offline storage
4. mount app

## 13) Hal yang penting diketahui tim Replit (supaya tidak salah arah)

- Runtime utama backend ada di `nest/`, bukan pola backend lama lain.
- Route guard frontend cukup kompleks; perubahan kecil di guard bisa berdampak luas.
- Multi-tenant context ditentukan kombinasi token, selected tenant, dan request interceptor.
- Pengujian flow harus selalu mencakup role-based behavior (SUPER_ADMIN vs ADMIN_TENANT vs CASHIER/KITCHEN).

## 14) Short PRD (operasional)

Jika diringkas jadi PRD singkat:

- **Who**: UMKM multi-cabang (owner/admin, supervisor, kasir, kitchen) + super admin platform.
- **Core jobs**:
  - transaksi penjualan harian,
  - kontrol operasional shift & dapur,
  - manajemen data bisnis tenant,
  - pembayaran/subscription/addon,
  - monitoring lintas tenant untuk super admin.
- **Success criteria**:
  - transaksi cepat dan aman,
  - isolasi data tenant terjaga,
  - role-based access konsisten,
  - operasional tetap jalan saat koneksi tidak stabil.

---

Dokumen ini bisa dipakai sebagai prompt konteks awal Replit Agent agar agent memahami **apa produknya, route-nya, dan flow logic-nya** sebelum melakukan perubahan.
