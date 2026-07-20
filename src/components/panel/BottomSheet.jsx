// src/components/panel/BottomSheet.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { KATEGORI, getFasilitasByKategori, getKategoriTerpakai } from '@/data/fasilitas';
import { Search, X, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
// Tambah import di atas
import dynamic from 'next/dynamic';
import { getScaleFromZoom, getScaleBar } from '@/lib/useMapScale';

const MiniMap = dynamic(() => import('./MiniMap'), { ssr: false });

const SEMUA_KATEGORI = Object.values(KATEGORI).map((k) => k.id);

export default function BottomSheet({ onFasilitasClick, selectedId, onFilterChange, isFullscreen, mapZoom = 14, mapLat = -8.26 }) {
  // Hitung skala dinamis
  const scale = getScaleFromZoom(mapZoom, mapLat);
  const bar = getScaleBar(mapZoom, mapLat, 80);

  const formatSkala = (s) => {
    if (s >= 1000000) return `1:${(s / 1000000).toFixed(1)}jt`;
    if (s >= 1000) return `1:${(Math.round(s / 1000) * 1000).toLocaleString()}`;
    return `1:${s}`;
  };
  const [isExpanded, setIsExpanded] = useState(false); // false = half, true = full
  const [aktifFilter, setAktifFilter] = useState(SEMUA_KATEGORI);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const startY = useRef(null);
  const sheetRef = useRef(null);

  useEffect(() => {
    onFilterChange?.(aktifFilter);
  }, [aktifFilter]);

  const toggleFilter = (id) => {
    setAktifFilter((prev) =>
      prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id]
    );
  };

  // Swipe handler
  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchEnd = (e) => {
    setIsDragging(false);
    const diff = startY.current - e.changedTouches[0].clientY;
    if (diff > 40) setIsExpanded(true);   // swipe up → full
    if (diff < -40) setIsExpanded(false); // swipe down → half
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
    <>
      {/* Overlay gelap saat full — tap untuk tutup */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 z-[800]"
          onClick={() => setIsExpanded(false)}
        />
      )}

<div
  ref={sheetRef}
  className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-[900] flex flex-col"
  style={{
    height: isExpanded ? '88vh' : '45vh',
    transform: isFullscreen ? 'translateY(100%)' : 'translateY(0)',
    transition: 'height 0.35s cubic-bezier(0.32, 0.72, 0, 1), transform 0.3s ease-in-out',
  }}
>

        {/* ── DRAG HANDLE ── */}
        <div
          className="flex-shrink-0 flex flex-col items-center pt-2.5 pb-1 cursor-pointer select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => setIsExpanded((p) => !p)}
        >
          {/* Bar */}
          <div className="w-10 h-1 bg-gray-300 rounded-full mb-2" />

          {/* Header row */}
          <div className="flex items-center justify-between w-full px-4">
            <p
              className="text-xs font-bold text-black uppercase tracking-widest"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Potensi Desa Jengglungharjo
            </p>
            {/* Tombol expand/collapse */}
            <button
              className="bg-gray-100 rounded-full p-1"
              onClick={(e) => { e.stopPropagation(); setIsExpanded((p) => !p); }}
            >
              {isExpanded
                ? <ChevronDown size={14} className="text-gray-600" />
                : <ChevronUp size={14} className="text-gray-600" />
              }
            </button>
          </div>
        </div>

        {/* ── SEARCH ── */}
        <div className="px-4 py-2 flex-shrink-0">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari potensi desa..."
              className="w-full pl-8 pr-8 py-2 text-xs rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-black"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X size={12} className="text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* ── FILTER CHIPS — horizontal scroll ── */}
        <div className="px-4 pb-2 flex-shrink-0">
          <div
            className="flex gap-1.5 overflow-x-auto pb-0.5"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {kategoriTerpakai.map((kat) => {
              const isAktif = aktifFilter.includes(kat.id);
              return (
                <button
                  key={kat.id}
                  onClick={() => toggleFilter(kat.id)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap border transition-all flex-shrink-0 active:scale-95"
                  style={{
                    backgroundColor: isAktif ? kat.warna : 'white',
                    borderColor: kat.warna,
                    color: isAktif ? 'white' : kat.warna,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: isAktif ? 'white' : kat.warna }}
                  />
                  {kat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="mx-4 border-t border-gray-100 flex-shrink-0" />

        {/* ── LIST — scrollable ── */}
        <div className="flex-1 overflow-y-auto px-4 py-2 min-h-0">
          {hasilSearch.length === 0 ? (
            <div className="flex flex-col items-center py-8 gap-2 text-gray-400">
              <MapPin size={24} />
              <p className="text-xs">Tidak ada hasil</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pb-4">
              {hasilSearch.map(({ kat, items }) => (
                <div key={kat.id}>
                  {/* Header kategori */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: kat.warna }}
                    />
                    <p
                      className="text-[11px] font-bold text-black uppercase tracking-wide"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {kat.label}
                    </p>
                    <span className="text-[9px] text-gray-400 ml-auto">{items.length} lokasi</span>
                  </div>

                  {/* Grid 2 kolom */}
                  <div className="grid grid-cols-2 gap-1.5">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onFasilitasClick(item);
                          setIsExpanded(false); // tutup ke half saat item diklik
                        }}
                        className={`group flex items-start gap-1.5 px-2.5 py-2 rounded-xl border text-left transition-all active:scale-95 ${
                          selectedId === item.id
                            ? 'border-black bg-gray-100 shadow-sm'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <MapPin
                          size={11}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: kat.warna }}
                        />
                        <p className="text-[10px] font-medium text-black leading-tight line-clamp-2">
                          {item.nama}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

{/* Legenda + Sumber + Kompas + MiniMap — di bawah list */}
<div className="mt-2 pt-3 border-t border-gray-100">

  {/* ── LEGENDA — grid 3 kolom full width ── */}
  <p
    className="text-[9px] font-bold text-black uppercase tracking-widest mb-2"
    style={{ fontFamily: "'Oswald', sans-serif" }}
  >
    Legenda
  </p>
  <div className="grid grid-cols-3 gap-2 mb-2">
    {[
      { label: 'Batas Desa', style: { borderTop: '2px dashed #000' } },
      { label: 'Jalan', style: { borderTop: '2.5px solid #EF4444' } },
      { label: 'Sungai', style: { borderTop: '2px solid #3B82F6' } },
    ].map((item) => (
      <div key={item.label} className="flex flex-col items-center gap-1">
        <div className="w-full" style={item.style} />
        <span className="text-[9px] text-black">{item.label}</span>
      </div>
    ))}
  </div>

  {/* ── SUMBER PETA ── */}
  <p className="text-[8px] text-gray-400 text-center mb-3">
    Sumber: RBI • OpenStreetMap • Google Satellite
  </p>

  {/* ── KOMPAS + SKALA — full width ── */}
  <div className="pt-3 border-t border-gray-100">
    <div className="flex items-center gap-3">

      {/* Kompas PNG */}
      <img
        src="/images/kompas.png"
        alt="Kompas"
        className="w-12 h-12 object-contain flex-shrink-0"
        onError={(e) => { e.target.style.display = 'none'; }}
      />

     {/* Skala — flex-1 full width */}
<div className="flex flex-col gap-0.5 flex-1">
  <p
    className="text-[9px] font-bold text-black uppercase"
    style={{ fontFamily: "'Oswald', sans-serif" }}
  >
    Skala : {formatSkala(scale)} {/* ← dinamis */}
  </p>

  {/* Bar hitam putih full width */}
  <div className="flex w-full">
    {[0,1,2,3].map((i) => (
      <div
        key={i}
        className="flex-1 h-2.5 border border-black"
        style={{ backgroundColor: i % 2 === 0 ? '#000' : '#fff' }}
      />
    ))}
  </div>

  {/* Label dinamis */}
  <div className="flex justify-between w-full">
    <span className="text-[7px] text-black">0</span>
    <span className="text-[7px] text-black">{bar.midLabel}</span>
    <span className="text-[7px] text-black">{bar.label}</span>
  </div>

  <p className="text-[7px] text-black">Coordinate System : GCS WGS 1984</p>
  <p className="text-[7px] text-black">Datum : 1984 • Units : Degree</p>
</div>

    </div>
  </div>

  {/* ── INDEKS PETA ── */}
  <div className="mt-3 pt-3 border-t border-gray-100 pb-6">
    <p
      className="text-[9px] font-bold text-black uppercase tracking-widest mb-1.5"
      style={{ fontFamily: "'Oswald', sans-serif" }}
    >
      Indeks Peta
    </p>
    <div className="w-full h-36 rounded-xl border border-gray-200 overflow-hidden">
      <MiniMap />
    </div>
    <p
      className="text-[8px] text-black text-center uppercase tracking-widest mt-2"
      style={{ fontFamily: "'Oswald', sans-serif" }}
    >
      SIGAP • KKN • Jengglungharjo 2026
    </p>
  </div>

                <p className="text-[8px] text-gray-400 text-center">
                  Sumber: RBI • OpenStreetMap • Google Satellite
                </p>
              </div>
            </div>
          )}
          
        </div>
        

      </div>
    </>
  );
}