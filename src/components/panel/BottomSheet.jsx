// src/components/panel/BottomSheet.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { KATEGORI, getFasilitasByKategori, getKategoriTerpakai } from '@/data/fasilitas';
import { Search, X, MapPin, ChevronUp } from 'lucide-react';
import { getScaleFromZoom, getScaleBar } from '@/lib/useMapScale';

const SEMUA_KATEGORI = Object.values(KATEGORI).map((k) => k.id);

// 3 state height
const SHEET_STATES = {
  COLLAPSED: 60,   // hanya drag handle
  HALF: 45,        // 45% layar
  FULL: 92,        // hampir full
};

export default function BottomSheet({ onFasilitasClick, selectedId, onFilterChange }) {
  const [sheetState, setSheetState] = useState('COLLAPSED');
  const [aktifFilter, setAktifFilter] = useState(SEMUA_KATEGORI);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const startY = useRef(null);
  const startHeight = useRef(null);
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
    startHeight.current = sheetRef.current?.getBoundingClientRect().height;
    setIsDragging(true);
  };

  const handleTouchEnd = (e) => {
    setIsDragging(false);
    const endY = e.changedTouches[0].clientY;
    const diff = startY.current - endY;

    if (diff > 50) {
      // Swipe UP
      if (sheetState === 'COLLAPSED') setSheetState('HALF');
      else if (sheetState === 'HALF') setSheetState('FULL');
    } else if (diff < -50) {
      // Swipe DOWN
      if (sheetState === 'FULL') setSheetState('HALF');
      else if (sheetState === 'HALF') setSheetState('COLLAPSED');
    }
  };

  // Klik drag handle — toggle state
  const handleHandleClick = () => {
    if (sheetState === 'COLLAPSED') setSheetState('HALF');
    else if (sheetState === 'HALF') setSheetState('FULL');
    else setSheetState('COLLAPSED');
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

  const currentHeight = SHEET_STATES[sheetState];

  return (
    <div
      ref={sheetRef}
      className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-[900] flex flex-col"
      style={{
        height: `${currentHeight}vh`,
        transition: isDragging ? 'none' : 'height 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
      }}
    >
      {/* ── DRAG HANDLE ── */}
      <div
        className="flex-shrink-0 flex flex-col items-center pt-2 pb-1 cursor-pointer select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleHandleClick}
      >
        {/* Bar handle */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mb-2" />

        {/* Label state */}
        <div className="flex items-center justify-between w-full px-4">
          <p
            className="text-xs font-bold text-black uppercase tracking-widest"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {sheetState === 'COLLAPSED'
              ? '↑ Potensi Desa Jengglungharjo'
              : 'Potensi Desa Jengglungharjo'
            }
          </p>
          {/* Indikator state */}
          <div className="flex gap-1">
            {['COLLAPSED', 'HALF', 'FULL'].map((s) => (
              <div
                key={s}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{
                  backgroundColor: sheetState === s ? '#000' : '#D1D5DB',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── KONTEN — hanya tampil saat bukan COLLAPSED ── */}
      {sheetState !== 'COLLAPSED' && (
        <>
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
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X size={12} className="text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {/* ── FILTER CHIPS ── */}
          <div className="px-4 pb-2 flex-shrink-0">
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              {kategoriTerpakai.map((kat) => {
                const isAktif = aktifFilter.includes(kat.id);
                return (
                  <button
                    key={kat.id}
                    onClick={() => toggleFilter(kat.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap border transition-all flex-shrink-0"
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

          {/* ── LIST POTENSI — scrollable ── */}
          <div className="flex-1 overflow-y-auto px-4 py-2 min-h-0">
            {hasilSearch.length === 0 ? (
              <div className="flex flex-col items-center py-8 gap-2 text-gray-400">
                <MapPin size={24} />
                <p className="text-xs">Tidak ada hasil</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
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
                    </div>

                    {/* Grid 2 kolom di mobile */}
                    <div className="grid grid-cols-2 gap-1.5">
                      {items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            onFasilitasClick(item);
                            setSheetState('HALF'); // tutup ke half saat item diklik
                          }}
                          className={`group flex items-start gap-1.5 px-2.5 py-2 rounded-xl border text-left transition-all active:scale-95 ${
                            selectedId === item.id
                              ? 'border-black bg-gray-100 shadow-sm'
                              : 'border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm'
                          }`}
                        >
                          <MapPin
                            size={11}
                            className="flex-shrink-0 mt-0.5"
                            style={{ color: kat.warna }}
                          />
                          <div className="min-w-0">
                            <p className="text-[10px] font-medium text-black leading-tight line-clamp-2">
                              {item.nama}
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

          {/* ── LEGENDA + SUMBER — hanya di FULL ── */}
          {sheetState === 'FULL' && (
            <>
              <div className="mx-4 border-t border-gray-100 flex-shrink-0" />
              <div className="px-4 py-2 flex-shrink-0">
                <p
                  className="text-[9px] font-bold text-black uppercase tracking-widest mb-1"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Legenda
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 flex-shrink-0" style={{ borderTop: '2px dashed #000' }} />
                    <span className="text-[9px] text-black">Batas Desa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 flex-shrink-0" style={{ borderTop: '2.5px solid #EF4444' }} />
                    <span className="text-[9px] text-black">Jalan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 flex-shrink-0" style={{ borderTop: '2px solid #3B82F6' }} />
                    <span className="text-[9px] text-black">Sungai</span>
                  </div>
                </div>
              </div>

              <div className="px-4 pb-3 flex-shrink-0">
                <p className="text-[8px] text-gray-400 text-center">
                  Sumber: Peta RBI • OpenStreetMap • Google Satellite
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}