# SIGAP — Sistem Informasi Geografis dan Potensi Desa
## Project Summary (Framework: Role – Context – Constraint – Chaining)

---

## 1. ROLE

Kamu adalah seorang **Frontend Developer & UI/UX Designer** yang berpengalaman membangun aplikasi peta interaktif berbasis web (web-based interactive mapping application). Kamu paham cara mengintegrasikan library peta (Leaflet/React-Leaflet) dengan framework modern (Next.js) untuk menghasilkan produk yang ringan, cepat, dan ramah pengguna awam — khususnya warga desa yang mungkin belum terbiasa dengan aplikasi digital kompleks.

Proyek ini adalah bagian dari program kerja (proker) KKN bertema **SIGAP (Sistem Informasi Geografis dan Potensi Desa)**, untuk Desa Sidomukti, Kecamatan Bener, Kabupaten Purworejo, Jawa Tengah. Proyek terdiri dari dua bagian:
1. **Peta fisik** (sudah didesain, akan dipasang di dekat Balai Desa) — berisi QR code yang mengarah ke versi web.
2. **Peta digital/web** — versi interaktif dari peta fisik tersebut, yang menjadi fokus pengembangan saat ini.

---

## 2. CONTEXT

### Tujuan
Membuat website peta interaktif desa yang menampilkan seluruh fasilitas umum, batas wilayah, dan potensi desa Sidomukti secara visual dan informatif, sebagai pelengkap digital dari peta fisik yang akan dipasang di Balai Desa.

### Teknologi & Tools
| Komponen | Teknologi |
|---|---|
| Framework | **Next.js** (App Router) |
| Styling | **Tailwind CSS** |
| Library Peta | **Leaflet.js** via **react-leaflet** |
| Tile Layer | OpenStreetMap (gratis, tanpa API key berbayar) |
| Data | **Statis** (JSON/JS object lokal — tidak menggunakan database, karena data fasilitas desa sudah final) |
| Geolocation | Browser Geolocation API (native) |
| Hosting (rekomendasi) | Vercel/Netlify (otomatis HTTPS, dibutuhkan agar fitur lokasi berfungsi) |

### Referensi Desain
Mengacu pada peta fisik "Peta Administrasi Desa Sidomukti" yang sudah ada, dengan elemen:
- Legenda simbol (Batas Desa, Jalan, Sungai, Batas Kecamatan, Batas Kabupaten)
- Daftar fasilitas umum terkategori (Pendidikan, Tempat Ibadah, Pemerintahan, Wisata/Kolam, Peternakan, dll)
- Foto-foto thumbnail tiap fasilitas di sekeliling peta

### Target Pengguna
Warga desa awam dan pengunjung yang men-scan QR code dari peta fisik. UI/UX harus **sederhana, intuitif, dan minim friksi** — hindari interaksi yang membingungkan pengguna non-teknis.

---

## 3. CONSTRAINT

### Pendekatan & Teknik Penyelesaian
1. **Layout Split View (Desktop)**
   - Kiri: peta interaktif full-height
   - Kanan: panel informasi berisi:
     - Header judul (nama desa, kecamatan, kabupaten)
     - Legenda simbol (kotak warna sesuai kategori)
     - Daftar fasilitas terstruktur per kategori, setiap item **clickable** → trigger `flyTo()` di peta menuju titik terkait

2. **Mode Fullscreen pada Peta**
   - Tombol expand/collapse di pojok peta
   - Saat fullscreen aktif, panel kanan disembunyikan sementara, peta menggunakan lebar penuh

3. **Marker & Popup Interaktif (2 Level)**
   - Level 1 (ringan): klik/hover marker → popup kecil muncul (nama fasilitas + ikon kategori + 1 baris info singkat)
   - Level 2 (detail): klik tombol "Lihat Detail" di popup → buka modal/drawer berisi galeri foto, deskripsi lengkap, dan informasi tambahan lain
   - Ikon marker dibedakan **per kategori** (warna/bentuk berbeda) agar konsisten secara visual dengan legenda di panel kanan

