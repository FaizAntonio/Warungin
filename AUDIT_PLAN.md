# Audit Plan - New-Warungin

Dokumen ini menjadi panduan audit penuh aplikasi New-Warungin setelah setup Replit siap.

## Tujuan Audit

1. Menilai kesehatan teknis aplikasi secara menyeluruh
2. Menemukan risiko utama (stabilitas, keamanan, performa)
3. Menyusun prioritas perbaikan yang realistis dan terukur

## Ruang Lingkup

- Backend (`nest/`)
- Frontend (`client/`)
- Database & ORM (`prisma/`)
- Konfigurasi deployment/dev (`Dockerfile`, compose, script)
- Monitoring/observability (`monitoring/`, `observability/`)

## Metode Audit

- Code review berbasis checklist
- Verifikasi otomatis via command (lint, type-check, test)
- Sampling endpoint/kasus kritikal untuk validasi manual
- Penilaian temuan dengan tingkat prioritas: High / Medium / Low

## Checklist Audit Detail

### 1) Arsitektur & Struktur Kode

- [ ] Konsistensi modularisasi backend (controller/service/repository)
- [ ] Pemisahan concern domain, infra, dan utilitas
- [ ] Penggunaan shared utilities agar tidak duplikasi logic
- [ ] Kebersihan import/dependency antarmodule
- [ ] Konsistensi naming convention file, class, function

### 2) Kualitas Kode & Maintainability

- [ ] `npm run type-check` lulus tanpa error
- [ ] `npm run lint` lulus tanpa error kritis
- [ ] Fungsi kompleks memiliki pemecahan logic yang jelas
- [ ] Error handling konsisten (tanpa swallow error)
- [ ] Logging terstruktur dan mudah ditelusuri

### 3) Database & Prisma

- [ ] Integritas `schema.prisma` dan relasi utama
- [ ] Validasi penggunaan index pada query yang sering dipakai
- [ ] Pemeriksaan risiko N+1 query pada endpoint kritikal
- [ ] Kerapihan migrasi dan kompatibilitas antar environment
- [ ] Konsistensi transaksi pada operasi multi-step

### 4) Security Baseline

- [ ] Validasi input pada endpoint publik dan endpoint penting
- [ ] Proteksi auth/authz konsisten antar role tenant/admin
- [ ] Penanganan secret dan env variable aman
- [ ] Cek middleware security (`helmet`, rate limit, cors) efektif
- [ ] Cek potensi kebocoran data sensitif di log/response

### 5) Frontend Stability & UX Teknis

- [ ] Error state/loading state pada halaman kritikal
- [ ] Validasi form dan sanitasi input user
- [ ] Konsistensi pemanggilan API + penanganan error
- [ ] Kualitas state management (tidak ada race condition jelas)
- [ ] Responsivitas dasar di desktop dan mobile

### 6) Testing & Reliability

- [ ] Cakupan test unit pada logic inti
- [ ] Cakupan test integration untuk flow penting
- [ ] Kualitas assertion (bukan hanya happy path)
- [ ] Pemeriksaan flaky test atau test yang tidak deterministik
- [ ] Gap test untuk area berisiko tinggi

### 7) Performance Baseline

- [ ] Endpoint lambat teridentifikasi (estimasi quick profiling)
- [ ] Query berat dioptimasi (select field, pagination, index)
- [ ] Payload API efisien (hindari over-fetching)
- [ ] Cek proses blocking/CPU-heavy yang perlu dipindahkan ke queue
- [ ] Evaluasi bottleneck cepat untuk prioritas optimasi

### 8) DevOps & Operasional

- [ ] Konsistensi script setup lokal/CI
- [ ] Kualitas Dockerfile/compose untuk dev/prod baseline
- [ ] Ketersediaan health check minimal
- [ ] Rotasi/struktur log dan kebijakan retensi dasar
- [ ] Readiness monitoring alert yang relevan

## Perintah Audit yang Direkomendasikan

Jalankan dari root project:

```bash
npm run type-check
npm run lint
npm run test -- --run
npx prisma validate
npm run prisma:generate
```

Jika frontend punya lint/test terpisah, jalankan juga dari `client/` sesuai script yang tersedia.

## Format Laporan Hasil Audit

Gunakan format ini agar temuan mudah diprioritaskan:

### Ringkasan Eksekutif

- Status umum: Sehat / Perlu perhatian / Risiko tinggi
- Total temuan: X High, Y Medium, Z Low

### Daftar Temuan

Setiap temuan berisi:

- ID temuan
- Lokasi file/modul
- Deskripsi masalah
- Dampak risiko
- Prioritas (High/Medium/Low)
- Rekomendasi perbaikan
- Estimasi effort (S/M/L)

### Prioritas Eksekusi

1. Quick wins (1-3 hari)
2. Stabilization tasks (1-2 minggu)
3. Improvement roadmap (1-2 bulan)

## Deliverable Audit

- `AUDIT_REPORT.md` (hasil audit lengkap)
- `AUDIT_FIX_PLAN.md` (rencana implementasi per prioritas)
- Daftar task teknis yang siap dieksekusi (issue/backlog)

## Kriteria Selesai Audit

- Semua area checklist sudah direview
- Temuan sudah diberi prioritas dan owner
- Ada rencana tindakan untuk semua temuan High
- Tersusun roadmap perbaikan yang bisa dieksekusi bertahap
