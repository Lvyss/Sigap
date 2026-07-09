// src/components/panel/PanelKanan.jsx
'use client';

import { useState, useEffect } from 'react';
import { KATEGORI, getFasilitasByKategori, getKategoriTerpakai } from '@/data/fasilitas';
import { MapPin, Search, X } from 'lucide-react';

const SEMUA_KATEGORI = Object.values(KATEGORI).map((k) => k.id);

const LEGENDA_GARIS = [
  { label: 'Batas Desa', style: { borderTop: '2px dashed #000000' } },
  { label: 'Jalan', style: { borderTop: '2.5px solid #EF4444' } },
  { label: 'Sungai', style: { borderTop: '2px solid #3B82F6' } },
];

// Kompas SVG dengan suppressHydrationWarning
function Kompas() {
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16" xmlns="http://www.w3.org/2000/svg">
      {/* Lingkaran luar */}
      <circle cx="40" cy="40" r="38" fill="white" stroke="#000" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="32" fill="white" stroke="#000" strokeWidth="0.8" />

      {/* Tick marks */}
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = (i * 10 * Math.PI) / 180;
        const isMajor = i % 9 === 0;
        const r1 = 32;
        const r2 = isMajor ? 26 : 29;
        return (
          <line
            key={i}
            x1={40 + r1 * Math.sin(angle)}
            y1={40 - r1 * Math.cos(angle)}
            x2={40 + r2 * Math.sin(angle)}
            y2={40 - r2 * Math.cos(angle)}
            stroke="#000"
            strokeWidth={isMajor ? 1.2 : 0.6}
            suppressHydrationWarning
          />
        );
      })}

      {/* Panah Utara — merah */}
      <polygon
        points="40,8 36,40 40,36 44,40"
        fill="#EF4444"
        stroke="#EF4444"
        strokeWidth="0.5"
      />
      {/* Panah Selatan — hitam */}
      <polygon
        points="40,72 36,40 40,44 44,40"
        fill="#000"
        stroke="#000"
        strokeWidth="0.5"
      />
      {/* Panah Timur */}
      <polygon
        points="72,40 40,36 44,40 40,44"
        fill="#555"
        stroke="#555"
        strokeWidth="0.5"
      />
      {/* Panah Barat */}
      <polygon
        points="8,40 40,36 36,40 40,44"
        fill="#555"
        stroke="#555"
        strokeWidth="0.5"
      />

      {/* Titik tengah */}
      <circle cx="40" cy="40" r="3" fill="white" stroke="#000" strokeWidth="1" />

      {/* Label arah - pakai Arial */}
      <text x="40" y="22" textAnchor="middle" fontSize="8" fontWeight="bold" fontFamily="Arial, sans-serif" fill="#EF4444">U</text>
      <text x="40" y="62" textAnchor="middle" fontSize="7" fontFamily="Arial, sans-serif" fill="#000">S</text>
      <text x="62" y="43" textAnchor="middle" fontSize="7" fontFamily="Arial, sans-serif" fill="#000">T</text>
      <text x="18" y="43" textAnchor="middle" fontSize="7" fontFamily="Arial, sans-serif" fill="#000">B</text>
    </svg>
  );
}