4. **Fitur Lokasi Pengguna (GPS)**
   - Tombol floating "lokasi saya" (ikon crosshair/target) di pojok peta
   - **Tidak otomatis aktif** saat halaman dibuka (hindari prompt izin lokasi paksa) — hanya aktif saat tombol ditekan
   - Bersifat pasif: hanya menampilkan titik "Anda di sini", **tanpa** fitur rute/navigasi (out of scope untuk versi awal)

5. **Fitur Tambahan untuk UX**
   - Search bar atau filter kategori (checkbox) untuk fasilitas — penting jika titik fasilitas berjumlah banyak
   - Loading state saat tile peta dimuat
   - Responsive design: di mobile, panel kanan berubah menjadi **bottom sheet** yang bisa di-swipe, sementara peta tetap dominan di layar

6. **Data Bersifat Statis**
   - Semua data fasilitas (nama, kategori, koordinat, deskripsi, foto) disimpan dalam file JSON/JS lokal di dalam project — tidak perlu backend atau database, karena data sudah final dan tidak sering berubah

7. **Non-Goal (di luar scope versi ini)**
   - Tidak ada fitur rute/navigasi (routing engine seperti OSRM)
   - Tidak ada garis penghubung literal (polyline) dari marker ke info — diganti dengan marker + popup standar
   - Tidak ada sistem login/autentikasi
   - Tidak ada CMS/dashboard admin untuk update data (karena data statis)

---

## 4. CHAINING (Pemecahan Tugas)

| Tahap | Tugas | Output |
|---|---|---|
| **Step 1** | Setup project Next.js + Tailwind, install dependency (`react-leaflet`, `leaflet`) | Project skeleton siap jalan |
| **Step 2** | Siapkan struktur data statis (JSON) untuk seluruh titik fasilitas (nama, kategori, koordinat, deskripsi, path foto) | File data master |
| **Step 3** | Bangun komponen peta dasar (Leaflet map + tile layer OSM, set batas/zoom awal sesuai area Desa Sidomukti) | Peta dasar tampil |
| **Step 4** | Tambahkan marker custom per kategori + popup level 1 (info singkat) | Marker & popup ringan berfungsi |
| **Step 5** | Bangun modal/drawer detail (popup level 2) dengan galeri foto & deskripsi lengkap | Detail fasilitas bisa diakses |
| **Step 6** | Bangun panel kanan (legenda + daftar fasilitas terstruktur per kategori) dan hubungkan interaksi klik-list → `flyTo()` marker | Panel kanan interaktif & terhubung ke peta |
| **Step 7** | Implementasi fitur fullscreen pada peta (toggle show/hide panel kanan) | Mode fullscreen berfungsi |
| **Step 8** | Implementasi fitur lokasi pengguna (tombol GPS pasif, titik "Anda di sini") | Fitur lokasi berfungsi |
| **Step 9** | Tambahkan fitur pelengkap UX: search/filter kategori, loading state, empty state | UX lebih matang |
| **Step 10** | Responsive adjustment (mobile: bottom sheet, tablet: proporsi split disesuaikan) | Tampilan optimal di semua device |
| **Step 11** | Polish visual akhir (transisi halus, micro-interaction, konsistensi warna/tipografi mengikuti identitas peta fisik) | UI siap pakai, estetik & nyaman |
| **Step 12** | Testing & deployment (Vercel/Netlify dengan HTTPS aktif) | Website live & bisa diakses via QR code |

> **Catatan khusus:** Setiap kali satu *step* di atas selesai dikerjakan, **buatkan dokumentasi ringkas (summary) untuk step tersebut secara otomatis** — berisi apa yang dikerjakan, keputusan teknis yang diambil, dan kendala (jika ada). Dokumentasi per step ini berguna sebagai bahan laporan KKN dan tracking progres proyek.

---

## Catatan Tambahan
- Prioritaskan fungsionalitas inti (Step 1–8) terlebih dahulu sebelum masuk ke polish (Step 9–11), supaya ada versi yang bisa didemokan lebih awal.
- Fitur rute/navigasi GPS bisa menjadi pengembangan lanjutan (future development) jika waktu KKN masih memungkinkan.
