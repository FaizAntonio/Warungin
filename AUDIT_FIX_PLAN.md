# Audit Fix Plan - New-Warungin

Dokumen ini adalah rencana implementasi perbaikan berdasarkan `AUDIT_REPORT.md`.
Catatan: file ini hanya planning, belum melakukan perubahan kode.

## Prinsip Eksekusi

- Prioritaskan risiko keamanan dan reliability terlebih dulu.
- Semua perbaikan dilakukan di branch terpisah saat implementasi di Replit.
- Setiap task punya output verifikasi yang jelas (command atau bukti perilaku).

## Ringkasan Prioritas

- High: 2 item
- Medium: 5 item
- Low: 3 item

## Phase 0 - Persiapan (0.5 hari)

### F-000 - Siapkan branch dan baseline verifikasi

- Referensi temuan: umum
- Aksi:
  - Buat branch implementasi per batch (`fix/security-baseline`, `fix/quality-gates`, dst)
  - Dokumentasikan state awal command check sebelum perubahan
- Done jika:
  - Ada baseline hasil command sebelum fix
  - Semua task memiliki owner dan target tanggal

## Phase 1 - Security Critical (1-2 hari)

### F-101 - Lindungi endpoint internal sensitif — **DONE**

- Referensi: A-SEC-001
- Area: `nest/src/modules/internal/*`
- Status: **Selesai** (2026-03-01)
- Implementasi:
  - `InternalApiKeyGuard` diterapkan di class level — semua endpoint wajib API key valid.
  - `@Public()` di class level (bypass global JWT, diganti API key guard — pola NestJS standar).
  - Audit logging ditambahkan untuk operasi sensitif.
- Verifikasi:
  - ✅ Tanpa API key: semua 7 endpoint mengembalikan 401
  - ✅ Dengan API key valid: endpoint dapat diakses (200)

### F-102 - Hapus fallback JWT secret hardcoded — **DONE**

- Referensi: A-SEC-002
- Area: `nest/src/modules/auth/auth.service.ts`
- Status: **Selesai** (2026-03-01)
- Implementasi:
  - `jwtSecret` getter fail-fast jika `JWT_SECRET` tidak ada atau < 32 chars.
  - Tidak ada fallback hardcoded.
- Verifikasi:
  - ✅ Auth flow normal berjalan dengan env valid
  - ✅ Getter throw Error jika secret tidak memenuhi syarat

## Phase 2 - Quality Gates & CI Readiness (1-2 hari)

### F-201 - Benahi script type-check root — **DONE**

- Referensi: A-REL-001
- Area: `package.json` root
- Status: **Selesai** (2026-03-01)
- Implementasi: `cd nest && npx tsc --noEmit && cd ../client && npx vue-tsc --noEmit`
- Verifikasi:
  - ✅ `npm run type-check` berjalan dari root tanpa error

### F-202 - Benahi script lint root — **DONE**

- Referensi: A-REL-002
- Area: `package.json` root
- Status: **Selesai** (2026-03-01)
- Implementasi: `cd nest && npx eslint src --ext .ts`
- Verifikasi:
  - ✅ `npm run lint` mengarah ke path backend yang benar (155 warnings, 10 pre-existing errors)

### F-203 - Rancang baseline testing minimum

- Referensi: A-REL-003
- Area: backend + frontend
- Aksi:
  - Tetapkan test minimum untuk smoke flow kritikal
  - Standarkan lokasi test agar terdeteksi script root
- Verifikasi:
  - `npm run test -- --run` menemukan dan mengeksekusi test baseline

## Phase 3 - Operasional & Database Hygiene (2-4 hari)

### F-301 - Pisahkan lint check vs lint fix

- Referensi: A-OPS-001
- Area: `client/package.json`
- Aksi:
  - `lint` untuk read-only check
  - `lint:fix` untuk auto-fix manual
- Verifikasi:
  - Menjalankan lint di CI tidak mengubah file

### F-302 - Rapikan strategi migrasi Prisma

- Referensi: A-DB-001
- Area: `.gitignore`, `prisma/migrations/*`
- Aksi:
  - Simpan migration SQL ke version control
  - Definisikan alur migrasi dev/staging/prod yang konsisten
- Verifikasi:
  - Environment baru dapat direplikasi via migrasi tanpa drift

## Phase 4 - Technical Debt & Performance (berjalan paralel, 1-2 sprint)

### F-401 - Turunkan lint warning frontend

- Referensi: A-FE-002
- Aksi:
  - Cleanup warning per domain modul (batch kecil)
  - Tetapkan target warning reduction per sprint
- Verifikasi:
  - Tren warning menurun konsisten

### F-402 - Optimasi bundle frontend

- Referensi: A-PERF-001
- Aksi:
  - Tambah lazy-loading untuk fitur berat (PDF/report/export)
  - Tuning chunking strategy di bundler
- Verifikasi:
  - Ukuran chunk utama menurun
  - Time-to-interactive page kritikal membaik

### F-403 - Rapikan env frontend/backend

- Referensi: A-FE-001
- Aksi:
  - Pisahkan variabel runtime frontend ke pola `VITE_*`
  - Hindari konfigurasi yang memicu warning tooling
- Verifikasi:
  - Build frontend tanpa warning konfigurasi env yang sama

## Rencana Eksekusi Replit

- Batch 1 (Wajib): F-101 ✅, F-102 ✅, F-201 ✅, F-202 ✅ — **SELESAI**
- Batch 2 (Stabil): F-203, F-301, F-302
- Batch 3 (Optimal): F-401, F-402, F-403

## Definition of Done (Global)

- Semua item High selesai dan terverifikasi
- Quality gate root (`type-check`, `lint`, `test`) dapat dijalankan konsisten
- Tidak ada endpoint internal sensitif yang ekspos publik tanpa kontrol
- Ada catatan implementasi per task + hasil verifikasi
