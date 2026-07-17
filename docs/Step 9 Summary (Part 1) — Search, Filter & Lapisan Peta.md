## 📋 Step 9 Summary (Part 1) — Search, Filter & Lapisan Peta

**Tanggal:** 9 Juli 2026
**Proyek:** SIGAP — Sistem Informasi Geografis dan Potensi Desa Sidomukti

---

### ✅ Apa yang Dikerjakan (Part 1)

**A. Search & Filter Fasilitas**
- Membuat `src/components/panel/SearchBar.jsx` — input pencarian realtime dengan tombol clear
- Update `DaftarFasilitas.jsx` — integrasi search query + highlight teks hasil pencarian per warna kategori + empty state `SearchX`
- Update `PanelKanan.jsx` — filter kategori pindah ke tab Fasilitas sebagai chip, tab Legenda jadi murni simbol garis
- Update `Legenda.jsx` — isi diganti simbol garis peta administrasi (Batas Desa, Jalan, Sungai, dll) sesuai peta fisik
- Fix bug `setState during render` — pindah `onFilterChange` ke `useEffect`
- Sambungkan filter kategori ke marker di peta via `aktifFilter` props

**B. Lapisan Peta (Jalan, Sungai, Mask)**
- Ganti tile layer ke **Esri World Imagery** (satelit, Google Earth look)
- Implementasi `DesaMask.jsx` — inverse polygon mask, area luar desa redup
- Implementasi `GarisBatas.jsx` — garis putih dashed batas desa
- Implementasi `LapisanJalan.jsx` — garis jalan dari GeoJSON OSM, warna merah per tipe highway
- Implementasi `LapisanSungai.jsx` — garis sungai dari GeoJSON OSM, warna biru per tipe waterway
- Buat `src/lib/geoClip.js` — helper clip garis jalan/sungai ke dalam batas desa (ray casting algorithm, tanpa library eksternal)

---

### 🧠 Keputusan Teknis

| Keputusan | Alasan |
|---|---|
| Esri World Imagery (bukan OSM) | Tampilan satelit Google Earth look, gratis tanpa API key |
| Inverse mask (bukan clip tile) | Lebih simpel — polygon raksasa dengan lubang berbentuk desa |
| Ray casting manual (tanpa turf) | `@turf/line-clip` tidak tersedia di npm, `turf.intersect` tidak support LineString |
| Filter chip di tab Fasilitas | Lebih intuitif — filter dan daftar dalam satu tempat |
| Legenda tab jadi simbol garis | Sesuai konvensi peta administrasi fisik yang sudah ada |
| `clipFeaturesToPolygon` di `geoClip.js` | Reusable — dipakai di jalan dan sungai sekaligus |
| Urutan layer: Sungai → Jalan → Mask → Batas → Marker | Layer bawah tidak nutupin layer atas yang lebih penting |

---

### 📁 File yang Dibuat / Diubah

| File | Status |
|---|---|
| `src/components/panel/SearchBar.jsx` | 🆕 Baru |
| `src/components/panel/DaftarFasilitas.jsx` | ✏️ Diubah |
| `src/components/panel/PanelKanan.jsx` | ✏️ Diubah |
| `src/components/panel/Legenda.jsx` | ✏️ Diubah |
| `src/components/map/DesaMask.jsx` | 🆕 Baru |
| `src/components/map/GarisBatas.jsx` | 🆕 Baru |
| `src/components/map/LapisanJalan.jsx` | 🆕 Baru |
| `src/components/map/LapisanSungai.jsx` | 🆕 Baru |
| `src/lib/geoClip.js` | 🆕 Baru |
| `src/data/mapConfig.js` | ✏️ Diubah |
| `src/components/map/MapView.jsx` | ✏️ Diubah |
| `public/geojson/sidomukti.geojson` | 🆕 Baru |
| `public/geojson/jalan.geojson` | 🆕 Baru |
| `public/geojson/sungai.geojson` | 🆕 Baru |

---

### 🐛 Bug yang Ditemukan & Diselesaikan

| Bug | Penyebab | Fix |
|---|---|---|
| `setState during render` di PanelKanan | `onFilterChange` dipanggil langsung saat render | Pindah ke `useEffect([aktifFilter])` |
| `aktifFilter is not defined` di MapView | Props tidak di-destructure | Tambah `aktifFilter` di props MapView |
| `turf.lineClip` tidak ada | Versi turf tidak include fungsi ini | Ganti dengan ray casting manual di `geoClip.js` |
| Jalan & sungai keluar batas desa | Data OSM tidak terbatas batas desa | Clip manual dengan `pointInPolygon` |
| `DesaMask` error koordinat tidak valid | GeoJSON batas desa bertipe LineString bukan Polygon | Konversi LineString → Polygon ring di kode |

---

### 🚧 Status & Yang Belum Selesai (Lanjut Part 2)

| Fitur | Status |
|---|---|
| Search bar realtime | ✅ |
| Filter kategori chip | ✅ |
| Highlight teks pencarian | ✅ |
| Legenda simbol garis | ✅ |
| Tile satelit Esri | ✅ |
| Mask area luar desa | ✅ |
| Garis batas desa | ✅ |
| Lapisan jalan (clip dalam desa) | ✅ |
| Lapisan sungai (clip dalam desa) | ✅ |
| Warna jalan per tipe highway | 🔄 Sedang disesuaikan |
| Responsive mobile (bottom sheet) | 🔜 Part 2 / Step 10 |
| Polish visual akhir | 🔜 Step 11 |

---

**Status: 🔄 IN PROGRESS — Lanjut Part 2 (Step 10 Responsive Mobile) saat siap!**