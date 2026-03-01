# Replit Setup Checklist - New-Warungin

Checklist ini untuk persiapan implementasi perbaikan di Replit (tanpa ubah arsitektur besar di awal).

## 1) Import & Workspace

- [ ] Import repository New-Warungin ke Replit
- [ ] Pastikan folder utama terbaca: `nest/`, `client/`, `prisma/`, `scripts/`
- [ ] Pastikan lockfile dan dependency manager sesuai (`package-lock.json` + npm)

## 2) Environment Variables

- [ ] Copy `.env.example` menjadi `.env`
- [ ] Isi `DATABASE_URL`
- [ ] Isi `JWT_SECRET` dan `JWT_REFRESH_SECRET` (>= 32 chars, random kuat)
- [ ] Isi `CORS_ORIGIN`, `FRONTEND_URL`, `BACKEND_URL`
- [ ] Isi variabel optional sesuai kebutuhan (Midtrans/SMTP)

## 3) Install Dependencies

Jalankan dari root:

```bash
npm install
```

Jalankan frontend install jika perlu terpisah:

```bash
cd client && npm install
```

## 4) Database & Prisma

- [ ] Validasi schema:

```bash
npx prisma validate
```

- [ ] Generate Prisma client:

```bash
npm run prisma:generate
```

- [ ] Siapkan migrasi sesuai strategy yang dipakai tim

## 5) Local Run Check

- [ ] Jalankan backend dev:

```bash
npm run dev
```

- [ ] Jalankan frontend dev (jika dipisah):

```bash
cd client && npm run dev
```

- [ ] Verifikasi endpoint health dapat diakses
- [ ] Verifikasi login dan minimal 1 flow utama berjalan

## 6) Baseline Quality Check

- [ ] Jalankan type-check, lint, dan test sesuai script yang ada
- [ ] Catat command mana yang gagal sebagai baseline fix
- [ ] Simpan hasil baseline ke catatan issue/task

## 7) Implementasi Berdasarkan Audit

Gunakan urutan dari `AUDIT_FIX_PLAN.md`:

- [ ] Batch 1 (Security + quality gate root)
- [ ] Batch 2 (testing baseline + migrasi + lint workflow)
- [ ] Batch 3 (warning reduction + performa bundle)

## 8) Validasi Setelah Perbaikan

- [ ] Ulang semua command baseline
- [ ] Pastikan tidak ada regresi flow utama
- [ ] Dokumentasikan perubahan dan bukti verifikasi

## 9) Output Dokumen yang Harus Diperbarui

- [ ] `AUDIT_REPORT.md` (update status temuan)
- [ ] `AUDIT_FIX_PLAN.md` (centang task selesai)
- [ ] `README.md` (update command/setup bila berubah)

## Catatan

- Fokus awal di Replit: keamanan endpoint internal + stabilitas quality gate.
- Hindari refactor besar sebelum item High/Medium prioritas selesai.
