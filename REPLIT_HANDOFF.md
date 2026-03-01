# Replit Handoff - New-Warungin

Dokumen ini adalah ringkasan cepat untuk tim implementasi perbaikan di Replit.

## Tujuan

- Menjalankan perbaikan berdasarkan audit tanpa mengulang discovery dari nol.
- Fokus awal: keamanan endpoint internal + quality gate dasar.

## Dokumen Referensi Wajib

1. `README.md` - setup project dasar
2. `AUDIT_PLAN.md` - cakupan audit penuh
3. `AUDIT_REPORT.md` - hasil temuan dan prioritas
4. `AUDIT_FIX_PLAN.md` - rencana implementasi per fase
5. `REPLIT_SETUP_CHECKLIST.md` - checklist eksekusi di Replit

## Prioritas Eksekusi (Urutan Wajib)

### Batch 1 - Critical

- F-101: Lindungi endpoint internal sensitif
- F-102: Hapus fallback JWT secret hardcoded
- F-201: Benahi script type-check root
- F-202: Benahi script lint root

Target hasil batch 1:

- Tidak ada endpoint internal sensitif yang public tanpa kontrol.
- Command quality gate root bisa dijalankan dengan benar.

### Batch 2 - Stabilization

- F-203: Baseline testing minimum
- F-301: Pisahkan lint check dan lint fix
- F-302: Rapikan strategi migrasi Prisma

### Batch 3 - Improvement

- F-401: Turunkan lint warning frontend
- F-402: Optimasi bundle frontend
- F-403: Rapikan env frontend/backend

## Baseline Command (Jalankan Sebelum dan Sesudah Fix)

Di root project:

```bash
npm run type-check
npm run lint
npm run test -- --run
npx prisma validate
npm run prisma:generate
npm run build
```

Di frontend (`client/`) bila perlu:

```bash
npm run type-check
npm run lint
npm run build
```

## Definition of Done

- Semua item High selesai dan lolos verifikasi.
- Command quality gate root stabil dan konsisten.
- Tidak ada regresi pada flow kritikal (login, health, endpoint utama).
- Dokumen diperbarui sesuai hasil implementasi.

## Output Setelah Eksekusi

- Update `AUDIT_REPORT.md` (status temuan: Open -> In Progress -> Resolved)
- Update `AUDIT_FIX_PLAN.md` (task checklist + tanggal selesai)
- Update `README.md` jika ada perubahan setup/command
