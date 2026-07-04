// src/data/fasilitas.js

export const KATEGORI = {
  PEMERINTAHAN: {
    id: 'pemerintahan',
    label: 'Pemerintahan',
    warna: '#1D4ED8',   // biru tua
    icon: 'building-2',
  },
  PENDIDIKAN: {
    id: 'pendidikan',
    label: 'Pendidikan',
    warna: '#F59E0B',   // kuning
    icon: 'graduation-cap',
  },
  IBADAH: {
    id: 'ibadah',
    label: 'Tempat Ibadah',
    warna: '#10B981',   // hijau
    icon: 'mosque',
  },
  WISATA: {
    id: 'wisata',
    label: 'Wisata',
    warna: '#06B6D4',   // cyan
    icon: 'tree-pine',
  },
  PEMAKAMAN: {
    id: 'pemakaman',
    label: 'Pemakaman',
    warna: '#6B7280',   // abu
    icon: 'cross',
  },
  PETERNAKAN: {
    id: 'peternakan',
    label: 'Peternakan',
    warna: '#F97316',   // oranye
    icon: 'beef',
  },
  INFRASTRUKTUR: {
    id: 'infrastruktur',
    label: 'Infrastruktur',
    warna: '#8B5CF6',   // ungu
    icon: 'wrench',
  },
  EKONOMI: {
    id: 'ekonomi',
    label: 'Ekonomi',
    warna: '#EC4899',   // pink
    icon: 'store',
  },
};

