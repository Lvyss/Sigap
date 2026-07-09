// src/data/fasilitas.js

export const KATEGORI = {
  UMKM: {
    id: 'umkm',
    label: 'Potensi UMKM',
    warna: '#F59E0B',
    icon: 'store',
  },
  PANTAI: {
    id: 'pantai',
    label: 'Potensi Pantai',
    warna: '#06B6D4',
    icon: 'waves',
  },
  FASILITAS: {
    id: 'fasilitas',
    label: 'Fasilitas Umum',
    warna: '#1D4ED8',
    icon: 'building-2',
  },
  BUDAYA: {
    id: 'budaya',
    label: 'Budaya & Kearifan Lokal',
    warna: '#92400E',
    icon: 'landmark',
  },
  SDA: {
    id: 'sda',
    label: 'Potensi SDA',
    warna: '#10B981',
    icon: 'tree-pine',
  },
};

export const fasilitas = [

  // ─── FASILITAS UMUM ─────────────────────────────────────
  {
    id: 1,
    nama: 'Pemandian Umum Plandaan',
    kategori: 'fasilitas',
    koordinat: [-8.246040, 111.909295],
    deskripsi: 'Tempat pemandian umum yang sering digunakan warga sekitar terutama saat mati air. Berlokasi di Dusun Plandaan.',
    foto: ['images/1.png'],
    infoSingkat: 'Pemandian umum warga Dusun Plandaan',
    dusun: 'Plandaan',
    tanggalSurvei: '27 Juni 2026',
    surveyor: 'Fatimah Azzahro & Rindi Puspita Sari',
  },
  {
    id: 2,
    nama: 'Sumber PDAM',
    kategori: 'fasilitas',
    koordinat: [-8.268993, 111.898221],
    deskripsi: 'Sumber air PDAM yang melayani 2 dusun yaitu Dusun Sumber dan Dusun Jengglung. Berlokasi di Dusun Sumber.',
    foto: ['images/1.png'],
    infoSingkat: 'Sumber air PDAM 2 dusun',
    dusun: 'Sumber',
    tanggalSurvei: '27 Juni 2026',
    surveyor: 'Fatimah Azzahro & Rindi Puspita Sari',
  },
  {
    id: 3,
    nama: 'Pemandian Umum Sumur Bor',
    kategori: 'fasilitas',
    koordinat: [-8.244250, 111.902231],
    deskripsi: 'Pemandian umum dengan sumur bor yang disumbangkan oleh Yayasan Yesus Kristus untuk warga Dusun Plandaan.',
    foto: ['images/1.png'],
    infoSingkat: 'Pemandian sumur bor, sumbangan yayasan',
    dusun: 'Plandaan',
    tanggalSurvei: '27 Juni 2026',
    surveyor: 'Fatimah Azzahro & Rindi Puspita Sari',
  },

  // ─── POTENSI PANTAI ─────────────────────────────────────
  {
    id: 4,
    nama: 'Pantai Sanggar',
    kategori: 'pantai',
    koordinat: [-8.297525, 111.910153],
    deskripsi: 'Pantai indah dengan pasir putih lembut dan air jernih, berlokasi di Dusun Ngelo. Salah satu destinasi wisata unggulan desa.',
    foto: ['images/1.png'],
    infoSingkat: 'Pantai pasir putih, air jernih',
    dusun: 'Ngelo',
    tanggalSurvei: '2 Juli 2026',
    surveyor: 'Rindi Puspita, Fatimah Azzahro, Ima Artha Gultom & Eka Nanda',
  },
  {
    id: 5,
    nama: 'Pantai Patuk Gebang',
    kategori: 'pantai',
    koordinat: [-8.301403, 111.902059],
    deskripsi: 'Pantai indah dengan pasir putih lembut dan air jernih, berlokasi di Dusun Ngelo.',
    foto: ['images/1.png'],
    infoSingkat: 'Pantai pasir putih, pemandangan indah',
    dusun: 'Ngelo',
    tanggalSurvei: '2 Juli 2026',
    surveyor: 'Rindi Puspita, Fatimah Azzahro, Ima Artha Gultom & Eka Nanda',
  },
    {
    id: 6,
    nama: 'Pantai Ngalur',
    kategori: 'pantai',
    koordinat: [-8.297525, 111.916303],
    deskripsi: 'Pantai indah yang tersembunyi di antara tebing tinggi, menyajikan view yang menyegarkan mata. Berlokasi di Dusun Ngelo.',
    foto: ['images/1.png'],
    infoSingkat: 'Pantai tersembunyi di antara tebing',
    dusun: 'Ngelo',
    tanggalSurvei: '2 Juli 2026',
    surveyor: 'Rindi Puspita, Fatimah Azzahro, Ima Artha Gultom & Eka Nanda',
  },

  // ─── POTENSI SDA ────────────────────────────────────────

  {
    id: 7,
    nama: 'Kebun Pisang',
    kategori: 'sda',
    koordinat: [-8.285198, 111.925261],
    deskripsi: 'Kebun pisang yang berada di Dusun Ngelo. Pisang menjadi salah satu komoditas dominan di Desa Jengglungharjo.',
    foto: ['images/1.png'],
    infoSingkat: 'Komoditas pisang dominan desa',
    dusun: 'Ngelo',
    tanggalSurvei: '6 Juli 2026',
    surveyor: 'Rindi Puspita, Fatimah Azzahro & Ima Artha Gultom',
  },
  {
    id: 8,
    nama: 'Kebun Alpukat',
    kategori: 'sda',
    koordinat: [-8.284869, 111.928465],
    deskripsi: 'Alpukat menjadi komoditas kedua terbesar bagi masyarakat Desa Jengglungharjo. Berlokasi di Dusun Ngelo.',
    foto: ['images/1.png'],
    infoSingkat: 'Komoditas alpukat terbesar kedua',
    dusun: 'Ngelo',
    tanggalSurvei: '6 Juli 2026',
    surveyor: 'Rindi Puspita, Fatimah Azzahro & Ima Artha Gultom',
  },
  {
    id: 9,
    nama: 'Kebun Karet',
    kategori: 'sda',
    koordinat: [-8.293250, 111.927000],
    deskripsi: 'Komoditas terbesar ketiga desa. Kebun karet sangat cocok untuk penghijauan hutan lindung karena pohonnya mampu menahan erosi, menjaga cadangan air, sekaligus bernilai ekonomi tinggi.',
    foto: ['images/1.png'],
    infoSingkat: 'Komoditas karet, bernilai ekonomi tinggi',
    dusun: 'Ngelo',
    tanggalSurvei: '6 Juli 2026',
    surveyor: 'Rindi Puspita, Fatimah Azzahro & Ima Artha Gultom',
  },

  // ─── POTENSI UMKM ───────────────────────────────────────
  // 🚧 Data belum tersedia — tunggu hasil survei lapangan

  // ─── BUDAYA & KEARIFAN LOKAL ────────────────────────────
  // 🚧 Data belum tersedia — tunggu hasil survei lapangan

];

// Helper: ambil fasilitas berdasarkan kategori
export const getFasilitasByKategori = (kategoriId) =>
  fasilitas.filter((f) => f.kategori === kategoriId);

// Helper: ambil semua kategori yang terpakai
export const getKategoriTerpakai = () => {
  const ids = [...new Set(fasilitas.map((f) => f.kategori))];
  return ids.map((id) =>
    Object.values(KATEGORI).find((k) => k.id === id)
  ).filter(Boolean);
};