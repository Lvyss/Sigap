// src/components/panel/PanelKanan.jsx
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { KATEGORI, getFasilitasByKategori, getKategoriTerpakai } from '@/data/fasilitas';
import { MapPin, Search, X } from 'lucide-react';
import { getScaleFromZoom, getScaleBar } from '@/lib/useMapScale';

const MiniMap = dynamic(() => import('./MiniMap'), { ssr: false });

const SEMUA_KATEGORI = Object.values(KATEGORI).map((k) => k.id);



const LEGENDA_GARIS = [
  { label: 'Batas Desa', style: { borderTop: '2px dashed #000' } },
  { label: 'Jalan', style: { borderTop: '2.5px solid #EF4444' } },
  { label: 'Sungai', style: { borderTop: '2px solid #3B82F6' } },
];

const formatSkala = (s) => {
  if (s >= 1000000) return `1:${(s / 1000000).toFixed(1)}jt`;
  if (s >= 1000) return `1:${(Math.round(s / 1000) * 1000).toLocaleString()}`;
  return `1:${s}`;
};

export default function PanelKanan({ onFasilitasClick, selectedId, onFilterChange, mapZoom = 15, mapLat = -8.26 }) {
  const [aktifFilter, setAktifFilter] = useState(SEMUA_KATEGORI);
  const [searchQuery, setSearchQuery] = useState('');
  const [showHint, setShowHint] = useState(true);
    
  useEffect(() => {
    onFilterChange?.(aktifFilter);
  }, [aktifFilter]);

  const toggleFilter = (kategoriId) => {
    setAktifFilter((prev) =>
      prev.includes(kategoriId)
        ? prev.filter((id) => id !== kategoriId)
        : [...prev, kategoriId]
    );
  };

  // Hitung skala dinamis
  const scale = getScaleFromZoom(mapZoom, mapLat);
  const bar = getScaleBar(mapZoom, mapLat, 80);

  const kategoriTerpakai = getKategoriTerpakai();

  const hasilSearch = kategoriTerpakai
    .filter((k) => aktifFilter.includes(k.id))
    .map((kat) => ({
      kat,
      items: getFasilitasByKategori(kat.id).filter((item) =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(({ items }) => items.length > 0);

  return (
    <div
      className="w-full h-full bg-white flex flex-col overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >

{/* ── KOMPAS + SKALA ── */}
<div className="px-0 py-1 flex-shrink-0 flex items-center gap-2"> {/* ganti px-3 jadi px-0 */}
  {/* Kompas PNG - tetap dengan padding kiri */}
  <img
    src="/images/kompas.png"
    alt="Kompas"
    className="w-10 h-10 object-contain flex-shrink-0 ml-3" // tambah ml-3
    onError={(e) => { e.target.style.display = 'none'; }}
  />

  {/* Skala */}
  <div className="flex flex-col gap-0.5 flex-shrink-0">
    <p className="text-[10px] font-medium text-black uppercase whitespace-nowrap"
      style={{ fontFamily: "'Oswald', sans-serif" }}>
      SKALA : {formatSkala(scale)}
    </p>
    <div className="flex w-38">
      {[0, 1, 2, 3].map((i) => (
        <div key={i}
          className="h-2 border border-black flex-1"
          style={{ backgroundColor: i % 2 === 0 ? '#000' : '#fff' }}
        />
      ))}
    </div>
    <div className="flex justify-between w-38">
      <span className="text-[7px] text-black">0</span>
      <span className="text-[7px] text-black">{bar.midLabel}</span>
      <span className="text-[7px] text-black">{bar.label}</span>
    </div>
  </div>

  {/* Coordinate info — mentok kanan dengan flex-1 + justify-end */}
  <div className="flex flex-col gap-0 ml-auto pr-3"> {/* ganti ml-2 jadi ml-auto pr-3 */}
    <p className="text-[9px] text-black whitespace-nowrap leading-tight text-left">
      Coordinate System : GCS WGS 1984
    </p>
    <p className="text-[9px] text-black whitespace-nowrap leading-tight text-left">
      Datum : 1984
    </p>
    <p className="text-[9px] text-black whitespace-nowrap leading-tight text-left">
      Units : Degree
    </p>
  </div>
</div>

      {/* ── DIVIDER TEBAL ── */}
      <div className=" border-t-2 border-black flex-shrink-0" />

{/* ── LEGENDA ── */}
<div className="px-0 py-1 flex-shrink-0"> {/* ganti px-3 jadi px-0 */}
  <p className="text-[12px] font-medium text-black uppercase tracking-widest mb-1.5 pl-3" // tambah pl-3
    style={{ fontFamily: "'Oswald', sans-serif" }}>
    Legenda
  </p>
  <div className="flex flex-row flex-wrap gap-x-[116px] gap-y-1 px-3"> {/* tambah px-3 di sini */}
    {LEGENDA_GARIS.map((item) => (
      <div key={item.label} className="flex items-center gap-2">
        <div className="w-6 flex-shrink-0" style={item.style} />
        <span className="text-[9px] text-black whitespace-nowrap">{item.label}</span>
      </div>
    ))}
  </div>
</div>

{/* ── JUDUL POTENSI — fixed ── */}
<div className="px-0 pt-1 flex-shrink-0">
  <p className="text-[12px] font-medium text-black uppercase tracking-widest pl-3"
    style={{ fontFamily: "'Oswald', sans-serif" }}>
    Potensi Desa Jengglungharjo
  </p>
</div>

{/* ── SEARCH — fixed ── */}
<div className="px-0 py-1.5 flex-shrink-0">
  <div className="relative px-3"> {/* tambah px-3 di sini */}
    <Search size={11} className="absolute left-4.5 top-1/2 -translate-y-1/2 text-black" />
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Cari potensi desa..."
      className="w-full pl-7 pr-7 py-1.5 text-[10px] rounded border border-black bg-white text-black focus:outline-none placeholder-gray-400"
    />
    {searchQuery && (
      <button
        onClick={() => setSearchQuery('')}
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        <X size={10} />
      </button>
    )}
  </div>
</div>

{/* ── POTENSI DESA — scrollable ── */}
<div className="flex-1 overflow-y-auto px-3 pb-1 min-h-0">
  {hasilSearch.length === 0 ? (
    <div className="flex flex-col items-center py-4 text-gray-400 gap-1">
      <MapPin size={16} />
      <p className="text-[9px] text-center text-black">Tidak ada hasil</p>
    </div>
  ) : (
    <div className="flex flex-col gap-1.5">
      {hasilSearch.map(({ kat, items }) => (
        <div key={kat.id}>

          {/* Header kategori — lebih kecil */}
          <div className="flex items-center gap-1 mb-0.5">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: kat.warna }}
            />
            <p
              className="text-[10px] font-medium text-black uppercase tracking-wide"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {kat.label}
            </p>
          </div>

{showHint && (
  <div
    className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-2 py-1.5 mb-1.5 cursor-pointer"
    onClick={() => setShowHint(false)}
  >
    <span className="text-blue-500 text-[10px]">👆</span>
    <p className="text-[9px] text-blue-600 flex-1">
      Klik item untuk melihat lokasi di peta
    </p>
    <X size={10} className="text-blue-400 flex-shrink-0" />
  </div>
)}

          {/* Grid 3 kolom — lebih padat */}
          <div className="grid grid-cols-2 gap-0.5">
{items.map((item) => (
  <button
    key={item.id}
    onClick={() => onFasilitasClick(item)}
    className={`group flex items-start gap-1 px-1.5 py-1.5 rounded border text-left
      transition-all duration-150 cursor-pointer
      hover:shadow-md hover:-translate-y-0.5
      active:scale-95 active:shadow-none
      ${selectedId === item.id
        ? 'border-black bg-gray-100 shadow-sm'
        : 'border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50'
      }`}
  >
    <MapPin
      size={9}
      className="flex-shrink-0 mt-0.5 transition-transform group-hover:scale-125"
      style={{ color: kat.warna }}
    />
    <div className="min-w-0 flex-1">
      <p className="text-[9px] font-medium text-black leading-tight line-clamp-2 group-hover:underline">
        {item.nama}
      </p>
    </div>
    {/* Arrow — muncul saat hover */}
    <span className="text-[8px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 self-center">
      →
    </span>
  </button>
))}
          </div>

        </div>
      ))}
    </div>
  )}
</div>

     {/* ── BOTTOM SECTION — fixed di bawah ── */}
<div className="flex-shrink-0">

  {/* ── DIVIDER ── */}
  <div className="border-t-2  border-black" />

{/* ── SUMBER PETA ── */}
<div className="px-0 py-1 flex-shrink-0"> {/* ganti px-4 jadi px-0 */}
  <p className="text-[12px] font-medium text-black uppercase tracking-widest mb-0.5 pl-4"
    style={{ fontFamily: "'Oswald', sans-serif" }}>
    Sumber Peta
  </p>
  <ol className="list-decimal list-inside flex flex-row flex-wrap gap-x-[33px] px-4"> {/* tambah px-4 di sini */}
    <li className="text-[9px] text-black">Peta Rupa Bumi Indonesia</li>
    <li className="text-[9px] text-black">Open Street Map</li>
    <li className="text-[9px] text-black">Basemap Google Satellite Hybrid</li>
  </ol>
</div>



  {/* ── DIVIDER ── */}
  <div className="border-t-2  border-black" />

  {/* ── PETA INDEKS ── */}
  <div className="px-3 py-1">
    <p
      className="text-[9px] font-bold text-black uppercase tracking-widest mb-1"
      style={{ fontFamily: "'Oswald', sans-serif" }}
    >
      Indeks Peta
    </p>
    <div className="w-full h-20 rounded border border-black overflow-hidden">
      {/* ↑ kurangi h-28 → h-20 biar lebih kecil */}
      <MiniMap />
    </div>
  </div>

  {/* ── FOOTER ── */}
  <div className="px-4 py-1 border-t border-black">
    <p
      className="text-[8px] text-black text-center uppercase tracking-widest"
      style={{ fontFamily: "'Oswald', sans-serif" }}
    >
      SIGAP • KKN • Jengglungharjo 2026
    </p>
  </div>

</div>

    </div>
  );
}