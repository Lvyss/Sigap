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
<div className="px-3 py-2 flex-shrink-0 flex items-center gap-2">

  {/* Kompas PNG */}
  <img
    src="/images/kompas.png"
    alt="Kompas"
    className="w-10 h-10 object-contain flex-shrink-0"
    onError={(e) => { e.target.style.display = 'none'; }}
  />

  {/* Skala */}
  <div className="flex flex-col gap-0.5 flex-shrink-0">
    <p
      className="text-[10 px] font-medium text-black uppercase whitespace-nowrap"
      style={{ fontFamily: "'Oswald', sans-serif" }}
    >
      SKALA : {formatSkala(scale)}
    </p>
{/* Bar skala — set width fixed langsung */}
<div className="flex w-38">
  {/* ↑ ganti w-32 → w-40, w-48, w-56 untuk lebih panjang */}
  {[0, 1, 2, 3].map((i) => (
    <div
      key={i}
      className="h-2 border border-black flex-1"
      style={{
        backgroundColor: i % 2 === 0 ? '#000' : '#fff',
      }}
    />
  ))}
</div>

{/* Label angka — samain width-nya */}
<div className="flex justify-between w-38">
  {/* ↑ samain dengan div bar di atas */}
  <span className="text-[7px] text-black">0</span>
  <span className="text-[7px] text-black">{bar.midLabel}</span>
  <span className="text-[7px] text-black">{bar.label}</span>
</div>
  </div>

  {/* Coordinate info — sebelah kanan skala */}
  <div className="flex flex-col gap-0 ml-2 min-w-0">
    <p className="text-[9px] text-black whitespace-nowrap leading-tight">
      Coordinate System : GCS WGS 1984
    </p>
    <p className="text-[9px] text-black whitespace-nowrap leading-tight">
      Datum : 1984
    </p>
        <p className="text-[9px] text-black whitespace-nowrap leading-tight">
      Units : Degree
    </p>
  </div>

</div>

      {/* ── DIVIDER TEBAL ── */}
      <div className=" border-t-2 border-black flex-shrink-0" />

{/* ── LEGENDA ── */}
<div className="px-4 py-2 flex-shrink-0">
  <p
    className="text-[12px] font-bold text-black uppercase tracking-widest mb-1.5"
    style={{ fontFamily: "'Oswald', sans-serif" }}
  >
    Legenda
  </p>
  <div className="flex flex-row flex-wrap gap-x-3 gap-y-1">
    {LEGENDA_GARIS.map((item) => (
      <div key={item.label} className="flex items-center gap-2">
        <div className="w-6 flex-shrink-0" style={item.style} />
        <span className="text-[10px] text-black whitespace-nowrap">{item.label}</span>
      </div>
    ))}
  </div>
</div>

      {/* ── DIVIDER ── */}
      <div className="mx-3 border-t border-black flex-shrink-0" />

      {/* ── SEARCH ── */}
      <div className="px-3 py-1.5 flex-shrink-0">
        <div className="relative">
          <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black" />
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
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <X size={10} />
            </button>
          )}
        </div>
      </div>

      {/* ── POTENSI DESA — scrollable ── */}
      <div className="flex-1 overflow-y-auto px-3 pb-1 min-h-0">
        <p
          className="text-[10px] font-bold text-black uppercase tracking-widest mb-1.5"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          Potensi Desa Jengglungharjo
        </p>

        {hasilSearch.length === 0 ? (
          <div className="flex flex-col items-center py-4 text-gray-400 gap-1">
            <MapPin size={20} />
            <p className="text-[10px] text-center text-black">Tidak ada hasil</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {hasilSearch.map(({ kat, items }) => (
              <div key={kat.id}>
                {/* Header kategori */}
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: kat.warna }}
                  />
                  <p
                    className="text-[10px] font-bold text-black uppercase tracking-wide flex-1"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {kat.label}
                  </p>
                  <button
                    onClick={() => toggleFilter(kat.id)}
                    className="text-[8px] px-1 py-0.5 rounded border border-black text-black hover:bg-black hover:text-white transition-all"
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
                      className={`flex items-start gap-1 px-1.5 py-1 rounded border text-left transition-all hover:bg-gray-50 ${
                        selectedId === item.id
                          ? 'border-black bg-gray-100'
                          : 'border-gray-200'
                      }`}
                    >
                      <MapPin
                        size={9}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: kat.warna }}
                      />
                      <div className="min-w-0">
                        <p className="text-[9px] font-medium text-black leading-tight line-clamp-2">
                          {item.nama}
                        </p>
                        <p className="text-[8px] text-gray-500 truncate">
                          {item.dusun || ''}
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
      <div className="mx-3 border-t border-black flex-shrink-0" />

      {/* ── SUMBER PETA ── */}
      <div className="px-4 py-1.5 flex-shrink-0">
        <p
          className="text-[9px] font-bold text-black uppercase tracking-widest mb-1"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          Sumber Peta
        </p>
        <ol className="list-decimal list-inside flex flex-col gap-0.5">
          <li className="text-[8px] text-black">Peta Rupa Bumi Indonesia</li>
          <li className="text-[8px] text-black">Open Street Map</li>
          <li className="text-[8px] text-black">Basemap Google Satellite Hybrid</li>
        </ol>
      </div>

      {/* ── DIVIDER ── */}
      <div className="mx-3 border-t border-black flex-shrink-0" />

      {/* ── PETA INDEKS ── */}
      <div className="px-3 py-1.5 flex-shrink-0">
        <p
          className="text-[9px] font-bold text-black uppercase tracking-widest mb-1"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          Indeks Peta
        </p>
        <div className="w-full h-28 rounded border border-black overflow-hidden">
          <MiniMap />
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="px-4 py-1.5 border-t border-black flex-shrink-0">
        <p
          className="text-[8px] text-black text-center uppercase tracking-widest"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          SIGAP • KKN • Jengglungharjo 2026
        </p>
      </div>

    </div>
  );
}