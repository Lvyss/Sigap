Oke bro, ini Summary Step 2!

---

## 📋 Step 2 Summary — Struktur Data Statis (JSON Fasilitas)

**Tanggal:** 4 Juli 2026
**Proyek:** SIGAP — Sistem Informasi Geografis dan Potensi Desa Sidomukti

---

### ✅ Apa yang Dikerjakan

Menyiapkan file data master seluruh fasilitas desa dalam format statis (JS module), beserta konfigurasi peta.

**Rincian:**
- Membuat `src/data/fasilitas.js` — berisi objek `KATEGORI` dan array `fasilitas` lengkap dengan 18 titik fasilitas dari peta fisik
- Membuat `src/data/mapConfig.js` — berisi konfigurasi center, zoom, dan tile layer peta
- Menambahkan 2 helper function: `getFasilitasByKategori()` dan `getKategoriTerpakai()`

---

### 🗂️ Struktur Data per Fasilitas

Setiap objek fasilitas memiliki field:

| Field | Tipe | Keterangan |
|---|---|---|
| `id` | Number | ID unik fasilitas |
| `nama` | String | Nama fasilitas |
| `kategori` | String | Mengacu ke `id` di objek `KATEGORI` |
| `koordinat` | `[lat, lng]` | Posisi GPS (sementara: estimasi) |
| `deskripsi` | String | Deskripsi lengkap (buat modal detail) |
| `foto` | Array | Path foto (buat galeri di modal) |
| `infoSingkat` | String | Satu baris info (buat popup level 1) |

---

### 🎨 Kategori & Warna Marker

| Kategori | Warna | Jumlah Titik |
|---|---|---|
| Pemerintahan | 🔵 Biru tua | 2 |
| Pendidikan | 🟡 Kuning | 4 |
| Tempat Ibadah | 🟢 Hijau | 1 |
| Wisata | 🩵 Cyan | 1 |
| Pemakaman | ⚫ Abu | 2 |
| Peternakan | 🟠 Oranye | 4 |
| Infrastruktur | 🟣 Ungu | 3 |
| Ekonomi | 🩷 Pink | 1 |
| **Total** | | **18 titik** |

---

### 🧠 Keputusan Teknis

| Keputusan | Alasan |
|---|---|
| JS module (bukan `.json`) | Bisa langsung export fungsi helper, lebih fleksibel |
| `KATEGORI` sebagai objek terpisah | Single source of truth untuk warna & label — dipakai di marker, legenda, dan filter sekaligus |
| Helper function disertakan di file yang sama | Lokasi logika dekat dengan datanya, mudah di-import |
| Path foto pakai `/foto/...` (public folder) | Simpel, no build process, tinggal taruh file di `public/foto/` |

---

### ⚠️ Status Data

> **🚧 DATA DUMMY / ESTIMASI**
> Koordinat seluruh fasilitas masih berupa perkiraan visual dari foto peta fisik. **Wajib diupdate dengan koordinat GPS asli** sebelum deployment final.
>
> Foto juga belum tersedia — path sudah disiapkan, tinggal isi folder `public/foto/` saat foto sudah dikumpulkan dari lapangan.

---

**Status: ✅ SELESAI (data dummy) — Siap lanjut ke Step 3 (Komponen Peta Dasar)**

---

Kalau mau gas Step 3, bilang aja bro! Nanti aku arahin build komponen `MapView` + tile layer OSM + SSR fix-nya 🗺️