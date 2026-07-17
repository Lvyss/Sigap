export const KATEGORI = {
  UMKM: { id: 'umkm', label: 'Potensi UMKM', warna: '#F59E0B' },
  PANTAI: { id: 'pantai', label: 'Potensi Pantai', warna: '#06B6D4' },
  FASILITAS: { id: 'fasilitas', label: 'Fasilitas Umum', warna: '#1D4ED8' },
  BUDAYA: { id: 'budaya', label: 'Budaya & Kearifan Lokal', warna: '#92400E' },
  SDA: { id: 'sda', label: 'Potensi SDA', warna: '#10B981' },
};

export const fasilitas = [

  // ─── FASILITAS UMUM ─────────────────────────────────────
  {
    id: 1,
    nama: 'Pemandian Umum Plandaan',
    kategori: 'fasilitas',
    koordinat: [-8.246040, 111.909295],
    deskripsi: 'Tempat pemandian umum yang sering digunakan warga sekitar terutama saat mati air. Berlokasi di Dusun Plandaan.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 2,
    nama: 'Sumber PDAM',
    kategori: 'fasilitas',
    koordinat: [-8.268993, 111.898221],
    deskripsi: 'Sumber air PDAM yang melayani 2 dusun yaitu Dusun Sumber dan Dusun Jengglung.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 3,
    nama: 'Pemandian Umum Sumur Bor',
    kategori: 'fasilitas',
    koordinat: [-8.244250, 111.902231],
    deskripsi: 'Pemandian umum dengan sumur bor yang disumbangkan oleh Yayasan Yesus Kristus untuk warga Dusun Plandaan.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },

  // ─── POTENSI PANTAI ─────────────────────────────────────
  {
    id: 4,
    nama: 'Pantai Sanggar',
    kategori: 'pantai',
    koordinat: [-8.297525, 111.910153],
    deskripsi: 'Pantai indah dengan pasir putih lembut dan air jernih, berlokasi di Dusun Ngelo. Salah satu destinasi wisata unggulan desa.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 5,
    nama: 'Pantai Patuk Gebang',
    kategori: 'pantai',
    koordinat: [-8.301403, 111.902059],
    deskripsi: 'Pantai indah dengan pasir putih lembut dan air jernih, berlokasi di Dusun Ngelo.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 6,
    nama: 'Pantai Ngalur',
    kategori: 'pantai',
    koordinat: [-8.297525, 111.916303],
    deskripsi: 'Pantai tersembunyi di antara tebing tinggi, menyajikan pemandangan yang menyegarkan mata.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },

  // ─── POTENSI SDA ────────────────────────────────────────
  {
    id: 7,
    nama: 'Kebun Pisang',
    kategori: 'sda',
    koordinat: [-8.285198, 111.925261],
    deskripsi: 'Kebun pisang yang berada di Dusun Ngelo. Pisang menjadi salah satu komoditas dominan di Desa Jengglungharjo.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 8,
    nama: 'Kebun Alpukat',
    kategori: 'sda',
    koordinat: [-8.284869, 111.928465],
    deskripsi: 'Alpukat menjadi komoditas kedua terbesar bagi masyarakat Desa Jengglungharjo.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 9,
    nama: 'Kebun Karet',
    kategori: 'sda',
    koordinat: [-8.293250, 111.927000],
    deskripsi: 'Komoditas terbesar ketiga desa. Kebun karet mampu menahan erosi, menjaga cadangan air, sekaligus bernilai ekonomi tinggi.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
];

export const getFasilitasByKategori = (kategoriId) =>
  fasilitas.filter((f) => f.kategori === kategoriId);

export const getKategoriTerpakai = () => {
  const ids = [...new Set(fasilitas.map((f) => f.kategori))];
  return ids.map((id) =>
    Object.values(KATEGORI).find((k) => k.id === id)
  ).filter(Boolean);
};