# Audit Report - New-Warungin (Tahap 1 Baseline)

Tanggal audit: 2026-03-01  
Lingkup: baseline health check, security quick scan, build readiness untuk Replit

## Ringkasan Eksekutif

- Status umum: **Perlu perhatian**
- Temuan: **2 High, 5 Medium, 3 Low**
- Build backend/frontend berhasil, namun quality gate utama (type-check, lint root, test root) belum siap dipakai sebagai CI gate.

## Baseline Check (Command)

### Hasil utama

1. `npm run type-check` (root): **Gagal**
   - Menjalankan `tsc --noEmit` dari root tanpa `tsconfig.json` root.
2. `npm run lint` (root): **Gagal**
   - Mencari `src` di root, padahal source backend berada di `nest/src`.
3. `npm run test -- --run` (root): **Gagal**
   - Tidak ada file test yang cocok pattern Vitest di root project.
4. `npx prisma validate`: **Lulus**
5. `npm run prisma:generate`: **Lulus**
6. `npm run build` (root -> backend Nest): **Lulus**
7. `npm run type-check` (client): **Lulus**
8. `npm run lint` (client): **Lulus dengan warning** (180 warning, 0 error)
9. `npm run build` (client): **Lulus** (dengan warning konfigurasi/env dan chunking)

## Daftar Temuan

### HIGH

#### A-SEC-001 - Endpoint internal sensitif dapat diakses publik

- Lokasi: `nest/src/modules/internal/internal.controller.ts:25`, `nest/src/modules/internal/internal.controller.ts:31`, `nest/src/modules/internal/internal.controller.ts:43`, `nest/src/modules/internal/internal.controller.ts:49`
- Masalah: endpoint `backup`, `subscription/revert`, `api-key/rotate`, dan `api-key/history` diberi `@Public()`.
- Dampak: risiko eksekusi operasi internal tanpa autentikasi yang benar.
- Rekomendasi:
  - Hapus `@Public()` dari endpoint internal sensitif.
  - Lindungi dengan guard khusus internal auth (API key terverifikasi/HMAC/IP allowlist).
  - Tambahkan audit log untuk semua akses endpoint internal.
- Estimasi effort: **M**

#### A-SEC-002 - Fallback JWT secret hardcoded

- Lokasi: `nest/src/modules/auth/auth.service.ts:276`
- Masalah: jika `JWT_SECRET` kosong, service menggunakan fallback hardcoded.
- Dampak: potensi token dapat diverifikasi dengan secret default jika konfigurasi environment bermasalah.
- Rekomendasi:
  - Hapus fallback string hardcoded.
  - Fail-fast saat `JWT_SECRET` tidak tersedia.
  - Pastikan hanya `ConfigModule` schema validation yang menjadi source of truth.
- Estimasi effort: **S**

### MEDIUM

#### A-REL-001 - Script type-check root tidak valid untuk struktur monorepo saat ini

- Lokasi: `package.json:51`
- Masalah: `tsc --noEmit` di root gagal karena tidak ada `tsconfig.json` root.
- Dampak: quality gate CI tidak dapat digunakan sebagai indikator kualitas.
- Rekomendasi:
  - Ubah script ke `cd nest && tsc --noEmit` + `cd client && vue-tsc --noEmit`.
  - Atau tambahkan `tsconfig.json` root yang mereferensikan project backend/frontend.
- Estimasi effort: **S**

#### A-REL-002 - Script lint root salah target directory

- Lokasi: `package.json:47`
- Masalah: lint root menjalankan `eslint src --ext .ts`, sementara `src` ada di `nest/src`.
- Dampak: lint root selalu gagal walau kode valid.
- Rekomendasi:
  - Ganti menjadi `eslint nest/src --ext .ts`.
  - Tambahkan lint frontend terpisah atau gabungkan dengan workspace script yang jelas.
- Estimasi effort: **S**

#### A-REL-003 - Test baseline tidak tersedia di root

