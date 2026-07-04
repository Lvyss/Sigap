---

## 📋 Step 1 Summary — Project Setup

**Tanggal:** 4 Juli 2026
**Proyek:** SIGAP — Sistem Informasi Geografis dan Potensi Desa Sidomukti

---

### ✅ Apa yang Dikerjakan

Setup fondasi project dari nol — mulai dari inisialisasi Next.js sampai struktur folder siap pakai untuk development selanjutnya.

**Rincian:**
- Inisialisasi project Next.js dengan App Router via `create-next-app`
- Konfigurasi Tailwind CSS (built-in saat setup)
- Install library peta: `leaflet` + `react-leaflet`
- Install `lucide-react` untuk keperluan ikon marker kategori
- Import `leaflet/dist/leaflet.css` di `layout.js` agar styling peta bawaan Leaflet aktif
- Membuat struktur folder modular: `components/map`, `components/panel`, `components/ui`, `data/`, `lib/`

---

### 🧠 Keputusan Teknis

| Keputusan | Alasan |
|---|---|
| Pakai JavaScript (bukan TypeScript) | Simpel, cepat iterasi, cocok untuk scope KKN dan tim non-TS |
| App Router (Next.js 14+) | Standar modern Next.js, lebih fleksibel untuk layout dan routing |
| Data statis (JSON lokal) | Data fasilitas desa sudah final, tidak butuh backend/database |
| Leaflet via react-leaflet | Free, open-source, ringan, tile OSM tanpa API key berbayar |
| Struktur folder modular | Pisahkan concern antar komponen dari awal supaya scalable |

---

### ⚠️ Catatan Penting (Technical Gotcha)

> **Leaflet tidak support SSR.**
> Leaflet mengakses `window` object yang hanya ada di browser. Di Next.js (App Router), komponen peta **wajib** di-wrap dengan `dynamic import` + `{ ssr: false }` agar tidak crash saat server-side rendering.
>
> Ini akan diimplementasikan saat Step 3 (build komponen peta).

---

### 🚧 Kendala

Tidak ada kendala signifikan di step ini. Potensi masalah umum yang perlu diwaspadai:
- Versi konflik antara `react-leaflet` dan `leaflet` → pastikan keduanya kompatibel (react-leaflet v4+ untuk React 18+)
- CSS Leaflet tidak di-import → marker ikon tidak muncul (symptom: peta tampil tapi marker broken)

---

### 📦 Dependency Terpasang

```
next, react, react-dom     → framework utama
tailwindcss                → styling
leaflet                    → library peta core
react-leaflet              → wrapper React untuk Leaflet
lucide-react               → ikon UI & marker kategori
```

---

**Status: ✅ SELESAI — Siap lanjut ke Step 2 (Struktur Data JSON Fasilitas)**

---

Kabarin kalau mau gas Step 2 ya bro, nanti aku susunin struktur JSON-nya berdasarkan daftar fasilitas dari peta fisik yang udah aku baca tadi 🗺️