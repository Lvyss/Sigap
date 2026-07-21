// src/data/fasilitas.js

export const KATEGORI = {
  UMKM: { id: 'umkm', label: 'Potensi UMKM', warna: '#F59E0B' },
  PANTAI: { id: 'pantai', label: 'Potensi Pantai', warna: '#06B6D4' },
  FASILITAS: { id: 'fasilitas', label: 'Fasilitas Umum', warna: '#1D4ED8' },
  BUDAYA: { id: 'budaya', label: 'Budaya & Kearifan Lokal', warna: '#92400E' },
  SDA: { id: 'sda', label: 'Potensi SDA', warna: '#10B981' },
};

export const fasilitas = [

  // ─── POTENSI PANTAI ─────────────────────────────────────
  {
    id: 1,
    nama: 'Pantai Ngalur',
    kategori: 'pantai',
    koordinat: [-8.297525, 111.916303],
    deskripsi: 'Pantai indah yang tersembunyi di antara tebing tinggi, menyajikan pemandangan alam yang menyegarkan mata. Lokasinya yang tersembunyi menjadikan pantai ini surga tersendiri bagi pengunjung yang ingin menikmati ketenangan alam pesisir Desa Jengglungharjo.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 2,
    nama: 'Pantai Sanggar',
    kategori: 'pantai',
    koordinat: [-8.297525, 111.910153],
    deskripsi: 'Pantai indah dengan pasir putih lembut dan air yang jernih. Salah satu destinasi wisata unggulan Desa Jengglungharjo yang menawarkan keindahan alam pesisir yang memukau dan cocok untuk rekreasi keluarga.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 3,
    nama: 'Pantai Patok Gebang',
    kategori: 'pantai',
    koordinat: [-8.301403, 111.902059],
    deskripsi: 'Pantai dengan pasir putih lembut dan air jernih yang berlokasi di Dusun Ngelo. Menawarkan pemandangan alam yang indah dan suasana yang tenang, cocok untuk bersantai dan menikmati keindahan alam pantai selatan Jawa.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 4,
    nama: 'Pantai Jungpakis',
    kategori: 'pantai',
    koordinat: [-8.301386, 111.899073],
    deskripsi: 'Pantai dengan pasir putih lembut dan air yang jernih berlokasi di Dusun Ngelo. Menjadi salah satu potensi wisata alam yang menarik di Desa Jengglungharjo dengan pemandangan tebing dan laut yang memukau.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },

  // ─── POTENSI SDA ────────────────────────────────────────
  {
    id: 5,
    nama: 'Kebun Alpukat',
    kategori: 'sda',
    koordinat: [-8.284869, 111.928465],
    deskripsi: 'Alpukat menjadi komoditas terbesar kedua bagi masyarakat Desa Jengglungharjo. Kebun alpukat di Dusun Ngelo ini menghasilkan buah berkualitas tinggi yang dipasarkan ke berbagai wilayah sekitar.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 6,
    nama: 'Kebun Pisang',
    kategori: 'sda',
    koordinat: [-8.285198, 111.925261],
    deskripsi: 'Kebun pisang yang berada di Dusun Ngelo menjadi salah satu komoditas dominan di Desa Jengglungharjo. Pisang yang dihasilkan dipasarkan secara lokal maupun ke pasar-pasar di kecamatan sekitar.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 7,
    nama: 'Kebun Karet',
    kategori: 'sda',
    koordinat: [-8.293250, 111.927000],
    deskripsi: 'Sebagai komoditas terbesar ketiga, kebun karet di Dusun Ngelo sangat cocok untuk penghijauan hutan lindung karena pohonnya mampu menahan erosi dan menjaga cadangan air sekaligus bernilai ekonomi tinggi bagi warga desa.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },

  // ─── FASILITAS UMUM ─────────────────────────────────────
  {
    id: 8,
    nama: 'Sumber PDAM (Pamsimas)',
    kategori: 'fasilitas',
    koordinat: [-8.268993, 111.898221],
    deskripsi: 'Sumber air PDAM yang melayani kebutuhan air bersih untuk 2 dusun yaitu Dusun Sumber dan Dusun Jengglung. Merupakan infrastruktur vital bagi masyarakat desa dalam memenuhi kebutuhan air sehari-hari.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 9,
    nama: 'Pemandian Umum Plandaan 1',
    kategori: 'fasilitas',
    koordinat: [-8.246040, 111.909295],
    deskripsi: 'Tempat pemandian umum yang sering digunakan warga sekitar terutama saat mati air. Berlokasi di Dusun Plandaan dan menjadi salah satu fasilitas umum penting bagi masyarakat setempat.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 10,
    nama: 'Pemandian Umum Plandaan 2',
    kategori: 'fasilitas',
    koordinat: [-8.244250, 111.902231],
    deskripsi: 'Pemandian umum dengan sumur bor yang disumbangkan oleh Yayasan Yesus Kristus untuk warga Dusun Plandaan. Fasilitas ini menjadi alternatif sumber air bersih yang sangat bermanfaat bagi warga sekitar.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },

  // ─── BUDAYA & KEARIFAN LOKAL ────────────────────────────
  {
    id: 11,
    nama: 'Langen Beksan',
    kategori: 'budaya',
    koordinat: [-8.237392, 111.895643],
    deskripsi: 'Langen Beksan merupakan kesenian tari tradisional yang menjadi kearifan lokal Dusun Klumpit, Desa Jengglungharjo. Kesenian ini rutin ditampilkan dalam berbagai acara adat dan perayaan desa sebagai upaya pelestarian budaya daerah.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 12,
    nama: 'Grebek Tumpeng',
    kategori: 'budaya',
    koordinat: [-8.297301, 111.910346],
    deskripsi: 'Grebek Tumpeng adalah tradisi budaya khas Desa Jengglungharjo yang dilaksanakan sebagai bentuk syukur atas hasil bumi dan keberkahan desa. Tradisi ini melibatkan seluruh warga desa dan menjadi ajang mempererat tali persaudaraan masyarakat.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },

  // ─── POTENSI UMKM ───────────────────────────────────────
  {
    id: 13,
    nama: 'Cika Bakery',
    kategori: 'umkm',
    koordinat: [-8.281677, 111.916354],
    deskripsi: 'Cika Bakery adalah usaha kue dan roti milik Bu Eni yang berdiri sejak 2018. Memproduksi berbagai macam kue seperti kue bolu, kue kering, dan kue ulang tahun. Bolu gulung dijual mulai 38 ribu, kue ulang tahun 65 ribu hingga 150 ribu. Sudah terdaftar di Google Maps, memiliki izin usaha, surat halal, namun belum memiliki PIRT.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 14,
    nama: 'Kripik Mak Sut',
    kategori: 'umkm',
    koordinat: [-8.254108, 111.897556],
    deskripsi: 'Usaha kripik milik Mak Sut yang sudah berjalan selama 10 tahun dengan 3 macam produk unggulan yaitu kripik pisang, kripik gothe, dan kacang asin. Produk dipasarkan secara lokal di Dusun Jengglung dan sekitarnya.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 15,
    nama: 'Hilwa Ecobag',
    kategori: 'umkm',
    koordinat: [-8.249391, 111.908734],
    deskripsi: 'Hilwa Ecobag adalah usaha tas rajut DIY milik Bu Umi yang sudah berjalan selama 10 tahun. Produk berupa tas rajut dari gelas plastik besar dengan beragam pilihan warna, model, dan ukuran sesuai request pembeli. Proses pembuatan memakan waktu 3 hari karena sulitnya mencari bahan baku.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 16,
    nama: 'Dapur Berkah',
    kategori: 'umkm',
    koordinat: [-8.253965, 111.897457],
    deskripsi: 'Dapur Berkah adalah usaha catering milik Bu Uceng yang berdiri sejak 2023. Menerima pesanan via WhatsApp sesuai request pemesanan pembeli. Berlokasi di Dusun Sumber dan melayani berbagai jenis pesanan makanan untuk acara keluarga maupun hajatan.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 17,
    nama: 'Ulfa Modes',
    kategori: 'umkm',
    koordinat: [-8.244387, 111.908391],
    deskripsi: 'Ulfa Modes adalah usaha jahit milik Bu Ulfa yang mulai berdiri sejak 2015. Bu Ulfa belajar menjahit dari lembaga pelatihan gratis dan kini melayani jasa jahit pakaian untuk warga Dusun Plandaan dan sekitarnya.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 18,
    nama: 'Zoke Kriyuk',
    kategori: 'umkm',
    koordinat: [-8.231558, 111.902223],
    deskripsi: 'Zoke Kriyuk adalah usaha kripik milik Bu Preh yang berlokasi di Dusun Klumpit. Memproduksi berbagai camilan kripik pisang, kripik singkong, bekecot, dan zoke kriyuk yang dipasarkan di wilayah sekitar desa.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 19,
    nama: 'Sanggaria',
    kategori: 'umkm',
    koordinat: [-8.246728, 111.902665],
    deskripsi: 'Sanggaria milik Pak Supriyono adalah usaha produk makanan tradisional yang berlokasi di Dusun Plandaan. Memproduksi Nasi Tiwul, Jagung Instan, Kripik Pisang, Sale Pisang, dan Gatot — makanan tradisional khas Tulungagung yang semakin langka.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 20,
    nama: 'Jamu Bu Asih',
    kategori: 'umkm',
    koordinat: [-8.231016, 111.898674],
    deskripsi: 'Usaha jamu tradisional milik Bu Asih yang dilanjutkan oleh suaminya sejak tahun 2020. Memproduksi berbagai variasi jamu seperti kunir asem, beras kencur, suruh kenci, temulawak, dan mengkudu. Terjual sekitar 100 botol per hari dalam kemasan 200ml, 500ml, dan 1,5 liter. Sudah memiliki sertifikat halal namun belum terdaftar di Google Maps.',
    foto1: 'images/1.png',
    foto2: 'images/1.png',
    foto3: 'images/1.png',
  },
  {
    id: 21,
    nama: 'Kue Kering Bu Aswatun',
    kategori: 'umkm',
    koordinat: [-8.253359, 111.914017],
    deskripsi: 'Usaha kue kering dan kue basah milik Bu Aswatun yang mulai berjalan sejak 2018-2019. Pemasaran dilakukan dari mulut ke mulut dan via WhatsApp, serta menitipkan produk di toko sekitar. Usaha sempat berhenti saat anaknya lahir dan kini aktif kembali melayani pesanan.',
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