export default function PanelKanan({ onFasilitasClick, selectedId, onFilterChange }) {
  const [aktifFilter, setAktifFilter] = useState(SEMUA_KATEGORI);
  const [searchQuery, setSearchQuery] = useState('');

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
      className="w-full h-full bg-[#f7f7f7] border-l-2 border-black flex flex-col overflow-hidden"
      style={{ fontFamily: "'Arial', sans-serif" }}
    >

      {/* ── HEADER ── */}
      <div className="flex items-start px-5 pt-1 pb-1 ">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src="/images/Logo Kab.png"
            alt="Logo Kabupaten"
            className="w-19 h-19 object-contain"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
        
        {/* Judul - SEMUA BOLD */}
        <div className="flex flex-col flex-1">
          <h1
            className="text-center text-[15px] font-bold text-black uppercase leading-tight tracking-wide"
            style={{ fontFamily: "'Arial', 'Helvetica', sans-serif" }}
          >
            PETA POTENSI DESA JENGGLUNGHARJO KECAMATAN TANGGUNGGUNUNG <br/> KABUPATEN TULUNGAGUNG <br/> PROVINSI JAWA TIMUR
          </h1>
        </div>
      </div>
      {/* ── DIVIDER TEBAL ── */}
      <div className="mx-3 border-t-2 border-black" />
      {/* ── KOMPAS DI BAWAH JUDUL ── */}
      <div className="flex justify-center px-4 pt-2 pb-2">
        <Kompas />
      </div>

    {/* ── DIVIDER TEBAL ── */}
      <div className="mx-3 border-t-2 border-black" />

{/* ── LEGENDA ── */}
<div className="px-4 py-1">
  <p
    className="text-xs font-bold text-black uppercase tracking-widest mb-2"
    style={{ fontFamily: "'Arial', 'Helvetica', sans-serif" }}
  >
    Legenda
  </p>
  <div className="flex justify-between items-center">
    {LEGENDA_GARIS.map((item) => (
      <div key={item.label} className="flex items-center gap-2">
        <div className="w-8 flex-shrink-0" style={item.style} />
        <span className="text-[10px] text-black font-medium whitespace-nowrap" style={{ fontFamily: "'Arial', sans-serif" }}>
          {item.label}
        </span>
      </div>
    ))}
  </div>
</div>

    {/* ── DIVIDER TEBAL ── */}
      <div className="mx-3 border-t-2 border-black" />

      {/* ── SEARCH ── */}
      <div className="px-3 py-2">
        <div className="relative">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari potensi desa..."
            className="w-full pl-7 pr-7 py-1.5 text-[11px] rounded border border-black bg-white text-black focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-400"
            style={{ fontFamily: "'Arial', sans-serif" }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-black">
              <X size={11} />
            </button>
          )}
        </div>
      </div>

      {/* ── POTENSI DESA ── */}
      <div className="flex-1 overflow-y-auto px-3 pb-2">
        <p
          className="text-xs font-bold text-black uppercase tracking-widest mb-2"
          style={{ fontFamily: "'Arial', 'Helvetica', sans-serif" }}
        >
          Potensi Desa
        </p>

        {hasilSearch.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-gray-400 gap-1">
            <MapPin size={24} />
            <p className="text-xs text-center text-black" style={{ fontFamily: "'Arial', sans-serif" }}>
              Tidak ada hasil
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {hasilSearch.map(({ kat, items }) => (
              <div key={kat.id}>

                {/* Header kategori */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: kat.warna }}
                  />
                  <p
                    className="text-[11px] font-bold text-black uppercase tracking-wide flex-1"
                    style={{ fontFamily: "'Arial', 'Helvetica', sans-serif" }}
                  >
                    {kat.label}
                  </p>
                  <button
                    onClick={() => toggleFilter(kat.id)}
                    className="text-[9px] px-1.5 py-0.5 rounded border border-black text-black hover:bg-black hover:text-white transition-all font-medium"
                    style={{ fontFamily: "'Arial', sans-serif" }}
                  >
                    {aktifFilter.includes(kat.id) ? 'Sembunyikan' : 'Tampilkan'}
                  </button>
                </div>

                {/* Grid 2 kolom */}
                <div className="grid grid-cols-2 gap-1">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onFasilitasClick(item)}
                      className={`flex items-start gap-1.5 px-2 py-1.5 rounded border text-left transition-all hover:bg-gray-50 ${
                        selectedId === item.id
                          ? 'border-black bg-gray-100'
                          : 'border-gray-200'
                      }`}
                    >
                      <MapPin
                        size={10}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: kat.warna }}
                      />
                      <div className="min-w-0">
                        <p className="text-[10px] font-medium text-black leading-tight line-clamp-2" style={{ fontFamily: "'Arial', sans-serif" }}>
                          {item.nama}
                        </p>
                        <p className="text-[9px] text-gray-500 leading-tight truncate mt-0.5" style={{ fontFamily: "'Arial', sans-serif" }}>
                          {item.dusun || item.infoSingkat}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── DIVIDER ── */}
      <div className="mx-3 border-t border-black" />

      {/* ── AREA BAWAH ── */}
      <div className="px-4 py-3">
        <p
          className="text-[9px] text-black text-center uppercase tracking-widest font-bold"
          style={{ fontFamily: "'Times New Roman', 'Times', serif" }}
        >
          SIGAP • KKN • Jengglungharjo 2026
        </p>
      </div>

    </div>
  );
}