export const fasilitas = [

  // ─── PEMERINTAHAN ───────────────────────────────────────
  {
    id: 1,
    nama: 'Balai Desa Sidomukti',
    kategori: 'pemerintahan',
    koordinat: [-7.5621, 110.2187],
    deskripsi: 'Pusat pemerintahan Desa Sidomukti, tempat pelayanan administrasi warga dan kegiatan desa.',
    foto: ['images/1.png'],
    infoSingkat: 'Pusat administrasi desa',
  },
  {
    id: 2,
    nama: 'Gapura Sidomukti',
    kategori: 'pemerintahan',
    koordinat: [-7.5598, 110.2201],
    deskripsi: 'Gapura selamat datang pintu masuk utama Desa Sidomukti.',
    foto: ['images/1.png'],
    infoSingkat: 'Pintu masuk utama desa',
  },

  // ─── PENDIDIKAN ─────────────────────────────────────────
  {
    id: 3,
    nama: 'SDN 1 Sidomukti',
    kategori: 'pendidikan',
    koordinat: [-7.5635, 110.2175],
    deskripsi: 'Sekolah Dasar Negeri 1 Sidomukti, melayani pendidikan dasar warga desa.',
    foto: ['images/1.png'],
    infoSingkat: 'Sekolah Dasar Negeri',
  },
  {
    id: 4,
    nama: 'MTS Sidomukti',
    kategori: 'pendidikan',
    koordinat: [-7.5648, 110.2163],
    deskripsi: 'Madrasah Tsanawiyah Sidomukti, jenjang pendidikan setingkat SMP berbasis Islam.',
    foto: ['images/1.png'],
    infoSingkat: 'Madrasah Tsanawiyah (setara SMP)',
  },
  {
    id: 5,
    nama: 'TK Setia Bumi Desa Sidomukti',
    kategori: 'pendidikan',
    koordinat: [-7.5612, 110.2193],
    deskripsi: 'Taman Kanak-Kanak Setia Bumi, layanan pendidikan anak usia dini di Desa Sidomukti.',
    foto: ['images/1.png'],
    infoSingkat: 'Taman Kanak-Kanak',
  },
  {
    id: 6,
    nama: 'TPQ Desa Sidomukti',
    kategori: 'pendidikan',
    koordinat: [-7.5659, 110.2179],
    deskripsi: 'Taman Pendidikan Al-Quran Desa Sidomukti, tempat belajar mengaji untuk anak-anak.',
    foto: ['images/1.png'],
    infoSingkat: 'Taman Pendidikan Al-Quran',
  },

  // ─── TEMPAT IBADAH ──────────────────────────────────────
  {
    id: 7,
    nama: 'Masjid Al-Mahsyuri',
    kategori: 'ibadah',
    koordinat: [-7.5627, 110.2168],
    deskripsi: 'Masjid utama Desa Sidomukti, pusat kegiatan keagamaan dan sosial warga.',
    foto: ['images/1.png'],
    infoSingkat: 'Masjid utama desa',
  },

  // ─── WISATA ─────────────────────────────────────────────
  {
    id: 8,
    nama: 'Cibion Park',
    kategori: 'wisata',
    koordinat: [-7.5671, 110.2204],
    deskripsi: 'Destinasi wisata kolam renang dan taman rekreasi keluarga di Desa Sidomukti.',
    foto: ['images/1.png'],
    infoSingkat: 'Wisata kolam & taman rekreasi',
  },

  // ─── PEMAKAMAN ──────────────────────────────────────────
  {
    id: 9,
    nama: 'Makam RW 1',
    kategori: 'pemakaman',
    koordinat: [-7.5608, 110.2158],
    deskripsi: 'Area pemakaman umum warga RW 1 Desa Sidomukti.',
    foto: ['images/1.png'],
    infoSingkat: 'Pemakaman umum RW 1',
  },
  {
    id: 10,
    nama: 'Makam RW 2',
    kategori: 'pemakaman',
    koordinat: [-7.5643, 110.2215],
    deskripsi: 'Area pemakaman umum warga RW 2 Desa Sidomukti.',
    foto: ['images/1.png'],
    infoSingkat: 'Pemakaman umum RW 2',
  },

  // ─── PETERNAKAN ─────────────────────────────────────────
  {
    id: 11,
    nama: 'Peternakan Bebek',
    kategori: 'peternakan',
    koordinat: [-7.5683, 110.2171],
    deskripsi: 'Sentra peternakan bebek milik warga Desa Sidomukti.',
    foto: ['images/1.png'],
    infoSingkat: 'Peternakan bebek warga',
  },
  {
    id: 12,
    nama: 'Peternakan Ayam',
    kategori: 'peternakan',
    koordinat: [-7.5595, 110.2219],
    deskripsi: 'Sentra peternakan ayam milik warga Desa Sidomukti.',
    foto: ['images/1.png'],
    infoSingkat: 'Peternakan ayam warga',
  },
  {
    id: 13,
    nama: 'Kandang PBH Jamal',
    kategori: 'peternakan',
    koordinat: [-7.5667, 110.2196],
    deskripsi: 'Kandang pemeliharaan hewan milik Pak Jamal, salah satu sentra peternakan desa.',
    foto: ['images/1.png'],
    infoSingkat: 'Kandang peternakan hewan',
  },
  {
    id: 14,
    nama: 'Kelompok Tani',
    kategori: 'peternakan',
    koordinat: [-7.5656, 110.2209],
    deskripsi: 'Lokasi kegiatan Kelompok Tani Desa Sidomukti, pusat koordinasi pertanian dan peternakan warga.',
    foto: ['images/1.png'],
    infoSingkat: 'Pusat kegiatan kelompok tani',
  },

  // ─── INFRASTRUKTUR ──────────────────────────────────────
  {
    id: 15,
    nama: 'Pam Simas',
    kategori: 'infrastruktur',
    koordinat: [-7.5616, 110.2181],
    deskripsi: 'Instalasi Penyediaan Air Minum Siap Saji (SIMAS) untuk warga Desa Sidomukti.',
    foto: ['images/1.png'],
    infoSingkat: 'Instalasi air minum warga',
  },
  {
    id: 16,
    nama: 'Perhutani',
    kategori: 'infrastruktur',
    koordinat: [-7.5589, 110.2162],
    deskripsi: 'Area kelola Perum Perhutani yang berbatasan dengan wilayah Desa Sidomukti.',
    foto: ['images/1.png'],
    infoSingkat: 'Area kelola Perhutani',
  },
  {
    id: 17,
    nama: 'Lapangan Voli',
    kategori: 'infrastruktur',
    koordinat: [-7.5633, 110.2197],
    deskripsi: 'Lapangan voli desa, sarana olahraga dan aktivitas warga Sidomukti.',
    foto: ['images/1.png'],
    infoSingkat: 'Lapangan olahraga voli',
  },

  // ─── EKONOMI ────────────────────────────────────────────
  {
    id: 18,
    nama: 'Koperasi Mersih Putih Sidomukti',
    kategori: 'ekonomi',
    koordinat: [-7.5641, 110.2188],
    deskripsi: 'Koperasi milik warga Desa Sidomukti, bergerak di bidang simpan pinjam dan usaha bersama.',
    foto: ['images/1.png'],
    infoSingkat: 'Koperasi simpan pinjam desa',
  },

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