- Lokasi: `package.json:40`
- Masalah: `vitest` berjalan dari root namun tidak menemukan file test.
- Dampak: regression risk meningkat karena tidak ada safety net otomatis.
- Rekomendasi:
  - Tentukan strategi test (backend unit/integration, frontend unit/e2e).
  - Tambahkan minimal smoke test untuk auth + health endpoint + 1 flow frontend kritikal.
- Estimasi effort: **M**

#### A-OPS-001 - Lint frontend memakai `--fix` secara default

- Lokasi: `client/package.json:10`
- Masalah: command lint memodifikasi file saat audit/CI.
- Dampak: side effect tidak terduga dan diff noise saat pipeline.
- Rekomendasi:
  - Pisahkan jadi `lint` (tanpa fix) dan `lint:fix`.
- Estimasi effort: **S**

#### A-DB-001 - SQL migration Prisma di-ignore dari Git

- Lokasi: `.gitignore:81`
- Masalah: `prisma/migrations/*.sql` di-ignore.
- Dampak: potensi drift schema antar environment dan audit trail migrasi kurang kuat.
- Rekomendasi:
  - Commit migration SQL ke repository.
  - Gunakan alur migrasi konsisten (`prisma migrate`), hindari ketergantungan penuh pada `db push` untuk production.
- Estimasi effort: **M**

### LOW

#### A-FE-001 - Warning Vite karena `NODE_ENV=production` di `.env`

- Lokasi: `.env.example:5`
- Masalah: Vite memperingatkan bahwa `.env` hanya mendukung `NODE_ENV=development` untuk dev build tertentu.
- Dampak: kebingungan konfigurasi environment, bukan blocker build.
- Rekomendasi:
  - Pindahkan pengaturan environment frontend ke pola `VITE_*`.
  - Hindari penggunaan `NODE_ENV` global yang mengganggu tooling frontend.
- Estimasi effort: **S**

#### A-FE-002 - Warning lint frontend masih tinggi (180)

- Lokasi: banyak file di `client/src/**`
- Masalah: unused vars/import cukup banyak.
- Dampak: signal-to-noise lint menurun, isu penting bisa tertutup warning rutin.
- Rekomendasi:
  - Bersihkan warning secara bertahap per domain fitur.
  - Terapkan threshold warning (mis. maksimum per sprint).
- Estimasi effort: **M**

#### A-PERF-001 - Bundle frontend besar pada beberapa chunk vendor

- Lokasi: output build `client/dist/assets/*`
- Masalah: chunk seperti `pdf-vendor` dan `vendor` relatif besar.
- Dampak: potensi memperlambat first load pada jaringan lambat.
- Rekomendasi:
  - Terapkan lazy loading lebih agresif untuk fitur PDF/reporting berat.
  - Evaluasi manual chunk strategy di Vite config.
- Estimasi effort: **M**

## Prioritas Eksekusi

1. **Quick wins (1-3 hari)**
   - Tutup endpoint internal publik sensitif (A-SEC-001).
   - Hapus fallback JWT secret hardcoded (A-SEC-002).
   - Perbaiki script `type-check` dan `lint` root (A-REL-001, A-REL-002).

2. **Stabilization (1-2 minggu)**
   - Bentuk baseline test minimal (A-REL-003).
   - Pisahkan lint/fix command frontend (A-OPS-001).
   - Rapikan migrasi Prisma agar versioned dan reproducible (A-DB-001).

3. **Improvement roadmap (1-2 bulan)**
   - Kurangi lint warning frontend secara bertahap (A-FE-002).
   - Optimasi size bundle frontend untuk page kritikal (A-PERF-001).

## Catatan Audit

- Audit ini adalah **tahap 1 baseline**; fokus pada readiness awal dan risiko cepat terlihat.
- Untuk audit penuh lanjutan, disarankan lanjut ke:
  - review authorization per endpoint bisnis penting,
  - review query Prisma berbiaya tinggi,
  - review error handling dan observability end-to-end.
