# New-Warungin

New-Warungin adalah aplikasi manajemen bisnis UMKM berbasis multi-tenant.
Stack utama:

- Backend: NestJS + Prisma
- Frontend: Vue (folder `client/`)
- Database: PostgreSQL (via Prisma)

## Tujuan README ini

File ini disiapkan agar project lebih mudah dipahami saat dibuka di Replit, dan jadi fondasi awal sebelum audit penuh aplikasi.

## Menjalankan di Replit

### 1) Import project

- Import repo ke Replit (atau upload project ini sebagai ZIP).

### 2) Install dependency

Di root project:

```bash
npm install
```

Jika frontend ingin dijalankan terpisah:

```bash
cd client && npm install
```

### 3) Konfigurasi environment

- Copy `.env.example` menjadi `.env`
- Isi variabel yang dibutuhkan, terutama koneksi database (`DATABASE_URL`) dan variabel auth.

### 4) Generate Prisma client

```bash
npm run prisma:generate
```

### 5) Jalankan aplikasi

```bash
npm run dev
```

Perintah di atas menjalankan backend dari folder `nest/` dengan mode development.

## Script penting

- `npm run dev` - jalankan backend development
- `npm run build` - build backend
- `npm run start` - jalankan backend production build
- `npm run test` - jalankan test (Vitest)
- `npm run type-check` - cek tipe backend + frontend

## Struktur folder utama

- `nest/` - source backend NestJS
- `client/` - source frontend
- `prisma/` - schema dan migrasi database
- `scripts/` - script utilitas dan maintenance
- `monitoring/` dan `observability/` - komponen monitoring

## Rencana audit penuh (next)

Audit yang akan dilakukan setelah setup Replit siap:

1. Audit struktur arsitektur backend/frontend
2. Audit kualitas code (type safety, lint, test health)
3. Audit keamanan dasar (auth, input validation, env handling)
4. Audit performa dasar (query, endpoint, bottleneck cepat)
5. Rekomendasi prioritas perbaikan (quick wins + roadmap)

---

Kalau kamu setuju, langkah berikutnya saya bisa lanjut bikin `AUDIT_PLAN.md` dan checklist audit detail supaya proses review penuh lebih rapi.
