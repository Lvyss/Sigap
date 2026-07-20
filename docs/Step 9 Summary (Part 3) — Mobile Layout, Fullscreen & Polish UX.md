## 📋 Step 9 Summary (Part 3) — Mobile Layout, Fullscreen & Polish UX

**Tanggal:** 20 Juli 2026
**Proyek:** SIGAP — Sistem Informasi Geografis dan Potensi Desa Jengglungharjo

---

### ✅ Apa yang Dikerjakan (Part 3)

**A. Mobile Layout — Bottom Sheet**
- Membuat `src/components/panel/BottomSheet.jsx` — panel mobile dengan 2 state (HALF 45vh / FULL 88vh)
- Gesture swipe up/down untuk toggle state
- Data potensi langsung tampil dari awal (tidak ada state kosong)
- Filter chips horizontal scroll per kategori
- Grid 2 kolom item potensi
- Klik item → flyTo peta + sheet kembali ke HALF
- Legenda garis full width grid 3 kolom
- Kompas PNG + skala dinamis full width
- Mini map indeks di bawah list
- Bottom sheet hide smooth saat fullscreen aktif via `transform: translateY(100%)`

**B. Deteksi Device**
- Membuat `src/hooks/useIsMobile.js` — deteksi mobile via `window.innerWidth < 768` + resize listener
- Desktop → layout panel kanan seperti biasa
- Mobile → peta full + BottomSheet

**C. Fullscreen Mode Fix**
- Header navbar animasi smooth via `maxHeight` + `opacity` CSS transition
- Panel kanan animasi slide kanan via `transform + width` transition
- Fix glitch — hapus conditional render, ganti ke CSS transition murni
- `MapResizer.jsx` — `invalidateSize()` setelah transisi selesai (320ms delay)
- Bottom sheet hide saat fullscreen via `isFullscreen` prop + `translateY(100%)`

**D. FlyTo Fix**
- Fix bug flyTo tidak re-trigger saat klik item yang sama — reset `flyToTarget` ke `null` dulu lalu set ulang via `setTimeout(10ms)`
- `map.closePopup()` sebelum flyTo — popup lama tertutup sebelum pindah lokasi
- Mobile: `map.panBy([0, 150])` setelah `moveend` — marker tidak ketutupan bottom sheet

**E. Skala Dinamis Mobile**
- Pass `mapZoom` + `mapLat` ke `BottomSheet`
- Import `getScaleFromZoom` + `getScaleBar` dari `useMapScale.js`
- Label skala + bar update realtime saat zoom in/out di mobile

**F. Fix Viewport Mobile**
- Tambah `position: fixed` + `overflow: hidden` di `globals.css` untuk `html, body`
- Mencegah halaman bisa di-scroll di mobile

**G. UX Affordance**
- Pulse animation marker — `@keyframes sigap-pulse` di `globals.css`
- Hover state item panel — `hover:shadow-md hover:-translate-y-0.5 active:scale-95`
- Arrow `→` muncul saat hover item
- Hint tooltip "Klik marker untuk melihat info potensi" — auto dismiss 4 detik
- `cursor-pointer` di semua elemen clickable

---

### 🧠 Keputusan Teknis

| Keputusan | Alasan |
|---|---|
| 2 state bottom sheet (bukan 3) | 3 state membingungkan — state collapsed kosong tidak informatif |
| Data langsung tampil di HALF | User langsung lihat konten tanpa perlu tap dulu |
| `transform: translateY` untuk hide | `position: fixed` tidak bisa dibungkus div dengan `transform` — taruh langsung di elemen fixed |
| Reset `flyToTarget` ke null | `useEffect` tidak re-run kalau referensi objek sama — null reset paksa re-trigger |
| `map.panBy` setelah `moveend` | `paddingBottomRight` di `flyTo` tidak work — `panBy` lebih reliable untuk offset manual |
| `map.invalidateSize()` delay 320ms | Tunggu animasi CSS 300ms selesai dulu baru recalculate ukuran map |
| `position: fixed` di html/body | Mencegah viewport mobile bisa di-scroll keluar batas |
| `useIsMobile` hook | Single source of truth untuk deteksi device — dipakai di page.js untuk switch layout |

---

### 📁 File yang Dibuat / Diubah

| File | Status |
|---|---|
| `src/components/panel/BottomSheet.jsx` | 🆕 Baru |
| `src/hooks/useIsMobile.js` | 🆕 Baru |
| `src/components/map/FlyToHandler.jsx` | ✏️ Diubah |
| `src/components/map/MapResizer.jsx` | 🆕 Baru |
| `src/components/map/MapView.jsx` | ✏️ Diubah |
| `src/components/map/MapWrapper.jsx` | ✏️ Diubah |
| `src/app/page.js` | ✏️ Diubah |
| `src/app/globals.css` | ✏️ Diubah |

---

### 🐛 Bug yang Ditemukan & Diselesaikan

| Bug | Penyebab | Fix |
|---|---|---|
| BottomSheet langsung hide saat render | `transform` di parent div membuat `position: fixed` child jadi relatif ke parent | Taruh `transform` langsung di elemen fixed BottomSheet |
| FlyTo tidak re-trigger | `useEffect` tidak jalan kalau target reference sama | Reset `flyToTarget` null dulu lalu set ulang |
| Marker ketutupan bottom sheet | FlyTo center tepat di marker | `panBy([0, 150])` setelah moveend |
| Peta area putih saat fullscreen | Leaflet tidak tahu container resize | `invalidateSize()` 320ms setelah transisi |
| Viewport mobile bisa discroll | Tidak ada overflow hidden di root | `position: fixed + overflow: hidden` di html/body |
| Skala mobile hardcoded | Tidak pass `mapZoom` ke BottomSheet | Pass `mapZoom + mapLat` + import `getScaleFromZoom` |
| Popup tidak tutup saat pindah lokasi | Popup lama tetap terbuka | `map.closePopup()` sebelum flyTo |

---

### 🎨 Layout Final

**Desktop:**
```
┌─────────────────────────────────────────┐
│         Header full width               │
├──────────────────────────┬──────────────┤
│                          │ Kompas+Skala │
│                          │ Legenda      │
│    PETA (2/3)            │ Search       │
│                          │ Potensi      │
│  [🎯][⛶] floating btn   │ Sumber       │
│                          │ Mini Map     │
└──────────────────────────┴──────────────┘
```

**Mobile:**
```
┌─────────────────────┐
│ Header (tipis)      │
├─────────────────────┤
│                     │
│    PETA PENUH       │
│                     │
│ [📍 hint tooltip]   │
│ [🎯][⛶] floating   │
├─────────────────────┤
│ ══ Potensi Desa ══  │ ← HALF (45vh)
│ [🔍 search]         │
│ [chip][chip][chip]  │
│ [item][item]        │ ← scroll
│ Legenda • Kompas    │
│ [Mini Map]          │
└─────────────────────┘
```

---

**Status: ✅ SELESAI — Step 9 Complete (Part 1+2+3). Siap lanjut ke Step 10 (Testing & Deployment) atau Step 11 (Polish Visual Final)**